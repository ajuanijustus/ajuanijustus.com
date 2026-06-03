import React, { useState, useEffect } from "react";
import "./Splash.css";
import { Navigate } from "react-router-dom"; // Swapped Redirect for Navigate
import LoaderLogo from "../../components/Loader/LoaderLogo.js";

function AnimatedSplash(props) {
  return (
    <div className="logo_wrapper">
      <div className="screen" style={{ backgroundColor: "white" }}>
        <LoaderLogo id="logo" theme={props.theme} />
      </div>
    </div>
  );
}

function Splash(props) {
  // 1. Replaced this.state with a simple state hook
  const [redirect, setRedirect] = useState(false);

  // 2. Handled the 2-second timer and the cleanup inside a hook
  useEffect(() => {
    const timerId = setTimeout(() => setRedirect(true), 2000);

    // This clean-up function automatically clears the timer if the user leaves early
    return () => clearTimeout(timerId);
  }, []);

  // 3. Render modern Navigate component instead of Redirect
  return redirect ? (
    <Navigate to="/home" replace />
  ) : (
    <AnimatedSplash theme={props.theme} />
  );
}

export default Splash;