import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import Paginator from "../../components/Paginator";
import LedenContext from "../../context/LedenContext";
import { isMobile } from "react-device-detect";
import DsaniContext from "../../context/DsaniContext";
import DsaniEvent from "./DsaniEvent";
import Page from "../../utils/Page";
const Dsani = () => {
  const { leden } = useContext(LedenContext);
  let { events } = useContext(DsaniContext);
  let numberDSANIEvents = 20;
  const [search, setSearch] = useState("");
  const [paginator, setPaginator] = useState(1);

  const changePage = (page) => {
    setPaginator(page);
  };
  events = events?.filter((event) => {
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
  const maxPages = Math.ceil(events?.length / numberDSANIEvents);
  events = events?.slice(
    (paginator - 1) * numberDSANIEvents,
    paginator * numberDSANIEvents
  );
  if (isMobile) {
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
        {events?.map((event) => (
          <DsaniEvent key={event.id} event={event} />
        ))}
        <Paginator
          numberOfPages={maxPages}
          current={paginator}
          paginate={changePage}
        />
      </>
    );
  } else {
    return (
      <>
        <Page>
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
                  <DsaniEvent key={"row" + event.id} event={event} />
                ))}
              </tbody>
            </table>
          </div>
          {events.length === 0 && (
            <div className="loader" style={{ textAlign: "center" }}></div>
          )}
        </Page>
        <Page>
          <Paginator
            numberOfPages={maxPages}
            current={paginator}
            paginate={changePage}
          />
        </Page>
      </>
    );
  }
};

Dsani.propTypes = {
  leden: PropTypes.any,
};

export default Dsani;
