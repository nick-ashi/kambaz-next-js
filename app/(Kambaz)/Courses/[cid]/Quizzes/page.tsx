/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, Button, Dropdown } from "react-bootstrap";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus, FaCheckCircle, FaBan } from "react-icons/fa";
import { useSelector } from "react-redux";
import * as quizClient from "../../Quizzes/client";

export default function Quizzes() {
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [quizScores, setQuizScores] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  useEffect(() => {
    if (!courseId) return;
    fetchQuizzes();
  }, [courseId]);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const data = await quizClient.findQuizzesForCourse(courseId as any);
      const quizzesList = Array.isArray(data) ? data : [];

      // Fetch question counts and calculate points for each quiz
      const quizzesWithCounts = await Promise.all(
        quizzesList.map(async (quiz: any) => {
          try {
            const questions = await quizClient.findQuestionsForQuiz(quiz._id);
            const questionsList = Array.isArray(questions) ? questions : [];
            const calculatedPoints = questionsList.reduce(
              (sum, q: any) => sum + (q.points || 0),
              0
            );
            return {
              ...quiz,
              questionCount: questionsList.length,
              points: calculatedPoints,
            };
          } catch (err) {
            return { ...quiz, questionCount: 0, points: 0 };
          }
        })
      );

      setQuizzes(quizzesWithCounts);

      // Fetch student scores for each quiz
      if (!isFaculty && currentUser) {
        const scores: any = {};
        for (const quiz of quizzesWithCounts) {
          try {
            const attempt = await quizClient.findLatestAttemptForUserAndQuiz(
              currentUser._id,
              quiz._id
            );
            if (attempt) {
              scores[quiz._id] = attempt.score;
            }
          } catch (err) {
            // No attempt yet
          }
        }
        setQuizScores(scores);
      }
    } catch (err) {
      console.error("fetch quizzes error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuiz = async () => {
    try {
      const newQuiz = await quizClient.createQuiz(courseId as any, {
        title: "Unnamed Quiz",
        quizType: "GRADED_QUIZ",
        points: 0,
        published: false,
      });
      setQuizzes([...quizzes, newQuiz]);
    } catch (err) {
      console.error("create quiz error:", err);
      alert("Failed to create quiz");
    }
  };

  const handleDeleteQuiz = async (quizId: string) => {
    if (!confirm("Delete this quiz? This cannot be undone.")) return;
    try {
      await quizClient.deleteQuiz(quizId);
      setQuizzes(quizzes.filter((q) => q._id !== quizId));
    } catch (err) {
      console.error("delete quiz error:", err);
      alert("Failed to delete quiz");
    }
  };

  const handleTogglePublish = async (quiz: any) => {
    try {
      const updatedQuiz = quiz.published
        ? await quizClient.unpublishQuiz(quiz._id)
        : await quizClient.publishQuiz(quiz._id);
      setQuizzes(quizzes.map((q) => (q._id === quiz._id ? updatedQuiz : q)));
    } catch (err) {
      console.error("toggle publish error:", err);
      alert("Failed to update quiz");
    }
  };

  const getAvailabilityText = (quiz: any) => {
    const now = new Date();
    const availableDate = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const untilDate = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (!availableDate) return "Not available";
    if (now < availableDate) {
      return `Not available until ${availableDate.toLocaleDateString()}`;
    }
    if (untilDate && now > untilDate) {
      return "Closed";
    }
    return "Available";
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "No due date";
    return new Date(dateString).toLocaleDateString();
  };

  // Filter quizzes based on user role
  const displayQuizzes = isFaculty
    ? quizzes
    : quizzes.filter((quiz) => quiz.published);

  return (
    <div id="wd-quizzes" className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Quizzes</h2>
        {isFaculty && (
          <Button variant="danger" onClick={handleCreateQuiz}>
            <FaPlus className="me-2" />
            Quiz
          </Button>
        )}
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : displayQuizzes.length === 0 ? (
        <div className="text-center text-muted my-5">
          <p>No quizzes available.</p>
          {isFaculty && (
            <p>Click the "+ Quiz" button above to create your first quiz.</p>
          )}
        </div>
      ) : (
        <ListGroup>
          {displayQuizzes.map((quiz) => (
            <ListGroupItem
              key={quiz._id}
              className="d-flex justify-content-between align-items-start p-3"
            >
              <div className="d-flex align-items-start flex-grow-1">
                <BsGripVertical className="me-3 mt-1" />
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center mb-2">
                    {quiz.published ? (
                      <FaCheckCircle className="text-success me-2" title="Published" />
                    ) : (
                      <FaBan className="text-danger me-2" title="Unpublished" />
                    )}
                    <Link
                      href={`/Courses/${courseId}/Quizzes/${quiz._id}`}
                      className="fw-bold text-decoration-none"
                    >
                      {quiz.title}
                    </Link>
                  </div>
                  <div className="text-muted small">
                    <div>
                      <strong>{getAvailabilityText(quiz)}</strong>
                    </div>
                    <div>
                      <strong>Due:</strong> {formatDate(quiz.dueDate)} |{" "}
                      <strong>Points:</strong> {quiz.points} |{" "}
                      <strong>Questions:</strong> {quiz.questionCount || 0}
                      {!isFaculty && quizScores[quiz._id] !== undefined && (
                        <>
                          {" | "}
                          <strong>Score:</strong> {quizScores[quiz._id]} / {quiz.points}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {isFaculty && (
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="link"
                    className="text-dark p-0"
                    id={`dropdown-${quiz._id}`}
                  >
                    <BsThreeDotsVertical />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      as={Link}
                      href={`/Courses/${courseId}/Quizzes/${quiz._id}/edit`}
                    >
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleTogglePublish(quiz)}>
                      {quiz.published ? "Unpublish" : "Publish"}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDeleteQuiz(quiz._id)}>
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
