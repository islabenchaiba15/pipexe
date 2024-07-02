import React from "react";
import LeftBarDropDown from "../LeftBarDropDown";
function RightSideBar({ totalDistance }) {
  const data = ["Dessiner une lignes"];
  const data1 = ["Dessiner une puits"];
  const data2 = ["Dessiner une manifold"];
  const data3 = ["Dessiner une station"];
  return (
    <div className="flex flex-col  items-center overflow-hidden	">
      {/* <LeftBarDropDown
        totalDistance={totalDistance}
        data={data}
        icon={"/pipe.svg"}
        affichage={"afficher les lignes"}
        title={"lignes"}
      />
      <LeftBarDropDown
        data={data1}
        icon={"/puit.svg"}
        affichage={"afficher les puits"}
        title={"puit"}
      />
      <LeftBarDropDown
        data={data2}
        icon={"/manifold.svg"}
        affichage={"afficher les manifolds"}
        title={"manifold"}
      />
      <LeftBarDropDown
        data={data3}
        icon={"/station.svg"}
        affichage={"afficher les stations"}
        title={"station"}
      />
      <LeftBarDropDown
        data={data3}
        icon={"/ruler.svg"}
        affichage={"afficher les stations"}
        title={"station"}
      />
      <LeftBarDropDown
        data={data3}
        icon={"/add.svg"}
        affichage={"afficher les stations"}
        title={"station"}
      />
      <LeftBarDropDown
        data={data3}
        icon={"/moin.svg"}
        affichage={"afficher les stations"}
        title={"station"}
      />
      <LeftBarDropDown
        data={data3}
        icon={"/layer.svg"}
        affichage={"afficher les stations"}
        title={"station"}
      />
      <LeftBarDropDown
        data={data3}
        icon={"/eye.svg"}
        affichage={"afficher les stations"}
        title={"station"}
      /> */}
    </div>
  );
}

export default RightSideBar;
