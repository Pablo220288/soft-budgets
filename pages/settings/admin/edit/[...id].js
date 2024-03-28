import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import AdminForm from "@/components/AdminForm";
import Spinner from "@/components/Spinner";

export default function EditAdminPage() {
  const [adminInfo, setAdminInfo] = useState(null);
  const [roles, setRoles] = useState(null);
  const [isAdmins, setIsAdmins] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const getAdmin = async () => {
    try {
      setIsAdmins(true);
      if (!id) return;
      const admins = await axios.get("/api/admin/findbyid/?id=" + id);
      setAdminInfo(admins.data);
      const roles = await axios.get("/api/role/find");
      setRoles(roles.data);
    } catch (error) {
      console.error("Error fetching Admins data:", error);
    } finally {
      setIsAdmins(false);
    }
  };

  useEffect(() => {
    getAdmin();
  }, [id]);

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
        <span className="text-text-generation">Editar</span>
        <div className="ml-3">{isAdmins && <Spinner color={"#0a5a7d"} />}</div>
      </div>
      {adminInfo && (
        <>
          {roles && (
            <AdminForm title={"Editar Usuario"} {...adminInfo} roles={roles} />
          )}
        </>
      )}
    </Layout>
  );
}
