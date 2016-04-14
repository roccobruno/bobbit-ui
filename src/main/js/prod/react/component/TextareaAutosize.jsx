var React = require('react');
var objectAssign = require('object-assign');

var TextareaAutosize = React.createClass({
    displayName: 'TextareaAutosize',

    getInitialState: function() {
        return {needcalc: false};
    },
    render: function () {
        var props = objectAssign({}, this.props, {
            onChange: this.onChange,
            style: objectAssign({}, this.props.style, {overflow: 'hidden'})
        });

        return React.DOM.textarea(props, this.props.children);
    },

    componentDidMount: function () {
        this.getDiffSize();
        this.recalculateSize();
    },

    componentWillReceiveProps: function (nextProps) {
        this.dirty = !!nextProps.style;
        if (nextProps.value != this.props.value) {
            this.setState({ needcalc: true });
        }
    },

    componentDidUpdate: function () {
        if (this.dirty) {
            this.getDiffSize();
            this.dirty = false;
        }

        if ( this.state.needcalc ) {
            this.recalculateSize();
            this.setState({needcalc: false });
        }
    },

    onChange: function (e) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    },

    getDiffSize: function () {
        if (window.getComputedStyle) {
            var styles = window.getComputedStyle(this.getDOMNode());

            // If the textarea is set to border-box, it's not necessary to
            // subtract the padding.
            if (styles.getPropertyValue('box-sizing') === "border-box" ||
                styles.getPropertyValue('-moz-box-sizing') === "border-box" ||
                styles.getPropertyValue('-webkit-box-sizing') === "border-box") {
                this.diff = 0;
            } else {
                this.diff = (
                    parseInt(styles.getPropertyValue('padding-bottom') || 0, 10) +
                    parseInt(styles.getPropertyValue('padding-top') || 0, 10)
                    );
            }
        } else {
            this.diff = 0;
        }
    },

    recalculateSize: function () {
        if (!this.isMounted()) {
            return;
        }

        var node = this.getDOMNode();
        node.style.height = 'auto';
        var calculated = node.scrollHeight - this.diff;
        calculated = (Math.floor(calculated / 10) + 1) * 10;
        node.style.height = calculated + "px";
    }
});

module.exports = TextareaAutosize;
