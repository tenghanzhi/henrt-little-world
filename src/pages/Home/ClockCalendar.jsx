import React, { useState, useEffect } from "react";
import "./style/ClockCalendar.css";

const ClockCalendar = () => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [date, setDate] = useState("date");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const d = new Date();
      const h = (d.getHours() % 12 || 12).toString();
      const m = d.getMinutes().toString();
      const s = d.getSeconds().toString();
      const z = `${(d.getMonth() + 1).toString().padStart(2, "0")}-${d
        .getDate()
        .toString()
        .padStart(2, "0")}-${d.getFullYear()}`;
      setDate(z);
      setHours(h.padStart(2, "0"));
      setMinutes(m.padStart(2, "0"));
      setSeconds(s.padStart(2, "0"));

      return () => clearInterval(intervalId);
    }, 1000);
  }, [seconds, minutes, hours, date]);

  return (
    <div>
      <h1>{date}</h1>
      <h1>
        {hours}:{minutes}:{seconds}
      </h1>
    </div>
  );
};

export default ClockCalendar;