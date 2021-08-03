import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyFavorites.css';
import { withAuth0 } from '@auth0/auth0-react';
import {Card,Modal,Form} from 'react-bootstrap'
import axios from 'axios';

class MyFavorites extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: [],
      showUpdate: false,
      index: 0
    }
  }


    updatecolors = async (event) => {
      event.preventDefault()
      const { user, isAuthenticated } = this.props.auth0;
      const email = user.email
      const title = event.target.title.value
      const imageUrl = event.target.imageUrl.value
      const index = this.state.index
      const url= `http://localhost:3001/addData?userEmail=${user.email}&title=${title}&imageUrl${imageUrl}&index${index}`
          const myData= await axios.get(url)
          await this.setState({
            userData: myData.data
          })
         this.updateAddFun(index)
      }

      updateAddFun(index){
     this.setState({
      showUpdate: !this.state.showUpdate,
      index:index
    })
      }

      //delete
      deletecolors=async(index)=>{
        const { user, isAuthenticated } = this.props.auth0;
        const url = `http://localhost:3001/deleteData?userEmail=${user.email}&title=${title}&imageUrl${imageUrl}&index${index}`
      const myData = await axios.get(url)
      await this.setState({
      userData: myData.data
    })
      }
  
  componentDidMount = async () => {
    const url = 'http://localhost:3001/myData'
    const myData = await axios.get(url)
    await this.setState({
      userData: myData.data
    })
  }

  render() {
    return (

      <>
        <h1>My Favorites</h1>
        <p>
          This is a collection of my favorites
        </p>
        {
          this.state.userData.map((item, index) => {
            return (

              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={item.imageUrl} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Button onClick={()=>this.deletecolors(index)} variant="primary">delete</Button>
                  <Button onClick={()=>this.showUpdate(index)} variant="primary">update</Button>
                </Card.Body>
              </Card>
            )
          })
        }
 <Modal show={this.state.showUpdate} onHide={this.updateAddFun}>
        <Modal.Header closeButton>
          <Modal.Title>update colors</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.updateAddFun}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>title </Form.Label>
    <Form.Control type="text" placeholder="title" name="title" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>imageUrl </Form.Label>
    <Form.Control type="text" placeholder="imageUrl" name="imageUrl" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.updateAddFun}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    )
  }
}

export default withAuth0(MyFavorites);

