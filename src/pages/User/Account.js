import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LedenContext from "../../context/LedenContext";
import DeclaContext from "../../context/DeclaContext";
import EventContext from "../../context/EventContext";
import Decla from "../Finance/Decla";
import Event from "../Events/Event";
import Button from "../../components/Button";
// {active: Boolean
//   birth_date: date isoformat
//   created: date isoformat
//   educations: null
//   email: string
//   id: Int
//   initials: string
//   lichting: int
//   lid_image: string(link)
//   name: int
//   phone: int or string
//   short_intro: null
//   user: int
//   vertical: int}
export const Account = (props) => {
  // people can see the accounts of other poeple but cant edit anything
  const { user, leden } = useContext(LedenContext);
  const { declas } = useContext(DeclaContext);
  let { events } = useContext(EventContext);
  let { id } = useParams();
  const lid = leden?.find((de) => parseInt(de.id) === parseInt(id));
  let NumberPerPage = 5;

  const [collapseEvents, setCollapseEvents] = useState(true);
  const [MijnDecla, setMijnDecla] = useState(true);
  const [DeclasOpMij, setDeclasOpMij] = useState(true);

  return (
    <>
      <main>
        <div className="columns is-centered">
          <div className="column --1of3">
            <div className="card text-center">
              <div className="card__body">
                {user?.lid_id === lid?.id && (
                  <Link to={`./edit`}>
                    <p>Edit</p>
                  </Link>
                )}
                <img
                  className="avatar avatar--xl dev__avatar"
                  src={lid?.imageURL}
                  alt="lid"
                />
                <h2 className="dev__name">{lid?.name}</h2>
                <p className="dev__title">{lid?.short_intro}</p>
              </div>
            </div>
            <div className="card text-center mt-2" style={{ padding: "10px" }}>
              <div className=" is-centered">
                <p>Kookshifts:</p>
                <div className="card" style={{ padding: "10px" }}>
                  <div className=" table is-4 card__body">
                    <table>
                      <tbody>
                        {events
                          ?.filter((event) => event?.kokers?.includes(lid?.id))
                          ?.slice(
                            0,
                            collapseEvents ? NumberPerPage : events.lenght
                          )
                          .map((event) => (
                            <Event
                              key={"myKookShifts" + event?.id}
                              event={event}
                            />
                          ))}
                      </tbody>
                    </table>
                    {events?.filter((event) => event?.kokers?.includes(lid?.id))
                      ?.length > 5 && (
                      <Button
                        onClick={() => setCollapseEvents(!collapseEvents)}
                      >
                        Collapse
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="column --1of3">
            <div className="columns is-centered">
              <div className="column card text-center">
                Mijn Declas
                <div className="card" style={{ padding: "10px" }}>
                  <table className=" table is-4 card__body">
                    <tbody>
                      {declas
                        ?.filter((declaM) => declaM?.owner === lid?.id)
                        ?.slice(0, MijnDecla ? NumberPerPage : declas.lenght)
                        .map((declaM) => (
                          <Decla decla={declaM} key={"mydecla" + declaM?.id} />
                        ))}
                    </tbody>
                  </table>
                  {declas?.filter((declaM) => declaM?.owner === lid?.id)
                    .length > 5 && (
                    <Button onClick={() => setMijnDecla(!MijnDecla)}>
                      Collapse
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="columns is-centered mt-2">
              <div className="column card text-center">
                Declas op mij
                <div className="card" style={{ padding: "10px" }}>
                  <div className=" table is-4 card__body">
                    <table>
                      <tbody>
                        {declas
                          ?.filter((declaM) =>
                            declaM?.present.includes(lid?.id)
                          )
                          ?.slice(
                            0,
                            DeclasOpMij ? NumberPerPage : declas.lenght
                          )
                          ?.map((declaM) => (
                            <Decla
                              decla={declaM}
                              key={"mydecla" + declaM?.id}
                            />
                          ))}
                      </tbody>
                    </table>

                    {declas?.filter((declaM) =>
                      declaM?.present.includes(lid?.id)
                    ).length > 5 && (
                      <Button onClick={() => setDeclasOpMij(!DeclasOpMij)}>
                        Collapse
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Account;
