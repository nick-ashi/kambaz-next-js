import Link from "next/link";
import * as db from "../Database";
import { Card, CardBody, CardImg, CardTitle, CardText, Row, Col, Button } from "react-bootstrap";

export default function Dashboard() {
  const courses = db.courses;
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {courses.map((course) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link href={`/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <CardImg 
                    src={course.image}
                    variant="top" 
                    width="100%"
                    height={160}
                    style={{ objectFit: "cover" }}
                    alt={course.name}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name} 
                    </CardTitle>
                    <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description} 
                    </CardText>
                    <Button variant="primary"> Go </Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>

          {/* <Col>
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
        </Row> */}
      </div>
    </div>
  );
}
