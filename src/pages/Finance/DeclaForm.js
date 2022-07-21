import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import Button from "../../components/Button";
import DeclaContext from "../../context/DeclaContext";
import LedenContext from "../../context/LedenContext";
import EventContext from "../../context/EventContext";

export const DeclaFrom = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const { user, leden } = useContext(LedenContext);
  const { events } = useContext(EventContext);
  let { declas, POST, PUT, DELETE, boekstuks, POST_boekstuk } =
    useContext(DeclaContext);
  // useEffect(() => {GET, GET_decla,
  //   const get = async () => {
  //     await GET();
  //     const data = await GET_decla(id);
  //     setDecla(data);
  //   };
  //   get();
  //   // eslint-disable-next-line
  // }, [id]);
  // eslint-disable-next-line
  const [decla, setDecla] = useState(declas?.find((de) => de.id === id));
  const [deleted, setDeleted] = useState(false);
  const [event, setEvent] = useState(decla && decla?.event);
  const [owner, setOwner] = useState(decla ? decla?.owner : user.lid_id);
  const [content, setContent] = useState(decla ? decla?.content : "");
  const [total, setTotal] = useState(decla ? decla?.total : 0);
  const [present, setPresent] = useState(decla ? decla?.present : []);
  const [receipt, setReceipt] = useState(decla && decla?.receipt);
  const [reunist, setReunist] = useState(decla ? decla?.reunist : 0);
  const [kmters, setKmters] = useState(decla ? decla?.kmters : 0);
  const [boekstuk, setBoekstuk] = useState(decla ? decla?.boekstuk : "");
  const [content_ficus, setContent_ficus] = useState(
    decla ? decla?.content_ficus : ""
  );
  const [verwerkt, setVerwerkt] = useState(decla ? decla?.verwerkt : false);
  const optionsLeden = [
    { label: "Select All", value: "all" },
    ...leden?.map((lid) => ({
      value: lid.id,
      label: lid?.initials,
    })),
  ];
  const [defaultValues, setDefaultValues] = useState(
    decla
      ? decla?.present?.map((pres) =>
          optionsLeden?.find((x) => x.value === pres)
        )
      : []
  );
  const optionsBoekstuk = boekstuks?.map((boekstuk) => ({
    value: boekstuk?.id,
    label: boekstuk?.name,
  }));
  const optionsEvents = events?.map((event) => ({
    value: event.id,
    label: event.description + " " + event.start_date,
  }));
  async function createBookstuk(inputValue) {
    const BSid = await POST_boekstuk({ name: inputValue });
    setBoekstuk(optionsBoekstuk?.find((x) => x.id === BSid)?.value);
  }
  const onDelete = (e) => {
    e.preventDefault();
    DELETE({
      id,
      event,
      content,
      total,
      present,
      receipt,
      reunist,
      kmters,
      boekstuk,
      content_ficus,
      verwerkt,
    });
    setDeleted(true);
  };
  const onSubmit = (e) => {
    // if (!event | !content | !total | !present) {
    //   alert("Je moet een evenement kiezen");
    //   return;
    // }
    e.preventDefault();
    if (decla) {
      PUT({
        id,
        owner,
        event,
        content,
        total,
        present,
        receipt,
        reunist,
        kmters,
        boekstuk,
        content_ficus,
        verwerkt,
      });
      navigate("/declas");
    } else {
      POST({
        owner,
        event,
        content,
        total,
        present,
        receipt,
        reunist,
        kmters,
        boekstuk,
        content_ficus,
        verwerkt,
      });
    }
    setDeleted(false);
  };
  if (user?.lid_id !== decla?.owner && !user.roles.includes("Fiscus") && id) {
    return (
      <h3>
        Naughty Naughty, you cheeky bastard but you can't edit other peoples
        declas!!
      </h3>
    );
  }
  return (
    <div className="columns">
      <div className="column is-half is-offset-3">
        <form>
          <table>
            <tbody>
              {user.roles.includes("Fiscus") && (
                <tr>
                  <th>
                    <label htmlFor="id_lid">Lid:</label>
                  </th>

                  <td className="field">
                    <Select
                      defaultValue={optionsLeden?.find(
                        (x) => x.value === owner
                      )}
                      options={optionsLeden?.filter(
                        (x) => !["all", 19900].includes(x.value)
                      )}
                      name="owner"
                      id="id_present"
                      onChange={(e) => {
                        setOwner(e.value);
                      }}
                    />
                  </td>
                </tr>
              )}
              <tr>
                <th>
                  <label htmlFor="id_event">Event:</label>
                </th>
                <td className="field">
                  <Select
                    defaultValue={optionsEvents?.find(
                      (x) => x.value === event?.id
                    )}
                    options={optionsEvents}
                    name="event"
                    onChange={(e) => {
                      setEvent(e.value);
                    }}
                  />
                </td>
              </tr>

              <tr>
                <th>
                  <label htmlFor="id_content">Content:</label>
                </th>
                <td className="field">
                  <textarea
                    name="content"
                    value={content}
                    cols="40"
                    rows="10"
                    maxLength="50"
                    className="input"
                    required
                    id="id_content"
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                  ></textarea>
                </td>
              </tr>

              <tr>
                <th>
                  <label htmlFor="id_total">Total:</label>
                </th>
                <td className="field">
                  <input
                    type="number"
                    onChange={(e) => setTotal(e.target.value)}
                    name="total"
                    value={total}
                    step="any"
                    className="input"
                    required
                    id="id_total"
                  />
                </td>
              </tr>

              <tr>
                <th>
                  <label htmlFor="id_present">Present:</label>
                </th>
                <Select
                  isMulti
                  value={defaultValues}
                  options={optionsLeden}
                  required
                  name="present"
                  id="id_present"
                  onChange={(e) => {
                    if (e.some((val) => val.value === "all")) {
                      setPresent(
                        optionsLeden
                          ?.filter((x) => x.value !== "all")
                          .map((x) => x.value !== "all" && x.value)
                      ); // change the value going to the API

                      setDefaultValues(
                        optionsLeden
                          ?.filter((x) => x.value !== "all")
                          .map((x) => x.value !== "all" && x)
                      ); // change the values displayed
                    } else {
                      setPresent(e?.map((x) => x.value)); // change the value going to the API
                      setDefaultValues(e?.map((x) => x)); // change the values displayed
                    }
                  }}
                />
              </tr>

              <tr>
                <th>
                  <label htmlFor="id_receipt">Receipt:</label>
                </th>
                <td className="field">
                  <input
                    type="file"
                    name="receipt"
                    required
                    // value={receipt}
                    accept="image/*"
                    onChange={(e) => {
                      setReceipt(e.target.files[0]);
                    }}
                    className="input"
                    id="id_receipt"
                  />
                </td>
              </tr>

              <tr>
                <th>
                  <label htmlFor="id_reunist">Reunist:</label>
                </th>
                <td className="field">
                  <input
                    onChange={(e) => setReunist(e.target.value)}
                    type="number"
                    name="reunist"
                    value={reunist !== 0 ? reunist : ""}
                    placeholder={reunist === 0 ? reunist : ""}
                    className="input"
                    id="id_reunist"
                  />
                </td>
              </tr>

              <tr>
                <th>
                  <label htmlFor="id_kmters">Kmters:</label>
                </th>
                <td className="field">
                  <input
                    type="number"
                    name="kmters"
                    value={kmters !== 0 ? kmters : ""}
                    placeholder={kmters === 0 ? kmters : ""}
                    onChange={(e) => setKmters(e.target.value)}
                    className="input"
                    required
                    id="id_kmters"
                  />
                </td>
              </tr>

              <tr>
                <th>
                  <label htmlFor="id_boekstuk">Boekstuk:</label>
                </th>
                <td className="field">
                  <CreatableSelect
                    defaultValue={optionsBoekstuk?.find(
                      (x) => x.value === boekstuk
                    )}
                    options={optionsBoekstuk}
                    name="boekstuk"
                    id="id_boekstuk"
                    onCreateOption={createBookstuk}
                    onChange={(e) => {
                      setBoekstuk(e.value);
                    }}
                  />
                </td>
              </tr>

              <tr>
                <th>
                  <label htmlFor="id_content_ficus">Content ficus:</label>
                </th>
                <td className="field">
                  <textarea
                    onChange={(e) => setContent_ficus(e.target.value)}
                    name="content_ficus"
                    value={content_ficus}
                    cols="40"
                    rows="10"
                    maxLength="100"
                    className="input"
                    id="id_content_ficus"
                  ></textarea>
                </td>
              </tr>
              {user.roles.includes("Fiscus") && (
                <tr>
                  <th>
                    <label htmlFor="id_verwerkt">Verwerkt:</label>
                  </th>
                  <td className="field">
                    <input
                      type="checkbox"
                      name="verwerkt"
                      checked={verwerkt}
                      className="checkbox"
                      onChange={(e) => {
                        setVerwerkt(e.target.checked);
                      }}
                      id="id_verwerkt"
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </form>
        <Button value="Submit" color="is-success" onClick={onSubmit}>
          {deleted ? "undo" : "Submit"}
        </Button>
        {decla && (
          <Button type="delete" color="is-danger" onClick={onDelete}>
            Delete
          </Button>
        )}
        <Button value="Submit" color="is-info" onClick={() => navigate(-1)}>
          Terug
        </Button>
      </div>
    </div>
  );
};
export default DeclaFrom;
