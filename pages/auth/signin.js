import { signIn } from "next-auth/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Layout from "@/components/Layout";

export const generalDelay = 200;
export default function SignIn() {
  const [userInfo, setUserInfo] = useState({ user: "", password: "" });

  const title = "Soft Budgets";

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* if (userInfo.user === "") {
      toast.error("Enter your name.");
      return;
    } */

    /* if (userInfo.password !== password) {
      toast.error("Invalid Password.");
      setUserInfo({ ...userInfo, password: "" });
      return;
    } */

    const res = await signIn("credentials", {
      user: userInfo.user,
      password: userInfo.password,
      redirect: false,
    });

    if (res.error) {
      toast.error("Usuario o Contraseña incorrectos.");
    }
  };

  return (
    <Layout>
      <div>
        <Toaster />
      </div>
      <div className="bg-backgroud-body absolute z-50 w-full h-full flex items-center justify-center">
        <div className="w-[250px] relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
          <form className="mt-8 mb-2" onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col gap-6">
              <div className="w-full flex flex-col">
                <div className="flex w-full">
                  {title.split("").map((letter, index) => (
                    <span
                      key={index}
                      data-aos-delay={`${50 * index + generalDelay}`}
                      data-aos="zoom-in"
                      className="text-[30px] text-black text-start font-bold"
                    >
                      {letter === " " ? "\xA0" : letter}
                    </span>
                  ))}
                </div>
              </div>
              <div
                data-aos="zoom-in"
                data-aos-delay={`${generalDelay + 100}`}
                className="relative h-11 w-full "
              >
                <input
                  className="peer h-full w-full rounded-md border-2 border-blue-gray-800 border-t-transparent bg-transparent px-3 py-3 font-sans text-[16px] font-normal text-black outline outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-900 placeholder-shown:border-t-blue-gray-900 focus:border-2 focus:border-gray-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  value={userInfo.user}
                  onChange={(ev) =>
                    setUserInfo({ ...userInfo, user: ev.target.value })
                  }
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-800 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t-2 before:border-l-2 before:border-blue-gray-800 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t-2 after:border-r-2 after:border-blue-gray-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-900 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-800 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Usuario
                </label>
              </div>
              <div
                data-aos="zoom-in"
                data-aos-delay={`${generalDelay + 200}`}
                className="relative h-11 w-full"
              >
                <input
                  type="password"
                  className="peer h-full w-full rounded-md border-2 border-blue-gray-800 border-t-transparent bg-transparent px-3 py-3 font-sans text-[16px] font-normal text-black outline outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-900 placeholder-shown:border-t-blue-gray-900 focus:border-2 focus:border-gray-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  value={userInfo.password}
                  onChange={(ev) =>
                    setUserInfo({ ...userInfo, password: ev.target.value })
                  }
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-800 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t-2 before:border-l-2 before:border-blue-gray-800 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t-2 after:border-r-2 after:border-blue-gray-800 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-900 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Password
                </label>
              </div>
            </div>
            <button
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all mt-2 disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="submit"
              data-ripple-light="true"
              data-aos="fade-left"
              data-aos-delay={`${generalDelay + 300}`}
            >
              Login
            </button>
            <button />
          </form>
        </div>
      </div>
    </Layout>
  );
}
