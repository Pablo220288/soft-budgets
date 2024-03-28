import { AlertContextProvider } from "@/components/AlertContext";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <AlertContextProvider>
        <Component {...pageProps} />
      </AlertContextProvider>
    </SessionProvider>
  );
}
