import Image from 'next/image'
import React from 'react'
import Button from './Button'
import { PEOPLE_URL } from '@/constants'

export const BlogHero = () => {
  return (
    <section className='max-container padding-container
    flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row mt-5'>
      {/* <div className='hero-map'/> */}
        <div className='relative z-20 flex flex-1 flex-col xl:w-1/2 '>
            <Image
                src = "/activities/activityHotAirBallooning.png"
                alt = "camp"
                width = {100}
                height = {100}
                style={{ width: '85px', height: 'auto' }}
                className='absolute left-[-40px] top-[-35px] lg:w-[50px]'
            />
            <h1 className='bold-40 lg:bold-52'>Discover Stories of the World’s Explorers</h1>
            <p className='regular-16 mt-6 text-gray-30 xl:max-w-[520px]'>
            Join a community of wanderers sharing their adventures. Dive into inspiring travel stories, and start your own journey by posting your experiences. Download our app to get started!
            </p>
            <div className='flex flex-col w-full gap-3 sm:flex-row mt-8'>
                <Button 
                    type = "button" 
                    title = "Download App" 
                    variant = "btn_green"
                />
                <div className='flex items-center gap-4 ml-5'>
                    <div className='flex -space-x-4 overflow-hidden'>
                        {PEOPLE_URL.map((url) => (
                            <Image
                                className='inline-block h-10 w-10 rounded-full'
                                src={url}
                                key={url}
                                alt='person'
                                width={40} // Adjusted to match the h-10 w-10 size
                                height={40} // Adjusted to match the h-10 w-10 size
                            />
                        ))}
                    </div>
                    <p className='font-medium'>60+ people joined</p>
                </div>
            </div>
            
        </div>

        <div className='relative hidden lg:flex flex-1 justify-center items-start mt-[-20px] '>
            <div className="absolute w-3/5 h-[450px] bg-green-35 opacity-40 rounded-t-full"></div>
            <img
                src="/blogHero.jpg"
                alt="Young Wanderer"
                className="h-auto relative z-10 top-[-100px]"
            />
        </div>
        
    </section>
  )
}
