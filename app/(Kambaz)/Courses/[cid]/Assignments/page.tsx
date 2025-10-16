/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, Button, Form } from "react-bootstrap";
import { BsGripVertical, BsSearch } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import * as db from "../../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  
  // filter assignments for current course
  const courseAssignments = db.assignments.filter(
    (assignment: any) => assignment.course === courseId
  );

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="position-relative" style={{ width: "300px" }}>
          <BsSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
          <Form.Control 
            type="text"
            placeholder="Search for Assignments"
            id="wd-search-assignment" 
            className="ps-5"
          />
        </div>
        <div>
          <Button variant="secondary" className="me-2" id="wd-add-assignment-group">
            <FaPlus className="me-1" /> Group
          </Button>
          <Button variant="danger" id="wd-add-assignment">
            <FaPlus className="me-1" /> Assignment
          </Button>
        </div>
      </div>

      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroupItem className="wd-assignment-group p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2" />
              ASSIGNMENTS 40% of Total
            </div>
            <div>
              <FaPlus />
            </div>
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {courseAssignments.map((assignment: any) => (
              <ListGroupItem 
                key={assignment._id}
                className="wd-assignment p-3 ps-1 d-flex justify-content-between align-items-start" 
                style={{ borderLeft: "4px solid #28a745" }}
              >
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-3" />
                  <FiEdit className="me-3 text-success" />
                  <div>
                    <Link 
                      href={`/Courses/${courseId}/Assignments/${assignment._id}`} 
                      className="wd-assignment-link text-decoration-none fw-bold"
                    >
                      {assignment.title}
                    </Link>
                    <div className="text-muted small">
                      Multiple Modules | <strong>Not available until</strong> {assignment.availableFrom} | <strong>Due</strong> {assignment.dueDate} | {assignment.points}pts
                    </div>
                  </div>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
