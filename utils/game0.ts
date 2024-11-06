import { db } from "@/db";
import { game0questions } from "@/db/schema";

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
  .from(game0questions);

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
  const correctAnswers = await db
    .select({
      id: game0questions.id,
      answer: game0questions.answer,
    })
    .from(game0questions);
  let score = 0;
  answers.forEach((answer) => {
    const correctAnswer = correctAnswers.find(
      (a) => a.id === answer.id
    )?.answer;
    if (correctAnswer === answer.answer) {
      score += 100 / answers.length;
    }
  });
  return Math.floor(score);
};
