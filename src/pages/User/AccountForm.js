import { useContext, useState } from "react";
import LedenContext from "../../context/LedenContext";

export const AccountForm = (props) => {
  const { lid } = useContext(LedenContext);
  /*   {active: Boolean
birth_date: date isoformat
created: date isoformat 
educations: null
email: string 
id: Int 
initials: string 
lichting: int 
lid_image: string(link)
name: int
phone: int or string 
short_intro: null 
user: int 
vertical: int}
 */
  const [active, setActive] = useState(lid && lid?.active);
  const [birthDate, setBirthDate] = useState(lid && lid?.birth_date);
  const [created, setCreated] = useState(lid && lid?.created);
  const [educations, setEducations] = useState(lid && lid?.educations);
  const [email, setEmail] = useState(lid && lid?.email);
  const [id, setId] = useState(lid && lid?.id);
  const [initials, setInitials] = useState(lid && lid?.initials);
  const [lichting, setLichting] = useState(lid && lid?.lichting);
  const [lidImage, setLidImage] = useState(lid && lid?.lid_image);
  const [name, setName] = useState(lid && lid?.name);
  const [phone, setPhone] = useState(lid && lid?.phone);
  const [shortIntro, setShortIntro] = useState(lid && lid?.short_intro);
  const [user, setUser] = useState(lid && lid?.user);
  const [vertical, setVertical] = useState(lid && lid?.vertical);
  return (
    <>
      <main className="columns">
        <div className="column is-half is-offset-3">
          <form>
            <table>
              <tbody>
                <tr>
                  <th>birthDate:</th>
                  <td className="field">
                    <input name="birthDate" type="date" />
                  </td>
                </tr>
                <tr>
                  <th>educations:</th>
                  <td className="field">
                    <input name="educations" type="text" />
                  </td>
                </tr>
                <tr>
                  email: <input name="email" type="email" />
                </tr>
                <tr>
                  lidImage: <input name="lidImage" type={"img"} />
                </tr>
                <tr>
                  name: <input name="name" type={"text"} />
                </tr>
                <tr>
                  phone: <input name="phone" type="number" />
                </tr>
                <tr>
                  shortIntro: <input name="shortIntro" type={"text"} />
                </tr>
              </tbody>
            </table>

            <a className="button" type="submit" value="Submit" />
          </form>
        </div>
      </main>
    </>
  );
};
export default AccountForm;
// {% extends 'main.html' %} {% block content%}
// <!-- Main Section -->
// <main className="columns is-centered">
//   <div className="column is-one-third">
//     <div className="table is-bordered is-striped is-narrow is-hoverable is-centered is-three-forths">

//       <form className="form" method="POST">
//         {% csrf_token %}
//         <table style="width: 100%; border: 1px solid black">
//           {% comment %} <tr>  {% endcomment %}
//           {% for field in form %}
//           <!-- Input:{{field.label}} -->
//           {% comment %} <td className="form__field"> {% endcomment %}
//             <label for="formInput#text">{{field.label}}: </label>
//             {{field}}
//               {% comment %} </td> {% endcomment %}
//           {% endfor %}</tr>
//         </table>

//     </div>
//     <a className="button" type="submit" value="Submit" />
//     </form>
//   </div>
//   </div>
// </main>
// {% endblock content%}
