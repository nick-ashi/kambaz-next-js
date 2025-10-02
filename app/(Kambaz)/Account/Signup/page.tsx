"use client";
import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      <FormControl
        className="wd-username mb-2"
        placeholder="username"
      />
      <br />
      <FormControl
        className="wd-password mb-2"
        placeholder="password"
        type="password"
      />
      <br />
      <Link
        href="/Account/Profile"
        className="btn btn-primary w-100 mb-2"
      >
        Sign up{" "}
      </Link>
      <br />
      <Link href="/Account/Signin">Sign in</Link>
    </div>
  );
}