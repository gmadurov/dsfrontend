import React, { useState } from "react";
import Button from "../../global/Button";
// import Page from "../Page";
// import App from '../../App'
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const EventForm = ({ leden, id, event, eventState }) => {
  // let method = event ? "PUT" : "POST";

  const [deleted, setDeleted] = useState(false);
  const [summary, setSummary] = useState(event ? event.summary : "Activiteit");
  const [description, setDescription] = useState(
    event ? event.description : ""
  );
  const [start_date, setStart_date] = useState(event ? event.start_date : "");
  const [start_time, setStart_time] = useState(
    event?.start_time?.length < 6 ? event.start_time : "17:00"
  );
  const [end_date, setEnd_date] = useState(event ? event.end_date : "");
  const [end_time, setEnd_time] = useState(
    event?.end_time?.length < 6 ? event.end_time : "23:59"
  );
  const [recuring, setRecuring] = useState(event ? event.recuring : "");
  const [location, setLocation] = useState(event ? event.location : "");
  const [kokers, setKokers] = useState(event ? event.kokers : []);
  const [kartrekkers, setKartrekkers] = useState(
    event ? event.kartrekkers : ""
  );
  const [info, setInfo] = useState(event ? event.info : "");
  const [budget, setBudget] = useState(event ? event.budget : "");
  const [bijzonderheden, setBijzonderheden] = useState(
    event ? event.bijzonderheden : "Op Afmelding"
  );
  const onSubmit = (e) => {
    // console.log("id =", event.id, key);

    e.preventDefault();
    if (!summary) {
      alert("Prease add summary");
      return;
    }
    if (deleted | !event) {
      new eventState({
        summary,
        description,
        start_date,
        start_time,
        end_date,
        end_time,
        recuring,
        location,
        kokers,
        kartrekkers,
        info,
        budget,
        bijzonderheden,
      }).POST();
    } else {
      new eventState({
        id,
        summary,
        description,
        start_date,
        start_time,
        end_date,
        end_time,
        recuring,
        location,
        kokers,
        kartrekkers,
        info,
        budget,
        bijzonderheden,
      }).PUT();
    }
    setDeleted(false);
    setSummary(summary ? summary : "");
    setDescription(description ? description : "");
    setStart_date(start_date ? start_date : "");
    setStart_time(start_time ? start_time : "");
    setEnd_date(end_date ? end_date : "");
    setEnd_time(end_time ? end_time : "");
    setRecuring(recuring ? recuring : "");
    setLocation(location ? location : "");
    setKokers(kokers ? kokers : []);
    setKartrekkers(kartrekkers ? kartrekkers : "");
    setInfo(info ? info : "");
    setBudget(budget ? budget : "");
    setBijzonderheden(bijzonderheden ? bijzonderheden : "");
  };
  const Delete = (e) => {
    new eventState({
      id,
      summary,
      description,
      start_date,
      start_time,
      end_date,
      end_time,
      recuring,
      location,
      kokers,
      kartrekkers,
      info,
      budget,
      bijzonderheden,
    }).DELETE();
    setDeleted(!deleted);
    setSummary(summary ? summary : "");
    setDescription(description ? description : "");
    setStart_date(start_date ? start_date : "");
    setStart_time(start_time ? start_time : "");
    setEnd_date(end_date ? end_date : "");
    setEnd_time(end_time ? end_time : "");
    setRecuring(recuring ? recuring : "");
    setLocation(location ? location : "");
    setKokers(kokers ? kokers : []);
    setKartrekkers(kartrekkers ? kartrekkers : "");
    setInfo(info ? info : "");
    setBudget(budget ? budget : "");
    setBijzonderheden(bijzonderheden ? bijzonderheden : "");
  };

  const optionsKokers = leden?.map((lid) => ({
    value: lid.id,
    label: lid?.initials,
  }));
  const optionsSummary = [
    { value: "Activiteit", label: "Activiteit" },
    { value: "Borrel", label: "Borrel" },
    { value: "Clubactiviteit", label: "Clubactiviteit" },
    { value: "Wedstrijd", label: "Wedstrijd" },
    { value: "Dispuutsactiviteit", label: "Dispuutsactiviteit" },
    { value: "Dispuutsverjaardag", label: "Dispuutsverjaardag" },
  ];
  return (
    <div className="column is-8">
      <form className="add-form" onSubmit={onSubmit}>
        <table>
          <tbody>
            <tr>
              <th>Edit event</th>
            </tr>
            <tr>
              <th>
                <label htmlFor="id_summary">Summary:</label>
              </th>
              <td>
                <CreatableSelect
                  isClearable
                  defaultValue={optionsSummary.find((x) => x.label === summary)}
                  options={optionsSummary}
                  name="summary"
                  id="id_summary"
                  required
                  onChange={(e) => {
                    setSummary(e.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="id_description">Description:</label>
              </th>
              <td>
                <input
                  type="text"
                  name="description"
                  value={description}
                  maxLength="50"
                  className="input"
                  id="id_description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="id_start_date">Start date:</label>
              </th>
              <td>
                <input
                  type="date"
                  name="start_date"
                  value={start_date}
                  className="input"
                  required
                  id="id_start_date"
                  onChange={(e) => setStart_date(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="id_start_time">Start time:</label>
              </th>
              <td>
                <input
                  type="time"
                  name="start_time"
                  value={start_time}
                  className="input"
                  onChange={(e) => setStart_time(e.target.value)}
                  id="id_start_time"
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="id_end_date">End date:</label>
              </th>
              <td>
                <input
                  type="date"
                  name="end_date"
                  value={end_date}
                  className="input"
                  id="id_end_date"
                  onChange={(e) => setEnd_date(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="id_end_time">End time:</label>
              </th>
              <td>
                <input
                  type="time"
                  name="end_time"
                  value={end_time}
                  className="input"
                  id="id_end_time"
                  onChange={(e) => setEnd_time(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="id_recuring">Recuring:</label>
              </th>
              <td>
                <select
                  name="recuring"
                  value={recuring}
                  className="input"
                  id="id_recuring"
                  onChange={(e) => setRecuring(e.target.value)}
                >
                  <option value="0">None</option>
                  <option value="1">Weekly</option>
                  <option value="2">Monthly</option>
                  <option value="3">Yearly</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="id_location">Location:</label>
              </th>
              <td>
                <input
                  type="text"
                  name="location"
                  value={location}
                  maxLength="50"
                  className="input"
                  onChange={(e) => setLocation(e.target.value)}
                  id="id_location"
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="id_kokers">Kokers:</label>
              </th>
              <td>
                <Select
                  isMulti
                  defaultValue={kokers?.map((koker) =>
                    optionsKokers.find((x) => x.value === koker)
                  )}
                  options={optionsKokers}
                  name="kokers"
                  // value={kokers}
                  id="id_kokers"
                  onChange={(e) => {
                    setKokers(e?.map((x) => x.value));
                    console.log(e?.map((x) => x.value));
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="id_kartrekkers">Kartrekkers:</label>
              </th>
              <td>
                <input
                  type="text"
                  name="kartrekkers"
                  value={kartrekkers}
                  maxLength="50"
                  className="input"
                  onChange={(e) => setKartrekkers(e.target.value)}
                  id="id_kartrekkers"
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="id_info">Info:</label>
              </th>
              <td>
                <textarea
                  name="info"
                  value={info}
                  cols="40"
                  rows="10"
                  onChange={(e) => setInfo(e.target.value)}
                  className="input"
                  id="id_info"
                ></textarea>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="id_budget">Budget:</label>
              </th>
              <td>
                <input
                  type="text"
                  name="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  maxLength="50"
                  className="input"
                  id="id_budget"
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="id_bijzonderheden">Bijzonderheden:</label>
              </th>
              <td>
                <select
                  name="bijzonderheden"
                  value={bijzonderheden}
                  className="input"
                  id="id_bijzonderheden"
                  onChange={(e) => setBijzonderheden(e.target.value)}
                >
                  <option value="Op Afmelding">Op Afmelding</option>
                  <option value="Op Aanmelding">Op Aanmelding</option>
                  <option value=" "> </option>
                </select>
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
      {event && (
        <Button
          type="delete"
          text="Delete"
          color="is-danger"
          onClick={Delete}
        />
      )}
    </div>
  );
};

export default EventForm;
