"use client";

import React, { useState, useEffect } from "react";
import AnimUp from "./animated/AnimUp";

const TimeZoneComponent: React.FC<{ inView: boolean }> = ({ inView }) => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const getCurrentTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      };
      return new Date().toLocaleString("en-US", options);
    };

    // Update immediately
    setCurrentTime(getCurrentTime());

    // Update every minute
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <AnimUp duration={2} inView={inView} className="mt-10">
        <h2 className="opacity-50">Time zone, Delhi, India</h2>
      </AnimUp>
      <AnimUp duration={2.5} inView={inView} className="mt-2">
        <p>{currentTime}</p>
      </AnimUp>
    </div>
  );
};

export default TimeZoneComponent;