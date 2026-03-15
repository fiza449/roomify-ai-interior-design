'use client'

import React from "react";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function AiOutputDialog({
  openDialog,
  closeDialog,
  orgImageUrl,
  aiImageUrl,
}) {

  const handleDownload = async () => {
    try {
      const response = await fetch(aiImageUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "roomify-ai-design.png";
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <AlertDialog
      open={openDialog}
      onOpenChange={(open) => {
        if (!open) closeDialog();
      }}
    >
      <AlertDialogContent>
        
        <AlertDialogHeader className="mb-4">
          <AlertDialogTitle className="text-2xl font-semibold">
            Result
          </AlertDialogTitle>
        </AlertDialogHeader>

        {orgImageUrl && aiImageUrl && (
          <div className="w-full rounded-xl overflow-hidden">
            <ReactBeforeSliderComponent
              firstImage={{ imageUrl: orgImageUrl }}
              secondImage={{ imageUrl: aiImageUrl }}
            />
          </div>
        )}

        <div className="mt-4 flex justify-between">
          <Button onClick={handleDownload}>
            Download
          </Button>

          <Button variant="outline" onClick={closeDialog}>
            Close
          </Button>
        </div>

      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AiOutputDialog;