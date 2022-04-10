import React from 'react'
//Step 1 - accessing user info - import useAuth
import { useAuth } from '../../contexts/AuthContext'
import { Container, Card } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import background2 from '../../images/loginbackground.jpeg'

export default function Login() {
    //Step 2 - create a variable to hold the currentUser, login, logout
    const {login, currentUser} = useAuth();
    
  return currentUser ? <Navigate to='/categories' /> :
    <div className='login' style={{ backgroundImage: `url(${background2})`}}>
        <article className='mb-5 p-5 text-dark'>
            <h1 className="text-center">Grocery List</h1>
        </article>
        <Container>
            <Card className='m-2 border-light text-center bg-dark'>
                <Card.Header className='bg-dark text-white'>
                    <h2>Login for full functionality</h2>                  
                </Card.Header>
                <Card.Body>
                    {/* Step 3 - call the functionality in the UI or use it in the logic portion of the component */}
                    <button onClick={login} className='btn btn-outline-light btn-dark'>
                        Login with GitHub
                    </button>
                </Card.Body>
            </Card>
        </Container>
    </div>
}
