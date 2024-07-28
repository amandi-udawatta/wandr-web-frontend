import Image from 'next/image'
import React from 'react'
import Button from '../Button'
import { Col, Row } from 'antd'

export const BusinessHero = () => {
  return (
    <section className='max-container padding-container flex justify-center align-middle gap-16 md:gap-24 xl:flex-row my-32'>
      <div className='flex-1 flex flex-col justify-center xl:w-1/2'>
        <h1 className='bold-40 lg:bold-52 text-center'>Join Our Platform and Grow Your Business</h1>
        <p className='regular-16 mt-6 text-gray-30 text-center'>
          Unlock new opportunities by joining our community. Access tailored plans, exclusive tools, and a supportive network to elevate your business. Start your journey with us today!
        </p>
        <div className='flex flex-col w-full gap-3 sm:flex-row mt-8 justify-center'>
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
    </section>
  )
}

export default BusinessHero;
