/** @jsx React.DOM */

var _ = require("lodash");
var React = require("react/addons");
var bootstrap = require("react-bootstrap");
var Glyphicon = bootstrap.Glyphicon;
var Input = bootstrap.Input;
var Button = bootstrap.Button;
var OverlayMixin = bootstrap.OverlayMixin;
var Modal = bootstrap.Modal;
var Grid = bootstrap.Grid;
var Row = bootstrap.Row;
var Table = bootstrap.Table;
var Col = bootstrap.Col;
var Panel = bootstrap.Panel;
var Tooltip = bootstrap.Tooltip;
var OverlayTrigger = bootstrap.OverlayTrigger;
var ProgressBar = bootstrap.ProgressBar;
var LoginForm = require("../login.js").LoginForm;
var Modal = bootstrap.Modal;
var api = require("../api.js");
var Select = require('react-select');
var LoginForm = require("../login.js").Login;
var api = require("../api.js");

var CasaproApplication = require("./CasaproApplication.jsx");


var Nothing = require("./component/Nothing.jsx");


var Login = React.createClass({




    getInitialState: function() {


        return {
            loginForm:new LoginForm(),
            showError : false,
            showMsg: false,
            showBar:false,
            formOpen:false,
            validationResult:[]}
    },
   handleChange: function(event) {
        var validationResult = this.state.loginForm.validate(true)
           var loginformToUpdate = this.state.loginForm;
           loginformToUpdate.update(event.target.name,event.target.value);
           this.setState({loginForm:loginformToUpdate,validationResult:validationResult});
   },
   sendLogin : function(){
           var validationResult = this.state.loginForm.validate(true)
           this.setState({validationResult:validationResult})
           if(validationResult.length==0) {
           api.Login.login(this.state.loginForm,this.loginOk,this.loginKo)
    }
   },
   loginOk : function() {
       window.location='project.html';
   },
   loginKo : function(message) {
        this.setState({errorMessage : message,
        showError:true})
   },
   getClasses: function(field) {
           var validationResult = this.state.validationResult
           return React.addons.classSet({
             'form-group': true,
             'has-error': _.contains(validationResult,field)
           });
   },




    render: function () {


        var showErrorMessage = this.props.error ? (<div className="cas-login-form-error">Wrong credentials</div>) : <Nothing/>
       
        
        return (
           <form action="/login" method="post">
                <div>
                      <div className="cas-login-form">
                       <div className={this.getClasses('username')}>
	                   <Input name="username" className="cas-login-form-username" type="text" label='UserName' value={this.state.loginForm.username()} onChange={this.handleChange} />
	                   </div><div className={this.getClasses('password')}><Input name="password" className="cas-login-form-password" type="password" label='Password' value={this.state.loginForm.password()} onChange={this.handleChange} />
	                 </div>
                    {showErrorMessage}
	              </div>
                       <Button i tabIndex={-1} className="edit-client-save-button" bsSize="small" type="submit" >
                        Login
                    </Button>

                
                </div>

                </form>

            )
    }

});


function render(e,error) {
    var application =
        <CasaproApplication logout="false">
            <Login error={error}/>
        </CasaproApplication>;

    React.render(application, e);
}

module.exports.render = render;