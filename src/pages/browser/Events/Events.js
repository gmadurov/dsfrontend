// import PropTypes from "prop-types";
import React, { useState } from "react";
import Event from "./Event";
import Page from "../../../pages/Page";
import EventForm from "./EventForm";
import ClickDropdown from "../../../components/ClickDropdown";

const Events = ({ leden, eventState }) => {
  // const allEvents = eventState?.objects();
  const [search, setSearch] = useState("");
  let events = eventState?.objects().filter((event) => {
    if (
      event.summary?.toLowerCase().includes(search.toLowerCase()) |
      event.kartrekkers?.toLowerCase().includes(search.toLowerCase()) |
      event.description?.toLowerCase().includes(search.toLowerCase()) |
      event.info?.toLowerCase().includes(search.toLowerCase()) |
      event.kokers
        ?.map((koker) =>
          leden?.find((x) => x.id === koker)?.initials.toLowerCase()
        )

        .includes(search.toLowerCase()) |
      event.start_date?.toLowerCase().includes(search.toLowerCase())
    ) {
      return event;
    } else {
      return false;
    }
  });
  return (
    <Page
      element={
        <>
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
          <div className="table is-bordered is-striped is-narrow is-hoverable">
            <table style={{ width: "100%", border: "1px solid black" }}>
              <tbody>
                <tr>
                  <th>Datum</th>
                  <th>Activiteit</th>
                  <th>Omschrijving</th>
                  <th>Kokers</th>
                  <th>Kartrekkers</th>
                  <th>Bijzonderheden</th>
                  <th>Budget</th>
                  <th>
                    <ClickDropdown
                      dropText="Event Toevogen"
                      items={
                        <EventForm leden={leden} eventState={eventState} />
                      }
                    />
                  </th>
                </tr>

                {events?.map((event) => (
                  <Event
                    leden={leden}
                    key={event.id}
                    event={event}
                    eventState={eventState}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {eventState?.objects().length === 0 && <div className="loader"></div>}
        </>
      }
    />
  );
};

// Events.propTypes = {
//   eventState?.objects(): PropTypes.any,
// };

export default Events;
