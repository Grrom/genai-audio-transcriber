import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch";
import functions from "@google-cloud/functions-framework";

functions.http("transcribe", async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GENAI_APIKEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const fileUri = req.body.fileUri;
  const mimeType = req.body.mimeType;

  async function getBase64FromFile(url) {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return buffer.toString("base64");
  }

  const base64AudioFile = await getBase64FromFile(fileUri);

  const result = await model.generateContent([
    {
      inlineData: {
        mimeType: mimeType,
        data: base64AudioFile,
      },
    },
    { text: "Please transcribe this" },
  ]);

  console.log(result.response.text());
  res.send(result.response.text());
});
