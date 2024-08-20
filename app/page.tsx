"use client";
import Image from "next/image";
import Orders from "@/modules/orders";
import { Providers } from "./providers";
import DadcraftingCMS from "@/modules/cms";
import Login from "@/modules/login";
export default function App() {
  return (
    <Providers>
      <Login />
    </Providers>
  );
}
