"use client";
import Image from "next/image";
import Orders from "@/modules/orders";
import { Providers } from "../app/providers";
import DadcraftingCMS from "@/modules/cms";
export default function Home() {
  return (
    <div className="pt-[4vh]">
      <div className="w-full flex justify-center items-center">
        <h2 className="px-2 text-[40px] leading-1">
          <span className=" text-white">DC Order Breakdowns</span>
        </h2>
      </div>
      <Orders />
      <hr />
      <DadcraftingCMS />
    </div>
  );
}
