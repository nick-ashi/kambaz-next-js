"use client";
import Link from "next/link";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";

export default function Profile() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Header>
              <h3 className="mb-0">Profile</h3>
            </Card.Header>
            <Card.Body>
              <Form>
                <div className="mb-3">
                  <Form.Label htmlFor="wd-username">Username</Form.Label>
                  <Form.Control 
                    type="text"
                    id="wd-username"
                    defaultValue="alice" 
                    placeholder="Username" 
                    className="wd-username"
                  />
                </div>
                
                <div className="mb-3">
                  <Form.Label htmlFor="wd-password">Password</Form.Label>
                  <Form.Control 
                    type="password"
                    id="wd-password"
                    defaultValue="123" 
                    placeholder="Password" 
                    className="wd-password"
                  />
                </div>
                
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <Form.Label htmlFor="wd-firstname">First Name</Form.Label>
                      <Form.Control 
                        type="text"
                        id="wd-firstname"
                        defaultValue="Alice" 
                        placeholder="First Name"
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Form.Label htmlFor="wd-lastname">Last Name</Form.Label>
                      <Form.Control 
                        type="text"
                        id="wd-lastname"
                        defaultValue="Wonderland" 
                        placeholder="Last Name"
                      />
                    </div>
                  </Col>
                </Row>
                
                <div className="mb-3">
                  <Form.Label htmlFor="wd-dob">Date of Birth</Form.Label>
                  <Form.Control 
                    type="date"
                    id="wd-dob"
                    defaultValue="2000-01-01"
                  />
                </div>
                
                <div className="mb-3">
                  <Form.Label htmlFor="wd-email">Email</Form.Label>
                  <Form.Control 
                    type="email"
                    id="wd-email"
                    defaultValue="alice@wonderland" 
                    placeholder="Email"
                  />
                </div>
                
                <div className="mb-4">
                  <Form.Label htmlFor="wd-role">Role</Form.Label>
                  <Form.Select id="wd-role" defaultValue="FACULTY">
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                    <option value="FACULTY">Faculty</option>
                    <option value="STUDENT">Student</option>
                  </Form.Select>
                </div>
                
                <div className="d-grid gap-2">
                  <Link 
                    href="/Account/Signin" 
                    className="btn btn-danger btn-lg"
                  >
                    Sign out
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
