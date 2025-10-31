/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AssignmentEditor({ assignment, courseId }: any) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isNewAssignment = assignment === null || assignment === undefined;

  // Check if user is faculty or admin (can edit)
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  // If not faculty and trying to create new assignment, redirect back
  if (!isFaculty && isNewAssignment) {
    router.push(`/Courses/${courseId}/Assignments`);
    return null;
  }

  // Form state
  const [formData, setFormData] = useState({
    title: assignment?.title || "New Assignment",
    description: assignment?.description || "",
    points: assignment?.points || 100,
    dueDate: assignment?.dueDate || new Date().toISOString().split('T')[0],
    availableFrom: assignment?.availableFrom || new Date().toISOString().split('T')[0],
    availableUntil: assignment?.availableUntil || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (isNewAssignment) {
      dispatch(addAssignment({
        ...formData,
        course: courseId,
      }));
    } else {
      dispatch(updateAssignment({
        ...assignment,
        ...formData,
      }));
    }
    router.push(`/Courses/${courseId}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${courseId}/Assignments`);
  };

  // make the date strs to YYYY-MM-DD fmt for date inputs
  const formatDateForInput = (dateString: string) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const [datePart] = dateString.split(' at ');
    const parts = datePart.split(' ');
    const month = monthNames.indexOf(parts[0]) + 1;
    const day = parseInt(parts[1]);
    // i'll probably have to change this later 
    // idk how to do this well rn tbh :(
    const year = 2025;
    
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  
  };

  return (
    <div id="wd-assignments-editor" className="container-fluid">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          <Form.Control
            type="text"
            id="wd-name"
            value={formData.title}
            onChange={(e) => isFaculty && handleInputChange('title', e.target.value)}
            readOnly={!isFaculty}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-description">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            id="wd-description"
            value={formData.description}
            onChange={(e) => isFaculty && handleInputChange('description', e.target.value)}
            readOnly={!isFaculty}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} md={6}>
            <Form.Label htmlFor="wd-points">Points</Form.Label>
            <Form.Control
              type="number"
              id="wd-points"
              value={formData.points}
              onChange={(e) => isFaculty && handleInputChange('points', parseInt(e.target.value))}
              readOnly={!isFaculty}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
          <Form.Select id="wd-group" defaultValue="ASSIGNMENTS">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-display-grade-as">Display Grade As</Form.Label>
          <Form.Select id="wd-display-grade-as" defaultValue="PERCENTAGE">
            <option value="PERCENTAGE">Percentage</option>
            <option value="LETTER">Letter</option>
            <option value="PASSFAIL">Pass/Fail</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-submission-type">Submission Type</Form.Label>
          <Form.Select id="wd-submission-type" defaultValue="ONLINE">
            <option value="ONLINE">Online</option>
            <option value="IN-PERSON">In-person</option>
            <option value="NONE">None</option>
          </Form.Select>
          
          <Card className="mt-3">
            <Card.Header>
              <strong>Online Entry Options</strong>
            </Card.Header>
            <Card.Body>
              <Form.Check 
                type="checkbox"
                id="wd-text-entry"
                label="Text Entry"
                className="mb-2"
              />
              <Form.Check 
                type="checkbox"
                id="wd-website-url"
                label="Website URL"
                className="mb-2"
              />
              <Form.Check 
                type="checkbox"
                id="wd-media-recordings"
                label="Media Recordings"
                className="mb-2"
              />
              <Form.Check 
                type="checkbox"
                id="wd-student-annotation"
                label="Student Annotation"
                className="mb-2"
              />
              <Form.Check 
                type="checkbox"
                id="wd-file-upload"
                label="File upload"
              />
            </Card.Body>
          </Card>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Assign</Form.Label>
          <Card>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-assign-to">Assign To</Form.Label>
                <Form.Control 
                  type="text"
                  id="wd-assign-to" 
                  defaultValue="Everyone" 
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-due-date">Due</Form.Label>
                <Form.Control
                  type="date"
                  id="wd-due-date"
                  value={formData.dueDate}
                  onChange={(e) => isFaculty && handleInputChange('dueDate', e.target.value)}
                  readOnly={!isFaculty}
                />
              </Form.Group>

              <Row>
                <Form.Group as={Col} md={6} className="mb-3">
                  <Form.Label htmlFor="wd-available-from">Available From</Form.Label>
                  <Form.Control
                    type="date"
                    id="wd-available-from"
                    value={formData.availableFrom}
                    onChange={(e) => isFaculty && handleInputChange('availableFrom', e.target.value)}
                    readOnly={!isFaculty}
                  />
                </Form.Group>
                <Form.Group as={Col} md={6} className="mb-3">
                  <Form.Label htmlFor="wd-available-until">Available Until</Form.Label>
                  <Form.Control
                    type="date"
                    id="wd-available-until"
                    value={formData.availableUntil}
                    onChange={(e) => isFaculty && handleInputChange('availableUntil', e.target.value)}
                    readOnly={!isFaculty}
                  />
                </Form.Group>
              </Row>
            </Card.Body>
          </Card>
        </Form.Group>

        <hr />

        <div className="d-flex justify-content-end gap-2">
          {/* Only show save/cancel options for faculty user type
              otherwise just show back button */}
          {isFaculty ? (
            <>
              <Button variant="secondary" id="cancel" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="danger" id="save" onClick={handleSave}>
                Save
              </Button>
            </>
          ) : (
            <Button variant="secondary" onClick={handleCancel}>
              Back to Assignments
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}
