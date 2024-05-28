import React from "react";
import {Card, Skeleton} from "@nextui-org/react";

const SkeltonMain=()=> {
  return (
    <Card className="w-full h-screen flex flex-row " radius="lg">
      <Skeleton className="rounded-lg w-[20%] h-screen ">
        <div className="h-24 rounded-lg bg-default-300 p-4"></div>
      </Skeleton>
      <div className="rounded-lg w-full h-screen flex flex-col gap-2">
        <Skeleton className="rounded-lg h-[10%] w-full p-2">
            <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
        <Skeleton className="rounded-lg h-[90%] w-full p-2">
            <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
      <Skeleton className="rounded-lg w-[20%] h-screen">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
    </Card>
  );
}

export default SkeltonMain