import { useEffect, useRef, useState } from "react";
import "./../assets/scss/Clock.scss";

export default function Clock({ theme, setTime }) {
  const [angles, setAngles] = useState({
    hour: 170,
    minute: 180,
    second: 290,
  });

  useEffect(() => {
    setTime(angleToTime(angles.hour, 12), angleToTime(angles.second, 60), angleToTime(angles.minute, 60));
  }, [angles]);

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
    let adjusted = ((angle % 360) + 360) % 360;
    return Math.floor((adjusted / 360) * max) % max;
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
