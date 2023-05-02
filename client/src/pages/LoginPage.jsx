import { useState } from "react"
import { login as usersApiLogin } from '../utils/users_api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';
import './LoginPage.css'

export default function LoginPage({ onLogin }) {
    const [formData, setFormData] = useState({ email: null, password: null })
    const [error, setError] = useState("")

    const handleSubmit = e => {
        e.preventDefault()

        if (formData.email && formData.password) {
            usersApiLogin(formData)
            .then(token => {
              localStorage.setItem("token", token)
    
              // save the token somewhere in the client
              // local storage
    
              // set user state
              onLogin(formData)
            })
            .catch(err => console.log(err))
        } else {
            setError("invalid username or password!")
        }

       
    }

    const handleChange = (e) => {
        setError("")
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }


    return (
        <div className="login-wrapper">
            <main className="login-forms">
                <form onChange={handleChange} onSubmit={handleSubmit} className="form-left">
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

                <div className="signup-wrapper">
                    <p>A tool for migrating data from Pcloud Drive to Google Drive.</p>
                    <Button size='medium' variant="outlined" color="info" >Create account</Button>
                </div>
               
            </main>
        </div>
    )
}