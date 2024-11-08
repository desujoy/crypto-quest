import { auth } from "@/auth";
import Game1Screen from "@/components/Game1Screen";
import { db } from "@/db";
import { game1, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { getBytecode, readContract } from "@wagmi/core";
import { getConfig } from "@/wagmi/config";

export default async function Game1() {
  const session = await auth();
  const userId = session?.user?.id;
  if (userId) {
    const userGameCompleted = await db
      .select({ gameCompleted: users.gameCompleted })
      .from(users)
      .where(eq(users.id, userId));
    console.log(userGameCompleted);
    if (userGameCompleted[0].gameCompleted === null) {
      return (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl my-2 font-bold text-pretty">
            You need to complete Game 0 first
          </h1>
          <Link
            href={"/game/0"}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Start Game 0
          </Link>
        </div>
      );
    } else if (userGameCompleted[0].gameCompleted >= 1) {
      return (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl my-2 font-bold text-pretty">
            You have already played this game
          </h1>
        </div>
      );
    }
  }

  const favouriteNumber = Math.floor(Math.random() * 1000);
  const names = ["Alice", "Bob", "Charlie", "David", "Eve"];
  const favNums = Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 1000)
  );

  async function checkContractAddress(contractAddress: `0x${string}`) {
    "use server";
    if (contractAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      const res = await getBytecode(getConfig(), {
        address: contractAddress,
      });
      if (
        res ===
        "0x608060405234801561000f575f80fd5b5060043610610055575f3560e01c80632e64cec11461005957806343ec8f4714610077578063510f17c5146100a75780636057361d146100d85780636f760f41146100f4575b5f80fd5b610061610110565b60405161006e919061029f565b60405180910390f35b610091600480360381019061008c9190610405565b610118565b60405161009e919061029f565b60405180910390f35b6100c160048036038101906100bc9190610476565b610145565b6040516100cf92919061051b565b60405180910390f35b6100f260048036038101906100ed9190610476565b6101fa565b005b61010e60048036038101906101099190610549565b610203565b005b5f8054905090565b6002818051602081018201805184825260208301602085012081835280955050505050505f915090505481565b60018181548110610154575f80fd5b905f5260205f2090600202015f91509050805f018054610173906105d0565b80601f016020809104026020016040519081016040528092919081815260200182805461019f906105d0565b80156101ea5780601f106101c1576101008083540402835291602001916101ea565b820191905f5260205f20905b8154815290600101906020018083116101cd57829003601f168201915b5050505050908060010154905082565b805f8190555050565b6001604051806040016040528084815260200183815250908060018154018082558091505060019003905f5260205f2090600202015f909190919091505f820151815f019081610253919061079d565b506020820151816001015550508060028360405161027191906108a6565b9081526020016040518091039020819055505050565b5f819050919050565b61029981610287565b82525050565b5f6020820190506102b25f830184610290565b92915050565b5f604051905090565b5f80fd5b5f80fd5b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b610317826102d1565b810181811067ffffffffffffffff82111715610336576103356102e1565b5b80604052505050565b5f6103486102b8565b9050610354828261030e565b919050565b5f67ffffffffffffffff821115610373576103726102e1565b5b61037c826102d1565b9050602081019050919050565b828183375f83830152505050565b5f6103a96103a484610359565b61033f565b9050828152602081018484840111156103c5576103c46102cd565b5b6103d0848285610389565b509392505050565b5f82601f8301126103ec576103eb6102c9565b5b81356103fc848260208601610397565b91505092915050565b5f6020828403121561041a576104196102c1565b5b5f82013567ffffffffffffffff811115610437576104366102c5565b5b610443848285016103d8565b91505092915050565b61045581610287565b811461045f575f80fd5b50565b5f813590506104708161044c565b92915050565b5f6020828403121561048b5761048a6102c1565b5b5f61049884828501610462565b91505092915050565b5f81519050919050565b5f82825260208201905092915050565b5f5b838110156104d85780820151818401526020810190506104bd565b5f8484015250505050565b5f6104ed826104a1565b6104f781856104ab565b93506105078185602086016104bb565b610510816102d1565b840191505092915050565b5f6040820190508181035f83015261053381856104e3565b90506105426020830184610290565b9392505050565b5f806040838503121561055f5761055e6102c1565b5b5f83013567ffffffffffffffff81111561057c5761057b6102c5565b5b610588858286016103d8565b925050602061059985828601610462565b9150509250929050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806105e757607f821691505b6020821081036105fa576105f96105a3565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f6008830261065c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610621565b6106668683610621565b95508019841693508086168417925050509392505050565b5f819050919050565b5f6106a161069c61069784610287565b61067e565b610287565b9050919050565b5f819050919050565b6106ba83610687565b6106ce6106c6826106a8565b84845461062d565b825550505050565b5f90565b6106e26106d6565b6106ed8184846106b1565b505050565b5b81811015610710576107055f826106da565b6001810190506106f3565b5050565b601f8211156107555761072681610600565b61072f84610612565b8101602085101561073e578190505b61075261074a85610612565b8301826106f2565b50505b505050565b5f82821c905092915050565b5f6107755f198460080261075a565b1980831691505092915050565b5f61078d8383610766565b9150826002028217905092915050565b6107a6826104a1565b67ffffffffffffffff8111156107bf576107be6102e1565b5b6107c982546105d0565b6107d4828285610714565b5f60209050601f831160018114610805575f84156107f3578287015190505b6107fd8582610782565b865550610864565b601f19841661081386610600565b5f5b8281101561083a57848901518255600182019150602085019450602081019050610815565b868310156108575784890151610853601f891682610766565b8355505b6001600288020188555050505b505050505050565b5f81905092915050565b5f610880826104a1565b61088a818561086c565b935061089a8185602086016104bb565b80840191505092915050565b5f6108b18284610876565b91508190509291505056fea26469706673582212201cbebff4d26e22c84c3a361103351798fdb5433400cb2c7f27cdcac0ef8a0f7964736f6c63430008170033"
      ) {
        return { message: "Valid address", error: "" };
      } else {
        return { message: "", error: "Invalid address" };
      }
    } else {
      return { message: "", error: "Invalid address" };
    }
  }

  async function checkFavoriteNumber(contractAddress: `0x${string}`) {
    "use server";

    try {
      const res = await readContract(getConfig(), {
        abi: [
          {
            inputs: [
              { internalType: "string", name: "_name", type: "string" },
              {
                internalType: "uint256",
                name: "_favouriteNumber",
                type: "uint256",
              },
            ],
            name: "addPerson",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            name: "listOfPersons",
            outputs: [
              { internalType: "string", name: "name", type: "string" },
              {
                internalType: "uint256",
                name: "favouriteNumber",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [{ internalType: "string", name: "", type: "string" }],
            name: "nameToFavNumber",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "retrieve",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "_favouriteNumber",
                type: "uint256",
              },
            ],
            name: "store",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        address: contractAddress,
        functionName: "retrieve",
        blockTag: "latest",
      });

      const retrievedNumber = Number(res);

      if (retrievedNumber === favouriteNumber) {
        return { message: "Correct", error: "" };
      } else {
        return { message: "", error: "Incorrect" };
      }
    } catch (error) {
      console.error(error);
      return { message: "", error: "Failed to fetch data from contract." };
    }
  }

  async function checkAllFavouriteNumbers(contractAddress: `0x${string}`) {
    "use server";

    try {
      names.forEach(async (name, index) => {
        const res = await readContract(getConfig(), {
          abi: [
            {
              inputs: [
                { internalType: "string", name: "_name", type: "string" },
                {
                  internalType: "uint256",
                  name: "_favouriteNumber",
                  type: "uint256",
                },
              ],
              name: "addPerson",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              name: "listOfPersons",
              outputs: [
                { internalType: "string", name: "name", type: "string" },
                {
                  internalType: "uint256",
                  name: "favouriteNumber",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [{ internalType: "string", name: "", type: "string" }],
              name: "nameToFavNumber",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "retrieve",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_favouriteNumber",
                  type: "uint256",
                },
              ],
              name: "store",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
          address: contractAddress,
          functionName: "nameToFavNumber",
          args: [name],
        });
        const retrievedNumber = Number(res);
        if (retrievedNumber === favNums[index]) {
        } else {
          return { message: "", error: "Incorrect" };
        }
      });
      await db.insert(game1).values({
        userId: userId!,
      });
      await db
        .update(users)
        .set({ gameCompleted: 1 })
        .where(eq(users.id, userId!));
      return { message: "All Correct", error: "" };
    } catch (error) {
      console.error(error);
      return { message: "", error: "Failed to fetch data from contract." };
    }
  }

  return (
    <>
      <h1 className="text-2xl my-2 font-bold text-pretty">Game 1</h1>
      <Game1Screen
        checkContractAddress={checkContractAddress}
        favouriteNumber={favouriteNumber}
        checkFavoriteNumber={checkFavoriteNumber}
        names={names}
        favNums={favNums}
        checkAllFavouriteNumbers={checkAllFavouriteNumbers}
      />
    </>
  );
}
