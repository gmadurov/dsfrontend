import { useContext } from "react";
import LedenContext from "../../context/LedenContext";

export const AccountForm = (props) => {
  const { lid } = useContext(LedenContext);
  console.log(lid);

  return <></>;
};
export default AccountForm;
