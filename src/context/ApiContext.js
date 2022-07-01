import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { createContext, useContext } from "react";
import AuthContext from "./AuthContext";

const baseUrl = "http://localhost:8000";

const ApiContext = createContext();
export default ApiContext;

export const ApiProvider = ({ children }) => {
  // will work from AuthProvider downwards,
  const { user, setAuthTokens, setUser, authTokens, logoutFunc } =
    useContext(AuthContext);

  const originalRequest = async (url, config) => {
    let urlFetch = `${baseUrl}${url}`;
    console.log("request=", urlFetch, config);
    const res = await fetch(urlFetch, config);
    const data = await res.json();
    return [res, data];
  };

  const refreshToken = async (authTokens) => {
    const res = await fetch(`${baseUrl}/api/users/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refresh: authTokens.refresh,
      }),
    });
    let data = await res.json();
    if (res.status === 200) {
      setAuthTokens(data); // if cycling refresh tokens
      setUser(() => jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data)); // if cycling refresh tokens
      localStorage.setItem("user", JSON.stringify(data.access));
    } else {
      alert(`Problem met de refresh token: ${res}`);
      logoutFunc();
    }
  };
  // const user = jwt_decode(localStorage.getItem("user"))
  const ApiRequest = async (url, config = {}) => {
    const isExpired = dayjs.unix(user?.exp).diff(dayjs(), "minute") < 1;
    if (isExpired && authTokens) {
      refreshToken(authTokens);
    }
    config["headers"] = {
      Authorization: `Bearer ${authTokens.access}`,
    };
    if (!config["headers"]["Content-type"]) {
      config["headers"]["Content-type"] = "application/json";
    }
    const [res, data] = await originalRequest(url, config);
    return { res, data };
  };
  const ApiFileRequest = async (url, config = {}) => {
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (!isExpired) {
      refreshToken(authTokens);
    }
    config["headers"] = {
      Authorization: `Authentication ${
        localStorage.getItem("authTokens").access
      }`,
    };
    // console.log("input", url);
    const [res, data] = await originalRequest(url, config);
    // console.log("output", res, data, url);
    return { res, data };
  };
  const value_dic = {
    ApiRequest: ApiRequest,
    ApiFileRequest: ApiFileRequest,
  };
  return (
    <ApiContext.Provider value={value_dic}>{children}</ApiContext.Provider>
  );
};
