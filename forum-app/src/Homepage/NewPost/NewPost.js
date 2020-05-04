import React from 'react';
import './NewPost.css'
import {Modal,Form,Button} from 'react-bootstrap';
class NewPost extends React.Component{
    constructor(props){
        super(props)
        this.state ={topic:null,content:null,selectFile:[],selectFilePreview:[]}
    }
    static getDerivedStateFromProps(props,state){
        if(state.selectFile.length == 0 && state.selectFilePreview.legth == 0)
        return({selectfile:null,selectFilePreview:null})
    }
    postNewPost = () =>{
        
    }
    updateTopic = (e) =>{
        console.log(e.target.value)
        this.setState({topic:e.target.value})
    }
    updateContent = (event) =>{
        this.setState({content:event.target.value})
    }
    handleChange = (event)=> {
        var imageArray = this.state.selectFile
        var imagePreviewArray = this.state.selectFilePreview
        for(var i=0; i<event.target.files.length; i++){
            imageArray.push(event.target.files[i]) 
            imagePreviewArray.push({name: event.target.files[i].name,source: URL.createObjectURL(event.target.files[i])})
        }
        this.setState({
           selectFile:imageArray, selectFilePreview: imagePreviewArray
        })
      }
    cancelImage (index) {
        var selectfile = this.state.selectFile
        var previewImage = this.state.selectFilePreview
        previewImage.splice(index,1)
        selectfile.splice(index,1)
        if(selectfile.length === 0)
        document.getElementById('photoInput').value = ''
        this.setState({selectFile:selectfile,selectFilePreview:previewImage})
      
    }
    renderPhotoPreview(){
    return(<div className='selectImageBox'>{this.state.selectFilePreview.map((file,i)=>(
                <div className="imageBox" key={i}>
                <i className="cancleImage"  onClick={(e)=>this.cancelImage(i)} key={i}>x</i>
                <div className="selectImageName"><a>{file.name}</a>
                <img className="tootltipImage"src={file.source}></img></div>
                </div>))}
           </div>)
    }
    render(){
        return (
            <Modal centered={'true'} size={'lg'} show={this.props.show_NewPostModal} onHide={this.props.toggleNewPostModal}>
            <Modal.Header closeButton>
                <Modal.Title className="modalTitle">Assign a new post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={this.postNewPost} className='newPostForm'>
                <div className='topicSection'>
                    <Form.Label className='fromTopicLabel'>Topic:</Form.Label>
                    <Form.Control className='fromTopicInput' type='string' placeholder='type you topic here' id='topicInput' onChange={this.updateTopic}></Form.Control>
                </div>
                <div className='contentSection'>
                    <Form.Label className='fromCommentLabel'>Comment: </Form.Label>
                    <Form.Control className='fromCommentInput' type='string' placeholder='type your comment here' id='connentInput' onChange={this.updateContent}></Form.Control>
                </div>
                <div className="imageSelection">
                    <input id='photoInput' type="file"  className="imageInput" accept="image/jepg , image/png"onChange={this.handleChange} multiple/>
                    {this.renderPhotoPreview()}
                </div>
                <Button variant='primary' type="submit" size="sm" className="formPostButton"  disabled ={this.state.userNameUpdataButtonDisable}>Post</Button>
                </Form>
            </Modal.Body>
            </Modal>
        )
    }
    componentWillUnmount(){
        clearInterval(this.state)
    }
}
export default NewPost;