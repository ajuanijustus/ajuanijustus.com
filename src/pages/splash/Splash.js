import React, { useState, useEffect } from "react";
import "./Splash.css";
import LoaderLogo from "../../components/Loader/LoaderLogo.js";
import Home from "../home/HomeComponent";

function AnimatedSplash(props) {
  return (
    <div className="logo_wrapper">
      <div className="screen" style={{ backgroundColor: "white" }}>
        <LoaderLogo id="logo" theme={props.theme} />
      </div>
    </div>
  );
}

// splash plays on top of the home page so the home content is in the page from the start
function Splash(props) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timerId = setTimeout(() => setDone(true), 2000);
    return () => {
      clearTimeout(timerId);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <>
      {/* remount when the splash ends so the fade-ins play like before */}
      <Home key={done ? "shown" : "hidden"} theme={props.theme} onToggle={props.onToggle} />
      {!done && (
        <div className="splash_overlay" style={{ backgroundColor: props.theme.body }}>
          <AnimatedSplash theme={props.theme} />
        </div>
      )}
    </>
  );
}

export default Splash;
