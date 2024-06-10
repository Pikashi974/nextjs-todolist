import TaskComponent from "@/components/TaskComponent";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TaskComponent />
    </main>
  );
}
