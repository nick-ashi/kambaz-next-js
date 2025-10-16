/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import AssignmentEditor from "./Editor";
import * as db from "../../../../Database";

export default function AssignmentPage() {
  const { cid, aid } = useParams();
  const courseId = cid;
  const assignmentId = aid;

  // Find the assignment in the database
  const assignment = db.assignments.find(
    (a: any) => a._id === assignmentId && a.course === courseId
  );

  if (!assignment) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger">Assignment not found.</div>
      </div>
    );
  }

  return <AssignmentEditor assignment={assignment} courseId={courseId} />;
}