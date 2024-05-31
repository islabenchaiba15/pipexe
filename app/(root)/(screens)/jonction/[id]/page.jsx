"use client";
import React,{useState,useEffect} from "react";
import Card from "../../../../../components/pipe/Card";
import AddressCard from "../../../../../components/well/AddressCard";
import Chart from "../../../../../components/pipe/Chart";
import PressureCard from "../../../../../components/manifold/PressureCard";
import MapComponent from "../../../../../components/MapComponent";
import CreatePipeFormContextProvider from "../../../../../context/CreatePipeFormContextProvider";
import WellContextProvider from "../../../../../context/WellContextProvider";
import { axiosInstance } from "@/Api/Index";
import TableDemo from "@/components/Junction/TableDemo";
const cardData = [
  {
    label: "Nom",
    amount: "md255",
    icon: "/fire.svg",
    discription: "drilled 15/12/2002",
  },
];

const address = [
  {
    label: "address",
    wilaya: "ouargla",
    centre: "centre 123",
    region: "Hassi messaoud",
    zone: "E2A",
    icon: "/fire.svg",
  },
];
const RealData = [
  {
    Temperature: "Temperature",
    amount: "30",
    icon: "/fire.svg",
    pressure: "pressure",
    number: "100",
  },
];

function page({params}) {
  console.log('paraaaams',params);
  const icon = "../manifold.svg";
  const [junction, setJunction] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchJunctions = async () => {
      try {
        const response = await axiosInstance.get(`/junction/${params.id}`);
        setJunction(response.data);
        setLoading(false);
        console.log(loading, "looooooooooooooding");
      } catch (error) {
        console.error("Error fetching junctions", error);
      }
    };
    fetchJunctions();
  }, []);
  useEffect(() => {
    console.log("Updated wells state:", junction);
  }, [junction]);
  return (
   !loading && (
    <CreatePipeFormContextProvider>
      <WellContextProvider>
        <div className="flex flex-col gap-5 mx-10 my-4 overflow-x-auto overflow-y-auto no-scrollbar h-screen ">
          <h1 className="text-3xl font-bold text black">Junction details</h1>
          <section className="grid w-full grid-cols-1 gap-4  transition-all sm:grid-cols-2 xl:grid-cols-2 ">
              <Card
                amount={"Nom"}
                icon={"/fire.svg"}
                discription={`created ${junction.date}`}
                label={junction.name}
              />
              <AddressCard
                address={"address"}
                wilaya={junction.address.wilaya}
                zone={junction.address.zone}
                region={junction.address.region}
                centre={junction.address.centre}
                icon={"/fire.svg"}
              />
          </section>
          <section className="flex flex-col lg:flex-row lg:items-center gap-4 transition-all ">
            <div className="lg:w-1/2 w-full gap-3 rounded-xl border p-5 shadow">
              <p className="p-4 font-semibold">Overview</p>
              <Chart />
            </div>
            <div className="lg:w-1/2 w-full h-[400px] lg:h-full gap-3 rounded-xl border p-5 shadow ">
              <MapComponent icon={icon} page={"junction"} coords={junction.coords}/>
            </div>
          </section>
          <div
            className={
              " flex flex-col w-full justify-between gap-3 rounded-xl border p-5 shadow pb-24"
            }
          >
            <p className="p-4 font-semibold">Overview</p>
            <TableDemo junctionDetails={junction}/>
          </div>
          {/* <div className={" flex flex-col w-full justify-between gap-3 rounded-xl border p-5 shadow "}>
              <TableDemo/>
            </div>
            <div className={" flex flex-col w-full justify-between gap-3 rounded-xl border p-5 shadow "}>
              <TableDemo/>
            </div> */}
        </div>
      </WellContextProvider>
    </CreatePipeFormContextProvider>
  )
)
}

export default page;
