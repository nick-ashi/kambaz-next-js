/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";

// ======== MultipleChoiceEditor component ========

interface MultipleChoiceEditorProps {
  question: any;
  onSave: (question: any) => void;
  onCancel: () => void;
}

export default function MultipleChoiceEditor({
  question,
  onSave,
  onCancel,
}: MultipleChoiceEditorProps) {
  const [editedQuestion, setEditedQuestion] = useState({
    ...question,
    choices: question.choices || [
      { text: "Option 1", isCorrect: true },
      { text: "Option 2", isCorrect: false },
    ],
  });
  
  const handleChange = (field: string, value: any) => {
    setEditedQuestion({ ...editedQuestion, [field]: value });
  };

  const handleChoiceChange = (index: number, text: string) => {
    const updatedChoices = [...editedQuestion.choices];
    updatedChoices[index] = { ...updatedChoices[index], text };
    setEditedQuestion({ ...editedQuestion, choices: updatedChoices });
  };

  const handleCorrectAnswerChange = (index: number) => {
    const updatedChoices = editedQuestion.choices.map((choice: any, i: number) => ({
      ...choice,
      isCorrect: i === index,
    }));
    setEditedQuestion({ ...editedQuestion, choices: updatedChoices });
  };

  const handleAddChoice = () => {
    const updatedChoices = [
      ...editedQuestion.choices,
      { text: `Option ${editedQuestion.choices.length + 1}`, isCorrect: false },
    ];
    setEditedQuestion({ ...editedQuestion, choices: updatedChoices });
  };

  const handleRemoveChoice = (index: number) => {
    if (editedQuestion.choices.length <= 2) {
      alert("You must have at least 2 choices");
      return;
    }
    const updatedChoices = editedQuestion.choices.filter(
      (_: any, i: number) => i !== index
    );
    setEditedQuestion({ ...editedQuestion, choices: updatedChoices });
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
    if (!editedQuestion.choices.some((c: any) => c.isCorrect)) {
      alert("Please select at least one correct answer");
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

        <Form.Label>Answer Choices</Form.Label>
        <div className="mb-3">
          {editedQuestion.choices.map((choice: any, index: number) => (
            <div key={index} className="d-flex align-items-center mb-2">
              <Form.Check
                type="radio"
                name="correctAnswer"
                checked={choice.isCorrect}
                onChange={() => handleCorrectAnswerChange(index)}
                className="me-2"
              />
              <Form.Control
                type="text"
                value={choice.text}
                onChange={(e) => handleChoiceChange(index, e.target.value)}
                className="me-2"
              />
              <Button
                variant="link"
                className="text-danger p-0"
                onClick={() => handleRemoveChoice(index)}
              >
                <FaTrash />
              </Button>
            </div>
          ))}
          <Button variant="outline-secondary" size="sm" onClick={handleAddChoice}>
            <FaPlus className="me-1" /> Add Choice
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
