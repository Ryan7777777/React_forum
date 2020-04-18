import React from 'react';
import  './Member.css';
import {Modal,Form,Button, Row,Col} from 'react-bootstrap';
import {userService} from "../../_services/user.service.js";
class Member extends React.Component{
    constructor(props){
        super(props)
        var res = userService.getuserinfo(localStorage.userId);
        if(res.status === 200){
            this.state = {userName:res.responseJSON.username,email:res.responseJSON.email,firstName:res.responseJSON.first_name,lastName:res.responseJSON.last_name}
        }
    }
    toggleModal = () =>{
        this.props.toggleMemberModal()
        var res = userService.getuserinfo(localStorage.userId);
        if(res.status === 200){
            this.setState({userName:res.responseJSON.username,email:res.responseJSON.email,firstName:res.responseJSON.first_name,lastName:res.responseJSON.last_name})
        }
    }
    updateUserName = (name) =>{
        this.setState({userName:name.target.value})
    }
    changeUserName = (action) =>{
        action.preventDefault();
        var res = userService.updateUserName(localStorage.userId,this.state.userName)
        if (res.status === 200){
            alert('Update succeddful!')
            this.toggleModal();
        }
    }
    render(){
        return(
        <Modal centered = {'true'} size={'md'} show={this.props.show_MemberModal} onHide={this.toggleModal}>
            <Modal.Header closeButton>
                <Modal.Title>Member Daetails</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={this.changeUserName}>
                    <Form.Label>User name</Form.Label>  
                    <Row>
                        <Col xs={9}>
                            <Form.Control className="formUsername" type="string" placeholder={this.state.userName} value={this.state.userName} onChange = {this.updateUserName} maxLength={15}></Form.Control>
                        </Col>
                        <Col xs={3}>
                            <Button varianr='primary' type="submit"> Update</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                             <Form.Label className="formEmail">User email</Form.Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Form.Label>{this.state.email}</Form.Label> 
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <Form.Label  className="formName"> User's first name</Form.Label>
                        </Col>
                        <Col xs={6}>
                            <Form.Label  className="formName"> User's family  name</Form.Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <Form.Label> {this.state.firstName}</Form.Label>
                        </Col>
                        <Col xs={6}>
                            <Form.Label> {this.state.lastName}</Form.Label>
                        </Col>
                    </Row>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
            )
    }
}
export default Member;