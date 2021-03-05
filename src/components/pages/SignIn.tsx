import React, { FC, useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin, setError } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { Button, Container, Form, Message } from "semantic-ui-react";

const SignIn: FC = () => {
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
    dispatch(signin({ email, password }, () => setLoading(false)));
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
            {loading ? "Loading..." : "Sign In"}
          </Button>
          <Link to="/forgot-password">Forgot password ?</Link>
        </Form>
      </div>
    </Container>
  );
};

export default SignIn;
