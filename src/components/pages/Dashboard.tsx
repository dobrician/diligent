import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setSuccess } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { Container, Message } from "semantic-ui-react";

const Dashboard: FC = () => {
  const { user, needVerification, success } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(""));
    }
  }, [success, dispatch]);

  return (
    <Container>
      {needVerification ? (
        <Message
          positive
          icon="inbox"
          header="Success!"
          content="Please verify your email address."
        />
      ) : (
        <Message
          positive
          icon="hand spock outline"
          header={`Welcome ${user?.firstName}!`}
          content="Live long and prosper!"
        />
      )}
    </Container>
  );
};

export default Dashboard;
