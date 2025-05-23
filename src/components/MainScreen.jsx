import { useEffect, useRef, useState } from "react";
import "./../assets/scss/MainScreen.scss";
import Clock from "./Clock";

export default function MainScreen({ show, config, solvePuzzle, solved }) {
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
  }, [hour, minutes, seconds]);

  const dropHandle = () => {
    solvePuzzle({ hour, minutes, seconds });
  };

  return (
    <div id="MainScreen" className={"screen_wrapper" + (show ? "" : " screen_hidden")}>
      <div
        className="frame"
        style={{ backgroundImage: `url(${config.theme.backgroundImg})`, height: "100%", width: "100%" }}
      >
        <div>
          <Clock theme={config.theme} setTime={setTime} dropHandle={dropHandle} solved={solved} config={config} />
        </div>
      </div>
    </div>
  );
}
