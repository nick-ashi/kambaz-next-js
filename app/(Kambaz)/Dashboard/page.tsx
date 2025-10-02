import Link from "next/link";
import { Card, CardBody, CardImg, Row, Col } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          <Col>
            <Card className="wd-dashboard-course">
              <Link href="/Courses/1234" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <CardBody>
                  <h5>CS1234 React JS</h5>
                  <p className="wd-dashboard-course-title">
                    Full Stack software developer
                  </p>
                  <button className="btn btn-primary">Go</button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col>
            <Card className="wd-dashboard-course">
              <Link href="/Courses/1101" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/nodejs.jpg" width="100%" height={160} />
                <CardBody>
                  <h5>CS1101 Node.js</h5>
                  <p className="wd-dashboard-course-title">
                    Backend Development with Node.js
                  </p>
                  <button className="btn btn-primary">Go</button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col>
            <Card className="wd-dashboard-course">
              <Link href="/Courses/1102" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/nextjs.jpg" width="100%" height={160} />
                <CardBody>
                  <h5>CS1102 Next.js</h5>
                  <p className="wd-dashboard-course-title">
                    Modern React Framework
                  </p>
                  <button className="btn btn-primary">Go</button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col>
            <Card className="wd-dashboard-course">
              <Link href="/Courses/1103" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/js.jpg" width="100%" height={160} />
                <CardBody>
                  <h5>CS1103 JavaScript</h5>
                  <p className="wd-dashboard-course-title">
                    Intro to JavaScript
                  </p>
                  <button className="btn btn-primary">Go</button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col>
            <Card className="wd-dashboard-course">
              <Link href="/Courses/1104" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/css.jpg" width="100%" height={160} />
                <CardBody>
                  <h5>CS1104 CSS</h5>
                  <p className="wd-dashboard-course-title">
                    CSS and Tailwind
                  </p>
                  <button className="btn btn-primary">Go</button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col>
            <Card className="wd-dashboard-course">
              <Link href="/Courses/1105" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/mongo.jpg" width="100%" height={160} />
                <CardBody>
                  <h5>CS1105 MongoDB</h5>
                  <p className="wd-dashboard-course-title">
                    Databases for the Web
                  </p>
                  <button className="btn btn-primary">Go</button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col>
            <Card className="wd-dashboard-course">
              <Link href="/Courses/1106" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/edge.jpg" width="100%" height={160} />
                <CardBody>
                  <h5>CS1106 Edge Computing</h5>
                  <p className="wd-dashboard-course-title">
                    Edge Computing in WebDev
                  </p>
                  <button className="btn btn-primary">Go</button>
                </CardBody>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
