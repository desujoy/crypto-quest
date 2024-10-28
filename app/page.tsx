import AuthModal from "@/components/AuthModal";
import React from "react";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-4xl font-bold">Welcome to Crypto Quest</p>
      <AuthModal />
    </div>
  );
}

export default Home;
