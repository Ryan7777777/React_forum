import React from 'react';
import {Form,Button,Row,Col,Container} from 'react-bootstrap';
import "./Signup.css";
import logo from '../../Image/logo/blog-icon.png';
import {userService} from '../../_services/user.service';
import {setUpChecker} from '../../tools/setupchecker';
class Signup extends React.Component {
    constructor(props){
        super(props)
        this.state = {invalidpassword: false,invalidusername: false,invalidemail: false,email : '',username:'',firstname:'',familyname:'',password : '',confirmpassword:''}
    }
    register_checker = (e) =>{
        e.preventDefault();
        var check_password = this.password_checker() 
        var check_userame = this.username_checker()
        var check_email = this.email_checker()
        if(check_password && check_userame && check_email){
            var result = userService.createuser(this.state.username,this.state.email,this.state.firstname,this.state.familyname,this.state.password)
            console.log(result)
        }
    }
    password_checker = () =>{
        if(setUpChecker.passwordchecker(this.state.password,this.state.confirmpassword) && setUpChecker.seven_digit_length_checker(this.state.password)){
            this.setState({invalidpassword:false});
            return true
        } else{
            this.setState({invalidpassword:true});
            return false
        }
    }
    username_checker = () =>{
      if(setUpChecker.usernamechecker(this.state.username) && setUpChecker.seven_digit_length_checker(this.state.password)){
          this.setState({invalidusername:false});
          return true
      } else {
            this.setState({invalidusername:true});
            return false
      }
    }
    email_checker = () =>{
        if(setUpChecker.emailchecker(this.state.email) && setUpChecker.validateemail(this.state.email)){
            this.setState({invalidemail:false})
            return true
        } else {
            this.setState({invalidemail:true});
            return false 
        }
    }
    update_email = (e) =>{
        this.setState({invalidemail:false});
        this.setState({email:e.target.value})
    }
    update_username = (e) =>{
        this.setState({invalidusername:false});
        this.setState({username: e.target.value})
    }
    update_firstname = (e) =>{
        this.setState({firstname: e.target.value})
    }
    update_familyname = (e) =>{
        this.setState({familyname: e.target.value})
    }
    update_passowrd = (e) =>{
        this.setState({invalidpassword:false});
        this.setState({password: e.target.value})
    }
    update_confirm_password = (e) =>{
        this.setState({invalidpassword:false});
        this.setState({confirmpassword: e.target.value})
    }
    render(){
        return(
        <div className ="body">
          <div className='formbody'>
              <Container>
                  <Row>
                      <Col xs={2}>
                        <img src={logo} width="70%" height="100%"   alt="React Bootstrap logo"/>
                      </Col>
                      <Col xs={10}>
                        <h2>Register your membership now</h2>
                      </Col>
                  </Row>
              </Container>
              <Form className="form" onSubmit={this.register_checker}>
                <Form.Group className='FromEmail'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control  required type="email"placeholder="address@example.com"  isInvalid={this.state.invalidemail} value={this.email} onChange={this.update_email} maxLength={45}/>
                    <Form.Control.Feedback type="invalid">Email address already been used</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="FromUserName">
                    <Form.Label>User Name:</Form.Label>
                    <Form.Control  required placeholder="User name"  isInvalid={this.state.invalidusername} value={this.username} onChange={this.update_username} maxLength={15} />
                    <Form.Control.Feedback type="invalid">User name alreadly been use or less than 7 charaters</Form.Control.Feedback>
                </Form.Group> 
                <Form.Group className="FromName"> 
                    <Form.Row>
                        <Col>
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control required placeholder="First name" value={this.firstname} onChange={this.update_firstname} maxLength={20}/>
                        </Col>
                        <Col>
                            <Form.Label>Family Name:</Form.Label>
                            <Form.Control  required placeholder="Family name" value={this.familyname} onChange={this.update_familyname} maxLength={20}/>
                        </Col>
                    </Form.Row>
                </Form.Group>
                <Form.Group className="FromPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control required type="password" placeholder="Password" isInvalid={this.state.invalidpassword} value={this.password} onChange={this.update_passowrd} maxLength={64}/>
                    <Form.Control.Feedback type="invalid">Password must be at least 8 charaters long including at least one upper case charter and one lower case charater</Form.Control.Feedback>
                 </Form.Group>
                 <Form.Group className="FromConfirmPassword">   
                    <Form.Label>Confirmed Password:</Form.Label>
                    <Form.Control required type="password" placeholder="Password"  isInvalid={this.state.invalidpassword} value={this.confirmpassword} onChange={this.update_confirm_password} macLength={64}/>
                    <Form.Control.Feedback type="invalid">Password and confimed password not identiacl</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
              </Form>
          </div>
        </div>
        )}
}
export default Signup;
