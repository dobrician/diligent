import React, { FC, useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  sendPasswordResetEmail,
  setError,
  setSuccess,
} from "../../store/actions/authActions";
import { RootState } from "../../store";
import { Button, Container, Form, Message } from "semantic-ui-react";

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { error, success } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(""));
      }
      if (success) {
        dispatch(setSuccess(""));
      }
    };
  }, [error, dispatch, success]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (success) {
      dispatch(setSuccess(""));
    }
    if (error) {
      dispatch(setError(""));
    }
    setLoading(true);
    await dispatch(sendPasswordResetEmail(email, "Email sent!"));
    setLoading(false);
  };

  return (
    <Container>
      <div>
        <Message
          attached
          header="Password recovery"
          content="Lorem ipsum dolor"
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
          <Button disabled={loading}>
            {loading ? "Loading..." : "Send password reset email"}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default ForgotPassword;
