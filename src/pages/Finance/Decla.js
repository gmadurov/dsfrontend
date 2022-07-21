import { useContext } from "react";
import { Link } from "react-router-dom";
import DeclaContext from "../../context/DeclaContext";
import LedenContext from "../../context/LedenContext";
import Button from "../../components/Button";
import HoverCell from "../../components/HoverCell";

export const Decla = ({ decla }) => {
  const { user, leden } = useContext(LedenContext);
  let { VERWERK, DELETE, boekstuks } = useContext(DeclaContext);
  let styleSummary;
  decla?.event?.summary === "Wedstrijd"
    ? (styleSummary = "red")
    : decla?.event?.summary === "Dispuutsactiviteit"
    ? (styleSummary = "green")
    : decla?.event?.summary === "Borrel"
    ? (styleSummary = "pink")
    : decla?.event?.summary === "Dispuutsverjaardag"
    ? (styleSummary = "#bbd334")
    : decla?.event?.summary === "Clubactiviteit"
    ? (styleSummary = "yellow")
    : decla?.event?.summary === "Activiteit"
    ? (styleSummary = "rgba(35, 32, 209, 0.685)")
    : (styleSummary = "#bbb");
  const onDelete = () => {
    DELETE({ id: decla.id });
  };
  const onVerwerk = () => {
    VERWERK({
      ...decla,
      event: decla?.event?.id,
      verwerkt: !decla?.verwerkt,
    });
  };
  return (
    <>
      <tr>
        <td style={{ textAlign: "center" }}>{decla?.event?.start_date}</td>
        <td style={{ textAline: "center", backgroundColor: styleSummary }}>
          {decla?.event?.summary} | {decla?.event?.description}
        </td>

        <td style={{ textAlign: "center" }}>
          {leden?.find((x) => x.id === decla?.owner)?.initials}
          {decla?.owner === user?.lid_id && <Link to={`/decla/${decla?.id}`}>
            <Button color="is-link">Edit</Button>
          </Link>}
        </td>
        
          <HoverCell
            dropText="Image"
            
            items={
              <a href={decla?.receipt}>
                <img src={decla?.receipt} alt="receipt" />
              </a>
            }
          />
        
        <td style={{ textAlign: "center" }}>
          {boekstuks?.find((BS) => BS.id === decla?.boekstuk)?.name}
        </td>
        <td style={{ textAlign: "center" }}>{decla?.content_ficus}</td>
        <td style={{ textAlign: "center" }}>€{decla?.total}</td>
        {user.roles.includes("Fiscus") && (
          <>
            <td style={{ textAlign: "center" }}>
              <Button
                color={decla?.verwerkt === true ? "is-success" : "is-danger"}
                onClick={() => onVerwerk()}
              >
                <p>{decla?.verwerkt === true ? "True" : "False"}</p>
              </Button>
            </td>
            <td style={{ textAlign: "center" }}>
              <Link to={`/decla/${decla?.id}`}>
                <Button color="is-link">Edit</Button>
              </Link>
              <Button color="is-danger" onClick={() => onDelete()}>
                Delete
              </Button>
            </td>
          </>
        )}
      </tr>
    </>
  );
};
export default Decla;
