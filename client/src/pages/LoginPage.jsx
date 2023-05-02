import { useState } from "react"
import { login as usersApiLogin, signup } from '../utils/users_api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';
import './LoginPage.css'

export default function LoginPage({ onLogin }) {
    const [loginFormData, setloginFormData] = useState({ email: null, password: null })
    const [signupFormData, setSignupFormData] = useState({ email: null, password: null })
    const [error, setError] = useState("")
    const [isSignup, setIsSignup] = useState(false)
    const [hasAccount, setHasAccount] = useState(false)

    const handleLogin = e => {
        e.preventDefault()

        if (loginFormData.email && loginFormData.password) {
            usersApiLogin(loginFormData)
            .then(token => {
              localStorage.setItem("token", token)
    
              // save the token somewhere in the client
              // local storage
    
              // set user state
              onLogin(loginFormData)
            })
            .catch(err => console.log(err))
        } else {
            setError("invalid username or password!")
        }
    }

    const handleLoginFormChange = (e) => {
        setError("")
        setloginFormData({ ...loginFormData, [e.target.name]: e.target.value})
    }

    const handleSignupFormChange = (e) => {
        setSignupFormData({ ...signupFormData, [e.target.name]: e.target.value})
    }

    const handleSignup = e => {
        e.preventDefault()
        signup(signupFormData)
        setIsSignup(false)
        setHasAccount(true)
    }

    return (
        <div className="login-wrapper">
            <main className="login-forms">
                <form onChange={handleLoginFormChange} onSubmit={handleLogin} className="form-left">
                    <h2>Login</h2>
                    <input name="email" type="text" placeholder="email" />
                    <input name="password" type="password" placeholder="password" />
                    <button id="loginBtn">Login</button>
                    <p>{error}</p>
                </form>

                <div className="center-unit">
                    <FontAwesomeIcon icon={faCloudArrowUp} size="2x" color='#5EB1BF' />
                    <span className='tag-line'>pcloud2gdrive</span>
                    <div className="divider"></div>
                </div>
                {!hasAccount ?
                <div className="right-signup-wrapper">
                    <p>A tool for migrating data from Pcloud Drive to Google Drive.</p>
                    <Button onClick={(e) => setIsSignup(true)} size='medium' variant="outlined" color="info" >Create account</Button>
                </div>
                :
                null}
            </main>
            <main className={isSignup ? "signup-wrapper visible" : "signup-wrapper"}>
            <div className="center-unit">
                    <FontAwesomeIcon icon={faCloudArrowUp} size="2x" color='#5EB1BF' />
                    <span className='tag-line'>pcloud2gdrive</span>
                    <div className="divider"></div>
                </div>
                <form className="form-left" onSubmit={handleSignup} onChange={handleSignupFormChange}>
                    <h3>Create a new account</h3>
                    <input name="username" type="text" placeholder="username" />
                    <input name="email" type="text" placeholder="email" />
                    <input name="password" type="password" placeholder="password" />
                    <button id="loginBtn">Sign up</button>
                </form>
            </main>
        </div>
    )
}