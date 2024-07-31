'use client';

import React from 'react';
import BusinessPlanCard from '@/components/admin/BusinessPlanCard';
import Button from '../Button';

const plans = [
  {
    title: 'Basic Plan',
    description: 'Ideal for small businesses.',
    features: [
      'Access to basic features',
      '10 product listings',
      'Basic support',
    ],
    price: 500,
  },
  {
    title: 'Standard Plan',
    description: 'Perfect for growing businesses.',
    features: [
      'Access to standard features',
      '50 product listings',
      'Priority support',
    ],
    price: 1000,
  },
  {
    title: 'Premium Plan',
    description: 'Best for established businesses.',
    features: [
      'Access to all features',
      'Unlimited product listings',
      'Dedicated support',
    ],
    price: 2000,
  },
];

const handleEdit = (title: string) => {
  console.log(`Edit ${title}`);
};

const handleDelete = (title: string) => {
  console.log(`Delete ${title}`);
};

const BusinessPlans: React.FC = () => {
  return (
    <section className='max-container padding-container flex flex-col gap-20 md:gap-28 xl:flex-row mt-48 mb-48'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {plans.map((plan) => (
            <BusinessPlanCard
                key={plan.title}
                title={plan.title}
                description={plan.description}
                features={plan.features}
                price={plan.price}
            />
            ))}
        </div>
      <div className='relative z-20 flex flex-1 flex-col xl:w-1/2'>
        <h1 className='bold-40 lg:bold-52'>Join as a Business</h1>
        <p className='regular-16 mt-6 text-gray-30 xl:max-w-[520px]'>
          Explore our business plans and choose the one that suits your needs. Join our platform and grow your business with us!
        </p>
        <div className='flex flex-col w-full gap-3 sm:flex-row mt-8'>
          <Button
            type="button"
            title="Register Now"
            link='/api/register'
            variant="btn_green"
          />
        </div>
      </div>
    </section>
  );
};

export default BusinessPlans;
