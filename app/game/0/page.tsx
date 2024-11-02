import Game0Screen from "@/components/Game0Screen";
import { evaluateAnswers, getQuestions } from "@/utils/game0";

export default async function Game0() {
  const questions = await getQuestions();

  async function evaluate(answer: string[]) {
    "use server";
    const result = await evaluateAnswers(answer);
    return result;
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Game 0</h1>
      <Game0Screen questions={questions} evaluateAnswer={evaluate} />
    </div>
  );
}
