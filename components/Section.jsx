import Image from "next/image";
import React from "react";

function Section() {
  return (
    <div className="mx-4 p-4">
      <div className="flex justify-between items-center ">
        <Image src={"/pipexe1.png"} width={120} height={60} />
        <ul className="flex items-center gap-20">
          <li className="font-semibold text-2xl text-white">Text</li>
          <li className="font-semibold text-2xl text-white">Text</li>
          <li className="font-semibold text-2xl text-white">Text</li>
          <li className="font-bold text-2xl text-white ml-10">
            <button class="bg-blue-500 hover:bg-blue-800 text-xl text-gray-700 font-semibold text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded-xl">
              Login
            </button>
          </li>
        </ul>
      </div>
      <div className="flex flex-col items-center  gap-10 my-24">
        <h1 className="font-bold text-white text-8xl ">Pipexe</h1>
        <p className="font-semibold text-white text-xl max-w-3xl text-center">
          lorum lorum lorum lorum lorum lorum lorum lorum lorum lorum lorum
          lorum lorum lorum lorum lorum lorum lorum lorum lorum lorum lorum
        </p>
      </div>
      <div className="my-20 flex flex-col gap-24">
        <div className="flex flex-col md:flex-row gap-8 md:items-center ">
          <div className="w-full md:w-1/2">
            <Image src={"/mapbox.webp"} alt="" height={400} width={700} />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-10">
            <h1 className="font-bold text-white md:text-6xl text-3xl">
              Optimize routing with customized navigation
            </h1>
            <p className="font-semibold text-gray-500 md:text-3xl text-xl text-left">
              Advanced routing engines, accurate traffic-aware travel times ,
              and intuitive turn-by-turn directions for mobile and automotive.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-10 md:flex-row-reverse md:gap-8 md:items-center ">
          <div className="w-full md:w-1/2">
            <Image
              src={"/aa.png"}
              alt=""
              height={400}
              width={700}
              className="rounded-2xl"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-10 ">
            <h1 className="font-bold text-white md:text-6xl text-3xl">
              Bring location to life with beautiful maps
            </h1>
            <p className="font-semibold text-gray-500 md:text-3xl text-xl text-left">
              Use Mapbox APIs and SDKs, ready-made map styles, and live updating
              data to build customizable maps for web, mobile, automotive and
              AR.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:items-center ">
          <div className="w-full md:w-1/2">
            <Image src={"/car.webp"} alt="" height={400} width={700} />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-10">
            <h1 className="font-bold text-white md:text-6xl text-3xl">
              Transform location features with search{" "}
            </h1>
            <p className="font-semibold text-gray-500 md:text-3xl text-xl text-left">
              Mapbox powers location search for precise addresses, place names,
              and points of interest via easy-to-use APIs and SDKs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section;
