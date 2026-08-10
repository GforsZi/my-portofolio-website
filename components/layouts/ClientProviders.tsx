"use client";

import { MotionSystem } from "../hooks/MotionSystem";
import { PageTransitionSystem } from "../hooks/PageTransitionSystem";
import FluidCursor from "@/components/sections/FluidContainer"
import BlockOne from "@/components/background/Blocksone";

export function ClientProviders() {
  return (
    <>
      <BlockOne/>
      <MotionSystem />
      <PageTransitionSystem />
      <FluidCursor/>
    </>
  );
}
