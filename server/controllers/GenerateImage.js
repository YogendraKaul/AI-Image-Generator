import * as dotenv from "dotenv";
import { createError } from "../error.js";
import OpenAI from "openai";

dotenv.config();

// Setup OpenAI client with v4 syntax
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Controller to generate image
export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const generatedImage = response.data[0].b64_json;

    res.status(200).json({ photo: generatedImage });
  } catch (error) {
    next(
      createError(
        error.status || 500,
        error?.response?.data?.error?.message || error.message
      )
    );
  }
};
