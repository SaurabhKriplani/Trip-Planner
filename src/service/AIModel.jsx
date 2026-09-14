import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY;

if (!apiKey) {
  throw new Error("❌ API key is not configured. Please add VITE_GOOGLE_GENERATIVE_AI_API_KEY to your .env file.");
}

console.log("🔑 Gemini API Key loaded:", apiKey.substring(0, 20) + "...");

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const chatSession = {
  sendMessage: async (message) => {
    try {
      console.log("🔐 AI Model: Gemini 2.0 Flash");
      console.log("📝 Sending request to Gemini...");
      
      const result = await model.generateContent(message);
      const response = result.response;
      const responseText = response.text();

      console.log("=== RAW GEMINI RESPONSE START ===");
      console.log(responseText);
      console.log("=== RAW GEMINI RESPONSE END ===");

      // Extract JSON - robust method
      let jsonStr = responseText.trim();
      
      // Method 1: Extract from markdown code blocks
      const codeBlockMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (codeBlockMatch && codeBlockMatch[1]) {
        jsonStr = codeBlockMatch[1].trim();
        console.log("✅ Extracted from markdown code block");
      } else {
        // Method 2: Find first { and last }
        const firstBrace = responseText.indexOf('{');
        const lastBrace = responseText.lastIndexOf('}');
        
        if (firstBrace !== -1 && lastBrace !== -1 && firstBrace < lastBrace) {
          jsonStr = responseText.substring(firstBrace, lastBrace + 1);
          console.log("✅ Extracted JSON by finding braces");
        }
      }

      // Clean up JSON - multiple passes
      jsonStr = jsonStr.replace(/,\s*([}\]])/g, '$1');      // Remove trailing commas
      jsonStr = jsonStr.replace(/,\s*,/g, ',');              // Remove double commas
      jsonStr = jsonStr.replace(/{\s*,/g, '{');              // Remove comma after {
      jsonStr = jsonStr.replace(/\[\s*,/g, '[');             // Remove comma after [
      
      // Try to parse as JSON
      let parsedData;
      try {
        parsedData = JSON.parse(jsonStr);
        console.log("✅ Successfully parsed JSON");
        console.log("📊 Hotels:", parsedData.hotels?.length || 0);
        console.log("📅 Itinerary days:", parsedData.itinerary?.length || 0);
      } catch (parseError) {
        console.error("❌ JSON parse error:", parseError.message);
        console.error("First 400 chars:", jsonStr.substring(0, 400));
        
        // Fallback: Return demo data structure if parsing fails
        console.warn("⚠️ Using fallback demo data structure");
        parsedData = {
          hotels: [
            { name: "Hotel1", address: "Street1", price: 8000, rating: 4.5, description: "Good", image_url: "url", coordinates: { latitude: 48.85, longitude: 2.35 } }
          ],
          itinerary: [
            { day: 1, title: "Day 1", places: [], lunch: { name: "Rest1", address: "A", details: "Eat", cuisine: "Local" }, dinner: { name: "Rest2", address: "A", details: "Dine", cuisine: "Local" } }
          ]
        };
      }

      // Return clean JSON string
      const cleanJsonString = JSON.stringify(parsedData);
      return {
        response: {
          text: () => cleanJsonString,
        },
      };
    } catch (error) {
      console.error("❌ Gemini API Error:", error);
      throw error;
    }
  },
};

console.log("✅ Gemini 2.0 Flash AI Model initialized successfully");

