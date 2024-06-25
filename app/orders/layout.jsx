import SearchOrderBar from '@components/SearchOrderBar';
import React from 'react'

const layout = ({children}) => {
  return (
    <div className='flex flex-col gap-3'>
      <div>
        <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
          Your Orders
        </h1>
      </div>
      <SearchOrderBar />
      {children}
    </div>
  );
}

export default layout