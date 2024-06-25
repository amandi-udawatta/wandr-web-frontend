'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from '../../../components/Button';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // Add your login logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen items-center justify-center mb-10">
            <div className="flex flex-row w-full max-w-6xl bg-white md:shadow-xl rounded-3xl overflow-hidden">
                <div className="w-1/2 h-full hidden md:flex">
                    <Image
                        src="/loginPage.png"
                        alt="Sri Lankan Culture"
                        width={500}
                        height={500}
                        className="rounded-l-3xl object-cover"
                    />
                </div>
                <div className="md:w-1/2 w-full p-8 flex items-start justify-start mt-5">
                    <div className="w-full max-w-md ">
                        <h1 className="text-3xl font-bold text-green-50 h-full mb-5">Welcome Back to Wandr.</h1>
                        <p className="text-gray-700 text-sm mt-2 mb-24">
                            Please enter your email and password to log in.
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="email">
                                    Email Address:
                                </label>
                                <input
                                    className="appearance-none border border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder='Enter your Email Address'
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="password">
                                    Password:
                                </label>
                                <input
                                    className="appearance-none border  border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder='Enter your Password'
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flexCenter w-1/2 mt-5">
                                    <Button
                                        type="button"
                                        title="Login"
                                        variant="btn_green"
                                        full
                                        height='h-btn-md'
                                        rounded='rounded-lg'
                                    />
                                </div>
                            </div>
                            <p className="mt-20 text-gray-500 text-sm">
                                Do not have an account? <a className="font-bold text-green-50 hover:text-green-800" href="/api/register">Register</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
