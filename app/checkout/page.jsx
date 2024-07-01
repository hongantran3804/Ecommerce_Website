import Address from '@components/Address'
import CheckoutNav from '@components/CheckoutNav'
import React from 'react'

const page = () => {
  return (
    <div>
      <CheckoutNav page={0} />
      <Address/>
    </div>
  )
}

export default page