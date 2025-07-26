import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { FaEye, FaEyeSlash } from "react-icons/fa";

import registerLogo from './registerLogo.jpg';


function Register() {

    const [username, SetUsername] = useState('');
    const [password, SetPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    console.log(password, 'password');
    
    function HandleEmail(e) {
        SetUsername(e.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
    
        // Perform validation
        if (username === '' || password === '') {
            alert('Please fill in both fields');
            return;
        }
    
        console.log("Submitting:", { username, password });
    
        try {
            // Perform registration action (e.g., send data to server)
            const response = await fetch("http://localhost:7000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
    
            if (!response.ok) {
                console.error("Failed to register", response.statusText);
                alert("Registration failed. Please try again.");
                return;
            }
    
            const data = await response.json();
            console.log("Registered successfully", data);
            alert("Registration successful!");
    
        } catch (error) {
            console.error("Error connecting to the server:", error);
            alert("Error connecting to the server. Please try again later.");
        }
    };
    return (
            <div className="container-fluid vh-100 d-flex">
                <div className="col-md-6 d-flex align-items-center justify-content-center bg-primary text-white">
                    <img alt="image loading.." className="image" src={registerLogo} style={{ width: "100%", height: "auto", objectFit: "contain" }} />
                </div>
                <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
                    <div className="login-right-container">
                        <div className="login-center">
                            <h2>Hello..!</h2>
                            <p>Please enter your details.</p>
                            <form onSubmit={handleSubmit}>  {/* Use onSubmit here to trigger handleSubmit */}
                                
                                    
                                    <input
                                        type="text"
                                        name="img"
                                        id="user"
                                        placeholder="Enter the Username"
                                        onChange={HandleEmail}  // Correct event handler for username
                                    />
                                   
                                    <div className="pass-input-div">
                                        <input type={showPassword ? "text" : "password"} placeholder="Password"
                                            name="password"
                                            id="password"
                                            onChange={(e) => SetPassword(e.target.value)} />
                                        {showPassword ? <FaEyeSlash onClick={() => { setShowPassword(!showPassword) }} /> : <FaEye onClick={() => { setShowPassword(!showPassword) }} />}
    
                                    </div>
    
                                    <div className="login-center-buttons">
                                        <button type="submit" className="btn btn-primary rounded-pill">Register</button>                              
                                    </div>
                                    <br /><br />
                                    <p className="login-bottom-p">Already Have an Account <a href="http://localhost:5173/">Log In</a></p>
                                
                            </form>
                        </div>
                    </div>
    
                </div>
            </div>
        );
}

export default Register;