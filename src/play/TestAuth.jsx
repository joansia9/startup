import React, { useState } from 'react';

export default function TestAuth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateUser = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/auth/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            setMessage(`Create User Response: ${JSON.stringify(data)}`);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            setMessage(`Login Response: ${JSON.stringify(data)}`);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Test Authentication</h2>
            <div className="space-y-4">
                <div>
                    <label className="block mb-2">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 rounded"
                        placeholder="Enter email"
                    />
                </div>
                <div>
                    <label className="block mb-2">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 rounded"
                        placeholder="Enter password"
                    />
                </div>
                <div className="space-x-4">
                    <button
                        onClick={handleCreateUser}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Create User
                    </button>
                    <button
                        onClick={handleLogin}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Login
                    </button>
                </div>
                {message && (
                    <div className="mt-4 p-4 bg-gray-100 rounded">
                        <pre>{message}</pre>
                    </div>
                )}
            </div>
        </div>
    );
} 