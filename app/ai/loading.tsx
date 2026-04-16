"use client";

export default function LoadingAI() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative bg-linear-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* ✨ Animated Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-blue-300/20 blur-3xl rounded-full -top-20 -left-20 animate-float" />
        <div className="absolute w-80 h-80 bg-purple-300/20 blur-3xl rounded-full bottom-0 right-0 animate-float delay-2000" />
      </div>

      {/* 💬 Loader Card */}
      <div className="relative bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-6 w-full max-w-sm text-center space-y-4">
        {/* 🤖 AI Icon Pulse */}
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center animate-pulse">
            <span className="text-white text-xl">🤖</span>
          </div>
        </div>

        {/* Text */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Preparing your AI tutor...
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            This will just take a moment
          </p>
        </div>

        {/* ⏳ Loading Bars */}
        <div className="space-y-2">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-black rounded-full animate-[loading_1.2s_infinite]" />
          </div>
          <div className="h-2 w-2/3 bg-gray-200 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-black rounded-full animate-[loading_1.5s_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
}
