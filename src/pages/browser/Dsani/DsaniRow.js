import React from "react";
import DsaniPoint from "./DsaniPoint";

const DsaniEvent = ({ event, dsaniState }) => {
  return (
    <tr>
      <td>{event.start_date}</td>
      <td>{event.description}</td>
      {event.dsani_ev?.map((point) => (
        <DsaniPoint
          key={"DsaniPoint" + point.id}
          point={point}
          dsaniState={dsaniState}
        />
      ))}
    </tr>
  );
};

export default DsaniEvent;
