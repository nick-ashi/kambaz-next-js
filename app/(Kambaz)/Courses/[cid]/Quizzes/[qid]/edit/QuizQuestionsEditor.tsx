/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";
import * as quizClient from "../../../../Quizzes/client";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FillInBlankEditor from "./FillInBlankEditor";

interface QuizQuestionsEditorProps {
  quizId: string;
  courseId: string;
}

export default function QuizQuestionsEditor({
  quizId,
  // may not need? 
  courseId,
}: QuizQuestionsEditorProps) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const data = await quizClient.findQuestionsForQuiz(quizId);
      setQuestions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetch questions error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = async (type: string) => {
    try {
      const newQuestion: any = {
        type,
        title: "New Question",
        points: 1,
        question: "",
      };

      if (type === "MULTIPLE_CHOICE") {
        newQuestion.choices = [
          { text: "Option 1", isCorrect: true },
          { text: "Option 2", isCorrect: false },
        ];
      } else if (type === "TRUE_FALSE") {
        newQuestion.correctAnswer = true;
      } else if (type === "FILL_IN_BLANK") {
        newQuestion.possibleAnswers = [""];
        newQuestion.caseSensitive = false;
      }

      const created = await quizClient.createQuestion(quizId, newQuestion);
      setQuestions([...questions, created]);
      setEditingQuestionId(created._id);

      // Update quiz points
      await updateQuizPoints();
    } catch (err) {
      console.error("add question error:", err);
      alert("Failed to add question");
    }
  };

  const handleSaveQuestion = async (questionId: string, updatedQuestion: any) => {
    try {
      await quizClient.updateQuestion(questionId, updatedQuestion);
      setQuestions(
        questions.map((q) => (q._id === questionId ? updatedQuestion : q))
      );
      setEditingQuestionId(null);

      // Update quiz points
      await updateQuizPoints();
    } catch (err) {
      console.error("save question error:", err);
      alert("Failed to save question");
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!confirm("Delete this question?")) return;
    try {
      await quizClient.deleteQuestion(questionId);
      setQuestions(questions.filter((q) => q._id !== questionId));

      // Update quiz points
      await updateQuizPoints();
    } catch (err) {
      console.error("delete question error:", err);
      alert("Failed to delete question");
    }
  };

  const updateQuizPoints = async () => {
    try {
      const updatedQuestions = await quizClient.findQuestionsForQuiz(quizId);
      const totalPoints = updatedQuestions.reduce(
        (sum: number, q: any) => sum + (q.points || 0),
        0
      );
      await quizClient.updateQuiz(quizId, { points: totalPoints });
    } catch (err) {
      console.error("update quiz points error:", err);
    }
  };

  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  if (loading) {
    return <div>Loading questions...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <strong>Total Points: {totalPoints}</strong>
        </div>
        <div>
          <Button
            variant="outline-primary"
            size="sm"
            className="me-2"
            onClick={() => handleAddQuestion("MULTIPLE_CHOICE")}
          >
            <FaPlus className="me-1" /> Multiple Choice
          </Button>
          <Button
            variant="outline-primary"
            size="sm"
            className="me-2"
            onClick={() => handleAddQuestion("TRUE_FALSE")}
          >
            <FaPlus className="me-1" /> True/False
          </Button>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => handleAddQuestion("FILL_IN_BLANK")}
          >
            <FaPlus className="me-1" /> Fill in Blank
          </Button>
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="text-center text-muted my-5">
          <p>No questions yet.</p>
          <p>Click one of the buttons above to add your first question.</p>
        </div>
      ) : (
        <div>
          {questions.map((question, index) => (
            <Card key={question._id} className="mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <strong>Question {index + 1}</strong>
                    <span className="ms-2 badge bg-secondary">
                      {question.type.replace("_", " ")}
                    </span>
                    <span className="ms-2 text-muted">{question.points} pts</span>
                  </div>
                  <Button
                    variant="link"
                    className="text-danger p-0"
                    onClick={() => handleDeleteQuestion(question._id)}
                  >
                    <FaTrash />
                  </Button>
                </div>

                {editingQuestionId === question._id ? (
                  <>
                    {question.type === "MULTIPLE_CHOICE" && (
                      <MultipleChoiceEditor
                        question={question}
                        onSave={(updated) => handleSaveQuestion(question._id, updated)}
                        onCancel={() => setEditingQuestionId(null)}
                      />
                    )}
                    {question.type === "TRUE_FALSE" && (
                      <TrueFalseEditor
                        question={question}
                        onSave={(updated) => handleSaveQuestion(question._id, updated)}
                        onCancel={() => setEditingQuestionId(null)}
                      />
                    )}
                    {question.type === "FILL_IN_BLANK" && (
                      <FillInBlankEditor
                        question={question}
                        onSave={(updated) => handleSaveQuestion(question._id, updated)}
                        onCancel={() => setEditingQuestionId(null)}
                      />
                    )}
                  </>
                ) : (
                  <div>
                    <div className="mb-2">
                      <strong>{question.title}</strong>
                    </div>
                    <div className="text-muted mb-2">{question.question}</div>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => setEditingQuestionId(question._id)}
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
