/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as quizClient from "../../../Quizzes/client";
import Link from "next/link";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const quizId = Array.isArray(qid) ? qid[0] : qid;
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  useEffect(() => {
    if (!quizId) return;
    fetchQuizDetails();
  }, [quizId]);

  const fetchQuizDetails = async () => {
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

      // Use calculated points if different from stored points
      setQuiz({
        ...quizData,
        points: calculatedPoints,
      });
    } catch (err) {
      console.error("fetch quiz details error:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString();
  };

  const getQuizTypeLabel = (type: string) => {
    const types: any = {
      GRADED_QUIZ: "Graded Quiz",
      PRACTICE_QUIZ: "Practice Quiz",
      GRADED_SURVEY: "Graded Survey",
      UNGRADED_SURVEY: "Ungraded Survey",
    };
    return types[type] || type;
  };

  const getAssignmentGroupLabel = (group: string) => {
    const groups: any = {
      QUIZZES: "Quizzes",
      EXAMS: "Exams",
      ASSIGNMENTS: "Assignments",
      PROJECT: "Project",
    };
    return groups[group] || group;
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
        <h2>{quiz.title}</h2>
        <div>
          {isFaculty && (
            <>
              <Link href={`/Courses/${courseId}/Quizzes/${quizId}/preview`}>
                <Button variant="secondary" className="me-2">
                  Preview
                </Button>
              </Link>
              <Link href={`/Courses/${courseId}/Quizzes/${quizId}/edit`}>
                <Button variant="primary">Edit</Button>
              </Link>
            </>
          )}
          {!isFaculty && quiz.published && (
            <Link href={`/Courses/${courseId}/Quizzes/${quizId}/take`}>
              <Button variant="danger">Take Quiz</Button>
            </Link>
          )}
        </div>
      </div>

      <Card className="mb-4">
        <Card.Body>
          {quiz.description && (
            <div
              className="mb-3"
              dangerouslySetInnerHTML={{ __html: quiz.description }}
            />
          )}

          <table className="table table-borderless">
            <tbody>
              <tr>
                <td className="fw-bold">Quiz Type</td>
                <td>{getQuizTypeLabel(quiz.quizType)}</td>
              </tr>
              <tr>
                <td className="fw-bold">Points</td>
                <td>{quiz.points}</td>
              </tr>
              <tr>
                <td className="fw-bold">Assignment Group</td>
                <td>{getAssignmentGroupLabel(quiz.assignmentGroup)}</td>
              </tr>
              <tr>
                <td className="fw-bold">Shuffle Answers</td>
                <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="fw-bold">Time Limit</td>
                <td>{quiz.timeLimit} Minutes</td>
              </tr>
              <tr>
                <td className="fw-bold">Multiple Attempts</td>
                <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
              </tr>
              {quiz.multipleAttempts && (
                <tr>
                  <td className="fw-bold">How Many Attempts</td>
                  <td>{quiz.howManyAttempts}</td>
                </tr>
              )}
              <tr>
                <td className="fw-bold">Show Correct Answers</td>
                <td>{quiz.showCorrectAnswers}</td>
              </tr>
              <tr>
                <td className="fw-bold">Access Code</td>
                <td>{quiz.accessCode || "None"}</td>
              </tr>
              <tr>
                <td className="fw-bold">One Question at a Time</td>
                <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="fw-bold">Webcam Required</td>
                <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="fw-bold">Lock Questions After Answering</td>
                <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <table className="table table-borderless">
            <tbody>
              <tr>
                <td className="fw-bold">Due</td>
                <td>{formatDate(quiz.dueDate)}</td>
              </tr>
              <tr>
                <td className="fw-bold">Available from</td>
                <td>{formatDate(quiz.availableDate)}</td>
              </tr>
              <tr>
                <td className="fw-bold">Until</td>
                <td>{formatDate(quiz.untilDate)}</td>
              </tr>
            </tbody>
          </table>
        </Card.Body>
      </Card>

      <div className="text-muted">
        <strong>{questions.length}</strong> question{questions.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
