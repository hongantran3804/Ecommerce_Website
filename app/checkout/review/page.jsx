import CheckoutNav from '@components/CheckoutNav';
import ReviewCheckout from '@components/ReviewCheckout'
import React from 'react'

const page = () => {
  return (
    <div>
      <CheckoutNav page = {2}/>
      <ReviewCheckout />
    </div>
  );
}

export default page