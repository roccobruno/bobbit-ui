var _ = require("lodash");

var bootstrap = require("react-bootstrap");

var Glyphicon = bootstrap.Glyphicon;

var Button = bootstrap.Button;
var ButtonToolbar = bootstrap.ButtonToolbar;
var Modal = bootstrap.Modal;
var Panel = bootstrap.Panel;

var ButtonToolbar = bootstrap.ButtonToolbar;

var Nothing = require("./Nothing.jsx");

var EditButton = React.createClass({
    propTypes: {
        link: React.PropTypes.string.isRequired
    },
    goToEdit:function() {
       if(this.props.execFunct)
          this.props.onClick(this.props.id)
          else
          window.location=this.props.link;
    },

  render : function() {

    return (

      <Button  bsSize='xsmall' onClick={this.goToEdit}>
                           <Glyphicon glyph='glyphicon glyphicon-edit' />
       </Button>


    )

  }
})

var DeleteButton = React.createClass({
    propTypes: {
        action: React.PropTypes.string.isRequired
    },
    goToEdit:function() {
          this.setState({showModal:true})
    },
    confirm: function() {
       this.props.action(this.props.id)
       this.setState({showModal:false})
    },
    cancel:function() {
     this.setState({showModal:false})
    },
    getInitialState: function() {
     return {showModal:false}
    },



  render : function() {

      var confirmModal = this.state.showModal ? (<div> <Modal onRequestHide={this.cancel}>  <Panel header="Confirm Deletion">
       <div className="dialogue-message">  Are you sure you want to delete : <div className="dialogue-message-info">{this.props.info}</div>  </div>
         <ButtonToolbar>
             <div className="dialogue-button-div">
                 <Button bsSize='small' onClick={this.confirm}>Confirm</Button>
                 <Button bsSize='small' onClick={this.cancel}>Cancel</Button>
             </div>
         </ButtonToolbar>

            </Panel>
             </Modal>
              </div>) : <Nothing/>;


    return (
      <div>{confirmModal}
      <Button bsSize='xsmall' onClick={this.goToEdit}>
                           <Glyphicon glyph='glyphicon glyphicon-remove' />
       </Button>
    </div>

    )

  }
})

module.exports.EditButton = EditButton;
module.exports.DeleteButton = DeleteButton;