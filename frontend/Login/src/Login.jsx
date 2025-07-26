import { useState } from "react";

import { useNavigate } from "react-router-dom"; 
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginLogo from './Login.jpg';

function Login() {
    const [username, SetUsername] = useState('');
    const [password, SetPassword] = useState('');
    const navigate = useNavigate();  // Correct use of useNavigate here
    const [showPassword, setShowPassword] = useState(false);  // State to toggle password visibility

    console.log(username, 'username');
    console.log(password, 'password');

    const handleSubmit = async (event) => {
        event.preventDefault();  // Prevent form submission default behavior

        if (username === '' || password === '') {
            alert('Please fill in both fields');
            return;
        }

        // Perform login action (send data to server)
        const response = await fetch("http://localhost:7000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            console.error("Failed to login", response.statusText);
            return;
        }

        const data = await response.json();

        if (data.token) {
            navigate('/products');  // Navigate to '/products' after successful login
        } else {
            navigate('/register');  // Navigate to '/register' if login fails
        }

        console.log("login successfully", data);
    };

    const handleUserName = (e) => {
        SetUsername(e.target.value);  // Update username state on input change
    };

    return (
        <div className="container-fluid vh-100 d-flex">
            <div className="col-md-6 d-flex align-items-center justify-content-center bg-primary text-white">
                <img  alt="image loading.." className="image" src={loginLogo} style={{ width: "100%", height: "auto", objectFit: "contain" }} />
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
                <div className="login-right-container">
                    <div className="login-center">
                        <h2>Welcome back!</h2>
                        <p>Please enter your details.</p>
                        <form onSubmit={handleSubmit}>  {/* Use onSubmit here to trigger handleSubmit */}
                            
                                
                                <input
                                    type="text"
                                    name="img"
                                    id="user"
                                    placeholder="Enter the Username"
                                    onChange={handleUserName}  // Correct event handler for username
                                />
                               
                                <div className="pass-input-div">
                                    <input type={showPassword ? "text" : "password"} placeholder="Password"
                                        name="password"
                                        id="password"
                                        onChange={(e) => SetPassword(e.target.value)} />
                                    {showPassword ? <FaEyeSlash onClick={() => { setShowPassword(!showPassword) }} /> : <FaEye onClick={() => { setShowPassword(!showPassword) }} />}

                                </div>

                                <div className="login-center-buttons">
                                    <button type="submit" className="btn btn-primary rounded-pill">Log In</button>                              
                                </div>
                                <br /><br />
                                <p className="login-bottom-p">Don't have an account? <a href="http://localhost:5173/register">Sign Up</a></p>
                            
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;



