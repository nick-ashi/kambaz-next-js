/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import * as quizClient from "../../../../Quizzes/client";

export default function QuizResults() {
  const { cid, qid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const quizId = Array.isArray(qid) ? qid[0] : qid;
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [latestAttempt, setLatestAttempt] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!quizId || !currentUser) return;
    fetchResults();
  }, [quizId, currentUser]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const quizData = await quizClient.findQuizById(quizId as any);

      const questionsData = await quizClient.findQuestionsForQuiz(quizId as any);
      const questionsList = Array.isArray(questionsData) ? questionsData : [];
      setQuestions(questionsList);

      // Calc actual points from qs
      const calculatedPoints = questionsList.reduce(
        (sum, q: any) => sum + (q.points || 0),
        0
      );

      setQuiz({
        ...quizData,
        points: calculatedPoints,
      });

      const attemptData = await quizClient.findLatestAttemptForUserAndQuiz(
        currentUser._id,
        quizId as any
      );
      setLatestAttempt(attemptData);
    } catch (err) {
      console.error("fetch results error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getQuestionAnswer = (questionId: string) => {
    if (!latestAttempt) return null;
    return latestAttempt.answers.find((a: any) => a.question === questionId);
  };

  const getCorrectAnswerDisplay = (question: any) => {
    if (question.type === "MULTIPLE_CHOICE") {
      const correctChoice = question.choices.find((c: any) => c.isCorrect);
      return correctChoice?.text || "N/A";
    } else if (question.type === "TRUE_FALSE") {
      return question.correctAnswer ? "True" : "False";
    } else if (question.type === "FILL_IN_BLANK") {
      return question.possibleAnswers.join(", ");
    }
    return "N/A";
  };

  const getUserAnswerDisplay = (question: any, userAnswer: any) => {
    if (!userAnswer?.answer) return "Not answered";

    if (question.type === "TRUE_FALSE") {
      return userAnswer.answer ? "True" : "False";
    }
    return String(userAnswer.answer);
  };

  if (loading) {
    return <div className="p-4">Loading results...</div>;
  }

  if (!quiz || !latestAttempt) {
    return (
      <div className="p-4">
        <Alert variant="warning">
          <h4>No Quiz Results</h4>
          <p>You have not taken this quiz yet.</p>
          <Button
            variant="primary"
            onClick={() => router.push(`/Courses/${courseId}/Quizzes/${quizId}/take`)}
          >
            Take Quiz
          </Button>
        </Alert>
      </div>
    );
  }

  const canRetake =
    quiz.multipleAttempts && latestAttempt.attemptNumber < quiz.howManyAttempts;

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2>{quiz.title} - Results</h2>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <h3>
            Score: {latestAttempt.score} / {quiz.points} (
            {quiz.points > 0
              ? ((latestAttempt.score / quiz.points) * 100).toFixed(1)
              : 0}
            %)
          </h3>
          <div className="text-muted">
            <div>
              <strong>Attempt:</strong> {latestAttempt.attemptNumber} /{" "}
              {quiz.multipleAttempts ? quiz.howManyAttempts : 1}
            </div>
            <div>
              <strong>Submitted:</strong>{" "}
              {new Date(latestAttempt.submittedAt).toLocaleString()}
            </div>
          </div>
          {canRetake && (
            <div className="mt-3">
              <Button
                variant="primary"
                onClick={() =>
                  router.push(`/Courses/${courseId}/Quizzes/${quizId}/take`)
                }
              >
                Retake Quiz
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>

      <h4 className="mb-3">Question Review</h4>

      {questions.map((question, index) => {
        const userAnswer = getQuestionAnswer(question._id);
        const isCorrect = userAnswer?.isCorrect || false;

        return (
          <Card
            key={question._id}
            className={`mb-3 ${isCorrect ? "border-success" : "border-danger"}`}
          >
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <strong>Question {index + 1}</strong>
                  <span className="ms-2 text-muted">({question.points} pts)</span>
                </div>
                <div>
                  {isCorrect ? (
                    <span className="text-success">
                      <FaCheckCircle className="me-1" />
                      Correct ({userAnswer.pointsEarned} pts)
                    </span>
                  ) : (
                    <span className="text-danger">
                      <FaTimesCircle className="me-1" />
                      Incorrect (0 pts)
                    </span>
                  )}
                </div>
              </div>

              <p className="fw-bold">{question.question}</p>

              <div className="mb-2">
                <strong>Your Answer:</strong>{" "}
                <span className={isCorrect ? "text-success" : "text-danger"}>
                  {getUserAnswerDisplay(question, userAnswer)}
                </span>
              </div>

              {!isCorrect && quiz.showCorrectAnswers !== "NEVER" && (
                <div className="mb-2">
                  <strong>Correct Answer:</strong>{" "}
                  <span className="text-success">
                    {getCorrectAnswerDisplay(question)}
                  </span>
                </div>
              )}

              {question.type === "MULTIPLE_CHOICE" &&
                quiz.showCorrectAnswers !== "NEVER" && (
                  <div className="mt-3">
                    <strong>All Choices:</strong>
                    <ul className="mt-2">
                      {question.choices.map((choice: any, choiceIndex: number) => (
                        <li
                          key={choiceIndex}
                          className={choice.isCorrect ? "text-success fw-bold" : ""}
                        >
                          {choice.text}
                          {choice.isCorrect && " ✓"}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </Card.Body>
          </Card>
        );
      })}

      <div className="mt-4">
        <Button
          variant="secondary"
          onClick={() => router.push(`/Courses/${courseId}/Quizzes`)}
        >
          Back to Quizzes
        </Button>
      </div>
    </div>
  );
}
