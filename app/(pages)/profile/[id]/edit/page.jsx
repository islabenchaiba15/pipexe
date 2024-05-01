import { ProfileForm } from '@/components/Form'
import Image from 'next/image'
import React from 'react'

function page() {
  return (
    <div className=' mx-2 md:mx-24 my-8 flex flex-col '>
      <div className="flex flex-row items-center gap-5 my-10 ">
        <Image src={'/back.png'} alt='' height={50} width={50}/>
        <h1 className='text-4xl text-black font-bold'>Edit Profile</h1>
      </div>
      <div className="flex flex-col gap-3 border-2 rounded-xl px-6 mx-6 my-7 ">
        <ProfileForm/>
      </div>
    </div>
  )
}

export default page