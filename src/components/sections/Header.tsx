import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../store";
import { signout } from "../../store/actions/authActions";
import { Menu } from "semantic-ui-react";

const Header: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.auth);

  const logoutClickHandler = () => {
    dispatch(signout());
  };

  return (
    <Menu>
      {authenticated ? (
        <>
          <Menu.Item name="dashboard" as="a" href="/dashboard">
            Home
          </Menu.Item>
          <Menu.Item name="testpage" as="a" href="/testpage">
            Test Page
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item name="dashboard" as="a" href="/">
            Home
          </Menu.Item>
          <Menu.Item name="testpage" as="a" href="/testpage">
            Test Page
          </Menu.Item>
        </>
      )}
      <Menu.Menu position="right">
        {!authenticated ? (
          <>
            <Menu.Item name="signup" onClick={() => history.push("/signup")}>
              Sign Up
            </Menu.Item>
            <Menu.Item name="signin" onClick={() => history.push("/signin")}>
              Sign In
            </Menu.Item>
          </>
        ) : (
          <Menu.Item name="signout" onClick={logoutClickHandler}>
            Sign Out
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
