"use client";

import { Answer, Question } from "@/utils/game0";
import Link from "next/link";
import { useState } from "react";

export default function Game0Screen({
  questions,
  evaluateAnswer,
}: {
  questions: Question[];
  evaluateAnswer: (answers: Answer[]) => Promise<number>;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(
    Array.from(questions, (q) => ({ id: q.id, answer: "" }))
  );
  const [score, setScore] = useState<number | null>(null);

  async function handleNext() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const result = await evaluateAnswer(answers);
      setScore(result);
    }
  }

  function handleAnswer(qid: string, answer: string) {
    setAnswers((prev) =>
      prev.map((ans) => (ans.id === qid ? { id: qid, answer } : ans))
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {score == null && (
        <>
          <h3 className="text-xl font-bold my-4">
            Question {currentQuestion + 1}/{questions.length}
          </h3>
          <h1 className="text-2xl my-2 font-bold text-pretty">
            {questions[currentQuestion].question}
          </h1>
          <div className="flex flex-col gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={
                  answers[currentQuestion]?.answer === option
                    ? "bg-blue-500 text-white px-4 py-2 rounded-md"
                    : "bg-white text-black px-4 py-2 rounded-md border-2 border-blue-500"
                }
                onClick={() =>
                  handleAnswer(questions[currentQuestion].id, option)
                }
              >
                {option}
              </button>
            ))}
          </div>
          <button
            className="bg-blue-500 disabled:bg-slate-500 text-white px-4 py-2 my-4 rounded-md w-32 text-center"
            onClick={handleNext}
            disabled={answers[currentQuestion].answer === ""}
          >
            {currentQuestion < questions.length - 1 ? "Next" : "Submit"}
          </button>
        </>
      )}
      {score !== null && (
        <>
          <p className="text-2xl my-4 font-bold text-pretty">
            Your score is: {score}%
          </p>

          {score >= 60 ? (
            <p className="text-2xl my-2 font-bold text-pretty">
              Congratulations! You have passed the quiz.
              <Link href="/game/1">Click here to play the next game.</Link>
            </p>
          ) : (
            <p className="text-2xl my-2 font-bold text-pretty">
              You need to score 60% or more to pass the quiz. Please try again.
            </p>
          )}
        </>
      )}
    </div>
  );
}
