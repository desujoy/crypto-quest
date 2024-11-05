import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { walletAddress } = await req.json();
  const session = await auth();
  console.log(session);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return new Response("Unauthorized", { status: 401 });
  }
  const user = await db.select().from(users).where(eq(users.email, userEmail));
  if (!user[0]) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (user[0].walletAddress) {
    if (user[0].walletAddress !== walletAddress) {
      return new Response("Wrong wallet address", { status: 400 });
    }
    return new Response("Wallet already connected", { status: 200 });
  }
  const res = await db
    .update(users)
    .set({ walletAddress })
    .where(eq(users.email, userEmail));
  if (!res) {
    return new Response("Error", { status: 500 });
  }
  return new Response("ok");
}
