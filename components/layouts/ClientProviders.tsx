"use client";

import { MotionSystem } from "@/components/hooks/MotionSystem";
import { PageTransitionSystem } from "@/components/hooks/PageTransitionSystem";
import GoogleTranslate from "@/components/hooks/GoogleTranslate";
import FluidCursor from "@/components/sections/FluidContainer"
import BlockOne from "@/components/background/Blocksone";

export function ClientProviders() {
  return (
    <>
      <BlockOne/>
      <MotionSystem />
      <PageTransitionSystem />
      {/* <FluidCursor/> */}
      <GoogleTranslate/>
    </>
  );
}
