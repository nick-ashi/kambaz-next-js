"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation({ cid }: { cid: string }) {
  const pathname = usePathname() ?? "";
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((label) => {
        // map label -> route segment (People => People/Table)
        const segment = label === "Home" ? "Home" : label === "People" ? "People/Table" : label;
        const href = `/Courses/${cid}/${segment}`;

        // active:
        const isHomeActive =
          pathname === `/Courses/${cid}` ||
          pathname === `/Courses/${cid}/Home` ||
          pathname.startsWith(`/Courses/${cid}/Home`);
        const isActive = label === "Home" ? isHomeActive : pathname.startsWith(`/Courses/${cid}/${segment}`);

        const id = `wd-course-${label.toLowerCase().replace(/\s+/g, "-")}-link`;
        // active (use 'active' class) otherwise keep text-danger for inactive items
        const className = `list-group-item border-0 ${isActive ? "active" : "text-danger"}`;

        return (
          <Link key={label} href={href} id={id} className={className}>
            {label}
          </Link>
        );
      })}
    </div>
  );
}
