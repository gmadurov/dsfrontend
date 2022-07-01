import PropTypes from "prop-types";
import React, { useState } from "react";
// import { format } from "date-fns";
import moment from "moment";
// import HoverDropdown from "../../../components/HoverDropdown";
// import ClickDropdown from "../../../components/ClickDropdown";
import EventForm from "./EventForm";
// import { Link } from "react-router-dom";

// import { ReactComponent as EditIcon } from "../../../assets/mumble/edit.svg";

const Event = ({ leden, event, eventState }) => {
  const [show1, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  let styleSummary;
  let showStyle;
  let showStyleEdit;
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
  show1 === true
    ? (showStyle = { display: "block" })
    : (showStyle = { display: "none" });
  showEdit === true
    ? (showStyleEdit = { display: "block" })
    : (showStyleEdit = { display: "none" });

  return (
    <>
      <div className="card mt-2">
        <header
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
        </header>
        <div style={showStyle}>
          <div className="card-content" style={{ textAlign: "center" }}>
            <div
              className="card-content-icon"
              aria-label="more options"
              style={{ textAlign: "right" }}
            >
              <div className="dropdown-menu is-centered" style={showStyleEdit}>
                <div className="dropdown-items" style={{ textAlign: "center" }}>
                  <EventForm
                    leden={leden}
                    key={"form" + event.id}
                    id={event.id}
                    event={event}
                    eventState={eventState}
                  />
                </div>
              </div>
            </div>

            <p>
              tot:{" "}
              {moment(event.end_date + "T" + event.end_time).format(
                "ddd Do MMM, hh:mmA"
              )}{" "}
            </p>
            {event.location && <p>Location: {event.location}</p>}
            <p>
              {event.kokers.length > 0 && <b>kokers: </b>}
              {event.kokers &&
                event.kokers.map(
                  (koker) => leden?.find((x) => x.id === koker)?.initials + " "
                )}
            </p>
            <p>{event.kartrekkers && "Kartrekkers: " + event.kartrekkers} </p>
            <p>{event.bijzonderheden && event.bijzonderheden}</p>
            <p>{event.budget && "Budget:" + event.budget}</p>
            <p>{event.info && "Extra info:" + event.info}</p>
            {/* <ClickDropdown key={event.id} dropText="Edit" items={<><EventForm key={event.id} id={event.id}pastevent={event}onAdd={onAdd}onEdit={onEdit}onDelete={onDelete}/></>}/> */}
          </div>
        </div>
      </div>
    </>
  );
};

Event.propTypes = {
  event: PropTypes.any,
};

export default Event;
