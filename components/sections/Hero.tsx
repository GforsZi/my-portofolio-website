"use client"
import Lanyard from "@/components/sections/Lanyard";
import { useRegisterBreadcrumb } from "@/hooks/use-register-breadcrumb";

export default function Hero() {
  useRegisterBreadcrumb("hero", "Hero");
  return (
    <div id="hero">
        <Lanyard  
        position={[0,0,12]}
        gravity={[0,-40,0]}
        frontImage="/lanyard/front.png"
        backImage="/lanyard/back.png"
        imageFit="cover"
        lanyardWidth={0.40}
      />
  </div>
  )
}
