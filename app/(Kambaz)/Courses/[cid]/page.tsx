import { redirect } from "next/navigation";

export default async function CoursesPage({ params, }: { params: Promise<{ cid: string }> }) {
 const { cid } = await params;
 redirect(`/Courses/${cid}/Home`);
}

export async function AssignmentEditor({ params, }: { params: Promise<{ cid: string, aid: string }> }) {
 const { cid, aid } = await params;
 redirect(`/Courses/${cid}/Assignments/${aid}`);
}

// export default function Courses() {
//   return (
//     <div id="wd-courses">
//       <h2>Course 1234</h2>
//     </div>
// );}
