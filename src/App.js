import "./App.css";
import NavBar from "./components/NavBar";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { default as EventsBrowser } from "./components/browser/Events/Events";
import { default as EventFormBrowser } from "./components/browser/Events/EventForm";
import { default as EventsMobile } from "./components/mobile/Events/Events";
import { default as EventFormMobile } from "./components/mobile/Events/EventForm";
import Test from "./components/Test";
import { default as DsaniBrowser } from "./components/browser/Dsani/Dsani";
import { default as DsaniMobile } from "./components/mobile/Dsani/Dsani";
import Footer from "./components/Footer";
import PrivacyPolicy from "./PrivacyPolicy";
// import Home from "./components/pages/Home";
import { BrowserView, MobileView } from "react-device-detect";
import { default as DeclaFormMobile } from "./components/mobile/Finance/DeclaForm";
import { default as DeclaFormBrowser } from "./components/browser/Finance/DeclaForm";
import Page from "./components/Page";
import Declas from "./components/browser/Finance/Declas";

function App() {
  const [API_URL, setAPIURL] = useState("http://127.0.0.1:8000");
  const [leden, setLeden] = useState([]);
  // setAPIURL("http://127.0.0.1:8000");
  // let API_URL;
  // API_URL = "https://stropdas2.herokuapp.com";
  // API_URL = "http://127.0.0.1:8000";
  useEffect(() => {
    const getLeden = async () => {
      const res = await fetch(API_URL + "/api/leden/");
      const data = await res.json();
      setLeden(data);
    };
    getLeden();
    EventState.GET();
    DeclaState.GET();
    BoekstukState.GET();
    // eslint-disable-next-line
  }, [API_URL]);

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
      <div className="cointainer">
        <NavBar setapi={setAPIURL} />
        <BrowserView>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <EventsBrowser leden={leden} eventState={EventState} />
                </>
              }
            />
            <Route
              path="/agenda"
              element={
                <>
                  <EventsBrowser leden={leden} eventState={EventState} />
                </>
              }
            />
            <Route
              path="/dsani"
              element={
                <DsaniBrowser
                  allEvents={EventState.events}
                  dsaniState={DsaniState}
                  leden={leden}
                />
              }
            />
            <Route
              path="/addevent"
              element={<EventFormBrowser eventState={EventState} />}
            />
            <Route
              path="/decla"
              element={
                <Page
                  element={
                    <>
                      <DeclaFormBrowser
                        leden={leden}
                        eventState={EventState}
                        declaState={DeclaState}
                        boekstukState={BoekstukState}
                      />
                    </>
                  }
                />
              }
            />
            <Route
              path="/decla/:id"
              element={
                <Page
                  element={
                    <>
                      <DeclaFormBrowser
                        leden={leden}
                        eventState={EventState}
                        declaState={DeclaState}
                        boekstukState={BoekstukState}
                      />
                    </>
                  }
                />
              }
            />
            <Route
              path="/declas"
              element={
                <Declas
                  leden={leden}
                  eventState={EventState}
                  declaState={DeclaState}
                  boekstukState={BoekstukState}
                />
              }
            />
            <Route path="/test" element={<Test />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </BrowserView>
        <MobileView>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <EventsMobile
                    leden={leden}
                    allEvents={EventState.events}
                    eventState={EventState}
                  />
                </>
              }
            />
            <Route
              path="/agenda"
              element={
                <>
                  <EventsMobile
                    leden={leden}
                    allEvents={EventState.events}
                    eventState={EventState}
                  />
                </>
              }
            />
            <Route
              path="/dsani"
              element={
                <DsaniMobile
                  allEvents={EventState.events}
                  dsaniState={DsaniState}
                  leden={leden}
                />
              }
            />
            <Route
              path="/addevent"
              element={<EventFormMobile eventState={EventState} />}
            />
            {/* <Route path="/event" element={<Event event={events[0]} onAdd={addEvent} onEdit={toggleEvent} onDelete={deleteEvent}/>}/> */}
            <Route
              path="/decla"
              element={
                <DeclaFormMobile
                  leden={leden}
                  allEvents={EventState.events}
                  onEdit={DeclaState}
                />
              }
            />
            <Route
              path="/test"
              element={
                <Test
                  leden={leden}
                  allEvents={EventState.events}
                  onEdit={DeclaState}
                />
              }
            />
            <Route
              path="/decla/:id"
              element={
                <Page
                  element={
                    <>
                      <DeclaFormMobile
                        leden={leden}
                        eventState={EventState}
                        declaState={DeclaState}
                        boekstukState={BoekstukState}
                      />
                    </>
                  }
                />
              }
            />
            <Route
              path="/declas"
              element={
                <Declas
                  leden={leden}
                  eventState={EventState}
                  declaState={DeclaState}
                  boekstukState={BoekstukState}
                />
              }
            />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </MobileView>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
