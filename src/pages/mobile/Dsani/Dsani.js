import PropTypes from "prop-types";
import React, { useState } from "react";
import DsaniEvent from "./DsaniEvent";
import Paginator from "../../../components/Paginator";

const Dsani = ({ match, leden, allEvents, dsaniState }) => {
  // const dsani = match.params.id;
  let numberDSANIEvents = 25;
  const [search, setSearch] = useState("");
  const [paginator, setPaginator] = useState(1);

  const changePage = (page) => {
    setPaginator(page);
  };

  let events = allEvents?.filter((event) => {
    if (
      event.summary?.toLowerCase().includes(search.toLowerCase()) |
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
  const maxPages = Math.ceil(events.length / numberDSANIEvents);
  events = events.slice(
    (paginator - 1) * numberDSANIEvents,
    paginator * numberDSANIEvents
  );

  return (
    <>
      <h1 style={{ textAlign: "center" }}>DSANI</h1>
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
      {events.length === 0 && (
        <div className="loader" style={{ textAlign: "center" }}></div>
      )}
      {events.map((event) => (
        <DsaniEvent
          leden={leden}
          key={event.id}
          event={event}
          dsaniState={dsaniState}
          onDe
        />
      ))}
      <Paginator
        numberOfPages={maxPages}
        current={paginator}
        paginate={changePage}
      />
    </>
  );
};

Dsani.propTypes = {
  leden: PropTypes.any,
};

export default Dsani;
