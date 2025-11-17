require('dotenv').config()
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});



async function genrateCaption(base64ImageFile) {
    const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageFile,
            },
        },
        { text: "Caption this image." },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config:{
            systemInstruction:`
        You are an expert in generating captions for images.
        You generate single caption for the images.
        Your captoin should be short and concise
        Your use hashtags and emojis in the caption.
        And genrate caption in roman/hinglish language
        The caption should be in dark humor + dirty humor
        `
        }
        
    });
    
    return response.text
}
module.exports = genrateCaption