import React, { useEffect, useState } from "react";
import "./../assets/scss/app.scss";
import "./../assets/scss/modal.scss";

import { GLOBAL_CONFIG } from "../config/config.js";
import * as I18n from "../vendors/I18n.js";
import * as LocalStorage from "../vendors/Storage.js";

import { KEYPAD_SCREEN, THEME_ASSETS, THEMES } from "../constants/constants.jsx";
import MainScreen from "./MainScreen.jsx";

let escapp;
const initialConfig = {
  config: {
    theme: THEMES.BASIC,
  },
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState(KEYPAD_SCREEN);
  const [prevScreen, setPrevScreen] = useState(KEYPAD_SCREEN);
  const [fail, setFail] = useState(false);
  const [solved, setSolved] = useState(false);
  const [solvedTrigger, setSolvedTrigger] = useState(0);
  const [config, setConfig] = useState({});

  useEffect(() => {
    console.log("useEffect, lets load everything");
    //localStorage.clear();  //For development, clear local storage (comentar y descomentar para desarrollo)
    I18n.init(GLOBAL_CONFIG);
    LocalStorage.init(GLOBAL_CONFIG.localStorageKey);
    GLOBAL_CONFIG.escapp.onNewErStateCallback = (er_state) => {
      console.log("New ER state received from ESCAPP", er_state);
      restoreState(er_state);
    };
    GLOBAL_CONFIG.escapp.onErRestartCallback = (er_state) => {
      // reset(); //For development
      console.log("Escape Room Restart received from ESCAPP", er_state);
      LocalStorage.removeSetting("app_state");
      LocalStorage.removeSetting("played_door");
    };
    escapp = new ESCAPP(GLOBAL_CONFIG.escapp);
    // escapp.validate((success, er_state) => {
    //   console.log("ESCAPP validation", success, er_state);
    //   try {
    //     if (success) {
    //       //ha ido bien, restauramos el estado recibido
    //       restoreState(er_state);
    //     }
    //   } catch (e) {
    //     console.error(e);
    //   }
    // });
    loadConfig(initialConfig);

    setLoading(false);
  }, []);

  function loadConfig(config) {
    let configuration = {
      theme: {
        name: config.config.theme,
        ...(THEME_ASSETS[config.config.theme] || {}),
      },
      ...config,
    };
    console.log(configuration);
    setConfig(configuration);
  }

  const solvePuzzle = (solution) => {
    const solutionStr = solution.map((s) => (s == null ? "-1" : s + 1)).join(",");
    console.log(solutionStr);
    escapp.submitPuzzle(GLOBAL_CONFIG.escapp.puzzleId, solutionStr, {}, (success) => {
      if (!success) {
        // alert("ta mal");
      } else {
        // alert("ta bien");
      }
      setSolved(success);
      setSolvedTrigger((prev) => prev + 1);
    });
  };

  function reset() {
    escapp.reset();
    localStorage.clear();
  }

  function restoreState(er_state) {
    console.log("Restoring state", er_state);
    if (typeof er_state !== "undefined" && er_state.puzzlesSolved.length > 0) {
      let lastPuzzleSolved = Math.max.apply(null, er_state.puzzlesSolved);
      if (lastPuzzleSolved >= GLOBAL_CONFIG.escapp.puzzleId) {
        //puzzle superado, abrimos la caja fuerte
        setScreen(KEYPAD_SCREEN);
        setPrevScreen(KEYPAD_SCREEN);
      } else {
        //puzzle no superado, miramos en localStorage en qué pantalla estábamos
        let localstateToRestore = LocalStorage.getSetting("app_state");
        console.log("Restoring screen from local state", localstateToRestore);
        if (localstateToRestore) {
          setScreen(localstateToRestore.screen);
          setPrevScreen(localstateToRestore.prevScreen);
        }
      }
      setLoading(false);
    } else {
      restoreLocalState();
    }
  }

  function saveState() {
    console.log("Saving state to local storage");
    let currentState = { screen: screen, prevScreen: prevScreen };
    LocalStorage.saveSetting("app_state", currentState);
  }

  function restoreLocalState() {
    let stateToRestore = LocalStorage.getSetting("app_state");
    console.log("Restoring local state", stateToRestore);
    if (stateToRestore) {
      setScreen(stateToRestore.screen);
      setPrevScreen(stateToRestore.prevScreen);
      setLoading(false);
    }
  }

  function onOpenScreen(newscreen_name) {
    console.log("Opening screen", newscreen_name);
    setPrevScreen(screen);
    setScreen(newscreen_name);
    saveState();
  }

  return (
    <div id="firstnode">
      {config.theme && (
        <div className={`main-background ${fail ? "fail" : ""}`}>
          <MainScreen
            show={screen === KEYPAD_SCREEN}
            config={config}
            solvePuzzle={solvePuzzle}
            solved={solved}
            solvedTrigger={solvedTrigger}
          />
        </div>
      )}
    </div>
  );
}
