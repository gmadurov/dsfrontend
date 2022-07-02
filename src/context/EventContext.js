import { createContext, useState, useContext, useEffect } from "react";
import ApiContext from "./ApiContext";
/** events: events,
 * 
    setEvents: setEvents,

    POST: POST,

    PUT: PUT,

    DELETE: DELETE, */
const EventContext = createContext();
export default EventContext;

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const { user, ApiRequest } = useContext(ApiContext);

  const GET = async () => {
    setEvents([]);
    const { res, data } = await ApiRequest("/api/dsani/");
    if (res.status === 200) {
      setEvents(data);
    } else {
      console.log("error getting Events");
    }
  };
  async function POST(event) {
    const { res, data } = await ApiRequest("/api/events/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(event),
    });
    if (res.status === 200) {
      setEvents([...events, data]);
    } else {
      console.log("Problem creating event");
    }
  }
  async function PUT(event) {
    const { res, data } = await ApiRequest(`/api/events/${event.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(event),
    });
    if (res.status === 200) {
      setEvents(
        events.map((event_from_map) =>
          event.id === event_from_map.id ? data : event_from_map
        )
      );
    } else {
      console.log("Problem changing event");
    }
  }
  async function DELETE(event) {
    const { res } = await ApiRequest(`/api/events/${event.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (res.status !== 200) {
      console.log("Event Deleted");
    }
  }

  useEffect(() => {
    async function lambda() {
      GET();
    }
    if (user) {
      lambda();
    }
    // eslint-disable-next-line
  }, [user]);

  const data = {
    events: events,
    setEvents: setEvents,
    POST: POST,
    PUT: PUT,
    DELETE: DELETE,
  };
  return <EventContext.Provider value={data}>{children}</EventContext.Provider>;
};
