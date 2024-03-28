import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSession } from "next-auth/react";
import Footer from "./Footer";
import Nav from "./Nav";
import Head from "next/head";

export default function Layout({ children }) {
  const { data: session } = useSession();
  //Inicializamos libreria AOS
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  return (
    <>
      <Head>
        <title>Software | Budgets</title>
        <meta name="description" content="Software para presupuetos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="#" />
      </Head>

      <div className="w-screen max-w-full h-screen flex items-center justify-center relative overflow-y-scroll">
        {/* aca deberia ir el loader */}
        <div>
          <Toaster />
        </div>
        {!session ? (
          <>{children}</>
        ) : (
          <div className="w-screen max-w-full h-screen flex flex-col justify-between">
            <div className="flex flex-col md:flex-row lg:h-full relative">
              <Nav />
              <div className="bg-white flex-grow ml-3 mr-3 md:ml-0 rounded-lg p-4 mt-14 md:mt-3 shadow-md backdrop-blur-2xl backdrop-saturate-200 z-10">
                {children}
              </div>
            </div>
            <Footer />
          </div>
        )}
      </div>
    </>
  );
}
