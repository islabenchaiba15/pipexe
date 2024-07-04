"use client";
import React from "react";
import LeftBarDropDown from "../LeftBarDropDown";
import {
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioGroup,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import Link from "next/link";
import Image from "next/image";
function RightSideBar({ totalDistance, activeLayer, setActiveLayer }) {
  const data = ["Dessiner une lignes"];
  const data1 = ["Dessiner une puits"];
  const data2 = ["Dessiner une manifold"];
  const data3 = ["Dessiner une station"];

  return (
    <div className="flex flex-col bg-gradient-to-r from-gray-100 to-gray-300 items-center overflow-hidden	">
      <Link href="/createpipe/dessiner">
        <LeftBarDropDown
          totalDistance={totalDistance}
          data={data}
          icon={"/pipe.svg"}
          affichage={"afficher les lignes"}
          title={"lignes"}
        />
      </Link>

      <Link href="/manifold/create-manifold">
        <LeftBarDropDown
          data={data1}
          icon={"/puit.svg"}
          affichage={"afficher les puits"}
          title={"puit"}
        />
      </Link>
      <Link href="/create-well">
        <LeftBarDropDown
          data={data2}
          icon={"/manifold.svg"}
          affichage={"afficher les manifolds"}
          title={"manifold"}
        />
      </Link>
      <Link href="/jonction/create">
        <LeftBarDropDown
          data={data3}
          icon={"/station.svg"}
          affichage={"afficher les stations"}
          title={"station"}
        />
      </Link>

      <Link href={"/inspection"}>
        <LeftBarDropDown
          data={data3}
          icon={"/eye.svg"}
          affichage={"afficher les stations"}
          title={"station"}
        />
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <LeftBarDropDown
              data={data3}
              icon={"/layer.svg"}
              affichage={"afficher les stations"}
              title={"station"}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="left" align="start">
          <DropdownMenuLabel>Layers</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={activeLayer}
            onValueChange={setActiveLayer}
          >
            <DropdownMenuRadioItem value="OpenStreetMap">
              OpenStreetMap
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="StamenTerrain">
              Stamen Terrain
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Native">Native</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <LeftBarDropDown
              data={data3}
              icon={"/fire.svg"}
              affichage={"Show stations"}
              title={"station"}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="left" align="start">
          <DropdownMenuLabel className="font-bold ">Map keys</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2">
            <span className="font-semibold ">--</span>
            <span className="font-semibold ">collect oil pipe</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <HorizontalRuleIcon />
            <span className="font-semibold ">collector oil pipe</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <HorizontalRuleIcon color="success"/>
            <span className="font-semibold " >gas</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <HorizontalRuleIcon color="secondary" />
            <span className="font-semibold " >water</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 ml-2">
            <Image src={"/Erruptif.svg"} alt="" width={15} height={15}/>
            <span className="font-semibold " >well</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 ml-2">
            <Image src={"/gasLift.svg"} alt="" width={15} height={15}/>
            <span className="font-semibold " >well gaslift</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 ml-2">
          <Image src={"/injectorGas.svg"} alt="" width={15} height={15}/>
          <span className="font-semibold " >well injector Gas</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 ml-2">
          <Image src={"/injectorWater.svg"} alt="" width={15} height={15}/>
            <span className="font-semibold " >well injector water</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 ml-2">
          <Image src={"/jonctionanes.svg"} alt="" width={15} height={15}/>
            <span className="font-semibold " >jonction</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 ml-2">
          <Image src={"/manifoldIOnspection.svg"} alt="" width={15} height={15}/>
            <span className="font-semibold " >manifold</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 ml-2">
          <Image src={"/stationInspection.svg"} alt="" width={15} height={15}/>
            <span className="font-semibold " >station (manifold)</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default RightSideBar;
