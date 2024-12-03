'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BusinessHeader from '@/components/business/UserHeader';
import BusinessSideBar from '@/components/business/UserSidebar';
import ProductDetailsCard from '@/components/business/products/ProductDetails'; // Adjust path as needed
import withAuth from '@/services/authenticationService';

const ProductPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="flex h-screen">
      <BusinessSideBar active={'Products'} />
      <div className="flex-1 flex flex-col">
        <BusinessHeader page={`Product Details`} />
        <div className="flex-1 overflow-y-auto">
          <ProductDetailsCard productId={Number(id)}/>
        </div>
      </div>
    </div>
  );
};

export default withAuth(ProductPage, 'BUSINESS');
