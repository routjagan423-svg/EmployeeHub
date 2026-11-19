
import { useState } from 'react'
import './Auth.css'

function Auth({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [message, setMessage] = useState('')

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setMessage('')

        const url = isLogin
            ? 'http://localhost:8080/api/auth/login'
            : 'http://localhost:8080/api/auth/register'

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) {
                setMessage(data.message || 'Something went wrong')
                return
            }

            if (isLogin) {
                localStorage.setItem("token", data.token);
                onLogin();
            } else {
                setMessage('Registration successful! Please login.')
                setIsLogin(true)
                setFormData({
                    name: '',
                    email: formData.email,
                    password: '',
                })
            }
        } catch (error) {
            console.error(error)
            setMessage('Cannot connect to backend')
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>EmployeeHub</h1>

                <h2>{isLogin ? 'Login' : 'Create Account'}</h2>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>

                <p>{message}</p>

                <p>
                    {isLogin
                        ? "Don't have an account?"
                        : 'Already have an account?'}
                    <button
                        type="button"
                        onClick={() => {
                            setIsLogin(!isLogin)
                            setMessage('')
                        }}
                    >
                        {isLogin ? 'Register' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    )
}

export default Auth
