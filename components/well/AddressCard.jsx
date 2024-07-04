import React from "react";
import Image from "next/image";
function AddressCard({ icon, zone, centre, region, wilaya, address }) {
  return (
    <div
      className={
        " flex flex-row-reverse w-full justify-between gap-3 rounded-xl border p-5 shadow"
      }
    >
      <section className="flex justify-between gap-2">
        {/* label */}
        {/* icon */}
        <Image src={icon} alt="yy" width={80} height={80} />
      </section>
      <section className="flex flex-col gap-2">
        <p className="text-md text-gray-500 font-bold">{address}</p>
        <h2 className="text-lg font-semibold">
          {zone}, {centre}
        </h2>
        <span>
          {" "}
          <p className="text-lg font-semibold ">
            {region} , {wilaya}
          </p>
        </span>
      </section>
    </div>
  );
}

export default AddressCard;
