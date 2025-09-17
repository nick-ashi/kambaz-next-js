// import Lab1 from "./Lab1/page";
import Link from "next/link"
export default function Labs() {
    // Using HTML syntax to invoke the function Lab1 from the ./Lab1 file
    // This is one difference between JSX/TSX and regular JS I guess
    return(
        <div id="wd-labs">
            <h1>Labs</h1>
            <ul>
            <li>
                <Link href="/Labs/Lab1" id="wd-lab1-link">
                Lab 1: HTML Examples </Link>
            </li>
            <li>
                <Link href="/Labs/Lab2" id="wd-lab2-link">
                Lab 2: CSS Basics </Link>
            </li>
            <li>
                <Link href="/Labs/Lab3" id="wd-lab3-link">
                Lab 3: JavaScript Fundamentals </Link>
            </li>
            <li>
                <Link href="/" id="wd-lab-3-link">Kambaz</Link>
            </li>
            </ul>
        </div>
    );
}