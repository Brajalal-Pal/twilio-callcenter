import React, { useState, useEffect } from "react";
import socket from "./utils/socket-io";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("hello", (...args) => {
      console.log("Recieved from server", args);
      setData(args);
    });
    return () => {};
  }, []);

  return (
    <div>
      <h3>Socket Programming with Twilio Integration</h3>
      <div> {data} </div>
    </div>
  );
}

export default App;
