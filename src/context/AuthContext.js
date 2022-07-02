import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
/** loginFunc: loginFunc,
 *
 * logoutFunc: logOutUser,
 *
 * setAuthTokens: setAuthTokens,
 *
 * setUser: setUser,
 *
 * user: user,
 * {
  "token_type": "access",
  "exp": unixdata,
  "iat": unix date,
  "jti": "",
  "user_id": Int,
  "name": "",
  "role": [],
  "lid_id": Int
} 
 *
 * authTokens: authTokens,
 */

const AuthContext = createContext();
export default AuthContext;
export const AuthProvider = ({ children }) => {
  // dont use useFetch here because it will not work

  const [authTokens, setAuthTokens] = useState(
    () =>
      localStorage.getItem("authTokens") &&
      JSON.parse(localStorage.getItem("authTokens"))
  );
  const [user, setUser] = useState(
    () =>
      localStorage.getItem("user") &&
      jwt_decode(JSON.parse(localStorage.getItem("user")))
  );

  const navigate = useNavigate();
  const loginFunc = async (username, password) => {
    let res = await fetch(`/api/users/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    let data = await res.json();
    if (res.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      localStorage.setItem("user", JSON.stringify(data.access));
      navigate("../agenda", { replace: true });
    } else {
      console.log(`Error with ${data.detail}`);
    }
  };

  // const updateToken = async (username, password) => {
  //   let res = await fetch(`http://localhost:8000/api/users/token/refresh/`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       refresh: authTokens.refresh,
  //     }),
  //   });
  //   let data = await res.json();
  //   if (res.status === 200) {
  //     setAuthTokens(data);
  //     setUser(() => jwt_decode(data.access));
  //     localStorage.setItem("authTokens", JSON.stringify(data));
  //     localStorage.setItem("user", JSON.stringify(data.access));
  //     navigate("../agenda", { replace: true });
  //     console.log(user);
  //   } else {
  //     logOutUser();
  //   }
  //   setLoading(false);
  // };

  const logOutUser = () => {
    localStorage.removeItem("authTokens");
    localStorage.removeItem("user");
    setAuthTokens(null);
    setUser(null);
    navigate("../login", { replace: true });
  };

  // useEffect(() => {
  //   // if (authTokens & !user) {
  //   //   console.log("decoded");
  //   //   setUser(jwt_decode(authTokens.access));
  //   // }
  //   // if (loading) {
  //   //   updateToken();
  //   // }
  //   // let interval = setInterval(() => {
  //   //   if (authTokens) {
  //   //     updateToken();
  //   //   }
  //   // }, 900000);
  //   // return () => clearInterval(interval);
  //   // return user ? (
  //   //   navigate("../login", { replace: true })
  //   // ) : (
  //   //   <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
  //   // );
  // }, []);

  const data = {
    loginFunc: loginFunc,
    logoutFunc: logOutUser,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    user: user,
    authTokens: authTokens,
  };
  // user && navigate("../login", { replace: true });
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
