import React, { useState } from "react";
import Button from "../../../components/Button";

const DsaniForm = ({ id, point, dsaniState }) => {
  const [note, setNote] = useState(point.note ? point.note : "");
  const [points, setPoints] = useState(point.points ? point.points : 0);
  //   const [lid, setLid] = useState(point.lid.id);
  //   const [event, setEvent] = useState(point.event);
  const onSubmit = (e) => {
    // console.log(note, points);
    e.preventDefault();
    new dsaniState({
      id,
      note,
      points,
    }).PUT();
    setNote(note ? note : "");
    setPoints(points ? points : 0);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="id_points">Points:</label>
              </td>
              <td>
                <input
                  type="number"
                  name="points"
                  value={points}
                  className="input"
                  id="id_points"
                  onChange={(e) => setPoints(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="id_note">Note:</label>
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => setNote(e.target.value)}
                  name="note"
                  maxLength="200"
                  value={note}
                  className="input"
                  id="id_note"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <Button
          value="Submit"
          text="Submit"
          //   type="Submit"
          color="is-success"
          onClick={onSubmit}
        />
      </form>
    </>
  );
};

export default DsaniForm;
