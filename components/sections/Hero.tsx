import Lanyard from "@/components/sections/Lanyard";

export default function Hero() {
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
