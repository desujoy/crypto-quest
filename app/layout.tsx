import type { Metadata } from "next";
import "./globals.css";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { Providers } from "@/wagmi/wrapper";
import { getConfig } from "@/wagmi/config";

export const metadata: Metadata = {
  title: "Crypto Quest",
  description: "Get started with Crypto Quest",
  icons: "favicon.ico",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    getConfig(),
    (await headers()).get("cookie")
  );
  return (
    <html lang="en">
      <body>
        <Providers initialState={initialState}>{children}</Providers>
      </body>
    </html>
  );
}
