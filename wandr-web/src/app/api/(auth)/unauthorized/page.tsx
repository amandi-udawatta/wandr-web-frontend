'use client'
import React from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/general/Navbar';

const Unauthorized: React.FC = () => {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/api/login'); // Adjust to your login route
  };

  return (
    <div>
        <Navbar/>
        <div className="flex flex-col md:flex-row h-screen items-center justify-center mb-10 mt-[-60px]">
            <div className="flex flex-row w-full bg-white overflow-hidden mt-32">
                {/* Left Image Section */}
                <div className="w-1/3 ">
                    <img
                        src="/unauthorized.png" // Replace with your image path
                        alt="Unauthorized Access"
                        className="w-full h-auto"
                    />
                </div>

                {/* Right Text Section */}
                <div className="w-1/3 flex flex-col justify-center items-start  ">
                    <h1 className='text-7xl mb-4 font-black'>UNAUTHORIZED!!</h1>
                    <h1 className="text-4xl font-bold mb-4 text-red-600">Monada Heuve?</h1>
                    <p className="text-lg mb-6 text-gray-700">
                        YANNA BAHA.
                    </p>
                    <Button type="primary" size="large" onClick={handleLoginRedirect} className='bg-green-50'>
                        Sandeepa Palayan Ahakata 
                    </Button>
                </div>

                <div className='w-1/3'>
                    <img
                        src="/unauthorizedFlipped.png" // Replace with your image path
                        alt="Unauthorized Access"
                        className="w-full h-auto"
                    />
                </div>
            </div>
        </div>
    </div>
    
  );
};

export default Unauthorized;
