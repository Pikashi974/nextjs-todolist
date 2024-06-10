import AddComponent from "@/components/AddComponent";
import { useState } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AddComponent />
    </main>
  );
}
