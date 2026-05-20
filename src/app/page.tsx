"use client";

import { useState, useEffect } from "react";
import { Moon, Star, Sparkles, BookOpen } from "lucide-react";

export default function Home() {
  const [heroName, setHeroName] = useState("");
  const [theme, setTheme] = useState("");
  const [characters, setCharacters] = useState("");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [story, setStory] = useState<{ text: string; imageUrl: string } | null>(null);
  const [error, setError] = useState("");

  // Load sticky hero name from local storage
  useEffect(() => {
    const savedName = localStorage.getItem("bedtime-hero-name");
    if (savedName) setHeroName(savedName);
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!heroName || !theme) {
      setError("Please provide at least a hero name and a theme.");
      return;
    }

    // Save hero name for next time
    localStorage.setItem("bedtime-hero-name", heroName);
    
    setIsGenerating(true);
    setStory(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heroName, theme, characters }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate story");
      }

      setStory({
        text: data.story,
        imageUrl: data.imageUrl
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetStory = () => {
    setStory(null);
    setTheme("");
    setCharacters("");
    // Keep heroName
  };

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-md mx-auto">
        
        {/* Header */}
        <header className="flex items-center justify-center gap-3 mb-8 mt-4">
          <Moon className="w-8 h-8 text-indigo-400" />
          <h1 className="text-2xl font-bold tracking-tight text-white">Bedtime Magic</h1>
        </header>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Input Form */}
        {!story && !isGenerating && (
          <form onSubmit={handleGenerate} className="space-y-6 bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700">
            <div>
              <label htmlFor="heroName" className="block text-sm font-medium text-gray-300 mb-1">
                Hero's Name
              </label>
              <input
                id="heroName"
                type="text"
                value={heroName}
                onChange={(e) => setHeroName(e.target.value)}
                placeholder="e.g., Mia"
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
              />
            </div>

            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-300 mb-1">
                Tonight's Theme
              </label>
              <input
                id="theme"
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="e.g., A magical forest, Space adventure"
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
              />
            </div>

            <div>
              <label htmlFor="characters" className="block text-sm font-medium text-gray-300 mb-1">
                Supporting Characters (Optional)
              </label>
              <input
                id="characters"
                type="text"
                value={characters}
                onChange={(e) => setCharacters(e.target.value)}
                placeholder="e.g., A friendly dragon, her dog Buster"
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-colors active:scale-95"
            >
              <Sparkles className="w-5 h-5" />
              Generate Story
            </button>
          </form>
        )}

        {/* Loading State */}
        {isGenerating && (
          <div className="flex flex-col items-center justify-center py-20 space-y-6 text-indigo-300">
            <div className="relative">
              <Star className="w-12 h-12 animate-spin-slow absolute top-0 left-0 opacity-50" />
              <Moon className="w-12 h-12 animate-pulse text-indigo-400" />
            </div>
            <p className="text-xl animate-pulse font-medium text-center">
              Dreaming up a story for {heroName || "you"}...
            </p>
          </div>
        )}

        {/* Story View */}
        {story && !isGenerating && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 mb-8">
              {story.imageUrl && (
                <img 
                  src={story.imageUrl} 
                  alt="Story illustration" 
                  className="w-full h-64 object-cover border-b border-gray-700"
                />
              )}
              <div className="p-6 md:p-8">
                <div className="prose prose-invert prose-lg max-w-none text-gray-200 leading-relaxed space-y-4">
                  {story.text.split('\n').map((paragraph: string, index: number) => (
                    paragraph.trim() && <p key={index} className="text-xl leading-loose">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={resetStory}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors mb-12 active:scale-95"
            >
              <BookOpen className="w-5 h-5" />
              Read Another Story
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
