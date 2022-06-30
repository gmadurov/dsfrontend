import { useState } from "react";
import { Link } from "react-router-dom";

export const Decla = ({
  leden,
  decla,
  declaState,
  boekstukState,
  eventState,
}) => {
  let styleSummary;
  decla?.event?.summary === "Wedstrijd"
    ? (styleSummary = { textAline: "center", backgroundColor: "red" })
    : decla?.event?.summary === "Dispuutsactiviteit"
    ? (styleSummary = {
        textAline: "center",
        backgroundColor: "green",
        color: "white",
      })
    : decla?.event?.summary === "Borrel"
    ? (styleSummary = {
        textAline: "center",
        backgroundColor: "pink",
        color: "black",
      })
    : decla?.event?.summary === "Dispuutsverjaardag"
    ? (styleSummary = { textAline: "center", backgroundColor: "#bbd334" })
    : decla?.event?.summary === "Clubactiviteit"
    ? (styleSummary = { textAline: "center", backgroundColor: "yellow" })
    : decla?.event?.summary === "Activiteit"
    ? (styleSummary = {
        textAlign: "center",
        backgroundColor: "rgba(35, 32, 209, 0.685)",
      })
    : (styleSummary = { textAline: "center" });
  const onDelete = (e) => {
    new declaState({ id: decla.id }).DELETE();
    // setDeleted(true);
  };
  const onVerwerk = (e) => {
    console.log({...decla,event: decla?.event.id, verwerkt: !decla?.verwerkt});
    new declaState({...decla, event: decla?.event.id, verwerkt: !decla?.verwerkt}).PUT();
  };
  return (
    <>
      <tr>
        <td style={{ textAlign: "center" }}>{decla?.event?.start_date}</td>
        <td style={styleSummary}>
          {decla?.event?.summary} | {decla?.event.description}
        </td>

        <td style={{ textAlign: "center" }}>
          {leden.find((x) => x.id === decla?.owner)?.initials}
        </td>
        <td style={{ textAlign: "center" }}>
          <div className="dropdown is-hoverable">
            <span aria-haspopup="true" aria-controls="dropdown-menu4">
              <span>
                <p>Image</p>
              </span>
            </span>
            <div
              className="dropdown-menu"
              id="dropdown-menu4"
              role="menu"
              style={{ width: "500" }}
            >
              <image src="decla?.imageURL"></image>
              <br />
            </div>
          </div>
        </td>
        <td style={{ textAlign: "center" }}>
          {
            boekstukState?.objects().find((BS) => BS.id === decla?.boekstuk)
              ?.name
          }
        </td>
        <td style={{ textAlign: "center" }}>{decla?.content_ficus}</td>
        <td style={{ textAlign: "center" }}>{decla?.total}</td>
        <td style={{ textAlign: "center" }}>
          {decla?.verwerkt === true ? "True" : "False"}
          <button onClick={() => onVerwerk()}>
            <p>{decla?.verwerkt === true ? "True" : "False"}</p>
          </button>
        </td>
        <td style={{ textAlign: "center" }}>
          <Link to={`/decla/${decla?.id}`}>
            <p className="navbar-item">Edit</p>
          </Link>
          <button onClick={() => onDelete()}>Delete</button>
        </td>
      </tr>
    </>
  );
};
export default Decla;
