/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import AssignmentEditor from "./Editor";
import { useSelector } from "react-redux";

export default function AssignmentPage() {
  const { cid, aid } = useParams();
  const courseId = cid;
  const assignmentId = aid;
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  // Handle new assignment 
  if (assignmentId === "new") {
    return <AssignmentEditor assignment={null} courseId={courseId} />;
  }

  // Find assignment
  const assignment = assignments.find(
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