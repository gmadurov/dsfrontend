import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import Button from "../../global/Button";

export const DeclaFrom = ({ leden, declaState, boekstukState, eventState }) => {
  const params = useParams();
  const navigate = useNavigate();
  let pastDecla = declaState?.objects().some((x) => x.id === params.id);
  let decla = declaState?.objects().find((x) => x.id === params.id);

  const [deleted, setDeleted] = useState(false);
  const [event, setEvent] = useState(pastDecla && decla?.event.id);
  // const [owner, setOwner] = useState(pastDecla && pastDecla?.owner);
  const [content, setContent] = useState(pastDecla ? decla?.content : "");
  const [total, setTotal] = useState(pastDecla ? decla?.total : 0);
  const [present, setPresent] = useState(pastDecla ? decla?.present : []);
  const [receipt, setReceipt] = useState(pastDecla ? decla?.receipt : "");
  const [reunist, setReunist] = useState(pastDecla ? decla?.reunist : 0);
  const [kmters, setKmters] = useState(pastDecla ? decla?.kmters : 0);
  const [boekstuk, setBoekstuk] = useState(pastDecla ? decla?.boekstuk : "");
  const [content_ficus, setContent_ficus] = useState(
    pastDecla ? decla?.content_ficus : ""
  );
  const [verwerkt, setVerwerkt] = useState(pastDecla ? decla?.verwerkt : false);

  const optionsLeden = [
    { label: "Select All", value: "all" },
    ...leden?.map((lid) => ({
      value: lid.id,
      label: lid?.initials,
    })),
  ];
  const optionsBoekstuk = boekstukState?.objects().map((boekstuk) => ({
    value: boekstuk?.id,
    label: boekstuk?.name,
  }));
  const optionsEvents = eventState?.objects().map((event) => ({
    value: event.id,
    label: event.description + " " + event.start_date,
  }));
  const [defaultValues, setDefault] = useState(
    present?.map((pres) => optionsLeden?.find((x) => x.value === pres))
  );
  // const [defaultValuesBS, setDefaultBS] = useState(
  //   boekstukState
  //     ?.objects()
  //     .map((bs) => optionsBoekstuk?.find((x) => x.value === bs))
  // );
  let id = decla?.id;
  let owner = 20204;
  const onDelete = (e) => {
    e.preventDefault();
    new declaState({
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
    }).DELETE();
    setDeleted(true);
  };
  const onSubmit = (e) => {
    if (!event | !content | !total | !present) {
      alert("Je moet een evenement kiezen");
      return;
    }
    e.preventDefault();
    if (pastDecla) {
      new declaState({
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
      }).PUT();
      navigate("/declas");
    } else {
      new declaState({
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
      }).POST();
    }
    setDeleted(false);
  };
  return (
    <>
      <form className="card is-centered">
        <table>
          <tbody>
            <tr>
              <th>
                <label htmlFor="id_event">Event:</label>
              </th>
              <td>
                <Select
                  defaultValue={optionsEvents?.find((x) => x.value === event)}
                  options={optionsEvents}
                  name="kokers"
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
              <td>
                <textarea
                  name="content"
                  // value={content}
                  cols="40"
                  rows="10"
                  maxLength="50"
                  className="input"
                  required
                  id="id_content"
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </td>
            </tr>

            <tr>
              <th>
                <label htmlFor="id_total">Total:</label>
              </th>
              <td>
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
                <label htmlFor="id_kokers">Present:</label>
              </th>
              <Select
                isMulti
                value={defaultValues}
                options={optionsLeden}
                name="kokers"
                id="id_kokers"
                onChange={(e) => {
                  if (e.some((val) => val.value === "all")) {
                    setPresent(
                      optionsLeden
                        ?.filter((x) => x.value !== "all")
                        .map((x) => x.value !== "all" && x.value)
                    ); // change the value going to the API

                    setDefault(
                      optionsLeden
                        ?.filter((x) => x.value !== "all")
                        .map((x) => x.value !== "all" && x)
                    ); // change the values displayed
                  } else {
                    setPresent(e?.map((x) => x.value)); // change the value going to the API
                    setDefault(e?.map((x) => x)); // change the values displayed
                  }
                }}
              />
            </tr>

            <tr>
              <th>
                <label htmlFor="id_receipt">Receipt:</label>
              </th>
              <td>
                <input
                  type="file"
                  name="receipt"
                  // value={receipt}

                  accept="image/*"
                  onChange={(e) => setReceipt(e.target.value)}
                  className="input"
                  id="id_receipt"
                />
              </td>
            </tr>

            <tr>
              <th>
                <label htmlFor="id_reunist">Reunist:</label>
              </th>
              <td>
                <input
                  onChange={(e) => setReunist(e.target.value)}
                  type="number"
                  name="reunist"
                  value={reunist}
                  className="input"
                  required
                  id="id_reunist"
                />
              </td>
            </tr>

            <tr>
              <th>
                <label htmlFor="id_kmters">Kmters:</label>
              </th>
              <td>
                <input
                  type="number"
                  name="kmters"
                  value={kmters}
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
              <td>
                {/* onChange={(e) => setBoekstuk(e.target.value)} */}
                <CreatableSelect
                  defaultValue={optionsBoekstuk.find(
                    (x) => x.value === boekstuk
                  )}
                  options={optionsBoekstuk}
                  name="boekstuk"
                  id="id_boekstuk"
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
              <td>
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

            <tr>
              <th>
                <label htmlFor="id_verwerkt">Verwerkt:</label>
              </th>
              <td>
                <input
                  type="checkbox"
                  name="verwerkt"
                  value={verwerkt}
                  className="checkbox"
                  onChange={(e) => {
                    setVerwerkt(e.target.checked);
                    console.log(e.target.checked);
                  }}
                  id="id_verwerkt"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <Button
        value="Submit"
        text={deleted ? "undo" : "Submit"}
        type="Submit"
        color="is-success"
        onClick={onSubmit}
      />
      {pastDecla && (
        <Button
          type="delete"
          text="Delete"
          color="is-danger"
          onClick={onDelete}
        />
      )}
    </>
  );
};
export default DeclaFrom;
