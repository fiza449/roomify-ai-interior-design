import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Upload, SlidersHorizontal, BookOpen, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f9fc]">

      {/* ================= NAVBAR ================= */}
      <nav className="flex items-center justify-between px-10 py-4 border-b bg-white">
        
        <div className="flex items-center gap-2 font-semibold text-lg">
          <div className="w-8 h-8 bg-blue-600 rounded-md"></div>
          Roomify
        </div>

        {/* Buy More Credits */}
        <div className="hidden md:flex gap-6 text-sm text-gray-600">
          <Link
            href="/dashboard/buy-credits"
            className="hover:text-blue-600 transition"
          >
            Buy More Credits
          </Link>
        </div>

        {/* Dashboard Button */}
        <Link href="/dashboard">
          <Button className="rounded-full">
            Dashboard
          </Button>
        </Link>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="text-center py-20 px-6">
        <p className="text-sm text-gray-500 mb-4">
          Design Your Room with Roomify✨
        </p>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          AI Room and Home <br />
          <span className="text-blue-600">Interior Design</span>
        </h1>

        <p className="text-gray-500 mt-6 max-w-xl mx-auto">
          Transform Your Space with AI: Effortless Room & Home Interior Design at Your Fingertips!
        </p>

        {/* Get Started Button */}
        <Link href="/dashboard">
          <Button className="mt-8 px-8 py-6 text-lg rounded-xl">
            Get Started
          </Button>
        </Link>
      </section>

      {/* ================= BEFORE AFTER SECTION ================= */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 pb-20">
        
        {/* Before Image */}
        <div className="relative w-[350px] h-[250px]">
          <Image
            src="/before.jpg"
            alt="Before"
            fill
            className="object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Arrow */}
        <div className="text-4xl font-bold">→</div>

        {/* After Image */}
        <div className="relative w-[350px] h-[250px]">
          <Image
            src="/after.png"
            alt="After"
            fill
            className="object-cover rounded-xl shadow-md"
          />
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-10 px-10 pb-20">

        {/* Upload */}
        <div className="text-center p-6">
          <div className="bg-blue-600 w-14 h-14 flex items-center justify-center rounded-xl mx-auto mb-4">
            <Upload className="text-white" />
          </div>
          <h3 className="font-semibold text-lg">Upload</h3>
          <p className="text-gray-500 text-sm mt-2">
            Upload Your Room Picture
          </p>
        </div>

        {/* Select Design */}
        <div className="text-center p-6 bg-gray-100 rounded-2xl">
          <div className="bg-blue-600 w-14 h-14 flex items-center justify-center rounded-xl mx-auto mb-4">
            <SlidersHorizontal className="text-white" />
          </div>
          <h3 className="font-semibold text-lg">Select Design</h3>
          <p className="text-gray-500 text-sm mt-2">
            Select Design and Room Type
          </p>
        </div>

        {/* Ready to Download */}
        <div className="text-center p-6">
          <div className="bg-blue-600 w-14 h-14 flex items-center justify-center rounded-xl mx-auto mb-4">
            <BookOpen className="text-white" />
          </div>
          <h3 className="font-semibold text-lg">Ready to Download</h3>
          <p className="text-gray-500 text-sm mt-2">
            Your Room / Home Interior Design is Ready
          </p>
        </div>

        {/* Support */}
        <div className="text-center p-6">
          <div className="bg-blue-600 w-14 h-14 flex items-center justify-center rounded-xl mx-auto mb-4">
            <MessageCircle className="text-white" />
          </div>
          <h3 className="font-semibold text-lg">24/7 Support</h3>
          <p className="text-gray-500 text-sm mt-2">
            Contact us 24 hours a day, 7 days a week
          </p>
        </div>

      </section>

    </main>
  );
}