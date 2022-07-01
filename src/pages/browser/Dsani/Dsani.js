import PropTypes from "prop-types";
import React, { useState } from "react";
import DsaniRow from "./DsaniRow";
import Paginator from "../../../components/Paginator";
const Dsani = ({ leden, dsaniState }) => {
  let numberDSANIEvents = 25;
  const [search, setSearch] = useState("");
  const [paginator, setPaginator] = useState(1);

  const changePage = (page) => {
    setPaginator(page);
  };
  // fuket
  let events = dsaniState?.objects().filter((event) => {
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
      <div className="columns is-centered">
        <div className="column is-two-thirds">
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
          <div className="table is-bordered is-striped is-narrow is-fullwidth">
            <table style={{ width: "100%", border: "1px solid black" }}>
              <thead>
                <tr>
                  <th>Datum</th>
                  <th>Omschrijving</th>
                  {leden?.map((lid) => (
                    <th key={lid.id}>{lid?.initials}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {events?.map((event) => (
                  <DsaniRow
                    key={"row" + event.id}
                    event={event}
                    dsaniState={dsaniState}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {events.length === 0 && (
        <div className="loader" style={{ textAlign: "center" }}></div>
      )}
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
