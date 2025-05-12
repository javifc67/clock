import { useEffect, useRef, useState } from "react";
import "./../assets/scss/Clock.scss";

export default function Clock({ show, config, solvePuzzle, solved, solvedTrigger }) {
  const [angles, setAngles] = useState({
    hour: 90,
    minute: 180,
    second: 270,
  });

  const dragging = useRef(null);

  const startDrag = (hand) => () => {
    dragging.current = hand;
  };

  const stopDrag = () => {
    dragging.current = null;
  };

  const handleMouseMove = (e) => {
    if (!dragging.current) return;

    const clockRect = e.currentTarget.getBoundingClientRect();
    const cx = clockRect.left + clockRect.width / 2;
    const cy = clockRect.top + clockRect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    setAngles((prev) => ({
      ...prev,
      [dragging.current]: angle,
    }));
  };

  return (
    <div className="clock" onMouseMove={handleMouseMove} onMouseUp={stopDrag} onMouseLeave={stopDrag}>
      <div
        className={`hand hour ${dragging.current === "hour" ? "dragging" : ""}`}
        style={{ transform: `rotate(${angles.hour}deg)` }}
        onMouseDown={startDrag("hour")}
      />
      <div
        className={`hand minute ${dragging.current === "minute" ? "dragging" : ""}`}
        style={{ transform: `rotate(${angles.minute}deg)` }}
        onMouseDown={startDrag("minute")}
      />
      <div
        className={`hand second ${dragging.current === "second" ? "dragging" : ""}`}
        style={{ transform: `rotate(${angles.second}deg)` }}
        onMouseDown={startDrag("second")}
      />
    </div>
  );
}
