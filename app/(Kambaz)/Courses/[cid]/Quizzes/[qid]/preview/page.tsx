/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Form } from "react-bootstrap";
import * as quizClient from "../../../../Quizzes/client";
import Link from "next/link";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const quizId = Array.isArray(qid) ? qid[0] : qid;
  const router = useRouter();

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!quizId) return;
    fetchQuizAndQuestions();
  }, [quizId]);

  const fetchQuizAndQuestions = async () => {
    setLoading(true);
    try {
      const quizData = await quizClient.findQuizById(quizId as any);

      const questionsData = await quizClient.findQuestionsForQuiz(quizId as any);
      const questionsList = Array.isArray(questionsData) ? questionsData : [];
      setQuestions(questionsList);

      // Calculate actual points from questions
      const calculatedPoints = questionsList.reduce(
        (sum, q: any) => sum + (q.points || 0),
        0
      );

      setQuiz({
        ...quizData,
        points: calculatedPoints,
      });
    } catch (err) {
      console.error("fetch quiz error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const gradeQuiz = () => {
    let totalScore = 0;
    questions.forEach((question) => {
      const userAnswer = answers[question._id];
      let isCorrect = false;

      if (question.type === "MULTIPLE_CHOICE") {
        const correctChoice = question.choices.find((c: any) => c.isCorrect);
        isCorrect = userAnswer === correctChoice?.text;
      } else if (question.type === "TRUE_FALSE") {
        isCorrect = userAnswer === question.correctAnswer;
      } else if (question.type === "FILL_IN_BLANK") {
        const userAnswerStr = question.caseSensitive
          ? userAnswer
          : userAnswer?.toLowerCase();
        isCorrect = question.possibleAnswers.some((ans: string) => {
          const compareAns = question.caseSensitive ? ans : ans.toLowerCase();
          return userAnswerStr === compareAns;
        });
      }

      if (isCorrect) {
        totalScore += question.points || 0;
      }
    });

    setScore(totalScore);
    setSubmitted(true);
  };

  const isQuestionCorrect = (question: any) => {
    const userAnswer = answers[question._id];
    if (!userAnswer) return false;

    if (question.type === "MULTIPLE_CHOICE") {
      const correctChoice = question.choices.find((c: any) => c.isCorrect);
      return userAnswer === correctChoice?.text;
    } else if (question.type === "TRUE_FALSE") {
      return userAnswer === question.correctAnswer;
    } else if (question.type === "FILL_IN_BLANK") {
      const userAnswerStr = question.caseSensitive
        ? userAnswer
        : userAnswer?.toLowerCase();
      return question.possibleAnswers.some((ans: string) => {
        const compareAns = question.caseSensitive ? ans : ans.toLowerCase();
        return userAnswerStr === compareAns;
      });
    }
    return false;
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!quiz) {
    return <div className="p-4">Quiz not found</div>;
  }

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Preview: {quiz.title}</h2>
        <Link href={`/Courses/${courseId}/Quizzes/${quizId}/edit`}>
          <Button variant="secondary">Edit Quiz</Button>
        </Link>
      </div>

      {submitted && (
        <Card className="mb-4 bg-light">
          <Card.Body>
            <h4>Preview Score: {score} / {quiz.points}</h4>
            <p className="text-muted">
              This is a preview. Your score is not saved.
            </p>
          </Card.Body>
        </Card>
      )}

      {questions.map((question, index) => (
        <Card
          key={question._id}
          className={`mb-3 ${
            submitted
              ? isQuestionCorrect(question)
                ? "border-success"
                : "border-danger"
              : ""
          }`}
        >
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <strong>Question {index + 1}</strong>
                <span className="ms-2 text-muted">({question.points} pts)</span>
              </div>
              {submitted && (
                <div>
                  {isQuestionCorrect(question) ? (
                    <span className="badge bg-success">Correct</span>
                  ) : (
                    <span className="badge bg-danger">Incorrect</span>
                  )}
                </div>
              )}
            </div>

            <p>{question.question}</p>

            {question.type === "MULTIPLE_CHOICE" && (
              <div>
                {question.choices.map((choice: any, choiceIndex: number) => (
                  <Form.Check
                    key={choiceIndex}
                    type="radio"
                    name={`question-${question._id}`}
                    label={choice.text}
                    value={choice.text}
                    checked={answers[question._id] === choice.text}
                    onChange={(e) =>
                      handleAnswerChange(question._id, e.target.value)
                    }
                    disabled={submitted}
                    className={
                      submitted && choice.isCorrect ? "text-success fw-bold" : ""
                    }
                  />
                ))}
              </div>
            )}

            {question.type === "TRUE_FALSE" && (
              <div>
                <Form.Check
                  type="radio"
                  name={`question-${question._id}`}
                  label="True"
                  value="true"
                  checked={answers[question._id] === true}
                  onChange={() => handleAnswerChange(question._id, true)}
                  disabled={submitted}
                  className={
                    submitted && question.correctAnswer === true
                      ? "text-success fw-bold"
                      : ""
                  }
                />
                <Form.Check
                  type="radio"
                  name={`question-${question._id}`}
                  label="False"
                  value="false"
                  checked={answers[question._id] === false}
                  onChange={() => handleAnswerChange(question._id, false)}
                  disabled={submitted}
                  className={
                    submitted && question.correctAnswer === false
                      ? "text-success fw-bold"
                      : ""
                  }
                />
              </div>
            )}

            {question.type === "FILL_IN_BLANK" && (
              <div>
                <Form.Control
                  type="text"
                  value={answers[question._id] || ""}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  placeholder="Enter your answer"
                  disabled={submitted}
                />
                {submitted && (
                  <div className="mt-2 text-muted small">
                    <strong>Correct answers:</strong>{" "}
                    {question.possibleAnswers.join(", ")}
                  </div>
                )}
              </div>
            )}
          </Card.Body>
        </Card>
      ))}

      {!submitted && (
        <Button variant="primary" onClick={gradeQuiz}>
          Submit Preview
        </Button>
      )}

      {submitted && (
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Reset Preview
        </Button>
      )}
    </div>
  );
}
