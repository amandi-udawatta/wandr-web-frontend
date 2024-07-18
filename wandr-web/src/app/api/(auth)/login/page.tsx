'use client';

import React from 'react';
import { useState } from 'react';
import Image from 'next/image';

import Button from '@/components/general/Button';
import Navbar from '@/components/general/Navbar';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/validations/loginSchema';

import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

import { apiService, showNotification } from '@/services/apiService';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const hashedPassword = CryptoJS.SHA256(data.password).toString(CryptoJS.enc.Hex);

      const response = await apiService.post('http://localhost:8081/api/proxy/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: 'BUSINESS',
          email: data.email,
          password: hashedPassword,
        }),
      });

      console.log('Login response:', response);

      const responseData = await response.json();

      if (!response.ok) {
        showNotification('error', 'Error', responseData.message || 'An error occurred');
        throw new Error('Failed to login');
      }

      showNotification('success', 'Login Status', responseData.message || 'Successfully Logged In');

      console.log('Login successful:', responseData.message);
      console.log('Access Token:', responseData.data.accessToken);
      console.log('Refresh Token:', responseData.data.refreshToken);

      Cookies.set('accessToken', responseData.data.accessToken, { expires: 1 }); // expires in 1 day
      Cookies.set('refreshToken', responseData.data.refreshToken, { expires: 7 }); // expires in 7 days

      // Handle storing tokens or redirecting to authenticated area
    } catch (error) {
      showNotification('error', 'Login Status', 'Failed to login. Please check your credentials.');
      setError('Failed to login. Please check your credentials.');
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="flex flex-col md:flex-row h-screen items-center justify-center mb-10 mt-[-60px]">
        <div className="flex flex-row w-full max-w-4xl bg-white custom-shadow rounded-3xl overflow-hidden">
          <div className="w-1/2 h-auto hidden md:flex">
            <Image
              src="/loginPage.png"
              alt="Sri Lankan Culture"
              width={700}
              height={700}
              className="rounded-l-3xl object-cover"
            />
          </div>
          <div className="md:w-1/2 w-full p-8 flex items-start justify-start">
            <div className="w-full max-w-md">
              <h1 className="text-3xl font-bold text-green-50 h-full mb-3 mt-3">Welcome Back to Wandr.</h1>
              <p className="text-gray-700 text-sm mt-2 mb-14">
                Please enter your email and password to log in.
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="email">
                    Email Address:
                  </label>
                  <input
                    className="appearance-none border border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Enter your Email Address"
                    {...register('email')}
                  />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="password">
                    Password:
                  </label>
                  <input
                    className="appearance-none border border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Enter your Password"
                    {...register('password')}
                  />
                  {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-1/2">
                    <Button
                      type="submit"
                      title="Login"
                      variant="btn_green"
                      height="h-btn-md"
                      rounded="rounded-lg"
                      onClick={handleSubmit(onSubmit)}
                    />
                  </div>
                </div>
                <p className="mt-20 text-gray-500 text-sm flexCenter">
                  Do not have an account? <a className="font-bold text-green-50 hover:text-green-800" href="/api/register"> &nbsp; Register</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
