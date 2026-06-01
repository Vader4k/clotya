import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-gray-50/30">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] p-10 text-center border border-gray-100 flex flex-col items-center gap-6">
        <div className="bg-gray-50 p-6 rounded-full relative">
          <Loader2
            className="size-16 text-gray-300 animate-spin"
            strokeWidth={1.5}
          />
        </div>
        <div className="space-y-3 w-full">
          <div className="h-8 bg-gray-100 rounded-lg w-3/4 mx-auto animate-pulse" />
          <div className="h-4 bg-gray-50 rounded-lg w-full animate-pulse" />
          <div className="h-4 bg-gray-50 rounded-lg w-5/6 mx-auto animate-pulse" />
        </div>
        <div className="w-full h-32 bg-gray-50 rounded-[1.5rem] animate-pulse mt-4" />
      </div>
    </div>
  );
}
