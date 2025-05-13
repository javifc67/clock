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
    backgroundImg: "/src/assets/images/pared.jpg",
    hourImg: "/src/assets/images/manecilla_horas.png",
    minuteImg: "/src/assets/images/manecilla_minutos.png",
    secondImg: "/src/assets/images/manecilla_segundos.png",
    clockImg: "/src/assets/images/reloj.png",
    clockCenterImg: "/src/assets/images/centro_reloj.png",
    wireAudio: "sounds/pick-wire.wav",
  },
  [THEMES.CONTEMPORARY]: {
    backgroundImg: "/src/assets/images/ancient_wires_puzzle_bg.png",
    wireAudio: "sounds/pick-wire.wav",
  },
  [THEMES.FUTURISTIC]: {
    backgroundImg: "/src/assets/images/ancient_wires_puzzle_bg.png",
    wireAudio: "sounds/pick-wire.wav",
  },
};
