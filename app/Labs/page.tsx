import Lab1 from "./Lab1/page";
export default function Labs() {
    // Using HTML syntax to invoke the function Lab1 from the ./Lab1 file
    // This is one difference between JSX/TSX and regular JS I guess
    return(
        <div id="wd-labs">
            <h1>Labs</h1>
            <Lab1 />
        </div>
    );
}