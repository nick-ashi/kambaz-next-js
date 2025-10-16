/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import Link from "next/link";

export default function AssignmentEditor({ assignment, courseId }: any) {
  
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
            defaultValue={assignment.title} 
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-description">Description</Form.Label>
          <Form.Control 
            as="textarea"
            rows={5}
            id="wd-description"
            defaultValue={assignment.description}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} md={6}>
            <Form.Label htmlFor="wd-points">Points</Form.Label>
            <Form.Control 
              type="number"
              id="wd-points" 
              defaultValue={assignment.points} 
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
                  defaultValue={formatDateForInput(assignment.dueDate)}
                />
              </Form.Group>

              <Row>
                <Form.Group as={Col} md={6} className="mb-3">
                  <Form.Label htmlFor="wd-available-from">Available From</Form.Label>
                  <Form.Control 
                    type="date"
                    id="wd-available-from"
                    defaultValue={formatDateForInput(assignment.availableFrom)}
                  />
                </Form.Group>
                <Form.Group as={Col} md={6} className="mb-3">
                  <Form.Label htmlFor="wd-available-until">Available Until</Form.Label>
                  <Form.Control 
                    type="date"
                    id="wd-available-until"
                    defaultValue={formatDateForInput(assignment.availableUntil)}
                  />
                </Form.Group>
              </Row>
            </Card.Body>
          </Card>
        </Form.Group>

        <hr />
        
        <div className="d-flex justify-content-end gap-2">
          <Link href={`/Courses/${courseId}/Assignments`}>
            <Button variant="secondary" id="cancel">
              Cancel
            </Button>
          </Link>
          <Link href={`/Courses/${courseId}/Assignments`}>
            <Button variant="danger" id="save">
              Save
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
