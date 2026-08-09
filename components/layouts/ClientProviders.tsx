"use client";

import { MotionSystem } from "../hooks/MotionSystem";
import { PageTransitionSystem } from "../hooks/PageTransitionSystem";
import FluidCursor from "@/components/sections/fluid-cursor"
import BlockOne from "@/components/bg-blocks/blocksone";

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
