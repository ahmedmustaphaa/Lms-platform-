import React from 'react'
import { assets } from '../../assets/assets';
function Campanies() {
  return (
    <div  className='pt-16'>
    <p className='text-base text-gray-500 text-center'>Trusted by learners from</p>

    <div className='flex flex-wrap items-center justify-center gap-6 md:gap-16 md:mt-10 mt-5'>
    <img src={assets.microsoft_logo} alt='microsoft' className='w-20 md-28'></img>
    <img src={assets.walmart_logo} alt='walmart' className='w-20 md-28'></img>
    <img src={assets.accenture_logo} alt='accenture' className='w-20 md-28'></img>
    <img src={assets.adobe_logo} alt='adobe' className='w-20 md-28'></img>
    <img src={assets.paypal_logo} alt='paypal' className='w-20 md-28'></img>
    </div>
    </div>
  )
}

export default Campanies