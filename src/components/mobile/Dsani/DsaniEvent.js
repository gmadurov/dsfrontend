import moment from "moment";
import React, { useState } from "react";
import DsaniPoint from "./DsaniPoint";

const DsaniEvent = ({ leden, event, dsaniState }) => {
  let styleSummary;
  event.summary === "Wedstrijd"
    ? (styleSummary = "red")
    : event.summary === "Dispuutsactiviteit"
    ? (styleSummary = "green")
    : event.summary === "Borrel"
    ? (styleSummary = "pink")
    : event.summary === "Dispuutsverjaardag"
    ? (styleSummary = "#bbd334")
    : event.summary === "Clubactiviteit"
    ? (styleSummary = "yellow")
    : event.summary === "Activiteit"
    ? (styleSummary = "rgba(35, 32, 209, 0.685)")
    : (styleSummary = "#bbb");
  const [show1, setShow] = useState(false);
  let showStyle;
  show1 === true
    ? (showStyle = { display: "block" })
    : (showStyle = { display: "none" });
  // console.log(event);
  return (
    <>
      <div className="card mt-2">
        <div
          className="card-header"
          style={{ textAlign: "left" }}
          onClick={() => setShow(!show1)}
        >
          <div className="card-header-title">
            <span
              style={{
                height: "25px",
                width: "25px",
                backgroundColor: styleSummary,
                borderRadius: "5px",
                display: "inline-block",
              }}
            />
            {event.description}
          </div>
          {event.start_date
            ? moment(event.start_date + "T" + event.start_time).format(
                "ddd Do MMM,hh:mmA"
              )
            : " "}
          {"  "}
        </div>
        <div style={showStyle}>
          <div className="card-content" style={{ textAlign: "center" }}>
            {event?.dsani_ev?.map((point) => (
              <DsaniPoint
                key={"DsaniPoint" + point.id}
                point={point}
                leden={leden}
                dsaniState={dsaniState}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DsaniEvent;
