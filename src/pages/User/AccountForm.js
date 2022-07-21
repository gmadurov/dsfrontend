import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import AuthContext from "../../context/AuthContext";
import LedenContext from "../../context/LedenContext";
export const AccountForm = (props) => {
  const { lid, GETLid, PUT } = useContext(LedenContext);
  const { id } = useParams();
  useEffect(() => {
    async function get() {
      await GETLid(id);
    }
    get();
    // eslint-disable-next-line
  }, []);

  const { user } = useContext(AuthContext);
  const [sendBlob, setSendBlob] = useState(false);
  const [active, setActive] = useState(lid ? lid?.active : true);
  const [birthDate, setBirthDate] = useState(lid ? lid?.birth_date : "");
  const [educations, setEducations] = useState(lid ? lid?.educations : "");
  const [email, setEmail] = useState(lid ? lid?.email : "");
  const [lidImage, setLidImage] = useState(lid ? lid?.lid_image : null);
  const [name, setName] = useState(lid ? lid?.name : "");
  const [phone, setPhone] = useState(lid ? lid?.phone : "");
  const [shortIntro, setShortIntro] = useState(lid ? lid?.short_intro : "");
  const navigate = useNavigate(); // onChange={(e) => setActive(e.target.value)}
  const onSubmit = (e) => {
    e.preventDefault();
    PUT(
      {
        id,
        active,
        birthDate,
        educations,
        email,
        lidImage,
        name,
        phone,
        shortIntro,
      },
      sendBlob
    );
    navigate(-1);
  };
  if (user?.lid_id !== lid?.id) {
    return (
      <h3>
        Naughty Naughty, you cheeky bastard but you can't edit other peoples
        profiles!!
      </h3>
    );
  }
  return (
    <>
      <>
        <div className="card">
          <form className="card-content">
            <table>
              <tbody>
                <tr>
                  <th>
                    <label htmlFor="id_name">Naam:</label>
                  </th>
                  <td>
                    <input
                      className="input"
                      name="name"
                      id="id_name"
                      onChange={(e) => setName(e.target.value)}
                      type={"text"}
                      value={name}
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="id_email">Email:</label>
                  </th>
                  <td>
                    <input
                      className="input"
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      type="email"
                      value={email}
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="id_phone">Number:</label>
                  </th>
                  <td>
                    <input
                      className="input"
                      onChange={(e) => setPhone(e.target.value)}
                      id="id_phone"
                      name="phone"
                      type="tel"
                      value={phone}
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="id_birthDate">Birth Date:</label>
                  </th>
                  <td className="field">
                    <input
                      className="input"
                      name="birthDate"
                      type="date"
                      value={birthDate}
                      id="id_birthDate"
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="id_education">Education:</label>
                  </th>
                  <td className="field">
                    <input
                      className="input"
                      name="educations"
                      onChange={(e) => setEducations(e.target.value)}
                      type="text"
                      value={educations}
                    />
                  </td>
                </tr>

                <tr>
                  <th>
                    <label htmlFor="id_image">Profile Foto:</label>
                  </th>
                  <td>
                    <input
                      className="input"
                      id="id_image"
                      name="lidImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setLidImage(e.target.files[0]);
                        setSendBlob(true);
                      }}
                    />
                  </td>
                </tr>

                <tr>
                  <th>
                    <label htmlFor="id_shortIntro">Short Intro:</label>
                  </th>
                  <td>
                    <input
                      className="input"
                      id="id_shortIntro"
                      name="shortIntro"
                      onChange={(e) => setShortIntro(e.target.value)}
                      type={"text"}
                      value={shortIntro}
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="id_active">Active:</label>
                  </th>
                  <td className="field">
                    <input
                      type="checkbox"
                      name="active"
                      checked={active}
                      className="checkbox"
                      onChange={(e) => {
                        setActive(e.target.checked);
                      }}
                      id="id_active"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <Button value="Submit" color="is-success" onClick={onSubmit}>
              Submit
            </Button>
            <Button value="Submit" color="is-info" onClick={() => navigate(-1)}>
              Terug
            </Button>
          </form>
        </div>
      </>
    </>
  );
};
export default AccountForm;
