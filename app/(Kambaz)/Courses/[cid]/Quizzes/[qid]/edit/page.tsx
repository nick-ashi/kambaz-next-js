/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, Nav, Tab } from "react-bootstrap";
import * as quizClient from "../../../../Quizzes/client";
import QuizQuestionsEditor from "./QuizQuestionsEditor";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const quizId = Array.isArray(qid) ? qid[0] : qid;
  const router = useRouter();

  const [quiz, setQuiz] = useState<any>({
    title: "",
    description: "",
    quizType: "GRADED_QUIZ",
    points: 0,
    assignmentGroup: "QUIZZES",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    howManyAttempts: 1,
    showCorrectAnswers: "IMMEDIATELY",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "",
    availableDate: "",
    untilDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    if (!quizId) return;
    fetchQuiz();
  }, [quizId]);

  const fetchQuiz = async () => {
    setLoading(true);
    try {
      const data = await quizClient.findQuizById(quizId as any);
      setQuiz({
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate).toISOString().split("T")[0] : "",
        availableDate: data.availableDate
          ? new Date(data.availableDate).toISOString().split("T")[0]
          : "",
        untilDate: data.untilDate
          ? new Date(data.untilDate).toISOString().split("T")[0]
          : "",
      });
    } catch (err) {
      console.error("fetch quiz error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setQuiz({ ...quiz, [field]: value });
  };

  const handleSave = async () => {
    try {
      await quizClient.updateQuiz(quizId as any, quiz);
      alert("Quiz saved successfully!");
      router.push(`/Courses/${courseId}/Quizzes/${quizId}`);
    } catch (err) {
      console.error("save quiz error:", err);
      alert("Failed to save quiz");
    }
  };

  const handleSaveAndPublish = async () => {
    try {
      await quizClient.updateQuiz(quizId as any, quiz);
      await quizClient.publishQuiz(quizId as any);
      alert("Quiz saved and published!");
      router.push(`/Courses/${courseId}/Quizzes`);
    } catch (err) {
      console.error("save and publish error:", err);
      alert("Failed to save and publish quiz");
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${courseId}/Quizzes`);
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2>Edit Quiz</h2>

      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k || "details")}>
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="details">Details</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="questions">Questions</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="details">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={quiz.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Quiz Instructions</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={quiz.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Enter quiz instructions..."
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Quiz Type</Form.Label>
                <Form.Select
                  value={quiz.quizType}
                  onChange={(e) => handleChange("quizType", e.target.value)}
                >
                  <option value="GRADED_QUIZ">Graded Quiz</option>
                  <option value="PRACTICE_QUIZ">Practice Quiz</option>
                  <option value="GRADED_SURVEY">Graded Survey</option>
                  <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Assignment Group</Form.Label>
                <Form.Select
                  value={quiz.assignmentGroup}
                  onChange={(e) => handleChange("assignmentGroup", e.target.value)}
                >
                  <option value="QUIZZES">Quizzes</option>
                  <option value="EXAMS">Exams</option>
                  <option value="ASSIGNMENTS">Assignments</option>
                  <option value="PROJECT">Project</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Time Limit (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  value={quiz.timeLimit}
                  onChange={(e) => handleChange("timeLimit", parseInt(e.target.value))}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Shuffle Answers"
                  checked={quiz.shuffleAnswers}
                  onChange={(e) => handleChange("shuffleAnswers", e.target.checked)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Allow Multiple Attempts"
                  checked={quiz.multipleAttempts}
                  onChange={(e) => handleChange("multipleAttempts", e.target.checked)}
                />
              </Form.Group>

              {quiz.multipleAttempts && (
                <Form.Group className="mb-3">
                  <Form.Label>How Many Attempts</Form.Label>
                  <Form.Control
                    type="number"
                    value={quiz.howManyAttempts}
                    onChange={(e) =>
                      handleChange("howManyAttempts", parseInt(e.target.value))
                    }
                  />
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Show Correct Answers</Form.Label>
                <Form.Control
                  type="text"
                  value={quiz.showCorrectAnswers}
                  onChange={(e) => handleChange("showCorrectAnswers", e.target.value)}
                  placeholder="e.g., Immediately, Never, After Due Date"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Access Code (optional)</Form.Label>
                <Form.Control
                  type="text"
                  value={quiz.accessCode}
                  onChange={(e) => handleChange("accessCode", e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="One Question at a Time"
                  checked={quiz.oneQuestionAtATime}
                  onChange={(e) => handleChange("oneQuestionAtATime", e.target.checked)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Webcam Required"
                  checked={quiz.webcamRequired}
                  onChange={(e) => handleChange("webcamRequired", e.target.checked)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Lock Questions After Answering"
                  checked={quiz.lockQuestionsAfterAnswering}
                  onChange={(e) =>
                    handleChange("lockQuestionsAfterAnswering", e.target.checked)
                  }
                />
              </Form.Group>

              <hr />

              <h5>Due Dates</h5>

              <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  value={quiz.dueDate}
                  onChange={(e) => handleChange("dueDate", e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Available From</Form.Label>
                <Form.Control
                  type="date"
                  value={quiz.availableDate}
                  onChange={(e) => handleChange("availableDate", e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Until</Form.Label>
                <Form.Control
                  type="date"
                  value={quiz.untilDate}
                  onChange={(e) => handleChange("untilDate", e.target.value)}
                />
              </Form.Group>

              <div className="d-flex gap-2">
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  Save
                </Button>
                <Button variant="success" onClick={handleSaveAndPublish}>
                  Save & Publish
                </Button>
              </div>
            </Form>
          </Tab.Pane>

          <Tab.Pane eventKey="questions">
            <QuizQuestionsEditor quizId={quizId as any} courseId={courseId as any} />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
