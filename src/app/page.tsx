"use client";
import { useAppContext } from "@/context/context"; // Asegúrate de que la ruta es correcta
import { useEffect } from "react";

export default function Home() {
  const { podcasts } = useAppContext();
  useEffect(() => {
    console.log("ACA ESTOY ", podcasts);
  }, [podcasts]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p>podcast</p>
      </div>
    </main>
  );
}
