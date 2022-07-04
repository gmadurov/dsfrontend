import React, { createContext, useState, useEffect, useContext } from "react";
import ApiContext from "./ApiContext";
/**user: user ,  
 * 
 * lid: lid 
 * 
 * {active: Boolean
birth_date: date isoformat
created: date isoformat
educations: null
email: string
id: Int
initials: string
lichting: int
lid_image: string(link)
name: int
phone: int or string
short_intro: null
user: int
vertical: int}
 * 
 * ,GETLid:GETLid,  leden: leden */
const LedenContext = createContext();
export default LedenContext;

export const LedenProvider = ({ children }) => {
  const [leden, setLeden] = useState([]);
  const [lid, setLid] = useState();
  const { user, ApiRequest } = useContext(ApiContext);

  const getLeden = async () => {
    const { res, data } = await ApiRequest("/api/leden/");
    if (res.status === 200) {
      setLeden(() => data);
    } else {
      console.log("res", res);
    }
  };
  const GETLid = async (id) => {
    const { res, data } = await ApiRequest(`/api/leden/${id}`);
    if (res.status === 200) {
      setLid(() => data);
      return lid;
    } else {
      console.log("res", res);
    }
  };
  useEffect(() => {
    async function getit() {
      await getLeden();
      await GETLid(user.lid_id)
    }
    if (user) {
      getit();
    }
    // eslint-disable-next-line
  }, [user]);

  const data = {
    user: user,
    GETLid: GETLid,
    lid: lid,
    setLid: setLid,
    leden: leden,
  };
  return <LedenContext.Provider value={data}>{children}</LedenContext.Provider>;
};
