/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Form, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as quizClient from "../../../../Quizzes/client";

export default function TakeQuiz() {
  const { cid, qid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const quizId = Array.isArray(qid) ? qid[0] : qid;
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [attempts, setAttempts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!quizId || !currentUser) return;
    fetchQuizData();
  }, [quizId, currentUser]);

  const fetchQuizData = async () => {
    setLoading(true);
    setError("");
    try {
      const quizData = await quizClient.findQuizById(quizId as any);

      const questionsData = await quizClient.findQuestionsForQuiz(quizId as any);
      const questionsList = Array.isArray(questionsData) ? questionsData : [];
      setQuestions(questionsList);

      // Calculate points from qs
      const calculatedPoints = questionsList.reduce(
        (sum, q: any) => sum + (q.points || 0),
        0
      );

      setQuiz({
        ...quizData,
        points: calculatedPoints,
      });

      const attemptsData = await quizClient.findAttemptsForUserAndQuiz(
        currentUser._id,
        quizId as any
      );
      setAttempts(Array.isArray(attemptsData) ? attemptsData : []);
    } catch (err) {
      console.error("fetch quiz error:", err);
      setError("Failed to load quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      alert("You must be logged in to submit a quiz");
      return;
    }

    // Check if user has done too many attempts
    if (!quiz.multipleAttempts && attempts.length >= 1) {
      alert("You have already taken this quiz");
      return;
    }
    if (quiz.multipleAttempts && attempts.length >= quiz.howManyAttempts) {
      alert(`You have used all ${quiz.howManyAttempts} attempts`);
      return;
    }

    // Validate all questions answered
    const unanswered = questions.filter((q) => !answers[q._id]);
    if (unanswered.length > 0) {
      if (!confirm(`You have ${unanswered.length} unanswered questions. Submit anyway?`)) {
        return;
      }
    }

    try {
      // Format ans for submission
      const formattedAnswers = questions.map((q) => ({
        question: q._id,
        answer: answers[q._id],
      }));

      // Submit attempt
      const attempt = await quizClient.submitQuizAttempt(
        currentUser._id,
        quizId as any,
        courseId as any,
        formattedAnswers
      );

      // nav to results page
      router.push(`/Courses/${courseId}/Quizzes/${quizId as any}/results`);
    } catch (err) {
      console.error("submit quiz error:", err);
      alert("Failed to submit quiz. Please try again.");
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  if (!quiz) {
    return <div className="p-4">Quiz not found</div>;
  }

  // Check if user can take the quiz
  const canTakeQuiz =
    quiz.multipleAttempts
      ? attempts.length < quiz.howManyAttempts
      : attempts.length === 0;

  if (!canTakeQuiz) {
    return (
      <div className="p-4">
        <Alert variant="warning">
          <h4>Quiz Attempts Exhausted</h4>
          <p>
            You have used all available attempts for this quiz (
            {attempts.length} / {quiz.multipleAttempts ? quiz.howManyAttempts : 1}).
          </p>
          <Button
            variant="primary"
            onClick={() => router.push(`/Courses/${courseId}/Quizzes/${quizId}/results`)}
          >
            View Your Results
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2>{quiz.title}</h2>
        {quiz.description && (
          <div
            className="text-muted"
            dangerouslySetInnerHTML={{ __html: quiz.description }}
          />
        )}
        <div className="mt-2">
          <strong>Points:</strong> {quiz.points} |{" "}
          <strong>Time Limit:</strong> {quiz.timeLimit} minutes |{" "}
          <strong>Attempts:</strong> {attempts.length} /{" "}
          {quiz.multipleAttempts ? quiz.howManyAttempts : 1}
        </div>
      </div>

      {questions.map((question, index) => (
        <Card key={question._id} className="mb-3">
          <Card.Body>
            <div className="mb-3">
              <strong>Question {index + 1}</strong>
              <span className="ms-2 text-muted">({question.points} pts)</span>
            </div>

            <p>{question.question}</p>

            {question.type === "MULTIPLE_CHOICE" && (
              <div>
                {(quiz.shuffleAnswers
                  ? [...question.choices].sort(() => Math.random() - 0.5)
                  : question.choices
                ).map((choice: any, choiceIndex: number) => (
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
                />
                <Form.Check
                  type="radio"
                  name={`question-${question._id}`}
                  label="False"
                  value="false"
                  checked={answers[question._id] === false}
                  onChange={() => handleAnswerChange(question._id, false)}
                />
              </div>
            )}

            {question.type === "FILL_IN_BLANK" && (
              <div>
                <Form.Control
                  type="text"
                  value={answers[question._id] || ""}
                  onChange={(e) =>
                    handleAnswerChange(question._id, e.target.value)
                  }
                  placeholder="Enter your answer"
                />
              </div>
            )}
          </Card.Body>
        </Card>
      ))}

      <div className="d-flex gap-2">
        <Button
          variant="secondary"
          onClick={() => router.push(`/Courses/${courseId}/Quizzes`)}
        >
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit Quiz
        </Button>
      </div>
    </div>
  );
}
