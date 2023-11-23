import "@rainbow-me/rainbowkit/styles.css";
import {  useEffect, useState } from "react";
import axios from "axios";

  
export default function Demo({ name,imageURL }: any) {

  return (
    <div className={`flex flex-col items-center justify-between p-24`}>
      <div className="h-[394px] w-[394px]">
        <img
          src= {imageURL}
          alt="NFT"
          className="h-full w-full object-contain"
        />
      </div>
      <div className="text-[32px]">{name}</div>
    </div>
  );
}
