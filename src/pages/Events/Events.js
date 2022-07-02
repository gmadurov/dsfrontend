// import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import Event from "./Event";
import Page from "../../pages/Page";
import EventForm from "./EventForm";
import ClickDropdown from "../../components/ClickDropdown";
import { isMobile } from "react-device-detect";
import EventContext from "../../context/EventContext";
import LedenContext from "../../context/LedenContext";
import Paginator from "../../components/Paginator";

const Events = () => {
  let { events } = useContext(EventContext);
  const { leden } = useContext(LedenContext);
  const [search, setSearch] = useState("");
  const [paginator, setPaginator] = useState(1);
  let numberEvents = 25;
  events = events?.filter((event) => {
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

  let changePage = (page) => {
    setPaginator(page);
  };
  let maxPages = Math.ceil(events?.length / numberEvents);
  events = events.slice(
    (paginator - 1) * numberEvents,
    paginator * numberEvents
  );
  if (isMobile) {
    return (
      <Page>
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
        <Page>
          {events.map((event) => (
            <Event leden={leden} key={"event " + event.id} event={event} />
          ))}
          <Paginator
            numberOfPages={maxPages}
            current={paginator}
            paginate={changePage}
          />
        </Page>
      </Page>
    );
  } else {
    return (
      <Page>
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
                      items={<EventForm />}
                    />
                  </th>
                </tr>
                {events?.map((event) => (
                  <Event key={"event " + event.id} event={event} />
                ))}
              </tbody>
            </table>
          </div>
          {events.length === 0 && <div className="loader"></div>}
        </>
        <Page>
          <Paginator
            numberOfPages={maxPages}
            current={paginator}
            paginate={changePage}
          />
        </Page>
      </Page>
    );
  }
};

export default Events;
