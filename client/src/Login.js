import { useState } from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { Button } from "./styles";
import Header from "./Header";

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <BackgroundStyle>
    <Header />
    <Wrapper>
      <Logo>Log In</Logo>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <Divider />
          <p>
            <div className="account-create">
            Don't have an account? &nbsp;
            </div>
            <Button color="secondary" onClick={() => setShowLogin(false)}>
              Sign Up
            </Button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm onLogin={onLogin} />
          <Divider />
          <p>
            <div className="account-create">
            Already have an account? &nbsp;
            </div>
            <Button color="secondary" onClick={() => setShowLogin(true)}>
              Log In
            </Button>
          </p>
        </>
      )}
    </Wrapper>
    </BackgroundStyle>
  );
}

const Logo = styled.h1`
  font-family: Georgia, serif;
  font-size: 36px;
  color: black;
  margin: 8px 0 16px;
  text-align: center;
`;

const Wrapper = styled.section`
    font-family: Georgia, serif;
    background: #f3eedb;
    padding: 10px;
    width: 50%;
    margin: auto;
    margin-top: 100px;
    margin-bottom: 25px;
    border-radius: 5px;
    border: 5px solid #afdfd4;
    box-shadow: 0 0 0 10px #f3eedb;

    .account-create {
      text-align: center;
    }
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0;
`;

const BackgroundStyle = styled.div`
  background: #ecf6f3;
  height: 100vh;
`

export default Login;
