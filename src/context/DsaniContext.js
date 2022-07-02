import { createContext, useContext } from "react";
import EventContext from "./EventContext";
import ApiContext from "./ApiContext";
/**events : events,
 * 
    PUT: PUT, */
const DsaniContext = createContext();
export default DsaniContext;

export const DsaniProvider = ({ children }) => {
  const { events, setEvents } = useContext(EventContext);
  const { ApiRequest } = useContext(ApiContext);

  async function PUT(event) {
    const { res, data } = await ApiRequest(`/api/dsani/${event.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(event),
    });
    if (res.status === 200) {
      setEvents(
        // console.log(
        events?.map((event_from_map) =>
          event_from_map.dsani_ev.map((point) => point.id === event.id)
            ? {
                ...event_from_map,
                dsani_ev: event_from_map.dsani_ev.map((point) =>
                  point.id === event.id ? data : point
                ),
              }
            : event_from_map
        )
      );
    }
    // else {
    //   console.log("Dsani Not updated ");
    // }
  }
  const data = {
    events: events,
    PUT: PUT,
  };
  return <DsaniContext.Provider value={data}>{children}</DsaniContext.Provider>;
};
