import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import Page from "./Page";

export const LoginPage = ({}) => {
  const { loginFunc } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const logMeIn = (e) => {
    e.preventDefault();
    loginFunc(username, password);
  };
  return (
    <Page>
            <div>
              <img src="/images/dumspiro.gif" alt="DumSpiroSpero" />
              <form className="form" onSubmit={logMeIn}>
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      style={{ width: "231px", height: "39px" }}
                      v
                      className="input"
                      type="username"
                      placeholder="STROPDAS"
                      required
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input"
                      style={{ width: "231px", height: "39px" }}
                      type="password"
                      required
                      placeholder="Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <button className="button is-success" onSubmit={logMeIn}>
                      Login
                    </button>
                  </p>
                </div>
              </form>
            </div>
    </Page>
  );
};
export default LoginPage;
