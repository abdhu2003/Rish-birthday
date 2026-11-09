import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-magical-midnight text-pink-100 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-pink-500/20 border border-pink-400/30 flex items-center justify-center mb-6">
        <Heart className="w-8 h-8 text-pink-400 fill-pink-400" />
      </div>
      <h2 className="font-serif text-3xl font-bold mb-3 glow-text-pink">Page Not Found</h2>
      <p className="text-pink-200/80 mb-6 max-w-sm text-sm">
        Let&apos;s guide you back to the magical birthday celebration! ✨
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium flex items-center gap-2 shadow-lg"
      >
        <Sparkles className="w-4 h-4 text-yellow-300" />
        <span>Return to Birthday Surprise</span>
      </Link>
    </div>
  );
}

