"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const lost = searchParams.get("lost");

  const { data: session } = useSession();

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      {session ? (
        <div className="flex flex-col gap-4 m-4 pl-40 pr-4 justify-center items-start w-full">
          <h1 className="text-3xl font-bold">Successfully Authenticated</h1>
          <Link
            href={"/connect-wallet"}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Continue
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4 m-4 pl-40 pr-4 justify-center items-start w-full">
          <h1 className="text-3xl font-bold">Authentication</h1>
          {lost && (
            <p className="text-red-500">
              You need to be authenticated to access this page.
            </p>
          )}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => signIn("google")}
          >
            Connect Google
          </button>
        </div>
      )}
      <div className="w-full bg-gray-50 h-full">
        <Image
          className="object-cover w-full h-full"
          src={"/img/auth-cover.png"}
          alt="Authentication"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
