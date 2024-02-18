import React, { useRef, useState } from "react";
import "./SignupForm.css";

export default function SignupForm() {
  const emailInputRef = useRef();
  const [emailError, setEmailError] = useState([]);
  const passwordInputRef = useRef();
  const [passwordError, setPasswordError] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleFormSubmit(e) {
    e.preventDefault();
    const emailErrors = checkEmail(emailInputRef.current.value);
    if (emailErrors.length) {
      setEmailError(emailErrors);
    }

    const passwordErrors = checkPassword(passwordInputRef.current.value);
    if (passwordErrors.length) {
      setPasswordError(passwordErrors);
    }
    setIsSubmitted(true);
  }

  function checkEmail(email) {
    const errors = [];
    //required
    if (!email.length) {
      errors.push("This is required");
    }
    //must end in @company.com
    if (!email.endsWith("@company.com")) {
      errors.push("Must end in '@company.com'");
    }
    return errors;
  }

  function checkPassword(pass) {
    const errors = [];
    //must include number
    if (!pass.match(/[0-9]/)) {
      errors.push("Must include number");
    }
    //must be at least 10
    if (pass.length < 10) {
      errors.push("Must be at least 10 characters long");
    }
    //must include lowercase
    if (!pass.match(/[a-z]/)) {
      errors.push("Must contain lowercase letter");
    }
    //must include uppercase
    if (!pass.match(/[A-Z]/)) {
      errors.push("Must contain uppercase letter");
    }

    return errors;
  }

  const displayEmailErrors = (
    <ul className="form-input-error">
      {emailError.map((err) => {
        return <li key={err}>{err}</li>;
      })}
    </ul>
  );

  const displayPasswordErrors = (
    <ul className="form-input-error">
      {passwordError.map((err) => {
        return <li key={err}>{err}</li>;
      })}
    </ul>
  );
  return (
    <form onSubmit={handleFormSubmit} className="signup-form">
      <label>Email</label>
      <input
        type="email"
        id="email"
        ref={emailInputRef}
        onChange={(e) =>
          isSubmitted && setEmailError(checkEmail(e.target.value))
        }
      />
      {emailError.length > 0 && displayEmailErrors}
      <label>Password</label>
      <input
        type="password"
        id="password"
        ref={passwordInputRef}
        onInput={(e) => {
          isSubmitted && setPasswordError(checkPassword(e.target.value));
        }}
      />
      {passwordError.length > 0 && displayPasswordErrors}
      <button>Submit</button>
    </form>
  );
}
