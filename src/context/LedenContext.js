import React, { createContext, useState, useEffect, useContext } from "react";
import ApiContext from "./ApiContext";
/**leden: leden */
const LedenContext = createContext();
export default LedenContext;

export const LedenProvider = ({ children }) => {
  const [leden, setLeden] = useState([]);
  const { user, ApiRequest } = useContext(ApiContext);

  const getLeden = async () => {
    const { res, data } = await ApiRequest("/api/leden/");
    if (res.status === 200) {
      setLeden(() => data);
    } else {
      console.log("res", res);
    }
  };
  useEffect(() => {
    async function getit() {
      await getLeden();
    }
    if (user) {
      getit();
    }
    // eslint-disable-next-line
  }, [user]);

  const data = { leden: leden };
  return <LedenContext.Provider value={data}>{children}</LedenContext.Provider>;
};
