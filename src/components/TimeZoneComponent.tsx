"use client";

import React, { useState, useEffect } from "react";
import AnimUp from "./animated/AnimUp";

const TimeZoneComponent: React.FC<{ inView: boolean }> = ({ inView }) => {
  const [currentTimezone, setcurrentTimezone] = useState<string>("");

  useEffect(() => {
    const getcurrentTime = () => {
      const currentDate = new Date().toLocaleString("en-US", {
        timeZone: "IST",
      });
      return currentDate;
    };

    setcurrentTimezone(getcurrentTime());

 
    const intervalId = setInterval(() => {
      setcurrentTimezone(getcurrentTime());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <AnimUp duration={2} inView={inView} className="mt-10">
        <h2 className="opacity-50">Time zone, Delhi, India</h2>
      </AnimUp>
      <AnimUp duration={2.5} inView={inView} className="mt-2">
        <p>{currentTimezone}</p>
      </AnimUp>
    </div>
  );
};

export default TimeZoneComponent; 