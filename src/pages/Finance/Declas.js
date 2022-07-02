import { useContext, useEffect, useState } from "react";
import DeclaContext from "../../context/DeclaContext";
import LedenContext from "../../context/LedenContext";
import Decla from "./Decla";
import AuthContext from "../../context/AuthContext";

/**
 *  test docstring
 */
export const Declas = () => {
  const { user } = useContext(AuthContext);
  const { leden } = useContext(LedenContext);
  let { declas, GET, boekstuks } = useContext(DeclaContext);
  useEffect(() => {
    const get = async () => {
      await GET();
    };
    get();
    // eslint-disable-next-line
  }, []);

  const [search, setSearch] = useState("");
  declas = declas?.filter((decla) => {
    if (
      leden
        ?.find((lid) => lid.id === decla.owner)
        ?.initials.toLowerCase()
        .includes(search.toLowerCase()) |
      boekstuks
        .find((bs) => bs.id === decla.boekstuk)
        ?.name.toLowerCase()
        .includes(search.toLowerCase()) |
      decla.content?.toLowerCase().includes(search.toLowerCase()) |
      decla.info?.toLowerCase().includes(search.toLowerCase()) |
      decla.present
        ?.map((pres) =>
          leden?.find((x) => x.id === pres)?.initials.toLowerCase()
        )
        .includes(search.toLowerCase()) |
      decla.start_date?.toLowerCase().includes(search.toLowerCase())
    ) {
      return decla;
    } else {
      return false;
    }
  });

  return (
    <>
      <div className="columns">
        <div className="column is-offset-2 is-8">
          <div className="search">
            <input
              type="text"
              value={search}
              maxLength="50"
              className="input"
              placeholder="omshrijving, activiteit sort en datum(YYYY-mm-dd)"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="table is-bordered is-striped is-narrow is-hoverable is-centered is-three-forths">
            <table style={{ width: "100%", border: "1px solid black" }}>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Sort</th>
                  <th>Lid</th>
                  <th>Receipt</th>
                  <th>Boekstuk</th>
                  <th>Ficus Comment</th>
                  <th>Total</th>
                  {user.roles.includes("Fiscus") && <th>Verwerkt</th>}
                  <th>Actie</th>
                </tr>
              </thead>
              <tbody>
                {declas?.map((decla) => (
                  <Decla key={"decla" + decla.id} decla={decla} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Declas;
