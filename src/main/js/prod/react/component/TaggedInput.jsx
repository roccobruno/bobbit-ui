/**
 * @jsx React.DOM
 */

// Original https://github.com/tutorialhorizon/react-tagged-input
// LICENSE: MIT

var React = require('react');
var bootstrap = require("react-bootstrap");

var Label = bootstrap.Label;
var Glyphicon = bootstrap.Glyphicon;

var delimiters = [' ', ','];

var KEY_CODES = {
    ENTER: 13,
    BACKSPACE: 8
};

var DefaultTagComponent = React.createClass({

    render: function() {
        var self = this;
        var p = self.props;

        return (
            <Label onClick={p.onRemove}>{p.item}<Glyphicon glyph="remove-sign"/><Glyphicon glyph="white"/></Label>
        );
    }
});

var TaggedInput = React.createClass({

    propTypes: {
        onAddTag: React.PropTypes.func,
        onRemoveTag: React.PropTypes.func,
        onEnter: React.PropTypes.func,
        unique: React.PropTypes.bool,
        autofocus: React.PropTypes.bool,
        backspaceDeletesWord: React.PropTypes.bool,
        placeholder: React.PropTypes.string
    },

    getInitialState: function () {
        return {
            tags: this.props.tags || [],
            unique: this.props.unique || true,
            currentInput: null
        };
    },

    render: function() {
        var self = this, s = self.state, p = self.props;

        var tagComponents = [],
            classes = 'tagged-input-wrapper',
            placeholder,
            i;

        if (p.classes) {
            classes += ' ' + p.classes;
        }

        if (s.tags.length === 0) {
            placeholder = p.placeholder;
        }

        var TagComponent = DefaultTagComponent;

        for (i = 0 ; i < s.tags.length; i++) {
            tagComponents.push(
                <TagComponent
                item={s.tags[i]}
                itemIndex={i}
                onRemove={self._handleRemoveTag.bind(this, i)}
                />
            );
        }

        var input = (
            <input type='text'
            className="tagged-input"
            ref='input'
            onKeyUp={this._handleKeyUp}
            onKeyDown={this._handleKeyDown}
            onChange={this._handleChange}
            value={s.currentInput}
            placeholder={placeholder}>
            </input>
            );

        return (
            <div className={classes}
            onClick={self._handleClickOnWrapper}>
        {tagComponents}
        {input}
            </div>
            );
    },

    componentDidMount: function() {
        var self = this, s = self.state, p = self.props;

        if (p.autofocus) {
            self.refs.input.getDOMNode().focus();
        }
    },

    _handleRemoveTag: function (index) {
        var self = this, s = self.state, p = self.props;

        var removedItems = s.tags.splice(index, 1);

        if (p.onRemoveTag) {
            p.onRemoveTag(removedItems[0]);
        }
        self.forceUpdate();
    },

    _handleKeyUp: function (e) {
        var self = this, s = self.state, p = self.props;

        var enteredValue = e.target.value;

        switch (e.keyCode) {
            case KEY_CODES.ENTER:
                if (s.currentInput) {
                    s.tags.push(s.currentInput.trim());
                    if (p.onAddTag) {
                        p.onAddTag(s.tags[s.tags.length-1]);
                    }
                    self.setState({
                        currentInput: ''
                    }, function () {
                        if (p.onEnter) {
                            p.onEnter(e, s.tags);
                        }
                    });
                }
                break;
        }
    },

    _handleKeyDown: function (e) {
        var self = this,
            s = self.state,
            p = self.props,
            poppedValue,
            newCurrentInput;

        switch (e.keyCode) {
            case KEY_CODES.BACKSPACE:
                if (!e.target.value || e.target.value.length < 0) {
                    poppedValue = s.tags.pop();

                    newCurrentInput = p.backspaceDeletesWord ? '': poppedValue;

                    this.setState({
                        currentInput: newCurrentInput
                    });
                    if (p.onRemoveTag) {
                        p.onRemoveTag(poppedValue);
                    }
                }
                break;
        }
    },

    _handleChange: function (e) {
        var self = this, s = self.state, p = self.props;

        var value = e.target.value,
            lastChar = value.charAt(value.length - 1),
            tagText = value.substring(0, value.length - 1);

        if (delimiters.indexOf(lastChar) !== -1) {
            self._validateAndTag(tagText);
        } else {
            this.setState({
                currentInput: e.target.value
            });
        }
    },

    _isUnique: function (tagText) {
        return (this.state.tags.indexOf(tagText) === -1);
    },

    _handleClickOnWrapper: function (e) {
        this.refs.input.getDOMNode().focus();
    },

    _validateAndTag: function (tagText) {
        var self = this, s = self.state, p = self.props;

        if (tagText && tagText.length > 0) {
            if (s.unique) {
                if (self._isUnique(tagText)) {
                    s.tags.push(tagText.trim());
                    self.setState({currentInput: ''});
                    if (p.onAddTag) {
                        p.onAddTag(tagText);
                    }
                }
            } else {
                s.tags.push(tagText.trim());
                self.setState({currentInput: ''});
                if (p.onAddTag) {
                    p.onAddTag(tagText);
                }
            }
        }
    },

    getTags: function () {
        return this.state.tags;
    },

    getEnteredText: function () {
        return this.state.currentInput;
    },

    getAllValues: function () {
        var self = this, s = this.state, p = this.props;

        if (s.currentInput && s.currentInput.length > 0) {
            return (this.state.tags.concat(s.currentInput));
        } else {
            return this.state.tags;
        }
    }

});

module.exports = TaggedInput;
