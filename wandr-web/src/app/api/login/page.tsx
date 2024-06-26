'use client';

import React from 'react';
import Image from 'next/image';
import Button from '../../../components/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/validations/loginSchema';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  // Initialize useForm with validation schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log('Email:', data.email);
    console.log('Password:', data.password);
  };

  return (
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
                <div className="flexCenter w-1/2">
                  <Button
                    type="submit"
                    title="Login"
                    variant="btn_green"
                    full
                    height="h-btn-md"
                    rounded="rounded-lg"
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
  );
};

export default LoginPage;
