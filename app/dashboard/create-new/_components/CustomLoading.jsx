'use client'

import React from 'react'
import Image from 'next/image'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog"

function CustomLoading({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="sm:max-w-md">

        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Generating Your AI Room
          </AlertDialogTitle>

          <AlertDialogDescription className="text-center">
            Please wait while we redesign your space.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col items-center justify-center my-6 gap-4">
          <Image
            src="/loading.gif"
            alt="Loading animation"
            width={100}
            height={100}
          />
          <p className="text-sm text-gray-500 text-center">
            Redesigning your Room... Do not refresh
          </p>
        </div>

      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CustomLoading