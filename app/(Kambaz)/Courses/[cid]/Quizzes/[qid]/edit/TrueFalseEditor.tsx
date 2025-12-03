/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface TrueFalseEditorProps {
  question: any;
  onSave: (question: any) => void;
  onCancel: () => void;
}

export default function TrueFalseEditor({
  question,
  onSave,
  onCancel,
}: TrueFalseEditorProps) {
  const [editedQuestion, setEditedQuestion] = useState({
    ...question,
    correctAnswer: question.correctAnswer ?? true,
  });

  const handleChange = (field: string, value: any) => {
    setEditedQuestion({ ...editedQuestion, [field]: value });
  };

  const handleSave = () => {
    if (!editedQuestion.title.trim()) {
      alert("Please enter a question title");
      return;
    }
    if (!editedQuestion.question.trim()) {
      alert("Please enter the question text");
      return;
    }
    onSave(editedQuestion);
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Question Title</Form.Label>
          <Form.Control
            type="text"
            value={editedQuestion.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            value={editedQuestion.points}
            onChange={(e) => handleChange("points", parseInt(e.target.value) || 0)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Question</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={editedQuestion.question}
            onChange={(e) => handleChange("question", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correct Answer</Form.Label>
          <div>
            <Form.Check
              type="radio"
              label="True"
              name="correctAnswer"
              checked={editedQuestion.correctAnswer === true}
              onChange={() => handleChange("correctAnswer", true)}
            />
            <Form.Check
              type="radio"
              label="False"
              name="correctAnswer"
              checked={editedQuestion.correctAnswer === false}
              onChange={() => handleChange("correctAnswer", false)}
            />
          </div>
        </Form.Group>

        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Question
          </Button>
        </div>
      </Form>
    </div>
  );
}
