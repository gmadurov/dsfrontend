import React, { createContext, useState, useEffect, useContext } from "react";
import ApiContext from "./ApiContext";

const LedenContext = createContext();
export default LedenContext;

export const LedenProvider = ({ children }) => {
  const [leden, setLeden] = useState([]);
  const { ApiRequest } = useContext(ApiContext);

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
    if (leden < 2) {
      getit();
    }
  }, []);

  const data = { getLeden: getLeden, leden: leden };
  return <LedenContext.Provider value={data}>{children}</LedenContext.Provider>;
};
