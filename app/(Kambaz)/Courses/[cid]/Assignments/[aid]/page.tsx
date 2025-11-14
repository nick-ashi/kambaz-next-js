/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Form, Button } from "react-bootstrap";
import * as client from "../../../client";

export default function AssignmentPage() {
  const { cid, aid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const assignmentId = Array.isArray(aid) ? aid[0] : aid;
  const router = useRouter();

  const [assignment, setAssignment] = useState<any>({
    title: "",
    description: "",
    points: 0,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!courseId || !assignmentId) return;
    if (assignmentId === "new") {
      setAssignment({
        title: "",
        description: "",
        points: 0,
        dueDate: "",
        availableFrom: "",
        availableUntil: "",
      });
      return;
    }

    const load = async () => {
      setLoading(true);
      try {
        const data = await client.findAssignment(assignmentId);
        console.log("findAssignment result:", data);
        // handle responses that wrap the object (e.g. { assignment: { ... } })
        const payload = data?.assignment ?? data ?? {};
        // merge to keep any default fields
        setAssignment((prev: any) => ({ ...prev, ...payload }));
      } catch (err) {
        console.error("findAssignment error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [courseId, assignmentId]);

  const onSave = async () => {
    try {
      if (!courseId) return;
      if (assignmentId === "new") {
        await client.createAssignmentForCourse(courseId, assignment);
      } else {
        await client.updateAssignment(assignment);
      }
      router.push(`/Courses/${courseId}/Assignments`);
    } catch (err) {
      console.error("save assignment error:", err);
    }
  };

  return (
    <div className="container-fluid">
      <h3>{assignmentId === "new" ? "New Assignment" : "Edit Assignment"}</h3>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={assignment.title ?? ""}
              onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={assignment.description ?? ""}
              onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              value={assignment.points ?? 0}
              onChange={(e) => setAssignment({ ...assignment, points: Number(e.target.value) })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="datetime-local"
              value={assignment.dueDate ?? ""}
              onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Link href={`/Courses/${courseId}/Assignments`}>
              <Button variant="secondary">Cancel</Button>
            </Link>
            <Button variant="danger" onClick={onSave}>
              {assignmentId === "new" ? "Create" : "Save"}
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
}