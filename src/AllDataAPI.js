import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
class AllDataAPI extends Component {
    constructor(props){
        super(props)
        this.state={
            apiData:[],
            index: 0
        }
    }
    componentDidMount=async()=>{
        const url= 'http://localhost:3001/apiData'
        const myData= await axios.get(url)
        await this.setState({
            apiData: myData.data.colors
        })
    }
    addcolors = async (index) => {
        const { user, isAuthenticated } = this.props.auth0;
        const email = user.email
        const title = title
        const imageUrl = imageUrl
        const index = this.state.index
        const url= `http://localhost:3001/addData?userEmail=${user.email}&title=${title}&imageUrl${imageUrl}&index${index}`
            const myData= await axios.get(url)
            await this.setState({
                apiData: myData.data
            })

        }
    render() {
        return (
            <div>
                 <h1>All Data from the API</h1>
                <h3>Select your favorites :)</h3>

                {
                    this.state.apiData.map(item=>{
                        return(

                        <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={item.imageUrl} />
                        <Card.Body>
                          <Card.Title>{item.title}</Card.Title>
                          <Button onClick={()=>this.addcolors(index)} variant="primary">update</Button>
                        </Card.Body>
                      </Card> 
                        )
                    })
                }
               
            </div>
        )
    }
}

export default withAuth0(AllDataAPI);
