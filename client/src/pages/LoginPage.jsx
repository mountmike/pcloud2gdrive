import { useState } from "react"

export default function LoginPage({ onLogin }) {
    const [formData, setFormData] = useState({ username: null, password: null })
    const [error, setError] = useState("")

    const handleSubmit = e => {
        e.preventDefault()

        if (formData.username && formData.password) {
            onLogin(formData)
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
                <label>username</label>
                <input name="username" type="text" />
                <label>password</label>
                <input name="password" type="password" />
                <button>login</button>
            </form>

            <p>{error}</p>
        </section>
    )
}