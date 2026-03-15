'use client'

import React, { useState } from "react";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import { Home, Palette } from "lucide-react";
import AiOutputDialog from "./AiOutputDialog";

function RoomDesignCard({ room }) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      {/* Clickable Card */}
      <div
        onClick={() => setOpenDialog(true)}
        className="bg-white cursor-pointer dark:bg-zinc-900 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800"
      >
        {/* Slider */}
        <div className="w-full">
          <ReactBeforeSliderComponent
            firstImage={{ imageUrl: room?.aiImage }}
            secondImage={{ imageUrl: room?.orgImage }}
          />
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
            <Home className="w-5 h-5 text-indigo-500" />
            <span className="font-medium">Room Type:</span>
            <span className="text-zinc-600 dark:text-zinc-400">
              {room?.roomType}
            </span>
          </div>

          <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
            <Palette className="w-5 h-5 text-pink-500" />
            <span className="font-medium">Design Style:</span>
            <span className="text-zinc-600 dark:text-zinc-400">
              {room?.designType}
            </span>
          </div>
        </div>
      </div>

      {/* Dialog (outside card so no bubbling issue) */}
      <AiOutputDialog
        openDialog={openDialog}
        closeDialog={() => setOpenDialog(false)}
        aiImageUrl={room?.aiImage}
        orgImageUrl={room?.orgImage}
      />
    </>
  );
}

export default RoomDesignCard;