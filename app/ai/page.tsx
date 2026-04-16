"use client";

import { Suspense } from "react";
import AIClient from "./components/AIClient";
import LoadingAI from "./loading";

export default function AIPage() {
  return (
    <Suspense fallback={<LoadingAI/>}>
      <AIClient />
    </Suspense>
  );
}
