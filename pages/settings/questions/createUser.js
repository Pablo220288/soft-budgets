import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CreateUserPage() {
  return (
    <Layout>
      <div className="mb-4 text-gray-400 text-sm flex items-center">
        <Link className="hover:text-text-generation" href={"/settings"}>
          Configuraciones{" "}
        </Link>
        <span>\ </span>
        <Link
          className="hover:text-text-generation"
          href={"/settings/questions"}
        >
          Preguntas Frecuentes
        </Link>
      </div>
      <div className="mt-2 flex flex-col items-start">
        <div className="flex items-center gap-2">
          <h1>Crear Usuarios</h1>
        </div>
        <div className="relative">
          <span className="absolute w-8 h-8 flex items-center justify-center top-[120px] left-[155px] border-2 border-text-generation rounded-full">1</span>
          <span className="absolute w-8 h-8 flex items-center justify-center top-[54px] left-[270px] border-2 border-text-generation rounded-full">2</span>
          <Image
            src="/assets/createuser.png"
            width={300}
            height={164}
            alt="Picture of the author"
            className="imagen-question-create-user"
          />
        </div>
      </div>
    </Layout>
  );
}
