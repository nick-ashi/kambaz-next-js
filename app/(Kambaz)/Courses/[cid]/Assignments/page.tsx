/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, Button, Form } from "react-bootstrap";
import { BsGripVertical, BsSearch } from "react-icons/bs";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;

  // Stuff for state management (selectors, dispatcher initialization)
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  // Check if user is faculty or admin (can edit/delete)
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  // filter assignments for current course
  const courseAssignments = assignments.filter(
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
          {/* Only want to show add buttons if faculty or admin */}
          {isFaculty && (
            <>
              <Button variant="secondary" className="me-2" id="wd-add-assignment-group">
                <FaPlus className="me-1" /> Group
              </Button>
              <Link href={`/Courses/${courseId}/Assignments/new`}>
                <Button variant="danger" id="wd-add-assignment">
                  <FaPlus className="me-1" /> Assignment
                </Button>
              </Link>
            </>
          )}
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
            {/* Rendering the course assignments but now with STATE*/}
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
                {/* Only showing the button if user is faculty */}
                {isFaculty && (
                  <div className="d-flex align-items-center">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        if (window.confirm("Are you SURE you want to remove this assignment?")) {
                          dispatch(deleteAssignment(assignment._id));
                        }
                      }}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                )}
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
