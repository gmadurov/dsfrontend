import React, { useContext, useState } from "react";
import Button from "../../components/Button";
import DsaniContext from "../../context/DsaniContext";
import { isMobile } from "react-device-detect";

const DsaniForm = ({ id, point }) => {
  let { PUT } = useContext(DsaniContext);

  const [note, setNote] = useState(point.note ? point.note : "");
  const [points, setPoints] = useState(point.points ? point.points : 0);
  //   const [lid, setLid] = useState(point.lid.id);
  //   const [event, setEvent] = useState(point.event);
  const onSubmit = (e) => {
    // console.log(note, points);
    e.preventDefault();
    PUT({
      id,
      note,
      points,
    });
    setNote(note ? note : "");
    setPoints(points ? points : 0);
  };
  return (
    <>
      {isMobile ? (
        <>
          <div className="column table  is-fullwidth">
            <form onSubmit={onSubmit} style={{}}>
              <table style={{ border: "0px" }}>
                <tbody>
                  <tr>
                    <th>
                      <label htmlFor="id_points">Points:</label>
                    </th>
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
              <Button value="Submit" color="is-success" onClick={onSubmit}>
                Submit
              </Button>
            </form>
          </div>
        </>
      ) : (
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
              //   type="Submit"
              color="is-success"
              onClick={onSubmit}
            >
              Submit
            </Button>
          </form>
        </>
      )}
    </>
  );
};

export default DsaniForm;
