import React, { Component } from "react";
import API from "./_utils/APIAccess";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.API = new API();

    this.state = {
      event_session_id: null,
      event_session_name: null,
      event_session_started: null,
      events: []
    };
  }

  componentDidMount() {
    this.API.getLatestEventSession(data => {
      let events = data.event_session.events;
      events.sort((a, b) => {
        return new Date(b.when_occured) - new Date(a.when_occured);
      });

      this.setState({
        event_session_id: data.event_session.id,
        event_session_name: data.event_session.name,
        event_session_started: data.event_session.when_started,
        events: events
      });
    }, console.error);
  }

  getObjectName(objID) {
    switch (objID) {
      case "5bb31f90023eb3359042462e":
        return "Aluminum chips";
      case "5bb31f99023eb3359042462f":
        return "Iron oxide powder";
      case "5bb31fa9023eb33590424630":
        return "Carbon powder";
      case "5bb31fae023eb33590424631":
        return "Ephedrine powder";
      case "5bb425bccc7ed83ee3cfbd8b":
        return "Chemical mixer";
      case "5bb425bccc7ed83ee3cfbd8c":
        return "Door";
      case "5bb425bccc7ed83ee3cfbd8d":
        return "Thermite"

      default:
        return "Unknown";
    }
  }

  render() {
    return (
      <div className="App">
        <h1>
          {this.state.event_session_id ? "Iteration 2 demo" : "Loading..."}
        </h1>
        {this.state.event_session_id && (
          <div>
            <h2>
              Started:{" "}
              {new Date(this.state.event_session_started).toLocaleDateString(
                "en-NZ"
              )}{" "}
              at{" "}
              {new Date(this.state.event_session_started).toLocaleTimeString(
                "en-NZ"
              )}
            </h2>

            <hr />

            {this.state.events.map(event => (
              <div key={event.id} className="event">
                <h4>
                  <b>Event type</b>: {event.type}
                </h4>
                <p>
                  <b>Started</b>:{" "}
                  {new Date(event.when_occured).toLocaleDateString("en-NZ")} at{" "}
                  {new Date(event.when_occured).toLocaleTimeString("en-NZ")}
                </p>
                <p>
                  <b>Person</b>: <i>NYI</i>
                </p>
                <p>
                  <b>Coordinator</b>:{" "}
                  {event.event_coordinator ? (
                    this.getObjectName(event.event_coordinator)
                  ) : (
                    <i>No coordinator for this type</i>
                  )}
                </p>
                <p>
                  <b>Objects involved</b>:
                </p>
                <ul>
                  {event.objects_involved.map(obj => (
                    <li key={obj}>{this.getObjectName(obj)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default App;
