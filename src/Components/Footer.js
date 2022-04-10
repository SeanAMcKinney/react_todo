import React from 'react'
import Logout from './Login/Logout'
import { useAuth } from '../contexts/AuthContext'
import '../Components/Footer.css'


export default function Footer() {
    const {currentUser} = useAuth();
  return (
    <>
        {currentUser &&
            <Logout />
        }
        <footer className='text-center text-white bg-color p-4'>
            <strong>&copy; {new Date().getFullYear()} All Rights Reserved</strong>
        </footer>
    </>
  )
}
