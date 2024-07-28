import Image from 'next/image'
import React from 'react'
import Button from '../Button'
import { Col, Row } from 'antd'

export const BusinessHero = () => {
  return (
    <section className='max-container padding-container flex flex-col gap-16 md:gap-24 lg:pt-16 lg:pb-28 xl:flex-row mt-8'>
      <div className='relative flex-1 flex flex-col justify-center xl:w-1/2'>
        <h1 className='bold-40 lg:bold-52'>Join Our Platform and Grow Your Business</h1>
        <p className='regular-16 mt-6 text-gray-30 xl:max-w-[520px]'>
          Unlock new opportunities by joining our community. Access tailored plans, exclusive tools, and a supportive network to elevate your business. Start your journey with us today!
        </p>
        <div className='flex flex-col w-full gap-3 sm:flex-row mt-8'>
          <Button 
            type="button" 
            title="Join Now" 
            link='/api/register'
            variant="btn_green"
          />
          <Button 
            type="button" 
            title="Explore" 
            variant="btn_white_text"
            icon= "/play.svg" 
          />
        </div>
      </div>

      <div className='relative hidden lg:flex flex-1 justify-center items-start mt-[-20px]'>
        <Row className=''>
            <Col className='absolute left-[20px] top-[-20px] border-2 border-green-50 rounded-full'>
                <img
                    src="/businessImage3.jpg"
                    alt="Young Wanderer"
                    className="rounded-full w-[250px] h-[250px] m-2">
                </img>
            </Col>
            <Col className='absolute left-[220px] top-[-40px]'>
                <img
                    src="/chat1.png"
                    alt="Young Wanderer"
                    className="w-[350px] h-[70px] m-4">
                </img>
            </Col>
            <Col className='absolute top-[120px] border-2 border-green-50 rounded-full'>
                <img
                    src="/businessImage2.jpg"
                    alt="Young Wanderer"
                    className="rounded-full w-[250px] h-[250px] m-2">
                </img>
            </Col>
            <Col className='absolute left-[-30px] top-[300px]'>
                <img
                    src="/chat2.png"
                    alt="Young Wanderer"
                    className="w-[350px] h-[70px] m-4">
                </img>
            </Col>
        </Row>
        
       
      </div>
    </section>
  )
}

export default BusinessHero;
