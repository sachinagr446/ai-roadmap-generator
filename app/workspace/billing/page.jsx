import { PricingTable } from '@clerk/nextjs'
import React from 'react'

function Billing() {
  return (
    <div>
        <h2 className='font-bold text-xl mb-4'>Select Plan</h2>
        <PricingTable/>
    </div>
  )
}

export default Billing