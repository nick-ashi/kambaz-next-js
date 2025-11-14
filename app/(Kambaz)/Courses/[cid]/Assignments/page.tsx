/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ListGroup, ListGroupItem, Button, Form } from "react-bootstrap";
import { BsGripVertical, BsSearch } from "react-icons/bs";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import * as client from "../../client";

export default function Assignments() {
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;

  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!courseId) return;
    setLoading(true);
    client.findAssignmentsForCourse(courseId)
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setAssignments(list.filter((a: any) => String(a.course) === String(courseId)));
      })
      .catch((err) => console.error("fetch assignments error:", err))
      .finally(() => setLoading(false));
  }, [courseId]);

  const onDeleteAssignment = async (assignmentId: string) => {
    if (!assignmentId) return;
    if (!confirm("Delete this assignment? This cannot be undone.")) return;
    try {
      await client.deleteAssignment(assignmentId);
      setAssignments((prev) => prev.filter((a) => String(a._id) !== String(assignmentId)));
    } catch (err) {
      console.error("delete assignment error:", err);
      alert("Failed to delete assignment");
    }
  };

  const filtered = assignments.filter((a) =>
    !search || (a.title || "").toLowerCase().includes(search.toLowerCase())
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <Button variant="secondary" className="me-2" id="wd-add-assignment-group">
            <FaPlus className="me-1" /> Group
          </Button>
          <Link href={`/Courses/${courseId}/Assignments/new`}>
            <Button variant="danger" className="me-2" id="wd-add-assignment">
              <FaPlus className="me-1" /> Assignment
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
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
              {filtered.map((assignment: any) => (
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
                        Multiple Modules | <strong>Not available until</strong> {assignment.availableFrom ?? assignment.availableFromDate} | <strong>Due</strong> {assignment.dueDate ?? assignment.due} | {assignment.points ?? ""} pts
                      </div>
                    </div>
                  </div>

                  <div className="ms-3">
                    <Button
                      variant="link"
                      className="text-danger p-0"
                      onClick={(e) => {
                        e.preventDefault();
                        onDeleteAssignment(assignment._id);
                      }}
                      aria-label={`Delete ${assignment.title}`}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </ListGroupItem>
              ))}
            </ListGroup>
          </ListGroupItem>
        </ListGroup>
      )}
    </div>
  );
}
