"use client";

import Lottie from 'lottie-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import animationData from '../../../public/todo.json';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const lottieRef = useRef();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-block mb-4 sm:mb-6">
              <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-1.5 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm font-semibold">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
                Welcome to Advanced Todo App
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              <span className="block">Hi There,</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
              Organize your tasks efficiently with our smart todo application. 
              Stay productive, track progress, and achieve your goals.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <Link 
                href="/todo" 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Get Started Free
              </Link>
              <Link 
                href="#features" 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 border border-gray-200 hover:border-gray-300 text-sm sm:text-base"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Content - Lottie Animation */}
          <div className="relative order-1 lg:order-2">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            
            <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
              <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={true}
                autoplay={true}
                className="w-full h-auto"
                style={{ maxHeight: '500px' }}
                onLoad={() => setIsLoading(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}