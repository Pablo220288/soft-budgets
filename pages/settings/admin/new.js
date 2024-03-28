import AdminForm from "@/components/AdminForm";
import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function NewAdminPage() {
  const [roles, setRoles] = useState(null);
  const [isRoles, setIsRoles] = useState(false);
  //Funcion de Solicitud de roles
  const getRoles = async () => {
    try {
      setIsRoles(true);
      const response = await axios.get("/api/role/find");
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching Roles data:", error);
    } finally {
      setIsRoles(false);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <Layout>
      <div className="mb-4 text-gray-400 text-sm flex items-center">
        <Link className="hover:text-text-generation" href={"/settings"}>
          Configuraciones{" "}
        </Link>
        <span>\ </span>
        <Link className="hover:text-text-generation" href={"/settings/admin"}>
          Usuarios{" "}
        </Link>
        <span>\ </span>
        <span className="text-text-generation">Nuevo</span>
        <div className="ml-3">{isRoles && <Spinner color={"#0a5a7d"} />}</div>
      </div>
      {roles && <AdminForm title={"Nueva Usuario"} roles={roles} />}
    </Layout>
  );
}
