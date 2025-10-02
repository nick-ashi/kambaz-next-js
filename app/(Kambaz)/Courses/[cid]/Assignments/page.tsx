import Link from "next/link";
import { ListGroup, ListGroupItem, Button, Form } from "react-bootstrap";
import { BsGripVertical, BsSearch } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="position-relative" style={{ width: "300px" }}>
          <BsSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
          <Form.Control 
            type="text"
            placeholder="Search for Assignments"
            id="wd-search-assignment" 
            className="ps-5"
          />
        </div>
        <div>
          <Button variant="secondary" className="me-2" id="wd-add-assignment-group">
            <FaPlus className="me-1" /> Group
          </Button>
          <Button variant="danger" id="wd-add-assignment">
            <FaPlus className="me-1" /> Assignment
          </Button>
        </div>
      </div>

      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroupItem className="wd-assignment-group p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2" />
              ASSIGNMENTS 40% of Total
            </div>
            <div>
              <FaPlus />
            </div>
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-assignment p-3 ps-1 d-flex justify-content-between align-items-start" style={{ borderLeft: "4px solid #28a745" }}>
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-3" />
                <FiEdit className="me-3 text-success" />
                <div>
                  <Link href="/Courses/1234/Assignments/123" className="wd-assignment-link text-decoration-none fw-bold">
                    A1 - ENV + HTML
                  </Link>
                  <div className="text-muted small">
                    Multiple Modules | <strong>Not available until</strong> September 7 at 00:00 | <strong>Due</strong> September 29 at 23:59 | 100pts
                  </div>
                </div>
              </div>
            </ListGroupItem>
            
            <ListGroupItem className="wd-assignment p-3 ps-1 d-flex justify-content-between align-items-start" style={{ borderLeft: "4px solid #28a745" }}>
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-3" />
                <FiEdit className="me-3 text-success" />
                <div>
                  <Link href="/Courses/1234/Assignments/124" className="wd-assignment-link text-decoration-none fw-bold">
                    A2 - CSS
                  </Link>
                  <div className="text-muted small">
                    Multiple Modules | <strong>Not available until</strong> September 14 at 00:00 | <strong>Due</strong> September 29 at 23:59 | 100pts
                  </div>
                </div>
              </div>
            </ListGroupItem>
            
            <ListGroupItem className="wd-assignment p-3 ps-1 d-flex justify-content-between align-items-start" style={{ borderLeft: "4px solid #28a745" }}>
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-3" />
                <FiEdit className="me-3 text-success" />
                <div>
                  <Link href="/Courses/1234/Assignments/125" className="wd-assignment-link text-decoration-none fw-bold">
                    A3 - JavaScript
                  </Link>
                  <div className="text-muted small">
                    Multiple Modules | <strong>Not available until</strong> September 21 at 00:00 | <strong>Due</strong> September 29 at 23:59 | 100pts
                  </div>
                </div>
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
