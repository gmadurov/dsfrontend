import "./App.css";
import NavBar from "./pages/NavBar";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { default as EventsBrowser } from "./pages/browser/Events/Events";
import { default as EventFormBrowser } from "./pages/browser/Events/EventForm";
import { default as EventsMobile } from "./pages/mobile/Events/Events";
import { default as EventFormMobile } from "./pages/mobile/Events/EventForm";
import Test from "./pages/Test";
import { default as DsaniBrowser } from "./pages/browser/Dsani/Dsani";
import { default as DsaniMobile } from "./pages/mobile/Dsani/Dsani";
import Footer from "./pages/Footer";
import PrivacyPolicy from "./PrivacyPolicy";
// import Home from "./pages/pages/Home";
import { BrowserView, MobileView } from "react-device-detect";
import { default as DeclaFormMobile } from "./pages/mobile/Finance/DeclaForm";
import { default as DeclaFormBrowser } from "./pages/browser/Finance/DeclaForm";
import Page from "./pages/Page";
import Declas from "./pages/browser/Finance/Declas";
import PrivateRoute from "./utils/PrivateRoute";
import LoginPage from "./pages/Login";
import { FullProvider } from "./context/FullContext";
function App() {
  const [API_URL, setAPIURL] = useState("http://127.0.0.1:8000");
  const [leden, setLeden] = useState([]);
  // setAPIURL("http://127.0.0.1:8000");
  // let API_URL;
  // API_URL = "https://stropdas2.herokuapp.com";
  // API_URL = "http://127.0.0.1:8000";
  // useEffect(() => {
  //   const getLeden = async () => {
  //     const res = await fetch(API_URL + "/api/leden/", {
  //       method: "GET",
  //       headers: {
  //         "Content-type": "application-json",
  //         Authorization:
  //           "Authentication eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU2NjIxMzkzLCJpYXQiOjE2NTY2MTg1MjUsImp0aSI6IjE3ZTQ2NzNlOWY1NzQ2NTVhNDQ5Mjc5NjUwMDkyNzM0IiwidXNlcl9pZCI6NTYsIm5hbWUiOiJHdXN0YXZvIE1hZHVybyIsInJvbGUiOlsiRmlzY3VzIiwiRGV2ZWxvcGVyIiwiU2VuYXRlIl19.XuMB_rN527mzyrgKFNJxTfx4CuJ5YgleteiKjQ93eb0",
  //       },
  //     });
  //     const data = await res.json();
  //     setLeden(data);
  //   };
  //   getLeden();
  //   EventState.GET();
  //   // DeclaState.GET();
  //   BoekstukState.GET();
  //   // eslint-disable-next-line
  // }, [API_URL]);
  const [events, setEvents] = useState([]);
  class EventState {
    constructor(event) {
      this.event = event;
    }
    static objects() {
      return events;
    }
    static async GET() {
      setEvents([]);
      const res = await fetch(API_URL + "/api/dsani/");
      const data = await res.json();
      setEvents(data);
    }
    async POST() {
      const res = await fetch(API_URL + "/api/events/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(this.event),
      });
      const data = await res.json();
      setEvents([...this.events, data]);
    }
    async PUT() {
      const res = await fetch(API_URL + `/api/events/${this.event.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.event),
      });
      const data = await res.json();
      setEvents(
        this.events.map((event_from_map) =>
          this.event.id === event_from_map.id ? data : event_from_map
        )
      );
    }
    async DELETE() {
      await fetch(API_URL + `/api/events/${this.event.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
    }
  }
  class DsaniState {
    constructor(event) {
      this.event = event;
    }
    static objects() {
      return events;
    }
    // async POST() {
    //   const res = await fetch(API_URL + "/api/dsani/", {
    //     method: "POST",
    //     headers: { "Content-type": "application/json" },
    //     body: JSON.stringify(this.event),
    //   });
    //   const data = await res.json();
    // }
    async PUT() {
      const res = await fetch(API_URL + `/api/dsani/${this.event.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.event),
      });
      const data = await res.json();
      EventState.setEvents(
        // console.log(
        EventState.events?.map((event_from_map) =>
          event_from_map.dsani_ev.map((point) => point.id === this.event.id)
            ? {
                ...event_from_map,
                dsani_ev: event_from_map.dsani_ev.map((point) =>
                  point.id === this.event.id ? data : point
                ),
              }
            : event_from_map
        )
      );
    }
    // async DELETE() {
    //   await fetch(API_URL + `/api/dsani/${this.event.id}`, {
    //     method: "DELETE",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //   });
    // }
  }
  const [declas, setDeclas] = useState([]);
  class DeclaState {
    constructor(decla) {
      this.decla = decla;
    }
    static objects() {
      return declas;
    }
    static async GET() {
      setDeclas([]);
      const res = await fetch(API_URL + "/api/decla/");
      const data = await res.json();
      setDeclas(data);
    }
    async POST() {
      // const form = new FormData(this.decla)
      // form.append("decla", this.decla)
      // form.append("Receipt", this.decla.receipt)

      console.log(this.decla);
      const res = await fetch(API_URL + "/api/decla/", {
        method: "POST",
        headers: { "Content-type": "multipart/form-data" },
        body: this.decla,
      });
      const data = await res.json();
      setDeclas([...declas, data]);
    }
    async PUT() {
      const res = await fetch(API_URL + `/api/decla/${this.decla.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "multipart/form-data",
        },
        body: JSON.stringify(this.decla),
      });
      const data = await res.json();
      setDeclas(
        declas.map((decla_from_map) =>
          this.decla.id === decla_from_map.id ? data : decla_from_map
        )
      );
    }
    async DELETE() {
      await fetch(API_URL + `/api/decla/${this.decla.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
    }
  }
  const [boekstuks, setBoekstuks] = useState([]);
  class BoekstukState {
    constructor(boekstuk) {
      this.boekstuk = boekstuk;
    }
    static objects() {
      return boekstuks;
    }
    static async GET() {
      setBoekstuks([]);
      const res = await fetch(API_URL + "/api/boekstuken/");
      const data = await res.json();
      setBoekstuks(data);
    }
    async POST() {
      const res = await fetch(API_URL + "/api/boekstuken/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(this.boekstuk),
      });
      const data = await res.json();
      setBoekstuks([...boekstuks, data]);
      return data;
    }
    async PUT() {
      const res = await fetch(API_URL + `/api/boekstuken/${this.boekstuk.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.boekstuk),
      });
      const data = await res.json();
      setBoekstuks(
        boekstuks.map((boekstuk_from_map) =>
          this.boekstuk.id === boekstuk_from_map.id ? data : boekstuk_from_map
        )
      );
    }
    async DELETE() {
      await fetch(API_URL + `/api/boekstuken/${this.boekstuk.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
    }
  }
  return (
    <Router>
      <div className="cointainer  is-max-desktop has-text-centered">
        <FullProvider>
          <NavBar setapi={setAPIURL} />
          <BrowserView>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <EventsBrowser leden={leden} eventState={EventState} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/agenda"
                element={
                  <PrivateRoute>
                    <EventsBrowser leden={leden} eventState={EventState} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dsani"
                element={
                  <PrivateRoute>
                    <DsaniBrowser
                      allEvents={EventState.events}
                      dsaniState={DsaniState}
                      leden={leden}
                    />
                  </PrivateRoute>
                }
              />
              <Route
                path="/addevent"
                element={
                  <PrivateRoute>
                    <EventFormBrowser eventState={EventState} />
                  </PrivateRoute>
                }
              />

              <Route
                path="/declas"
                element={
                  <PrivateRoute>
                    <Declas
                    // leden={leden}
                    // eventState={EventState}
                    // declaState={DeclaState}
                    // boekstukState={BoekstukState}
                    />
                  </PrivateRoute>
                }
              />
              <Route
                path="/decla"
                element={
                  <PrivateRoute>
                    <Page>
                      <DeclaFormBrowser
                        // leden={leden}
                        eventState={EventState}
                        // declaState={DeclaState}
                        boekstukState={BoekstukState}
                      />
                    </Page>
                  </PrivateRoute>
                }
              />
              <Route
                path="/decla/:id"
                element={
                  <PrivateRoute>
                    <Page>
                      <DeclaFormBrowser
                        leden={leden}
                        eventState={EventState}
                        declaState={DeclaState}
                        boekstukState={BoekstukState}
                      />
                    </Page>
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/test" element={<Test />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route
                path="*"
                element={
                  <Page>
                    <h3> 404: unvalid url</h3>
                  </Page>
                }
              />
            </Routes>
          </BrowserView>
          <MobileView>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <EventsMobile
                      leden={leden}
                      allEvents={EventState.events}
                      eventState={EventState}
                    />
                  </PrivateRoute>
                }
              />
              <Route
                path="/agenda"
                element={
                  <PrivateRoute>
                    <EventsMobile
                      leden={leden}
                      allEvents={EventState.events}
                      eventState={EventState}
                    />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dsani"
                element={
                  <PrivateRoute>
                    <DsaniMobile
                      allEvents={EventState.events}
                      dsaniState={DsaniState}
                      leden={leden}
                    />
                  </PrivateRoute>
                }
              />
              <Route
                path="/addevent"
                element={
                  <PrivateRoute>
                    <EventFormMobile eventState={EventState} />
                  </PrivateRoute>
                }
              />
              {/* <Route path="/event" ><Event event={events[0]} onAdd={addEvent} onEdit={toggleEvent} onDelete={deleteEvent}/>}/> */}
              <Route
                path="/decla"
                element={
                  <PrivateRoute>
                    <DeclaFormMobile
                      leden={leden}
                      allEvents={EventState.events}
                      onEdit={DeclaState}
                    />
                  </PrivateRoute>
                }
              />
              <Route
                path="/test"
                element={
                  <PrivateRoute>
                    <Test
                      leden={leden}
                      allEvents={EventState.events}
                      onEdit={DeclaState}
                    />
                  </PrivateRoute>
                }
              />
              <Route
                path="/decla/:id"
                element={
                  <PrivateRoute>
                    <Page>
                      <DeclaFormMobile
                        leden={leden}
                        eventState={EventState}
                        declaState={DeclaState}
                        boekstukState={BoekstukState}
                      />
                    </Page>
                  </PrivateRoute>
                }
              />
              <Route
                path="/declas"
                element={
                  <PrivateRoute>
                    <Declas
                      leden={leden}
                      eventState={EventState}
                      declaState={DeclaState}
                      boekstukState={BoekstukState}
                    />
                  </PrivateRoute>
                }
              />

              <Route path="/privacy" element={<PrivacyPolicy />} />
            </Routes>
          </MobileView>
          <Footer />
        </FullProvider>
      </div>
    </Router>
  );
}

export default App;
