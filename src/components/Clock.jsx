import { useEffect, useRef, useState } from "react";
import "./../assets/scss/Clock.scss";

export default function Clock({ theme }) {
  const [angles, setAngles] = useState({
    hour: 0,
    minute: 0,
    second: 0,
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
    const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

    setAngles((prev) => ({
      ...prev,
      [dragging.current]: angle,
    }));
  };

  const angleToTime = (angle, max) => {
    let adjusted = (((angle + 90) % 360) + 360) % 360;
    return Math.floor((adjusted / 360) * max) % max;
  };

  const showTime = () => {
    const h = angleToTime(angles.hour, 12);
    const m = angleToTime(angles.minute, 60);
    const s = angleToTime(angles.second, 60);

    const pad = (n) => n.toString().padStart(2, "0");
    alert(`La hora es: ${pad(h)}:${pad(m)}:${pad(s)}`);
  };

  return (
    <div
      className="clock"
      onMouseMove={handleMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      style={{ backgroundImage: `url(${theme.clockImg})` }}
    >
      <img
        src={theme.hourImg}
        className={`hand hour ${dragging.current === "hour" ? "dragging" : ""}`}
        style={{
          transform: `rotate(${angles.hour}deg)`,
        }}
        onMouseDown={startDrag("hour")}
        draggable={false}
      />
      <img
        src={theme.minuteImg}
        draggable={false}
        className={`hand minute ${dragging.current === "minute" ? "dragging" : ""}`}
        style={{ transform: `rotate(${angles.minute}deg)` }}
        onMouseDown={startDrag("minute")}
      />
      <img
        src={theme.secondImg}
        draggable={false}
        className={`hand second ${dragging.current === "second" ? "dragging" : ""}`}
        style={{ transform: `rotate(${angles.second}deg)` }}
        onMouseDown={startDrag("second")}
      />
      <img className="center" src={theme.clockCenterImg} alt="" />
    </div>
  );
}
