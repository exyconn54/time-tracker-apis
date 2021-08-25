import { useState, useEffect } from "react";
import { Alert, Card, Form } from "react-bootstrap";
import ControlButtons from "../Components/controls";
import Timer from "../Components/timer";
import findSs from "./findSs";

export default function Home() {
  const [on, seton] = useState(false);
  const [show, setShow] = useState(false);
  const [interval, setinterval] = useState(5000);
  const [time, setTime] = useState(0);

  const ToogleOn = () => {
    seton(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ on: true, interval: interval }),
    };
    fetch("http://localhost:3000/api/", requestOptions)
      .then((response) => {
        response.json();
        console.log(response);
      })
      .then((data) => {
        console.log(data);
        setTime(0);
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 2000);
      });
  };

  const ToogleOff = () => {
    seton(false);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ on: false, interval: interval }),
    };
    fetch("http://localhost:3000/api/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTime(0);
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 2000);
      });
  };

  useEffect(() => {
    let intervals = null;
    on === true
      ? (intervals = setInterval(() => {
          setTime((time) => time + 10);
        }, 10))
      : clearInterval(intervals);
    return () => {
      clearInterval(intervals);
    };
  }, [on]);

  return (
    <div>
      {show === true && on === true ? (
        <Alert variant="success" onClose={() => setShow(false)} dismissible>
          <p>Start</p>
        </Alert>
      ) : show === true && on === false ? (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <p>Stop</p>
        </Alert>
      ) : (
        ""
      )}
      <Card className="card shadow-lg p-3 mb-5 bg-white rounded">
        <Card.Body>
          <Card.Title className="shadow p-3 rounded">Time Tracker</Card.Title>
          <Card.Subtitle className="mb-2 text-muted shadow p-3 rounded">
            Stopwatch timer
            <div className="stop-watch">
              <Timer time={time} />
            </div>
          </Card.Subtitle>
          <Card.Text>
            <div className="row p-4 mb-2">
              <div className="col-12 b">
                <h3>Ongoing Projects</h3>
              </div>
            </div>
            <Form.Select
              className="w100 button shadow p-3 rounded"
              onChange={(event) => {
                setinterval(event.target.value);
              }}
            >
              <option value="5000">5 min</option>
              <option value="10000">10 min</option>
              <option value="15000">15 min</option>
            </Form.Select>
            <ControlButtons
              className="w100 button shadow-lg p-3 rounded"
              active={on}
              handleStart={ToogleOn}
              handleStop={ToogleOff}
            />
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
