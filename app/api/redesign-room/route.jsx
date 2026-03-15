import { NextResponse } from "next/server";
import Replicate from "replicate";
import sharp from "sharp";
import { v2 as cloudinary } from "cloudinary";
import { AiGeneratedImage } from "@/config/schema";
import { db } from "@/config/db";
import { currentUser } from "@clerk/nextjs/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    const { imageUrl, roomType, designType, additionalReq } =
      await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    const prompt = `Redesign this ${roomType} in ${designType} style. ${
      additionalReq || ""
    }`;

    // Download image
    const response = await fetch(imageUrl);
    const buffer = Buffer.from(await response.arrayBuffer());

    const rgbBuffer = await sharp(buffer)
      .removeAlpha()
      .jpeg({ quality: 90 })
      .toBuffer();

    // Run Replicate
    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      {
        input: {
          image: rgbBuffer,
          prompt,
          a_prompt:
            "high quality, ultra realistic, 8k interior photography",
          n_prompt: "blurry, distorted",
          num_inference_steps: 50,
          guidance_scale: 9,
          width: 768,
          height: 768,
        },
      }
    );

    const replicateImageUrl = Array.isArray(output)
      ? output[0]
      : output;

    // Upload to Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(
      replicateImageUrl,
      { folder: "redesigned-rooms" }
    );

    const finalImageUrl = cloudinaryResult.secure_url;

    // ✅ SAVE TO DATABASE
    const dbResult = await db
      .insert(AiGeneratedImage)
      .values({
        roomType,
        designType,
        orgImage: imageUrl,
        aiImage: finalImageUrl,
        userEmail,
      })
      .returning({ id: AiGeneratedImage.id });

    return NextResponse.json({
      success: true,
      imageUrl: finalImageUrl,
      dbId: dbResult[0].id,
    });

  } catch (error) {
    console.error("FULL ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}