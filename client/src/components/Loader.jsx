import { GiRaceCar } from "react-icons/gi";

const Loader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
      <div className="relative">
        {/* Car container with shadow and animation */}
        <div className="relative animate-bounce duration-1000">
          <div className="transform-gpu rotate-12 scale-150">
            <GiRaceCar className="w-16 h-16 text-red-500" />
          </div>

          {/* Shadow effect */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-12 h-2 bg-black/20 rounded-full blur-sm transform scale-x-110 animate-pulse" />
        </div>

        {/* Loading text */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Loading</h2>
          <div className="flex gap-1 justify-center">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
          </div>
        </div>

        {/* Road/Platform */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent rounded" />
      </div>
    </div>
  );
};

export default Loader;
