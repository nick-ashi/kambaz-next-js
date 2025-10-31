/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Link from "next/link";
import * as db from "../Database";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Row,
  Col,
  Button,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { enrollUser, unenrollUser } from "../Database/enrollments/reducer";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2025-09-10",
    endDate: "2025-12-20",
    image: "/images/react.jpg",
    description: "New Description",
  });

  const [showAllCourses, setShowAllCourses] = useState(false);

  // Check if user is faculty or admin (can add/edit/delete courses)
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  // Check if user is enrolled in a course
  const isEnrolledInCourse = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser?._id && enrollment.course === courseId
    );
  };

  // Get courses to display based on toggle state
  const coursesToDisplay = showAllCourses
    ? courses
    : courses.filter((course: any) => isEnrolledInCourse(course._id));

  // Don't render if no current user
  if (!currentUser) {
    return <div>Please sign in to view courses.</div>;
  }

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            {/* Add button if the user is faculty */}
            <button
              className="btn btn-primary float-end"
              onClick={() => dispatch(addNewCourse(course))}
            >
              Add
            </button>
            <button
              className="btn btn-warning me-2 float-end"
              onClick={() => dispatch(updateCourse(course))}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            value={course.description}
            as="textarea"
            rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
        </>
      )}

      <div className="d-flex justify-content-between align-items-center">
        <h2 id="wd-dashboard-published">
          {/* Toggling between all courses vs pub'd courses */}
          {showAllCourses ? "All Courses" : "Published Courses"} ({coursesToDisplay.length})
        </h2>
        <Button
          variant="primary"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "Show My Courses" : "Enrollments"}
        </Button>
      </div>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {coursesToDisplay.map((course: any) => (
              <Col
                key={course._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  <Link
                    href={`/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
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
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}
                      </CardText>

                      {/* Show different buttons based on enrollment status and user role */}
                      {isEnrolledInCourse(course._id) || isFaculty ? (
                        <>
                          <Button variant="primary"> Go </Button>
                          {!isFaculty && (
                            <Button
                              variant="danger"
                              className="float-end"
                              onClick={(event) => {
                                event.preventDefault();
                                dispatch(unenrollUser({ userId: currentUser._id, courseId: course._id }));
                              }}
                            >
                              Unenroll
                            </Button>
                          )}
                        </>
                      ) : (
                        <>
                          <Button
                            variant="success"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(enrollUser({ userId: currentUser._id, courseId: course._id }));
                            }}
                          >
                            Enroll
                          </Button>
                        </>
                      )}

                      {/* Faculty controls */}
                      {isFaculty && (
                        <>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(deleteCourse(course._id));
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
                      )}
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
