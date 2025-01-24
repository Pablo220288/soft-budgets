import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSession } from "next-auth/react";
import Footer from "./Footer";
import Nav from "./Nav";
import Head from "next/head";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);

  const { data: session } = useSession();
  //Inicializamos libreria AOS
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  return (
    <>
      {!session ? (
        <>{children}</>
      ) : (
        <div className="bg-backgroud-body min-h-screen flex flex-col justify-between">
          <div className="flex-grow">

            <div className="bg-background-body flex mt-[45px] h-[calc(100vh-100px)] md:mt-0 md:h-[calc(100vh-50px)]">
              <Nav />
              <div className="bg-white flex-grow m-3 rounded-lg p-4 shadow-md backdrop-blur-2xl backdrop-saturate-200 z-10">
                {children}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}
