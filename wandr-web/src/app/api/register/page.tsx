'use client';

import React, { useState } from 'react';
import { registerSchema } from '@/validations/registerSchema';
import Image from 'next/image'
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@/components/Button';
import {MinusCircleOutlined, PlusCircleOutlined} from '@ant-design/icons';
import { Space } from 'antd';


interface RegisterFormInputs {
    businessName: string;
    businessImage: string;
    businessContact: string;
    businessDescription: string;
    ownerName: string;
    ownerContact: string;
    ownerNIC: string;
    businessLocation: string;
    businessAddress: string; // Array of strings for dynamic textboxes
    businessLanguages: string[]; // Array of strings for checkboxes
    businessCategory: string;
    businessServices: { service: string }[];
    websiteURL: string;
    password:string;
    confirmPassword:string;
  }
  
const RegisterPage: React.FC = () => {

    const [step, setStep] = useState(1);

    const {
        register,
        trigger,
        handleSubmit,
        formState: { errors },
        control,
        watch,
        setValue,
    } = useForm<RegisterFormInputs>({resolver: yupResolver(registerSchema),});

    // UseFieldArray for handling dynamic array of inputs
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'businessServices',
    });

    const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
        console.log('Business Name:', data.businessName);
        console.log('Business Image:', data.businessImage);
        console.log('Business Contact:', data.businessContact);
        console.log('Business Languages:', data.businessLanguages);
        console.log('Business Category:', data.businessCategory);
        console.log('Business Services:', data.businessServices);
        console.log('Business Password:', data.password);
        console.log('Owner NIC:', data.ownerNIC);
    };

    // const { trigger } = useForm<RegisterFormInputs>();

    const handleStep1 = async () => {
        const isValid = await trigger(["businessName" , "businessContact", "businessImage", "businessDescription"]); // Trigger validation before proceeding
        if (isValid) {
            handleNextStep();
        }
    };

    const handleStep2 = async () => {
        const isValid = await trigger(["ownerName" , "ownerContact", "ownerNIC"]); // Trigger validation before proceeding
        if (isValid) {
            handleNextStep();
        }
    };

    const handleStep3 = async () => {
        const isValid = await trigger(["businessLocation" , "businessAddress", "businessLanguages", "businessCategory", "websiteURL"]); // Trigger validation before proceeding
        if (isValid) {
            handleNextStep();
        }
    };

    const handleStep4 = async () => {
        const isValid = await trigger(["businessServices"]); // Trigger validation before proceeding
        if (isValid) {
            handleNextStep();
        }
    };

    const handleNextStep = () => {
        setStep(step + 1);
    }

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen items-center justify-center">
            <div className="flex flex-row w-full max-w-5xl bg-white custom-shadow rounded-3xl overflow-hidden">
                <div className="w-1/2 hidden md:flex">
                    <Image
                    src="/registerPage.png"
                    alt="Sri Lankan Culture"
                    width={700}
                    height={700}
                    className="rounded-l-3xl object-cover"
                    />
                </div>
                <div className="md:w-1/2 w-full p-8 flex flex-col items-start justify-start h-full">
                    <div className="w-full max-w-md">
                        <h1 className="text-3xl font-bold text-green-50 mb-3 mt-3">Let's Get Started!</h1>
                        <p className="text-gray-700 text-sm mt-2 mb-14">
                            Please enter your business details to register.
                        </p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {step === 1 && (
                                <div>
                                    <h3 className="text-xl font-bold mb-4 text-green-90">General Information</h3>
                                    <div className="mb-4">
                                        <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="businessName">
                                            Business Name:
                                        </label>
                                        <input
                                            className="appearance-none border border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="businessName"
                                            type="text"
                                            placeholder='Enter your Business Name'
                                            {...register('businessName')}
                                        />
                                        {errors.businessName && <p className="text-red-500 text-xs">{errors.businessName.message}</p>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="businessContact">
                                            Business Contact Number:
                                        </label>
                                        <input
                                            className="appearance-none border border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="businessContact"
                                            type="text"
                                            placeholder='Enter your Business Contact Number'
                                            {...register('businessContact')}
                                        />
                                        {errors.businessContact && <p className="text-red-500 text-xs">{errors.businessContact.message}</p>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="businessImage">
                                            Business Image/Logo:
                                        </label>
                                        <input
                                            className="appearance-none border border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="businessImage"
                                            type="text"
                                            placeholder='Attach your business image/logo'
                                            {...register('businessImage')}
                                        />
                                        {errors.businessImage && <p className="text-red-500 text-xs">{errors.businessImage.message}</p>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="businessDescription">
                                            Business Description:
                                        </label>
                                        <textarea
                                            className="appearance-none border border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="businessDescription"
                                            placeholder='Enter your business description'
                                            {...register('businessDescription')}
                                        />
                                        {errors.businessDescription && <p className="text-red-500 text-xs">{errors.businessDescription.message}</p>}
                                    </div>
                                    {/* <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleNextStep}>
                                        Next
                                    </button> */}
                                    <div className="flex items-center justify-between">
                                        <div className="flexStart w-1/2">
                                            <Button
                                                type="submit"
                                                title="Next"
                                                variant="btn_green"
                                                height="h-btn-sm"
                                                rounded="rounded-lg"
                                                onClick= {handleStep1}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {step === 2 && (
                                <div>
                                <h3 className="text-xl font-bold mb-4 text-green-90">Owner Information</h3>
                                <div className="mb-4">
                                    <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="ownerName">
                                        Owner Name:
                                    </label>
                                    <input
                                        className="appearance-none border border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="ownerName"
                                        type="text"
                                        placeholder="Enter Business Owner's Name"
                                        {...register('ownerName')}
                                    />
                                    {errors.ownerName && <p className="text-red-500 text-xs">{errors.ownerName.message}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="ownerContact">
                                        Owner's Contact Number:
                                    </label>
                                    <input
                                        className="appearance-none border border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="ownerContact"
                                        type="text"
                                        placeholder="Enter Business Owner's Contact Number"
                                        {...register('ownerContact')}
                                    />
                                    {errors.ownerContact && <p className="text-red-500 text-xs">{errors.ownerContact.message}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="ownerNIC">
                                        Owner's NIC Number:
                                    </label>
                                    <input
                                        className="appearance-none border border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="ownerNIC"
                                        type="text"
                                        placeholder="Enter Business Owner's NIC Number"
                                        {...register('ownerNIC')}
                                    />
                                    {errors.ownerNIC && <p className="text-red-500 text-xs">{errors.ownerNIC.message}</p>}
                                </div>
                                <div className='flex flex-row justify-start'>
                                    <div className="flex items-center justify-between mr-3">
                                        <div className="flexStart w-1/2">
                                            <Button
                                                type="submit"
                                                title="Previous"
                                                variant="btn_white_border"
                                                height="h-btn-sm"
                                                rounded="rounded-lg"
                                                onClick={handlePreviousStep}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flexStart w-1/2">
                                            <Button
                                                type="submit"
                                                title="Next"
                                                variant="btn_green"
                                                height="h-btn-sm"
                                                rounded="rounded-lg"
                                                onClick={handleStep2}
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            )}
                            {step === 3 && (
                                <div>
                                <h3 className="text-xl font-bold mb-4 text-green-90">Business Information</h3>
                                <div className="mb-4">
                                    <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="businessLocation">
                                        Business Location:
                                    </label>
                                    <input
                                        className="appearance-none border border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="businessLocation"
                                        type="text"
                                        placeholder="Enter Business Location"
                                        {...register('businessLocation')}
                                    />
                                    {errors.businessLocation && <p className="text-red-500 text-xs">{errors.businessLocation.message}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="businessAddress">
                                        Business Address:
                                    </label>
                                    <textarea
                                        className="appearance-none border border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="businessAddress"
                                        placeholder="Enter Business Address"
                                        {...register('businessAddress')}
                                    />
                                    {errors.businessAddress && <p className="text-red-500 text-xs">{errors.businessAddress.message}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="businessLanguages">
                                        Business Languages:
                                    </label>
                                    <div className="flex gap-3">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                value="English"
                                                {...register('businessLanguages')}
                                                className="checked:bg-green-50 border-green-50 text-gray-700 w-5 h-5 "
                                            />
                                            <span className="ml-2 text-gray-700">English</span>
                                        </label>
                                        
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                value="Sinhala"
                                                {...register('businessLanguages')}
                                                className="border-green-50 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-5 h-5"
                                            />
                                            <span className="ml-2 text-gray-700">Sinhala</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                value="Tamil"
                                                {...register('businessLanguages')}
                                                className="border-green-50 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-5 h-5"
                                            />
                                            <span className="ml-2 text-gray-700">Tamil</span>
                                        </label>
                                    </div>
                                    {errors.businessLanguages && <p className="text-red-500 text-xs">{errors.businessLanguages.message}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="businessCategory">
                                        Business Category:
                                    </label>
                                    <div className="flex gap-3">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                value="Shop"
                                                {...register('businessCategory')}
                                                className=" border-green-50 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-5 h-5"
                                            />
                                            <span className="ml-2 text-gray-700">Shop</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                value="Service Provider"
                                                {...register('businessCategory')}
                                                className=" border-green-50 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-5 h-5"
                                            />
                                            <span className="ml-2 text-gray-700">Service Provider</span>
                                        </label>
                                    </div>
                                    {errors.businessCategory && <p className="text-red-500 text-xs">{errors.businessCategory.message}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="websiteURL">
                                        Business Website URL:
                                    </label>
                                    <input
                                        className="appearance-none border border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="websiteURL"
                                        type="text"
                                        placeholder="Enter Business website URL (Optional) "
                                        {...register('websiteURL')}
                                    />
                                    {errors.websiteURL && <p className="text-red-500 text-xs">{errors.websiteURL.message}</p>}
                                </div>
                                <div className='flex flex-row justify-start'>
                                    <div className="flex items-center justify-between mr-3">
                                        <div className="flexStart w-1/2">
                                            <Button
                                                type="submit"
                                                title="Previous"
                                                variant="btn_white_border"
                                                height="h-btn-sm"
                                                rounded="rounded-lg"
                                                onClick={handlePreviousStep}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flexStart w-1/2">
                                            <Button
                                                type="submit"
                                                title="Next"
                                                variant="btn_green"
                                                height="h-btn-sm"
                                                rounded="rounded-lg"
                                                onClick={handleStep3}
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            )}

                            {step === 4 && (
                                <div>
                                <h3 className="text-xl font-bold mb-4 text-green-90">Service Information</h3>
                                <div className="mb-4">
                                    <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="businessServices">
                                        Business Services:
                                    </label>
                                    <div className="flex flex-col space-y-4">
                                    {fields.map((item, index) => (
                                        <div key={item.id} className="flex items-center">
                                            <input
                                                type="text"
                                                className="appearance-none border border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                placeholder={`Enter Business Service ${index + 1}`}
                                                {...register(`businessServices.${index}.service` as const)}
                                            />
                                            {index > 0 && (
                                                <div className="flex items-center justify-between mr-3">
                                                    <div className="flexStart w-1/2 ">
                                                    <Space className='mx-3 text-red-600 text-lg'>
                                                        <MinusCircleOutlined />
                                                    </Space>
                                                        <Button
                                                            type="submit"
                                                            title="Remove"
                                                            variant="btn_red_text "
                                                            height="h-btn-sm"
                                                            rounded="rounded-lg"
                                                            alignment='flexStart'
                                                            onClick={( ) => remove(index)}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    </div>
                                    {errors.businessServices && (
                                        <p className="text-red-500 text-xs">{errors.businessServices.message}</p>
                                    )}
                                    <div className="flex flexStart mt-5 ">
                                        <div className="flexStart w-1/2">
                                            <Space className='mr-3 text-green-50 text-lg'>
                                                <PlusCircleOutlined />
                                            </Space>
                                            <Button
                                                type="submit"
                                                title="Add Service"
                                                variant="btn_text"
                                                height="h-btn-sm"
                                                rounded="rounded-lg"
                                                alignment = "flex justify-center items-center text-start"
                                                onClick={() => append({ service: '' })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-row justify-start'>
                                    <div className="flex items-center justify-between mr-3">
                                        <div className="flexStart w-1/2">
                                            <Button
                                                type="submit"
                                                title="Previous"
                                                variant="btn_white_border"
                                                height="h-btn-sm"
                                                rounded="rounded-lg"
                                                onClick={handlePreviousStep}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flexStart w-1/2">
                                            <Button
                                                type="submit"
                                                title="Next"
                                                variant="btn_green"
                                                height="h-btn-sm"
                                                rounded="rounded-lg"
                                                onClick={handleStep4}
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            )}
                            {step === 5 && (
                                <div>
                                <h3 className="text-xl font-bold mb-4 text-green-90">Login Information</h3>
                                <div className="mb-4">
                                    <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="password">
                                        Password:
                                    </label>
                                    <input
                                        className="appearance-none border border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="text"
                                        placeholder="Enter Password"
                                        {...register('password')}
                                    />
                                    {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-green-90 text-sm font-bold mb-2 " htmlFor='confirmPassword'>
                                        Confirm Password:
                                    </label>
                                    <input
                                        className="appearance-none border border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="text"
                                        placeholder="Enter Password Again"
                                        {...register('confirmPassword')}
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
                                    )}
                                </div>
                                <div className='flex flex-row justify-start'>
                                    <div className="flex items-center justify-between mr-3">
                                        <div className="flexStart w-1/2">
                                            <Button
                                                type="submit"
                                                title="Previous"
                                                variant="btn_white_border"
                                                height="h-btn-sm"
                                                rounded="rounded-lg"
                                                onClick={handlePreviousStep}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flexStart w-1/2">
                                            <Button
                                                type="submit"
                                                title="Register"
                                                variant="btn_green"
                                                height="h-btn-sm"
                                                rounded="rounded-lg"
                                                onClick={handleSubmit(onSubmit)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            )}
                        </form>
                        {/* <p className="mt-20 text-gray-500 text-sm text-center">
                            Already have an account? <a className="font-bold text-green-50 hover:text-green-800" href="/api/login"> &nbsp; Login</a>
                        </p> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

