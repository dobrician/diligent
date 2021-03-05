import React, { FC, useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { signup, setError } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { Button, Container, Form, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";

const SignUp: FC = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(""));
      }
    };
  }, [error, dispatch]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (error) {
      dispatch(setError(""));
    }
    setLoading(true);
    dispatch(signup({ email, password, firstName }, () => setLoading(false)));
  };

  return (
    <Container>
      <div>
        <Message
          attached
          header="Sign Up"
          content="Please provide required information to continue"
        />
        {error && <Message attached negative content={error} />}
        <Form onSubmit={submitHandler} className="attached fluid segment">
          <Form.Field>
            <label>First Name</label>
            <input
              name="firstName"
              required={true}
              value={firstName}
              onChange={(e) => setFirstName(e.currentTarget.value)}
              placeholder="First name"
            />
          </Form.Field>
          <Form.Field>
            <label>Email address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder="Email address"
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="Password"
            />
          </Form.Field>
          <Button disabled={loading}>
            {loading ? "Loading..." : "Sign Up"}
          </Button>
          <Link to="/signin">Aleady have an account?</Link>
        </Form>
      </div>
    </Container>
  );
};

export default SignUp;
