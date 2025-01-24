import { AlertContextProvider } from "@/components/AlertContext";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Head>
        <link rel="icon" href="/assets/roto.png" />
        <title>Soft Budgets | Software</title>
        <meta
          name="Soft Budgets"
          content="Plataforma de Gestión para Presupuestos"
        />
      </Head>
      <AlertContextProvider>
        <Component {...pageProps} />
      </AlertContextProvider>
    </SessionProvider>
  );
}
