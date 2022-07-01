import { createContext, useContext } from "react";
import EventContext from "./EventContext";
import ApiContext from "./ApiContext";

const DsaniContext = createContext();
export default DsaniContext;

export const DsaniProvider = ({ children }) => {
  const eventState = useContext(EventContext);
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
      eventState.setEvents(
        // console.log(
        eventState.objects()?.map((event_from_map) =>
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
    } else {
      alert("Dsani Not updated ");
    }
  }
  const data = {
    objects: eventState.objects,
    PUT: PUT,
  };
  return <DsaniContext.Provider value={data}>{children}</DsaniContext.Provider>;
};
