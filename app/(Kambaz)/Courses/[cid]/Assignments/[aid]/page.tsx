import AssignmentEditor from "./Editor";

export default function AssignmentPage({ params }: { params: Promise<{ cid: string; aid: string }> }) {
  return <AssignmentEditor />;
}