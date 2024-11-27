import React, { useState } from 'react';
import '../css/RegisterPage.css';

const Register = () => {
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [passwordStrength, setPasswordStrength] = useState('weak');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = e => {
        const password = e.target.value;
        setCredentials({ ...credentials, password });

        // Determine password strength
        if (password.length < 5) {
            setPasswordStrength('weak');
        } else if (password.length >= 5 && password.length <= 8) {
            setPasswordStrength('medium');
        } else {
            setPasswordStrength('strong');
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();

        // Validate password length
        if (credentials.password.length < 5) {
            setErrorMessage('Password must be at least 5 characters');
            return;
        }
        window.location.href = '/About';
        alert('Registration Success');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="rlogin-container">
                <h2 className="rhead">Register</h2>
                <div className="rlogin-box">
                    <div className="bg-#a9d6e5 ">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="rlabelu">Name</label>
                                <input
                                    type="text"
                                    className="ristyle"
                                    value={credentials.name}
                                    onChange={e =>
                                        setCredentials({
                                            ...credentials,
                                            name: e.target.value,
                                        })
                                    }
                                    id="name"
                                    name="name"
                                    aria-describedby="emailHelp"
                                />
                            </div>
                            <div>
                                <label className="rlabelu">Email address</label>
                                <input
                                    type="email"
                                    className="ristyle"
                                    value={credentials.email}
                                    onChange={e =>
                                        setCredentials({
                                            ...credentials,
                                            email: e.target.value,
                                        })
                                    }
                                    id="email"
                                    name="email"
                                    aria-describedby="emailHelp"
                                />
                            </div>
                            <div>
                                <label className="rlabelu">Password</label>
                                <input
                                    type="password"
                                    className="ristyle"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    name="password"
                                    id="password"
                                />
                                <div
                                    className="password-strength-meter"
                                    style={{ display: 'flex' }}
                                >
                                    <p className="my-3">Password Strength:</p>{' '}
                                    <p
                                        className={`text-${passwordStrength} my-3 mx-2`}
                                        style={{
                                            marginTop: '5px',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {passwordStrength.toUpperCase()}
                                    </p>
                                </div>
                            </div>
                            <div className="mb-3 position-relative">
                                <label
                                    htmlFor="confirm_password"
                                    className="rlabelu"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className="ristyle"
                                    value={credentials.confirm_password}
                                    onChange={handleChange}
                                    name="confirm_password"
                                    id="confirm_password"
                                />
                            </div>
                            {errorMessage && (
                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    {errorMessage}
                                </div>
                            )}
                            {successMessage && (
                                <div
                                    className="alert alert-success"
                                    role="alert"
                                >
                                    {successMessage}
                                </div>
                            )}
                            <button type="submit" className="rbtSuccess">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
