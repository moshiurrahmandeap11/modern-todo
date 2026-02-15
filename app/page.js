"use client"; // Add this if you're using Next.js 13+ with App Router

import Lottie from 'lottie-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [animationData, setAnimationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const lottieRef = useRef();

  // Load the Lottie animation from public folder
  useEffect(() => {
    fetch('/todo.json')
      .then(response => response.json())
      .then(data => {
        setAnimationData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading animation:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* Left Content - Text Section */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-block mb-4 sm:mb-6">
              <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-1.5 bg-blue-100 text-blue-600 
                             rounded-full text-xs sm:text-sm font-semibold">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
                Welcome to Advanced Todo App
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              <span className="block">Hi There,</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
              Organize your tasks efficiently with our smart todo application. 
              Stay productive, track progress, and achieve your goals.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-2xl mx-auto lg:mx-0">
              {[
                { icon: '✓', text: 'Smart Tasks' },
                { icon: '⏰', text: 'Reminders' },
                { icon: '📊', text: 'Progress' },
                { icon: '🏷️', text: 'Categories' },
                { icon: '🔄', text: 'Sync' },
                { icon: '📱', text: 'Mobile Ready' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm 
                                          rounded-lg px-2 sm:px-3 py-2 shadow-sm">
                  <span className="text-blue-600 text-sm sm:text-base">{feature.icon}</span>
                  <span className="text-gray-700 text-xs sm:text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <Link 
                href="/todo" 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-blue-600 to-purple-600 
                         text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 
                         transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl
                         text-sm sm:text-base"
              >
                Get Started Free
              </Link>
              <Link 
                href="#features" 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-700 
                         font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 
                         border border-gray-200 hover:border-gray-300 text-sm sm:text-base"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-xs sm:text-sm text-gray-500">Active Users</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-xs sm:text-sm text-gray-500">Tasks Done</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">4.9</div>
                <div className="text-xs sm:text-sm text-gray-500">User Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Lottie Animation Section */}
          <div className="relative order-1 lg:order-2">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-linear-to-r from-blue-200 to-purple-200 
                          rounded-full blur-3xl opacity-30 animate-pulse"></div>
            
            {/* Lottie Animation Container */}
            <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
              {isLoading ? (
                // Loading Skeleton
                <div className="w-full aspect-square bg-linear-to-r from-gray-200 to-gray-300 
                              rounded-2xl animate-pulse flex items-center justify-center">
                  <span className="text-gray-500">Loading animation...</span>
                </div>
              ) : animationData ? (
                <Lottie
                  lottieRef={lottieRef}
                  animationData={animationData}
                  loop={true}
                  autoplay={true}
                  className="w-full h-auto"
                  style={{ maxHeight: '500px' }}
                />
              ) : (
                // Fallback if animation fails to load
                <div className="w-full aspect-square bg-linear-to-br from-blue-100 to-purple-100 
                              rounded-2xl flex flex-col items-center justify-center p-8">
                  <span className="text-6xl mb-4">📋</span>
                  <p className="text-gray-600 text-center">Animation could not be loaded</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Wave Decoration */}
      <div className="relative h-16 sm:h-24 md:h-32 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path 
              fill="#ffffff" 
              fillOpacity="1" 
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}