import express from "express";
const router = express.Router()


const LANGUAGE_MODEL_API_KEY = "AIzaSyBS_bDrruqlZkiYEDe_A_koaHUbLwxCsNM";
const LANGUAGE_MODEL_URL = `https://generativelanguage.googleapis.com/v1beta1/models/chat-bison-001:generateMessage?key=${LANGUAGE_MODEL_API_KEY}`;

router.get("/prompt/:text", async (req, res) => {
  const text = req.params.text;

  const payload = {
    prompt: { messages: [{ content: text }] },
    temperature: 0.1,
    candidate_count: 1,
  };

  const response = await fetch(LANGUAGE_MODEL_URL, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    method: "POST",
  });

  const data = await response.json();
  console.log(data);
  res.json(data);
});


export {router as chatRouter}