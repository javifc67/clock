//Copy this file to config.js and specify your own settings

export let ESCAPP_APP_SETTINGS = {
  //Settings that can be specified by the authors
  skin: "BASIC", //skin can be "STANDARD", "RETRO" or "FUTURISTIC" or "BASIC".
  //backgroundImg: "NONE", //background can be "NONE" or a URL.
  actionWhenLoadingIfSolved: true,
  initialTime: "5:30:00", //Initial time in format "H:MM:SS" or "MM:SS"

  //Settings that will be automatically specified by the Escapp server
  locale: "es",

  escappClientSettings: {
    endpoint: "https://escapp.es/api/escapeRooms/id",
    linkedPuzzleIds: [1],
    rtc: false,
  },
};
