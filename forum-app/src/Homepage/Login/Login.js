import React from 'react';
import {Button,Modal,Form, FormControl} from 'react-bootstrap';
import './Login.css';
import {userService} from "../../_services/user.service.js";
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {inCorrect: null, email : '',password : ''}
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
        this.setState({email: '',password: ''})
        this.props.toggleModal()
    }
    register = () =>{
        window.open("/signup/", '_blank');
    }
     handleSubmit = (e) => {
        e.preventDefault();
        var a = userService.login(this.state.email, this.state.password);
        if (a.status === 200){
            this.closeModal()
            window.location.reload(false);
        }else{
            this.setState({inCorrect: true,password: ''})
        }
    }
    render(){
        return(
            <Modal show={this.props.show_d} ref={this.props.modalref} centered = {'true'} size={'md'} onHide={this.closeModal} >
            <Modal.Header closeButton>
            <Modal.Title >User Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form validated={false} onSubmit={this.handleSubmit}>
            <Form.Label>User Name</Form.Label>
            <Form.Group controlId="login_email">
            <Form.Control  type="email" value={this.state.email} onChange = {this.updateemail} placeholder="Enter email"required/>
            </Form.Group>
            <Form.Group controlId="userPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" isInvalid={this.state.inCorrect} value={this.state.password} onChange = {this.updatepassword} placeholder="Password" required/>
            <FormControl.Feedback type="invalid">Invalid email address or password</FormControl.Feedback>
            </Form.Group>
            <br/>
            < Button  className="position-relative col-3 col-sm-2" type="submit" variant='outline-success' >Login</Button>
            < Button  className="position-relative register col-3 col-sm-2" variant='outline-secondary' onClick={this.register}>Register</Button>  
            </Form>
            </Modal.Body>
        </Modal>
        )
    }
}
export default Login;