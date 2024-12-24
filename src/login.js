// src/components/LoginForm.js
import React, { useState } from 'react';
import loginImage from './images/login.jpeg';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Fungsi untuk menangani login
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Kirim permintaan login ke API
            const response = await axios.post('http://localhost:8000/api/login', {
                username,
                password,
            });

            // Ambil access_token dan role dari response
            const { access_token, role } = response.data;

            // Simpan token dan role di localStorage
            localStorage.setItem('token', access_token);
            localStorage.setItem('role', role);

            // Redirect berdasarkan role
            if (role === 'admin') {
                window.location.href = '/dashboardAdmin';
            } else {
                window.location.href = '/dashboardMahasiswa';
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError("Invalid username or password");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-gray-900 bg-opacity-75" style={{ backgroundImage: "url('images/v1_4.png')" }}>
            <div className="bg-white rounded-2xl shadow-lg flex w-[1000px] h-[500px] overflow-hidden">
                <div
                    className="w-1/2 bg-cover bg-center"
                    style={{ backgroundImage: `url(${loginImage})` }}
                ></div>

                <div className="w-1/2 p-10 flex flex-col justify-center">
                    <a href="/" className="mb-10 ml-[25rem] inline-flex items-center text-teal-600 hover:text-teal-500 transition duration-300">
                        <span className="material-icons text-4xl">close</span>
                    </a>
                    <h2 className="text-4xl font-bold mb-12 text-gray-800">Login</h2>
                    <form onSubmit={handleSubmit} className="space-y-6 mb-20">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                NIM
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm mb-4">{error}</div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-500 transition duration-300"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
