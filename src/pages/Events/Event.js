import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { isMobile } from "react-device-detect";
import moment from "moment";
import ClickDropdown from "../../components//ClickDropdown";
import EventForm from "./EventForm";
import LedenContext from "../../context/LedenContext";
import { ReactComponent as EditIcon } from "../../assets/mumble/edit.svg";
import AuthContext from "../../context/AuthContext";

const Event = ({ event }) => {
  const { user } = useContext(AuthContext);
  const { leden } = useContext(LedenContext);
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
  if (isMobile) {
    return (
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
                    key={"form" + event.id}
                    id={event.id}
                    event={event}
                  />
                </div>
              </div>
            </div>
            <p>
              tot:{" "}
              {moment(event.end_date + "T" + event.end_time).format(
                "ddd Do MMM, hh:mmA"
              )}
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
            {user.roles.includes("Senate") && (
              <div onClick={() => setShowEdit(!showEdit)}>
                Edit
                <EditIcon style={{ height: "20", width: "20" }} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <tr>
        <td style={{ textAline: "center" }}>
          {event.start_date
            ? moment(event.start_date + "T" + event.start_time).format(
                "ddd Do MMM, hh:mmA"
              )
            : " "}{" "}
          {/* "{ event.start_date+'T'+event.start_time}" */}
        </td>

        <td style={{ backgroundColor: styleSummary }}>
          {event.summary ? event.summary : ""}
        </td>

        <td style={{ textAline: "center" }}>
          {event.description} {"  "}
          {event.location ? "(Loc: " + event.location + ")" : ""}
        </td>
        <td style={{ textAline: "center" }}>
          {event.kokers?.map(
            (koker) => leden?.find((x) => x.id === koker)?.initials + " "
          )}
        </td>
        <td style={{ textAline: "center" }}>
          {event.kartrekkers ? event.kartrekkers : ""}
        </td>
        <td style={{ textAline: "center" }}>
          {event.bijzonderheden ? event.bijzonderheden : ""}
        </td>
        <td style={{ textAline: "center" }}>
          {event.budget ? event.budget : ""}
        </td>
        <td style={{ textAline: "center" }}>
          <ClickDropdown
            key={event.id}
            dropText="Edit"
            items={
              <>
                <EventForm key={event.id} id={event.id} event={event} />
              </>
            }
          />
        </td>
      </tr>
    );
  }
};

Event.propTypes = {
  event: PropTypes.any,
};

export default Event;
