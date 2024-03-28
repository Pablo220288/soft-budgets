import Layout from "@/components/Layout";
import Link from "next/link";
import React from "react";

export default function QuestionsPage() {
  return (
    <Layout>
      <div className="mb-4 text-gray-400 text-sm flex items-center">
        <Link className="hover:text-text-generation" href={"/settings"}>
          Configuraciones{" "}
        </Link>
        <span>\ </span>
        <span className="text-text-generation">Preguntas Frecuentes</span>
      </div>
      <div className="mt-2 flex flex-col items-start">
        <div className="flex items-center gap-2">
          <h1>Preguntas Frecuentes</h1>
        </div>
        <div className="w-full m-2">
          <Link
            href={"/settings/questions/createUser"}
            className="flex items-center gap-2 p-2 rounded-lg text-[0.9rem] text-gray-600 transition ease-in-out duration-150 hover:bg-[#e7e7e7] hover:text-text-generation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
            <span>
              ¿Como <strong>Crear</strong> un Nuveo Usuario?
            </span>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
