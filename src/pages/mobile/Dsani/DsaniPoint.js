import React from "react";
import DsaniForm from "./DsaniForm";
import HoverDropdown from "../../../components/HoverDropdown";
const DsaniPoint = ({ leden, point, dsaniState }) => {
  // const [show1, setShow] = useState(false);
  // let showStyle;
  // show1 === true
  //   ? (showStyle = { display: "block" })
  //   : (showStyle = { display: "none" });
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
        <DsaniForm
          key={"dsaniform" + point.id}
          id={point.id}
          leden={leden}
          point={point}
          dsaniState={dsaniState}
        />
      }
    />
  );
};

export default DsaniPoint;
