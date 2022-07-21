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
  const { user, ApiRequest, ApiFileRequest } = useContext(ApiContext);

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

  const PUT = async (person, blob) => {
    const uploadData = new FormData();
    person.active && uploadData.append("active", person.active);
    person.birthDate && uploadData.append("birthDate", person.birthDate);
    person.educations && uploadData.append("educations", person.educations);
    person.email && uploadData.append("email", person.email);
    person.name && uploadData.append("name", person.name);
    person.phone && uploadData.append("phone", person.phone);
    person.shortIntro && uploadData.append("shortIntro", person.shortIntro);
    blob &&
      uploadData.append("lidImage", person.lidImage, person.lidImage.name);
    const { res, data } = await ApiFileRequest(`/api/leden/${person.id}`, {
      method: "PUT",
      body: uploadData,
    });
    if (res.status === 200) {
      console.log("received");
      setLid(data);
    } else {
      console.log("Lid not updated");
    }
  };

  useEffect(() => {
    async function getit() {
      await getLeden();
      await GETLid(user.lid_id);
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
    PUT: PUT,
    setLid: setLid,
    leden: leden,
  };
  return <LedenContext.Provider value={data}>{children}</LedenContext.Provider>;
};
