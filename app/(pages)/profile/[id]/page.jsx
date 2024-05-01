import Image from 'next/image'
import React from 'react'

function page() {
  return (
    <div className=' mx-10 md:mx-24 my-8 flex flex-col '>
      <div className="flex flex-row items-center gap-5 my-10 ">
        <Image src={'/back.png'} alt='' height={50} width={50}/>
        <h1 className='text-4xl text-black font-bold'>my Profile</h1>
      </div>
      <div className="flex flex-row gap-6 items-center mx-6 border-2 rounded-xl p-4 ">
        <Image src={'/user12.png'} alt='' width={100} height={100} className='rounded-full '/>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-2xl text-black">Anes Saadi</h1>
          <h1 className="text-gray-500 text-xl font-semibold">Ingenieur</h1>
          <h1 className="text-gray-500 text-xl">Informatique</h1>
        </div>
      </div>
      <div className="flex flex-col gap-3 border-2 rounded-xl px-6 mx-6 my-10 ">
        <div className="flex justify-between items-center my-4 ">
          <h1 className="font-bold text-2xl text-black ">
            information personnel
          </h1>
          <button class="bg-transparent hover:bg-blue-700 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded-xl">
            Modifier
          </button>
        </div>
        <div className="flex flex-row gap-14 md:gap-48 items-start justify-start pb-6">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h1 className='font-semibold text-black text-xl'>Nom</h1>
              <h1 className='font-bold text-gray-400 text-2xl'>Anes</h1>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className='font-semibold text-black text-xl'>Adresse email</h1>
              <h1 className='font-bold text-gray-400 text-2xl'>ma.saadi@esi-sba.dz</h1>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className='font-semibold text-black text-xl'>Position</h1>
              <h1 className='font-bold text-gray-400 text-2xl'>Ingenieure</h1>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <h1 className='font-semibold text-black text-xl'>Prenom</h1>
                <h1 className='font-bold text-gray-400 text-2xl'>Mohammed Anes</h1>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className='font-semibold text-black text-xl'>Departement</h1>
                <h1 className='font-bold text-gray-400 text-2xl'>Informatique</h1>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default page