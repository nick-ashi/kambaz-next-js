import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments"
             id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button> </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123"
             className="wd-assignment-link">
            A1 - ENV + HTML
          </Link>
          <div>Multiple Modules | <strong>Not available until</strong> September 7 at 00:00 | <strong>Due</strong> September 29 at 23:59 | 100pts</div>
        </li>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/124"
             className="wd-assignment-link">
            A2 - CSS
          </Link>
          <div>Multiple Modules | <strong>Not available until</strong> September 14 at 00:00 | <strong>Due</strong> September 29 at 23:59 | 100pts</div>
        </li>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/125"
             className="wd-assignment-link">
            A3 - JavaScript
          </Link>
          <div>Multiple Modules | <strong>Not available until</strong> September 21 at 00:00 | <strong>Due</strong> September 29 at 23:59 | 100pts</div>
        </li>
      </ul>
    </div>
);}
