import PropTypes from "prop-types";
import React, {  useState } from "react";
import Event from "./Event";
import Page from "../../Page";
import Paginator from "../../global/Paginator";
// import EventForm from "./EventForm";
// import ClickDropdown from "../../global/ClickDropdown";

const Events = ({ leden, eventState }) => {
  // useEffect(() => {
  //   EventState.GET();
  //   // eslint-disable-next-line
  // }, []);

  // const [events1, setEvents] = useState([]);
  // class eventState {
  //   constructor(event) {
  //     this.event = event;
  //   }
  //   static objects() {
  //     return events1;
  //   }
  //   static async GET() {
  //     setEvents([]);
  //     const res = await fetch(API_URL + "/api/dsani/");
  //     const data = await res.json();
  //     setEvents(data);
  //   }
  //   async POST() {
  //     const res = await fetch(API_URL + "/api/events/", {
  //       method: "POST",
  //       headers: { "Content-type": "application/json" },
  //       body: JSON.stringify(this.event),
  //     });
  //     const data = await res.json();
  //     setEvents([...this.events, data]);
  //   }
  //   async PUT() {
  //     const res = await fetch(API_URL + `/api/events/${this.event.id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify(this.event),
  //     });
  //     const data = await res.json();
  //     setEvents(
  //       this.events.map((event_from_map) =>
  //         this.event.id === event_from_map.id ? data : event_from_map
  //       )
  //     );
  //   }
  //   async DELETE() {
  //     await fetch(API_URL + `/api/events/${this.event.id}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     });
  //   }
  // }
  const [search, setSearch] = useState("");
  const [paginator, setPaginator] = useState(1);
  let events = [];

  let numberEvents = 25;

  let changePage = (page) => {
    setPaginator(page);
  };
  events = eventState?.objects().filter((event) => {
    if (
      event.summary?.toLowerCase().includes(search.toLowerCase()) |
      event.description?.toLowerCase().includes(search.toLowerCase()) |
      event.info?.toLowerCase().includes(search.toLowerCase()) |
      event.kokers
        ?.map((koker) =>
          leden.find((x) => x.id === koker)?.initials.toLowerCase()
        )

        .includes(search.toLowerCase()) |
      event.start_date?.toLowerCase().includes(search.toLowerCase())
    ) {
      return event;
    } else {
      return false;
    }
  });
  console.log(events);
  let maxPages = Math.ceil(events?.length / numberEvents);
  events = events.slice(
    (paginator - 1) * numberEvents,
    paginator * numberEvents
  );
  return (
    <Page
      element={
        <>
          <h1 style={{ textAlign: "center" }}>Agenda</h1>
          <div className="search">
            <input
              type="text"
              value={search}
              maxLength="50"
              className="input"
              placeholder="omshrijving, activiteit sort en datum(YYYY-mm-dd)"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {events?.length === 0 && (
            <div className="loader" style={{ textAlign: "center" }}></div>
          )}
          <>
            {events.map((event) => (
              <Event
                leden={leden}
                key={event.id}
                event={event}
                eventState={eventState}
              />
            ))}
            <Paginator
              numberOfPages={maxPages}
              current={paginator}
              paginate={changePage}
            />
          </>
        </>
      }
    />
  );
};

Events.propTypes = {
  allEvents: PropTypes.any,
};

export default Events;
