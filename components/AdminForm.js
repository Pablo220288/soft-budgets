import Link from "next/link";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import VisibleInput from "./VisibleInput";
import { AlertContext } from "./AlertContext";
import { useSession } from "next-auth/react";
import axios from "axios";
import { permissionsDefault } from "@/utils/permissions";

export default function AdminForm({
  title,
  _id,
  roles,
  user: existingUser,
  fullName: existingFullName,
  role: existingRole,
  permissions: existingPermissions,
}) {
  const [user, setUser] = useState(existingUser || "");
  const [fullName, setFullName] = useState(existingFullName || "");
  const [password, setPassword] = useState("");
  const [retryPassword, setRetryPassword] = useState("");
  const [previousPassword, setPreviousPassword] = useState("");
  const [typeInputPassword, setTypeInputPassword] = useState("password");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [typeInputRetryPassword, setTypeInputRetryPassword] =
    useState("password");
  const [retryPasswordVisible, setRetryPasswordVisible] = useState(false);
  const [typeInputPreviousPassword, setTypeInputPreviousPassword] =
    useState("password");
  const [previousPasswordVisible, setPreviousPasswordVisible] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [role, setRole] = useState(
    existingRole ? existingRole._id : "65fd8f6244edf13ddbe6f8aa"
  );
  const [permissions, setPermissions] = useState(
    existingPermissions || defaultPermissions
  );

  //Accedemos a la sesion
  const { data: session } = useSession();
  //Accedemos a las alertas
  const { showAlert } = useContext(AlertContext);
  //Si no existen Permisos previos cargamos por defecto los permisos de Usuario
  function defaultPermissions() {
    const defaultPermissions = permissionsDefault.find((p) => p.ref === "user");
    return defaultPermissions.data;
  }

  const visiblePassword = () => {
    setPasswordVisible(!passwordVisible);

    if (typeInputPassword === "password") {
      setTypeInputPassword("text");
    } else {
      setTypeInputPassword("password");
    }
  };

  const visibleRetryPassword = () => {
    setRetryPasswordVisible(!retryPasswordVisible);

    if (typeInputRetryPassword === "password") {
      setTypeInputRetryPassword("text");
    } else {
      setTypeInputRetryPassword("password");
    }
  };

  const visiblePreviousPassword = () => {
    setPreviousPasswordVisible(!previousPasswordVisible);

    if (typeInputPreviousPassword === "password") {
      setTypeInputPreviousPassword("text");
    } else {
      setTypeInputPreviousPassword("password");
    }
  };

  const saveAdmin = async (ev) => {
    ev.preventDefault();
    //Creamos Data Admin Previa
    const data = {
      user,
      fullName,
      owner: session.user.id,
      role,
      permissions,
    };
    //Agregamos la Contrasena solo si es un usuario nuevo o si la estamos modificando
    if (!_id) {
      data.password = password;
      data.retryPassword = retryPassword;
    } else if (editPassword) {
      data.password = password;
      data.retryPassword = retryPassword;
      data.previousPassword = previousPassword;
    }
    //Comprobamos que no alla datos faltantes
    if (Object.values(data).some((info) => info === "")) {
      toast.error("Datos Incompletos.");
      return;
    }
    //Si estamos editando la contrasena, comprobamos q la anterior sea correcta
    if (editPassword) {
      const response = await axios.get(
        "/api/admin/passwordMatch/?id=" + _id + "&password=" + previousPassword
      );
      if (!response.data) {
        toast.error("Contraseña Actual Incorrecta.");
        return;
      }
    }
    //Comprobamos si la contrasena y su repeticion coincidan
    if (password !== retryPassword) {
      if (_id) {
        toast.error("Nuevas Contraseñas no coinciden");
        return;
      }
      toast.error("Las Contraseñas no coinciden");
      return;
    }
    //Enviamos la modificacion segun sea edicion o creacion
    if (_id) {
      data._id = _id;
      showAlert(
        fullName,
        "update",
        "/api/admin/update",
        "/settings/admin",
        data,
        "admin"
      );
    } else {
      showAlert(
        fullName,
        "add",
        "/api/admin/create",
        "/settings/admin",
        data,
        "admin"
      );
    }
  };

  const handleRolChange = (ev) => {
    //Seteamos el Texto del Select
    setRole(ev.target.value);
    //Seteamos los Permisos segun el Rol
    const role = roles.find((rol) => rol._id === ev.target.value);
    const permit = permissionsDefault.find((p) => p.ref === role.name).data;

    const checkboxesUser = document.getElementsByName("user");
    const checkboxesCategorie = document.getElementsByName("categorie");
    const checkboxesBudgets = document.getElementsByName("budgets");

    for (let i = 0, n = checkboxesUser.length; i < n; i++) {
      checkboxesUser[i].checked = permit[0].permissions[i].value;
    }

    for (let i = 0, n = checkboxesCategorie.length; i < n; i++) {
      checkboxesCategorie[i].checked = permit[1].permissions[i].value;
    }

    for (let i = 0, n = checkboxesBudgets.length; i < n; i++) {
      checkboxesBudgets[i].checked = permit[2].permissions[i].value;
    }

    setPermissions([...permit]);
  };

  const handleCategoriePermissionsChange = (value, prop, index) => {
    const checkboxes = document.getElementsByName(prop.id);
    //Marcamos o Desmarcamos todos los checkbox anidados
    for (let i = 0, n = checkboxes.length; i < n; i++) {
      checkboxes[i].checked = value;
    }
    //Seteamos los permisos anidados
    setPermissions((prev) => {
      const permit = [...prev];

      for (let i = 0; i < permit[index].permissions.length; i++) {
        permit[index].permissions[i].value = value;
      }
      return permit;
    });
  };

  const handlePermissionsChange = (value, id, pp, index) => {
    //Seteamos la categoria y los permisos anidados
    setPermissions((prev) => {
      const permit = [...prev];
      //Seteamos el permisos
      permit.map((categorie) => {
        if (categorie.id === id) {
          categorie.permissions[index].value = value;
        }
      });
      return permit;
    });
  };

  return (
    <form onSubmit={saveAdmin} className="mt-4 flex-col gap-6">
      <div className="w-full flex items-center justify-between mb-4">
        <h1>{title}</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              className="flex w-fit rounded-md text-white p-2 hover:bg-indigo-600 select-none bg-indigo-500 text-center align-middle font-sans shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              data-ripple-light="true"
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
                  d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                />
              </svg>
            </button>
            <Link
              className="flex w-fit rounded-md text-white p-2 hover:bg-pink-600 select-none bg-pink-500 text-center align-middle font-sans shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              href={"/settings/admin"}
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="mb-4 flex gap-4 ">
        <div className="relative h-11 w-full max-w-[150px]">
          <input
            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            value={user}
            onChange={(ev) => setUser(ev.target.value)}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-indigo-500 peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Usuario
          </label>
        </div>
        <div className="relative h-11 w-full min-w-[100px]">
          <input
            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            value={fullName}
            onChange={(ev) => setFullName(ev.target.value)}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-indigo-500 peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Nombre Completo
          </label>
        </div>
      </div>
      {_id ? (
        <div className="w-full mb-4 flex flex-col lg:flex-row gap-3">
          <div className="w-full flex gap-3">
            <button
              className={`${
                editPassword
                  ? "hover:bg-pink-600 bg-pink-500 shadow-pink-500/20 hover:shadow-pink-500/40"
                  : "hover:bg-indigo-600 bg-indigo-500 shadow-indigo-500/20 hover:shadow-indigo-500/40"
              } flex items-center justify-center w-fit rounded-md text-white p-2 px-3 select-none text-center align-middle font-sans shadow-md transition-all hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
              type="button"
              data-ripple-light="true"
              onClick={() => {
                setEditPassword(!editPassword);
              }}
            >
              {editPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              )}
            </button>
            <div className="relative h-11 w-full min-w-[100px]">
              <input
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                value={previousPassword}
                type={typeInputPreviousPassword}
                onChange={(ev) => setPreviousPassword(ev.target.value)}
                disabled={editPassword ? false : true}
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-indigo-500 peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Contraseña Anterior
              </label>
              <VisibleInput
                visibleFunction={visiblePreviousPassword}
                visibleIcon={previousPasswordVisible}
              />
            </div>
          </div>
          <div className="relative h-11 w-full min-w-[100px]">
            <input
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              value={password}
              type={typeInputPassword}
              onChange={(ev) => setPassword(ev.target.value)}
              disabled={editPassword ? false : true}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-indigo-500 peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Nueva Contraseña
            </label>
            <VisibleInput
              visibleFunction={visiblePassword}
              visibleIcon={passwordVisible}
            />
          </div>
          <div className="relative h-11 w-full min-w-[100px]">
            <input
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              value={retryPassword}
              type={typeInputRetryPassword}
              onChange={(ev) => setRetryPassword(ev.target.value)}
              disabled={editPassword ? false : true}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-indigo-500 peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Repetir Nueva Contraseña
            </label>
            <VisibleInput
              visibleFunction={visibleRetryPassword}
              visibleIcon={retryPasswordVisible}
            />
          </div>
        </div>
      ) : (
        <div className="mb-4 flex flex-col lg:flex-row gap-4">
          <div className="relative h-11 w-full min-w-[100px]">
            <input
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              value={password}
              type={typeInputPassword}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-indigo-500 peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Contraseña
            </label>
            <VisibleInput
              visibleFunction={visiblePassword}
              visibleIcon={passwordVisible}
            />
          </div>
          <div className="relative h-11 w-full min-w-[100px]">
            <input
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              value={retryPassword}
              type={typeInputRetryPassword}
              onChange={(ev) => setRetryPassword(ev.target.value)}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-indigo-500 peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Repetir Contraseña
            </label>
            <VisibleInput
              visibleFunction={visibleRetryPassword}
              visibleIcon={retryPasswordVisible}
            />
          </div>
        </div>
      )}
      <div className="mb-4 flex gap-4">
        <div className="relative h-11 w-full max-w-[180px]">
          <select
            value={role}
            onChange={(ev) => {
              handleRolChange(ev);
            }}
            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 focus:shadow-none disabled:bg-blue-gray-50"
          >
            {roles.map((role, index) => (
              <option value={role._id} key={index}>
                {role.description}
              </option>
            ))}
          </select>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-indigo-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Rol
          </label>
        </div>
      </div>
      <div className="mb-4 flex flex-col items-start gap-4">
        <h2 className="text-sm font-normal leading-tight text-blue-gray-900">
          Permisos
        </h2>
        {permissions && (
          <div className="flex flex-col items-start gap-4">
            {permissions.map((prop, index) => (
              <div
                className="w-full flex flex-col items-start ml-2"
                key={index}
              >
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center px-2 rounded-full cursor-pointer"
                    htmlFor={prop.id}
                  >
                    <input
                      type="checkbox"
                      className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-sm border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-7 before:w-7 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-md before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-indigo-900 checked:bg-indigo-900 checked:before:bg-indigo-900 hover:before:opacity-10"
                      id={prop.id}
                      defaultChecked={prop.value}
                      onClick={(ev) => {
                        handleCategoriePermissionsChange(
                          ev.target.checked,
                          prop,
                          index
                        );
                      }}
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className="w-2.5 h-2.5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px text-[14px] font-normal leading-tight text-blue-gray-400 cursor-pointer select-none"
                    htmlFor={prop.id}
                  >
                    {prop.name}
                  </label>
                </div>
                <div className="flex items-center">
                  {prop.permissions.map((pp, index) => (
                    <div className="w-full flex gap-2 pl-4 pt-2" key={index}>
                      <div className="inline-flex items-center">
                        <label
                          className="relative flex items-center px-2 rounded-full cursor-pointer"
                          htmlFor={pp.id}
                        >
                          <input
                            name={prop.id}
                            type="checkbox"
                            className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-sm border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-6 before:w-6 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-sm before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-indigo-900 checked:bg-indigo-900 checked:before:bg-indigo-900 hover:before:opacity-10"
                            id={pp.id}
                            defaultChecked={pp.value}
                            onClick={(ev) => {
                              handlePermissionsChange(
                                ev.target.checked,
                                prop.id,
                                pp,
                                index
                              );
                            }}
                          />
                          <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth={1.5}
                              className="w-2.5 h-2.5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        </label>
                        <label
                          className="mt-px text-[12px] font-normal leading-tight text-blue-gray-400 cursor-pointer select-none"
                          htmlFor={pp.id}
                        >
                          {pp.name}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );
}
