import React from 'react'
import Image from "next/image";
function AddressCard({
    icon,
    zone,
    centre,
    region,
    wilaya,
    address
}) {
  return (
    <div  className={" flex flex-row-reverse w-full justify-between gap-3 rounded-xl border p-5 shadow"}>
        <section className="flex justify-between gap-2">
        {/* label */}
        {/* icon */}
            <Image src={icon} alt="yy" width={50} height={50} />
        </section>
        <section className="flex flex-col gap-2">
            <p className="text-xl text-md">{address}</p>
            <h2 className="text-xl font-semibold">{zone}, {centre}</h2>
            <span> <p className="text-xl font-semibold ">{region} , {wilaya}</p></span>
        </section>
    </div>
  )
}

export default AddressCard