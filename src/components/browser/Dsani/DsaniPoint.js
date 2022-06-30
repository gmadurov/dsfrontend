import React from "react";
import DsaniForm from "./DsaniForm";
import HoverCell from "../../global/HoverCell";

const DsaniPoint = ({ point, dsaniState }) => {
  return (
    <HoverCell
      key={"hoverCell" + point.id}
      dropText={point.points}
      items={
        <DsaniForm
          key={"dsaniform" + point.id}
          id={point.id}
          point={point}
          dsaniState={dsaniState}
        />
      }
    />
  );
};

export default DsaniPoint;
