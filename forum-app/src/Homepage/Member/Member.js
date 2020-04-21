import React from 'react';
import  './Member.css';
import {Modal,Form,Button,Image} from 'react-bootstrap';
import {userService} from "../../_services/user.service.js";
import {userPhotoService} from "../../_services/userphoto.service.js";
class Member extends React.Component{
    constructor(props){
        super(props)
        var res = userService.getuserinfo(localStorage.userId);
        if(res.status === 200){
            this.state = {selectedFile:null,
                          preview:null,
                          uploadButtonDisable: true,
                          deleteButtonDisable: true,
                          userNameUpdataButtonDisable: true,
                          userName:res.responseJSON.username,
                          email:res.responseJSON.email,
                          firstName:res.responseJSON.first_name,
                          lastName:res.responseJSON.last_name}
        }
    }
    toggleModal = () =>{
        this.props.toggleMemberModal()
        var res = userService.getuserinfo(localStorage.userId);
        if(res.status === 200){
            this.setState({selectedFile:null,
                           preview:null, 
                           uploadButtonDisable: true,
                           deleteButtonDisable: true,
                           userNameUpdataButtonDisable: true,
                           userName:res.responseJSON.username,
                           email:res.responseJSON.email,
                           firstName:res.responseJSON.first_name,
                           lastName:res.responseJSON.last_name})
        }
    }
    updateUserName = (name) =>{
        this.setState({userName:name.target.value,userNameUpdataButtonDisable:false})
    }
    changeUserName = (action) =>{
        action.preventDefault();
        var res = userService.updateUserName(localStorage.userId,this.state.userName)
        if (res.status === 200){
            alert('Update successful!')
        }
    }
    fileChangedHandler = (event) => {
        this.setState({selectedFile: event.target.files[0],preview: URL.createObjectURL(event.target.files[0]),uploadButtonDisable:false,deleteButtonDisable:false})
      }
    uploadHandler = () =>{
        var result = userPhotoService.uploadFile(this.state.selectedFile)
        if(result.status===200 || result.status === 201){
            this.setState({selectedFile:null,preview:null, uploadButtonDisable: true,deleteButtonDisable: true})
            alert("Uploaded successful!")
        } else{
            alert(result.statusText)
        }
    }
    deletePteviewImage = () =>{
        this.setState({selectedFile:null,preview:null,uploadButtonDisable:true,deleteButtonDisable:true})
    }
    componentDidUpdate(){
        if(this.props.show_MemberModal === true && this.state.preview === null){
            userPhotoService.getUserPhoto(localStorage.userId)
            userPhotoService.getUserImage(localStorage.userId)
        } 
        if(this.state.preview!==null){
            var logo = document.getElementById("imgImage")
            logo.src = (this.state.preview);
        }
    }
    render(){
        return(
        <Modal centered = {'true'} size={'md'} show={this.props.show_MemberModal} onHide={this.toggleModal}>
            <Modal.Header closeButton>
                <Modal.Title>Member Daetails</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modalbody">
                <div className ="imageFrame">
                <label for="photo-upload" className="custom-file-upload fas">
                <div className="img-wrap img-upload" >
                <Image className='userImage'for="photo-upload" id="imgImage"/>
                </div>
                <input id="photo-upload" type="file" onChange={this.fileChangedHandler}/> 
                </label>
                </div>
                <Button variant="primary"  onClick={this.uploadHandler} className="imageUpLoadButton" disabled ={this.state.uploadButtonDisable}>Upload</Button>
                <Button variant="danger" onClick={this.deletePteviewImage} className="imageDeleteButton"disabled ={this.state.deleteButtonDisable}>Delete</Button>
            <Form onSubmit={this.changeUserName} className="form">
                <Form.Label className="formUserNameLabel">User name</Form.Label>  
                <Form.Control className="formUsername" type="string" placeholder={this.state.userName} value={this.state.userName} onChange = {this.updateUserName} maxLength={15}></Form.Control>
                <Button variant='primary' type="submit" className="formUserNameUpdateButton"  disabled ={this.state.userNameUpdataButtonDisable}> Update</Button>
            </Form>
            <p className="userEmailTitle">User email:</p>
            <p className="userEmail">{this.state.email}</p> 
            <p  className="userFullNameTitle"> User's full name:</p>
            <p className="userFullName"> {this.state.firstName} {this.state.lastName}</p>
           
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
            )
    }
}
export default Member;