/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";

interface FillInBlankEditorProps {
  question: any;
  onSave: (question: any) => void;
  onCancel: () => void;
}

export default function FillInBlankEditor({
  question,
  onSave,
  onCancel,
}: FillInBlankEditorProps) {
  const [editedQuestion, setEditedQuestion] = useState({
    ...question,
    possibleAnswers: question.possibleAnswers || [""],
    caseSensitive: question.caseSensitive ?? false,
  });

  const handleChange = (field: string, value: any) => {
    setEditedQuestion({ ...editedQuestion, [field]: value });
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...editedQuestion.possibleAnswers];
    updatedAnswers[index] = value;
    setEditedQuestion({ ...editedQuestion, possibleAnswers: updatedAnswers });
  };

  const handleAddAnswer = () => {
    setEditedQuestion({
      ...editedQuestion,
      possibleAnswers: [...editedQuestion.possibleAnswers, ""],
    });
  };

  const handleRemoveAnswer = (index: number) => {
    if (editedQuestion.possibleAnswers.length <= 1) {
      alert("You must have at least one possible answer");
      return;
    }
    const updatedAnswers = editedQuestion.possibleAnswers.filter(
      (_: any, i: number) => i !== index
    );
    setEditedQuestion({ ...editedQuestion, possibleAnswers: updatedAnswers });
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
    if (!editedQuestion.possibleAnswers.some((a: string) => a.trim())) {
      alert("Please enter at least one possible answer");
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
            placeholder="Enter your question. Students will fill in the blank."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Case Sensitive"
            checked={editedQuestion.caseSensitive}
            onChange={(e) => handleChange("caseSensitive", e.target.checked)}
          />
        </Form.Group>

        <Form.Label>Possible Correct Answers</Form.Label>
        <div className="mb-3">
          {editedQuestion.possibleAnswers.map((answer: string, index: number) => (
            <div key={index} className="d-flex align-items-center mb-2">
              <Form.Control
                type="text"
                value={answer}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                placeholder={`Answer ${index + 1}`}
                className="me-2"
              />
              <Button
                variant="link"
                className="text-danger p-0"
                onClick={() => handleRemoveAnswer(index)}
              >
                <FaTrash />
              </Button>
            </div>
          ))}
          <Button variant="outline-secondary" size="sm" onClick={handleAddAnswer}>
            <FaPlus className="me-1" /> Add Answer
          </Button>
        </div>

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
