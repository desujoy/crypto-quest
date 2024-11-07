"use client";

import { useState } from "react";

const contract = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimpleStorage {
    uint256 myFavouriteNumber;

    struct Person {
        string name;
        uint256 favouriteNumber;
    }

    Person[] public listOfPersons;

    mapping(string => uint256) public nameToFavNumber;

    function addPerson(string memory _name, uint256 _favouriteNumber) public {
        listOfPersons.push(Person(_name, _favouriteNumber));
        nameToFavNumber[_name] = _favouriteNumber;
    }

    function store(uint256 _favouriteNunmber) public {
        myFavouriteNumber = _favouriteNunmber;
    }

    function retrieve() public view returns (uint256) {
        return myFavouriteNumber;
    }
}
        `;

export default function Game1Screen({
  checkContractAddress,
  favouriteNumber,
  checkFavoriteNumber,
  names,
  favNums,
  checkAllFavouriteNumbers,
}: {
  checkContractAddress: (contractAddress: `0x${string}`) => Promise<{
    message: string;
    error: string;
  }>;
  favouriteNumber: number;
  checkFavoriteNumber(contractAddress: `0x${string}`): Promise<{
    message: string;
    error: string;
  }>;
  names: string[];
  favNums: number[];
  checkAllFavouriteNumbers(contractAddress: `0x${string}`): Promise<{
    message: string;
    error: string;
  }>;
}) {
  const [contractAddress, setContractAddress] = useState<`0x${string}`>("0x");
  const [result, setResult] = useState({ message: "", error: "" });
  const [result1, setResult1] = useState({ message: "", error: "" });
  const [result2, setResult2] = useState({ message: "", error: "" });
  async function handleCheckContractAddress() {
    if (contractAddress) {
      const res = await checkContractAddress(contractAddress);
      console.log(res);
      setResult(res);
    }
  }

  async function handleCheckFavoriteNumber() {
    if (contractAddress) {
      const res = await checkFavoriteNumber(contractAddress);
      console.log(res);
      setResult1(res);
    }
  }

  async function handleCheckAllFavouriteNumbers() {
    if (contractAddress) {
      const res = await checkAllFavouriteNumbers(contractAddress);
      console.log(res);
      setResult2(res);
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 px-20">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Instruction</h2>
        <p className="text-lg text-pretty">
          Deploy this contract on Sepolia testnet and answer the questions
          <button
            className="lg:hidden mx-4 p-2 bg-blue-500 rounded-md text-white"
            onClick={() => navigator.clipboard.writeText(contract)}
          >
            Copy
          </button>
        </p>
        <h2 className="text-xl font-bold">Questions</h2>
        <ol className="list-decimal list-inside">
          <li className="text-lg text-pretty">
            What is the address of the deployed contract?
            <br />
            <input
              type="text"
              placeholder="0x1234567890abcdef1234567890abcdef12345678"
              className="border-2 border-blue-500 rounded-md p-1 w-[30vw]"
              value={contractAddress}
              onChange={(e) =>
                setContractAddress(e.target.value as `0x${string}`)
              }
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mx-4"
              onClick={handleCheckContractAddress}
            >
              Check
            </button>
            {result.message !== "" && (
              <p className="text-green-500 text-pretty">{result.message}</p>
            )}
            {result.error !== "" && (
              <p className="text-red-500 text-pretty">{result.error}</p>
            )}
          </li>
          {result.message === "Valid address" && (
            <>
              <li className="text-lg text-pretty">
                Change the favourite number to {favouriteNumber}
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mx-4"
                  onClick={handleCheckFavoriteNumber}
                >
                  Check
                </button>
                {result1.message !== "" && (
                  <p className="text-green-500 text-pretty">
                    {result1.message}
                  </p>
                )}
                {result1.error !== "" && (
                  <p className="text-red-500 text-pretty">{result1.error}</p>
                )}
              </li>
              {result1.message === "Correct" && (
                <>
                  <li className="text-lg text-pretty">
                    Add 5 persons with their favourite numbers
                    <ol className="list-disc list-inside">
                      {names.map((name, index) => (
                        <li key={index}>
                          {name} - {favNums[index]}
                        </li>
                      ))}
                    </ol>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      onClick={handleCheckAllFavouriteNumbers}
                    >
                      Check
                    </button>
                    {result2.message !== "" && (
                      <p className="text-green-500 text-pretty">
                        {result2.message}
                      </p>
                    )}
                    {result2.error !== "" && (
                      <p className="text-red-500 text-pretty">
                        {result2.error}
                      </p>
                    )}
                  </li>
                  {result2.message === "All Correct" && (
                    <p className="text-xl font-bold text-pretty">
                      Congratulations! You have successfully completed the game
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </ol>
      </div>
      <pre className="text-sm lg:h-[80vh] lg:block hidden my-2 font-bold text-pretty overflow-auto">
        {contract}
      </pre>
    </div>
  );
}
