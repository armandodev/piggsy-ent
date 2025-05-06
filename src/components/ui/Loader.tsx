import React from "react";

export default function Loader() {
  return (
    <div className="flex gap-4 justify-center items-center w-full h-screen">
      <div className="flex gap-2">
        <div className="bg-teal-500 w-4 aspect-square rounded-full shadow-sm animate-bouncing animate-iteration-count-infinite"></div>
        <div className="bg-teal-500 w-4 aspect-square rounded-full shadow-sm animate-bouncing animate-iteration-count-infinite animate-delay-200"></div>
        <div className="bg-teal-500 w-4 aspect-square rounded-full shadow-sm animate-bouncing animate-iteration-count-infinite animate-delay-400"></div>
      </div>
    </div>
  );
}
