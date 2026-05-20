import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { heroName, theme, characters } = await req.json();

    if (!heroName || !theme) {
      return NextResponse.json(
        { error: "Hero name and theme are required." },
        { status: 400 }
      );
    }

    const storyPrompt = `Write a short, engaging bedtime story for a 4-year-old child. 
The hero of the story is named "${heroName}".
The setting/theme is: "${theme}".
Include these supporting characters/elements: "${characters || 'none'}".
Make it soothing, imaginative, and around 300 words. It should end with the hero going to sleep. Format it with simple paragraphs.`;

    const storyResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: storyPrompt,
    });

    const storyText = storyResponse.text;
    
    // Instead of Unsplash (which deprecated their Source API), we can use Pollinations.ai, 
    // which generates AI images on the fly via a simple GET request.
    const imagePrompt = `A beautiful, magical children's book illustration about ${theme}. Dreamy lighting, bedtime story aesthetic.`;
    const encodedImagePrompt = encodeURIComponent(imagePrompt);
    const finalImageUrl = `https://image.pollinations.ai/prompt/${encodedImagePrompt}?width=600&height=400&nologo=true`;

    return NextResponse.json({
      story: storyText,
      imageUrl: finalImageUrl,
    });

  } catch (error) {
    console.error("Story generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate story. Please try again." },
      { status: 500 }
    );
  }
}
