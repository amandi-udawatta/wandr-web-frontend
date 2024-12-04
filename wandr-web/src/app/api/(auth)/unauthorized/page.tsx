'use client'
import React from 'react';
import { Button, Col, Row } from 'antd';
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
            <div className="flex flex-col w-full bg-white overflow-hidden mt-32">
                {/* Left Image Section */}
                {/* <div className="w-1/3 ">
                    <img
                        src="/unauthorized.png" // Replace with your image path
                        alt="Unauthorized Access"
                        className="w-full h-auto"
                    />
                </div> */}

                {/* Right Text Section */}
                <div className="flex flex-col justify-center items-start ml-96 mt-[-10px] ">
                    <h1 className='text-7xl mb-4 font-black'>UNAUTHORIZED!!</h1>
                    <h1 className="text-4xl font-bold mb-4 text-red-600">You have no access to this page</h1>
                    <p className="text-lg mb-6 text-gray-700">
                       Please login again.
                    </p>
                    <Button type="primary" size="large" onClick={handleLoginRedirect} className='bg-green-50'>
                        Login
                    </Button>
                </div>

                {/* <div className='w-1/3'>
                    <img
                        src="/unauthorizedFlipped.png" // Replace with your image path
                        alt="Unauthorized Access"
                        className="w-full h-auto"
                    />
                </div> */}
            {/* <Row className='flex flex-row justify-center border border-red-500'>
                <Col>
                    <h1 className='text-center text-4xl font-bold'>Unauthorized Access</h1>
                    <Button type="primary" size="large" onClick={handleLoginRedirect} className='bg-green-50'>
                            Login
                    </Button>
                </Col>
            </Row> */}

                

            </div>
        </div>
    </div>
    
  );
};

export default Unauthorized;
