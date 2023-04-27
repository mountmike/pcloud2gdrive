import { useState } from "react"
import { login as usersApiLogin } from '../utils/users_api'

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
        <section>
            <h1>login</h1>

            <form onChange={handleChange} onSubmit={handleSubmit}>
                <label>email</label>
                <input name="email" type="text" />
                <label>password</label>
                <input name="password" type="password" />
                <button>login</button>
            </form>

            <p>{error}</p>
        </section>
    )
}