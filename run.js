import { transcribe } from "./main.js";

const req = {
  body: {
    fileUri: process.env.FILE_URI,
    mimeType: "audio/ogg",
  },
};

const res = {
  send: (text) => console.log(text),
};

transcribe(req, res);
