import React from "react";

function AuthModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold">Sign up</h2>
        <form className="mt-4">
          <input
            type="text"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
          />
          <button className="w-full mt-4 bg-blue-500 text-white p-2 rounded-lg">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;
