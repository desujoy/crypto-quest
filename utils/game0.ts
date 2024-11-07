import { db } from "@/db";
import { game0questions } from "@/db/schema";
import { inArray, sql } from "drizzle-orm";

export type Question = {
  id: string;
  question: string;
  options: string[];
};

export type Answer = {
  id: string;
  answer: string;
};

export const questions = await db
  .select({
    id: game0questions.id,
    question: game0questions.question,
    option1: game0questions.option1,
    option2: game0questions.option2,
    option3: game0questions.option3,
    option4: game0questions.option4,
  })
  .from(game0questions)
  .orderBy(sql`random()`)
  .limit(10);

export const getQuestions = async () => {
  const _questions = questions.map((question) => {
    return {
      id: question.id,
      question: question.question,
      options: [
        question.option1,
        question.option2,
        question.option3,
        question.option4,
      ].sort(() => Math.random() - 0.5),
    } as Question;
  });
  return _questions.sort(() => Math.random() - 0.5);
};

export const evaluateAnswers = async (answers: Answer[]) => {
  const answerIds = answers.map((answer) => answer.id);

  const correctAnswers = await db
    .select({
      id: game0questions.id,
      answer: game0questions.answer,
    })
    .from(game0questions)
    .where(inArray(game0questions.id, answerIds));

  const score = answers.reduce((total, answer) => {
    const correctAnswer = correctAnswers.find(
      (a) => a.id === answer.id
    )?.answer;
    return correctAnswer === answer.answer
      ? total + 100 / answers.length
      : total;
  }, 0);

  return Math.floor(score);
};
