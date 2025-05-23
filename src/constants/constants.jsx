export const PAINTING_SCREEN = "painting";
export const SAFE_CLOSED_SCREEN = "safe_closed";
export const SAFE_OPEN_SCREEN = "safe_open";
export const CONTROL_PANEL_SCREEN = "control_panel";
export const KEYPAD_SCREEN = "keypad";

export const THEMES = {
  BASIC: "basic",
  FUTURISTIC: "futuristic",
  CONTEMPORARY: "contemporary",
  ANCIENT: "ancient",
};

export const ICONS = ["circle", "triangle", "square", "pentagon", "star", "hexagon"];

export const THEME_ASSETS = {
  [THEMES.ANCIENT]: {
    backgroundImg: "/src/assets/images/ancient_wires_puzzle_bg.png",
    wireAudio: "sounds/pick-wire.wav",
  },
  [THEMES.BASIC]: {
    backgroundImg: "/src/assets/images/basic_background.jpg",
    hourImg: "/src/assets/images/basic_hourhand.png",
    minuteImg: "/src/assets/images/basic_minutehand.png",
    secondImg: "/src/assets/images/basic_secondhand.png",
    clockImg: "/src/assets/images/basic_clock.png",
    clockCenterImg: "/src/assets/images/basic_clockcenter.png",
    tickAudio: "sounds/tick.wav",
    winAudio: "sounds/win.wav",
  },
  [THEMES.CONTEMPORARY]: {
    backgroundImg: "/src/assets/images/ancient_wires_puzzle_bg.png",
    wireAudio: "sounds/pick-wire.wav",
  },
  [THEMES.FUTURISTIC]: {
    backgroundImg: "/src/assets/images/futuristic_background.png",
    hourImg: "",
    minuteImg: "",
    secondImg: "",
    clockImg: "/src/assets/images/futuristic_clock.png",
    clockCenterImg: "/src/assets/images/futuristic_clockcenter.png",
    tickAudio: "sounds/tick.wav",
    winAudio: "sounds/win.wav",
  },
};
