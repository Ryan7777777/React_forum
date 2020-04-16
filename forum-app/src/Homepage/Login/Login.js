import React from 'react';
import {Button,Modal,Form, FormControl} from 'react-bootstrap';
import './Login.css';
import {userService} from "../../_services/user.service.js";
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {inCorrect: null, email : '',password : '',id: '',show: false}
    }
    loging = () => {
        this.setState({email: '',password: ''}) 
    }
    updateemail = (email) => {
       this.setState({email: email.target.value});
    }
    updatepassword = (password) => {
       this.setState({password:password.target.value})
    }
    closeModal = () => {
        this.setState({email: '',password: '',show: false})
        this.props.toggleLoginModal()
    }
    register = () =>{
        window.open("/signup/", '_blank');
    }
     handleSubmit = (action) => {
        action.preventDefault();
        var a = userService.login(this.state.email, this.state.password);
        if (a.status === 200){
            this.closeModal()
            window.location.reload(false);
        }else{
            this.setState({inCorrect: true,password: ''})
        }
    }
    componentDidUpdate() {
        if(this.props.show_d===true && this.state.show === false){
            this.setState({show:true})
            this._input.focus();
        }
      }
    render(){
        return(
            <Modal  dialogClassName="modal" autoFocus={false} show={this.props.show_LoginModal} centered = {'true'} size={'md'} onHide={this.closeModal} >
            <Modal.Header closeButton>
            <Modal.Title >User Login</Modal.Title>
            </Modal.Header>
            <Form onSubmit={this.handleSubmit}>
            <Modal.Body>
            <Form.Label>User Name</Form.Label>
            <Form.Group controlId="login_email">
            <Form.Control autoFocus={true} className="focusedInput"stype="email" value={this.state.email} onChange = {this.updateemail} placeholder="Enter email" required ref={c => (this._input = c)}/>
            </Form.Group>
            <Form.Group controlId="userPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" isInvalid={this.state.inCorrect} value={this.state.password} onChange = {this.updatepassword} placeholder="Password" required/>
            <FormControl.Feedback type="invalid">Invalid email address or password</FormControl.Feedback>
            </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            < Button  className="position-relative col-3 col-sm-2 btn" type="submit" variant='outline-success' >Login</Button>
            < Button  className="position-relative register col-3 col-sm-2 btn" variant='outline-secondary' onClick={this.register}>Register</Button>  
            </Modal.Footer>
            </Form>
        </Modal>
        )
    }
}
export default Login;