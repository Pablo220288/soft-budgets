import SignIn from "@/pages/auth/signin";
import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
  const { data: session } = useSession();
  //creacion de roles en caso de que no existan
  useEffect(() => {
    const createRole = axios.post("/api/role/create");
  });
  //Si no existe una sesion iniciada por algun usuario se retorna al login
  if (!session) {
    return <SignIn />;
  }

  return (
    <Layout>
      <div className="text-text-generation flex flex-col gap-4 items-start">
        <div className="flex items-center gap-2">
          <h2 className="">
            Hola, <b>{session?.user?.name}</b>
          </h2>
        </div>
      </div>
    </Layout>
  );
}
