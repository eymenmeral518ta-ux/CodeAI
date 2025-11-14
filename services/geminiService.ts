
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are an expert web developer. Based on the user's request, generate a single, complete, and functional HTML file.
The HTML file MUST include all necessary HTML structure, CSS within a <style> tag in the <head>, and any required JavaScript within a <script> tag at the end of the <body>.
Do not include any explanations, comments, or markdown formatting like \`\`\`html ... \`\`\`. Only output the raw HTML code.
Ensure the generated code is visually appealing, responsive, and uses modern web development practices. If the user prompt is in a specific language, the content (text) within the generated HTML should be in that same language.
`;

export const generateCode = async (prompt: string): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION
            }
        });

        const code = response.text;
        
        // Clean up potential markdown formatting just in case
        const cleanedCode = code.replace(/^```html\s*|```\s*$/g, '').trim();

        return cleanedCode;

    } catch (error) {
        console.error("Error generating code with Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate code: ${error.message}`);
        }
        throw new Error("An unknown error occurred while communicating with the AI.");
    }
};
