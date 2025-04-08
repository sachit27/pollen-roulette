import React, { useEffect, useState } from "react";
import "./SneezeAlert.css";

const messages = [
  "🌪️ You’ve entered: The Sneezone™",
  "😵 Caution: Pollen levels over 9000!",
  "👃 Your nose just filed a complaint.",
  "🚨 Allergy Alert: Birches ahead!",
  "😬 May contain microscopic doom."
];

export function SneezeAlert({ trigger }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (trigger) {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
      setShow(true);
      setTimeout(() => setShow(false), 4000);
    }
  }, [trigger]);

  return show ? <div className="sneeze-alert">{message}</div> : null;
}
