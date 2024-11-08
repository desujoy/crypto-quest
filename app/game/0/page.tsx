import { auth } from "@/auth";
import Game0Screen from "@/components/Game0Screen";
import { db } from "@/db";
import { game0, users } from "@/db/schema";
import { Answer, evaluateAnswers, getQuestions } from "@/utils/game0";
import { eq } from "drizzle-orm";

export default async function Game0() {
  const session = await auth();
  const userId = session?.user?.id;

  const userStatus = await db
    .select()
    .from(game0)
    .where(eq(game0.userId, userId!));

  if (userStatus[0]) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Game 0</h1>
        <h2 className="text-2xl">You have already played the game</h2>
        <h2 className="text-2xl">Your score: {userStatus[0].score}%</h2>
      </div>
    );
  }

  const questions = await getQuestions();

  async function evaluate(answer: Answer[]) {
    "use server";
    const result = await evaluateAnswers(answer);
    if (userId && userStatus.length === 0) {
      await db.insert(game0).values({
        userId: userId,
        score: result,
      });
      await db
        .update(users)
        .set({ gameCompleted: 0 })
        .where(eq(users.id, userId));
    }
    return result;
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Game 0</h1>
      <Game0Screen questions={questions} evaluateAnswer={evaluate} />
    </div>
  );
}
