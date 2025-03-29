import React, { useState } from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../FirebaseConfigs/firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import './Signup.css'

const Signup = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [address, setAddress] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            const initialcartvalue = 0
            
            await addDoc(collection(db, "users"), {
                username,
                email,
                phonenumber,
                password,
                cart: initialcartvalue,
                address,
                uid: user.uid
            })

            setSuccessMsg('New user added successfully, You will now be automatically redirected to login page.')
            setUsername('')
            setPhonenumber('')
            setEmail('')
            setPassword('')
            setAddress('')
            setErrorMsg('')
            
            setTimeout(() => {
                setSuccessMsg('')
                navigate('/login')
            }, 4000)

        } catch (error) {
            console.error('Signup error:', error.message)
            if (error.code === 'auth/invalid-email') {
                setErrorMsg('Please enter a valid email address')
            } else if (error.code === 'auth/email-already-in-use') {
                setErrorMsg('This email is already registered')
            } else if (error.code === 'auth/weak-password') {
                setErrorMsg('Password should be at least 6 characters')
            } else {
                setErrorMsg('An error occurred during signup')
            }
        }
    }

    return (
        <div>
            <Navbar />
            <div className='signup-container'>
                <form onSubmit={handleSignup} className='signup-form'>
                    <p>Create Account</p>
                    
                    {successMsg && <div className='success-msg'>{successMsg}</div>}
                    {errorMsg && <div className='error-msg'>{errorMsg}</div>}
                    
                    <label>Your name</label>
                    <input 
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        type="text"
                        placeholder="First and last name"
                        required
                    />
                    
                    <label>Mobile Number</label>
                    <input 
                        onChange={(e) => setPhonenumber(e.target.value)}
                        value={phonenumber}
                        type="tel"
                        placeholder="Mobile Number"
                        required
                    />
                    
                    <label>Email</label>
                    <input 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                    
                    <label>Password</label>
                    <input 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Enter your password"
                        required
                    />
                    
                    <label>Address</label>
                    <textarea 
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        placeholder="Enter your address"
                        required
                    ></textarea>
                    
                    <button type='submit'>Sign up</button>
                    
                    <div>
                        <span>Already have an account? </span>
                        <Link to="/login">Sign in</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup