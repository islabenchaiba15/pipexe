'use client'
import React, { useState } from 'react'
import DashboardCard from '../../../../../components/Dashboard/DahboardCard';
import Chart from '../../../../../components/pipe/Chart';
import WellDashboard from '../../../../../components/Dashboard/WellDashboard';
import LignesDashboard from '../../../../../components/Dashboard/LignesDashboard';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select"
function page() {

  const [selectedOption, setSelectedOption] = useState('puit')

  return (
    <div className="flex flex-col gap-5 mx-10 my-4 overflow-x-auto overflow-y-auto no-scrollbar h-screen ">
            <div className="flex flex-row justify-between items-center my-4 mx-1">
              <h1 className='text-3xl font-bold text black'>Dashboard</h1>
              <Select className="" value={selectedOption} onValueChange={(value)=>{setSelectedOption(value)}} >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="puit">Well</SelectItem>
                    <SelectItem value="well">Manifold</SelectItem>
                    <SelectItem value="ligne">Pipe</SelectItem>
                    <SelectItem value="tous">All</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {
              selectedOption==="puit" ? (
                <WellDashboard/>
              ) : selectedOption==="ligne" ? (
                <LignesDashboard/>
              ) : null
            }
    </div>
  )
}

export default page