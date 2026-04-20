"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const Home = () => {
  const [showGif, setShowGif] = useState(false);

  useEffect(() => {
    // Delay setting the GIF source until after the entrance animation finishes (~1.2s)
    const timer = setTimeout(() => {
      setShowGif(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="container-custom min-h-[calc(100vh-180px)] flex items-center py-20 overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
        {/* Text Content */}
        <div className="flex flex-col gap-8 animate-fadeIn opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Creative{" "}
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                Thoughts
              </span>{" "}
              Agency.
            </h1>
            
            <p className="text-lg md:text-xl text-textSoft leading-relaxed max-w-xl">
              We transform your ideas into reality using cutting-edge technology.
              Our team of experts is dedicated to delivering exceptional digital experiences.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="btn-primary shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all duration-300">
              Learn More
            </button>
            <button className="btn-secondary hover:scale-105 transition-all duration-300">
              Contact Us
            </button>
          </div>

          {/* Brands Section */}
          <div className="pt-8 animate-fadeIn opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <p className="text-sm text-textSoft mb-4">Trusted by leading companies</p>
            <div className="relative w-full max-w-md h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <Image 
                src="/brands.png" 
                alt="Trusted brands" 
                fill 
                className="object-contain" 
              />
            </div>
          </div>
        </div>

        {/* Hero Image Container */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[550px] w-full animate-imageReveal opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          {/* 
            Note: Untuk GIF benar-benar 'diam' sebelum animasi selesai, 
            sebaiknya sediakan versi statis (hero.png) untuk ditampilkan sebagai placeholder.
            Saat ini kita menggunakan delay render agar GIF tidak langsung muncul.
          */}
          {showGif && (
            <Image
              src="/hero.gif"
              alt="Hero illustration"
              fill
              className="object-contain"
              priority
            />
          )}
          
          {/* Placeholder effect during load/animation */}
          {!showGif && (
            <div className="absolute inset-0 bg-bgSoft/100 rounded-full blur-3xl animate-pulse"></div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
