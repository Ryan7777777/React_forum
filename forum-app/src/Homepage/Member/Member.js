import React from 'react';
import  './Member.css';
import {Modal,Form,Button,Image} from 'react-bootstrap';
import {userService} from "../../_services/user.service.js";
import {userPhotoService} from "../../_services/userphoto.service.js";

class Member extends React.Component{
    constructor(props){
        super(props)
        this.memberModelRef = React.createRef();
        this.state = {selectedFile:null,
                      preview:null,
                      uploadButtonDisable: null,
                      deleteButtonDisable: null,
                      userNameUpdataButtonDisable: null,
                      userName:'',
                      email:'',
                      firstName:'',
                      lastName:''}
    }
    static getDerivedStateFromProps = (props,state) =>{
        if(state.uploadButtonDisable === null && state.deleteButtonDisable === null && state.userNameUpdataButtonDisable === null){
            return{uploadButtonDisable: true,deleteButtonDisable:true,userNameUpdataButtonDisable:true}
        }
    }
    updateUserName = (name) =>{
        this.setState({userName:name.target.value,userNameUpdataButtonDisable:false})
    }
    changeUserName = (action) =>{
        action.preventDefault();
        var res = userService.updateUserName(localStorage.userId,this.state.userName)
        this.setState({userNameUpdataButtonDisable:null})
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
        this.setState({preview:null,uploadButtonDisable:true,deleteButtonDisable:true})
    }
    componentDidMount() {
        userPhotoService.getUserPhoto(localStorage.userId)
        userService.getuserinfo(localStorage.userId)
    }
    getSnapshotBeforeUpdate(prevProp, prevState){
        if(prevState.selectedFile !== null && this.state.selectedFile === null){
            const updateIcon = true
            return  { updateIcon }
        } 
        return null;
    }
    componentDidUpdate(prevProp,prevState,sanpshot) {
        if(sanpshot){
        if(sanpshot.updateIcon){
            userPhotoService.getUserImage(localStorage.userId)
        } 
        }
        if(this.state.preview !== null){
            var logo = document.getElementById("imgImage")
            logo.src = (this.state.preview);
        } else {
            userPhotoService.getUserPhoto(localStorage.userId)
        }
      
    }
    render(){
        return(
        <Modal centered = {'true'} size={'sm'} show={this.props.showMemberModal} onHide={this.props.toggleMemberModal} className="modal">
            <Modal.Header closeButton>
                <Modal.Title className="modalTitle">Member's Daetails</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className ="imageFrame">
                <label  className="custom-file-upload fas">
                <div className="img-wrap img-upload" >
                <Image className='userImage' id="imgImage"/>
                </div>
                <input id="photo-upload" type="file" accept="image/png, image/jpeg"onChange={this.fileChangedHandler}/> 
                </label>
                </div>
                <Button variant="primary"  onClick={this.uploadHandler} size="sm" className="imageUpLoadButton" disabled ={this.state.uploadButtonDisable}>Upload</Button>
                <Button variant="danger" onClick={this.deletePteviewImage} size="sm" className="imageDeleteButton"disabled ={this.state.deleteButtonDisable}>Delete</Button>
            <Form onSubmit={this.changeUserName} className="form">
                <Form.Label className="formUserNameLabel">User name:</Form.Label>  
                <Form.Control className="formUsername" type="string" placeholder={this.state.userName} id ="userName"  onChange = {this.updateUserName} maxLength={15}></Form.Control>
                <Button variant='primary' type="submit" size="sm" className="formUserNameUpdateButton"  disabled ={this.state.userNameUpdataButtonDisable}> Update</Button>
            </Form>
            <p className="userEmailTitle">User email:</p>
            <p className="userEmail" id="userEmail">dssds</p> 
            <p  className="userFullNameTitle"> User's full name:</p>
            <p className="userFullName" id="userFullName"></p>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
            )
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }
}
export default Member;