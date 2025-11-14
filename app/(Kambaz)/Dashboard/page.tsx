/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import Link from "next/link";
import * as client from "../Courses/client";
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
import { addNewCourse, deleteCourse, updateCourse, setCourses } from "../Courses/reducer";
import { enrollUser, unenrollUser } from "../Database/enrollments/reducer";

export default function Dashboard() {
  // initialize courses from reducer as empty array when not present
  const courses = useSelector((state: any) => state.coursesReducer?.courses) || [];
  // const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
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
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);

  const fetchCourses = async () => {
    try {
      let coursesToFetch;
      if (showAllCourses) {
        // Fetch all courses
        coursesToFetch = await client.fetchAllCourses();
        // Also fetch enrolled courses to track enrollment status
        if (currentUser) {
          const enrolledCourses = await client.findCoursesForUser(currentUser._id);
          setEnrolledCourseIds(enrolledCourses.map((c: any) => c._id));
        }
      } else {
        // Fetch only courses the user is enrolled in
        if (currentUser) {
          coursesToFetch = await client.findCoursesForUser(currentUser._id);
          setEnrolledCourseIds(coursesToFetch.map((c: any) => c._id));
        } else {
          coursesToFetch = [];
        }
      }
      dispatch(setCourses(coursesToFetch));
    } catch (error) {
      console.error(error);
    }
  };
  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([ ...courses, newCourse ]));
  };
  const onDeleteCourse = async (courseId: string) => {
    const status = await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course: any) => course._id !== courseId)));
  };
  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c: any) => {
        if (c._id === course._id) { return course; }
        else { return c; }
    })));
  };

  const handleEnroll = async (courseId: string) => {
    try {
      await client.enrollUserInCourse(currentUser._id, courseId);
      dispatch(enrollUser({ userId: currentUser._id, courseId }));
      // Refresh courses to update the view
      await fetchCourses();
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    try {
      await client.unenrollUserFromCourse(currentUser._id, courseId);
      dispatch(unenrollUser({ userId: currentUser._id, courseId }));
      // Refresh courses to update the view
      await fetchCourses();
    } catch (error) {
      console.error("Error unenrolling from course:", error);
    }
  };

  // fetch courses on mount and whenever currentUser or showAllCourses changes
  useEffect(() => {
    fetchCourses();
  }, [currentUser, showAllCourses]);

  // Check if user is faculty or admin (can add/edit/delete courses)
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  // Server returns the appropriate courses for the current user,
  // so display the courses directly (server-side filtering)
  const coursesToDisplay = courses;

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
            <button onClick={onAddNewCourse} className="btn btn-primary float-end" id="wd-add-new-course-click" >
              Add
            </button>
            <button
              className="btn btn-warning me-2 float-end"
              onClick={onUpdateCourse}
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
          {/* Toggling between all courses vs enrolled courses */}
          {showAllCourses ? "All Courses" : "Enrolled Courses"} ({coursesToDisplay.length})
        </h2>
        <Button
          variant="primary"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "Show My Courses" : "Show All Courses"}
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

                      {/* Show Go button and enrollment controls for students */}
                      <Button variant="primary"> Go </Button>
                      {!isFaculty && (
                        <>
                          {enrolledCourseIds.includes(course._id) ? (
                            <Button
                              variant="danger"
                              className="float-end"
                              onClick={(event) => {
                                event.preventDefault();
                                handleUnenroll(course._id);
                              }}
                            >
                              Unenroll
                            </Button>
                          ) : (
                            showAllCourses && (
                              <Button
                                variant="success"
                                className="float-end"
                                onClick={(event) => {
                                  event.preventDefault();
                                  handleEnroll(course._id);
                                }}
                              >
                                Enroll
                              </Button>
                            )
                          )}
                        </>
                      )}

                      {/* Faculty controls */}
                      {isFaculty && (
                        <>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              onDeleteCourse(course._id);
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
      </div>
    </div>
  );
}
