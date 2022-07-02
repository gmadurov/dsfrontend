import React, { useContext } from "react";
import DsaniForm from "./DsaniForm";
import { isMobile } from "react-device-detect";
import HoverCell from "../../components/HoverCell";
import HoverDropdown from "../../components/HoverDropdown";
import LedenContext from "../../context/LedenContext";

const DsaniPoint = ({ point }) => {
  const { leden } = useContext(LedenContext);
  if (isMobile) {
    return (
      <HoverDropdown
        dropText={
          <div className="card card-content">
            {
              leden?.find((x) => {
                return x.id === point.lid;
              })?.initials
            }
            : {point.points}
          </div>
        }
        items={
          <DsaniForm key={"dsaniform" + point.id} id={point.id} point={point} />
        }
      />
    );
  } else {
    return (
      <HoverCell
        key={"hoverCell" + point.id}
        dropText={point.points}
        items={
          <DsaniForm key={"dsaniForm" + point.id} id={point.id} point={point} />
        }
      />
    );
  }
};

export default DsaniPoint;
