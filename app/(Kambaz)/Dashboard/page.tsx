import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="placeholder image"/>
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course"> 
          <Link href="/Courses/1011" className="wd-dashboard-course-link">
            <Image src="/images/nodejs.jpg" width={200} height={150} alt="placeholder image"/>
            <div>
              <h5> CS1101 </h5>
              <p className="wd-dashboard-course-title">
                 NodeJS 
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course"> 
          <Link href="/Courses/1011" className="wd-dashboard-course-link">
            <Image src="/images/nextjs.jpg" width={200} height={150} alt="placeholder image"/>
            <div>
              <h5> CS1102 </h5>
              <p className="wd-dashboard-course-title">
                NextJS
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course"> 
          <Link href="/Courses/1011" className="wd-dashboard-course-link">
            <Image src="/images/js.jpg" width={200} height={150} alt="placeholder image"/>
            <div>
              <h5> CS1103 </h5>
              <p className="wd-dashboard-course-title">
                Intro to JavaScript
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course"> 
          <Link href="/Courses/1011" className="wd-dashboard-course-link">
            <Image src="/images/css.jpg" width={200} height={150} alt="placeholder image"/>
            <div>
              <h5> CS1104 </h5>
              <p className="wd-dashboard-course-title">
                CSS and Tailwind
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course"> 
          <Link href="/Courses/1011" className="wd-dashboard-course-link">
            <Image src="/images/mongo.jpg" width={200} height={150} alt="placeholder image"/>
            <div>
              <h5> CS1105 </h5>
              <p className="wd-dashboard-course-title">
                Databases for the Web
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course"> 
          <Link href="/Courses/1011" className="wd-dashboard-course-link">
            <Image src="/images/edge.jpg" width={200} height={150} alt="placeholder image"/>
            <div>
              <h5> CS1106 </h5>
              <p className="wd-dashboard-course-title">
                Edge Computing in WebDev
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
);}
