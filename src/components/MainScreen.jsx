import { useEffect, useState } from "react";
import "./../assets/scss/MainScreen.scss";
import Clock from "./Clock";

export default function MainScreen({ show, config, solvePuzzle, solved, solvedTrigger }) {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const aspectRatio = 16 / 9;
      let width = windowWidth * 0.9;
      let height = width / aspectRatio;

      if (height > windowHeight * 0.9) {
        height = windowHeight * 0.9;
        width = height * aspectRatio;
      }

      setSize({ width, height });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="MainScreen" className={"screen_wrapper" + (show ? "" : " screen_hidden")}>
      <div
        className="frame"
        style={{ backgroundImage: `url(${config.theme.backgroundImg})`, height: "100%", width: "100%" }}
      >
        <Clock />
      </div>
    </div>
  );
}
