import { useEffect, useRef, useState } from "react";
import "./../assets/scss/MainScreen.scss";
import Clock from "./Clock";
import { GLOBAL_CONFIG } from "../config/config";

export default function MainScreen({ show, config, solvePuzzle, solved, solvedTrigger }) {
  const [hour, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const setTime = (h, s, m) => {
    setHour(h);
    setMinutes(m);
    setSeconds(s);
  };

  const lastPlayedRef = useRef(0);

  useEffect(() => {
    const now = Date.now();
    if (now - lastPlayedRef.current > 50) {
      new Audio(config.theme.tickAudio).play();
      lastPlayedRef.current = now;
    }

    solvePuzzle({ hour, minutes, seconds });
  }, [hour, minutes, seconds]);

  useEffect(() => {
    if (solved) new Audio(config.theme.removeClockAudio).play();
  }, [solved]);

  return (
    <div id="MainScreen" className={"screen_wrapper" + (show ? "" : " screen_hidden")}>
      <div
        className="frame"
        style={{ backgroundImage: `url(${config.theme.backgroundImg})`, height: "100%", width: "100%" }}
      >
        <div className={`fade-slide ${solved ? "hide" : ""}`}>
          <Clock className={`fade-slide ${solved ? "hide" : ""}`} theme={config.theme} setTime={setTime} />
        </div>
        <div className="result">{GLOBAL_CONFIG.message}</div>
      </div>
    </div>
  );
}
