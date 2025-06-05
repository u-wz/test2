"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function SeoriBirthdayPage() {
  const [currentPhase, setCurrentPhase] = useState(1)
  const [musicStarted, setMusicStarted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [mouseStart, setMouseStart] = useState(0)
  const [mouseEnd, setMouseEnd] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Placeholder slideshow images
  const slideshowImages = [
    "/seori-1.jpg",
    "/seori-2.jpg",
    "/seori-3.jpg",
    "/seori-4.jpg",
    "/seori-5.jpg",
    "/seori-6.jpg",
    "/seori-7.jpg",
    "/seori-8.jpg",
  ]

  const transitionToPhase = (nextPhase: number) => {
    setIsTransitioning(true)
    setCurrentPhase(nextPhase)
    setTimeout(() => {
      setIsTransitioning(false)
    }, 300) // Reduced timing for smoother transition
  }

  const startCelebration = async () => {
    try {
      if (audioRef.current) {
        await audioRef.current.play()
        setMusicStarted(true)
      }
    } catch (error) {
      console.log("Audio autoplay prevented:", error)
      setMusicStarted(true)
    }

    setTimeout(() => {
      transitionToPhase(2)
    }, 3000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length)
  }

  // Touch handler functions
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      setTouchEnd(e.touches[0].clientX)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    const swipeDistance = touchStart - touchEnd
    
    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
    
    setTouchStart(0)
    setTouchEnd(0)
  }

  // Mouse handler functions
  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseStart(e.clientX)
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setMouseEnd(e.clientX)
    }
  }

  const handleMouseUp = () => {
    if (isDragging) {
      const swipeDistance = mouseStart - mouseEnd
      
      if (Math.abs(swipeDistance) > 50) {
        if (swipeDistance > 0) {
          nextSlide()
        } else {
          prevSlide()
        }
      }
      
      setIsDragging(false)
      setMouseStart(0)
      setMouseEnd(0)
    }
  }

  // Auto-transition effects
  useEffect(() => {
    if (currentPhase === 2) {
      const timer = setTimeout(() => {
        transitionToPhase(3)
      }, 8000) // Increased to account for text delays
      return () => clearTimeout(timer)
    }

    if (currentPhase === 3) {
      const timer = setTimeout(() => {
        transitionToPhase(4)
      }, 5000)
      return () => clearTimeout(timer)
    }

    if (currentPhase === 8) {
      const timer = setTimeout(() => {
        transitionToPhase(9)
      }, 8000)
      return () => clearTimeout(timer)
    }

    if (currentPhase === 9) {
      const timer = setTimeout(() => {
        transitionToPhase(1) // Optional: loop back to start
      }, 8000)
      return () => clearTimeout(timer)
    }
  }, [currentPhase])

  // Confetti effect
  const createConfetti = () => {
    const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7", "#dda0dd"]
    const confettiElements = []

    for (let i = 0; i < 50; i++) {
      confettiElements.push(
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />,
      )
    }
    return confettiElements
  }

  // Transition classes
  const getTransitionClasses = (isEntering: boolean) => `
    transform-gpu transition-all duration-300 ease-in-out
    ${isTransitioning 
      ? 'opacity-0 scale-98'
      : 'opacity-100 scale-100'
    }
  `

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src="/birthday-music.mp3" type="audio/mpeg" />
      </audio>

      {/* Phase 1: Initial Screen */}
      {currentPhase === 1 && (
        <div
          className={`h-screen w-full bg-black flex items-center justify-center transition-all duration-1000 ${getTransitionClasses(true)}`}
        >
          <button
            onClick={startCelebration}
            className="text-white text-2xl md:text-3xl font-bold hover:scale-105 transition-transform cursor-pointer animate-pulse"
          >
            Click to begin :3
          </button>
        </div>
      )}

      {/* Phase 2: Date Reveal */}
      {currentPhase === 2 && (
        <div
          className={`h-screen w-full bg-[#fae6e7] flex flex-col items-center justify-center transition-all duration-1000 ${getTransitionClasses(true)}`}
        >
          <div className="text-center space-y-8">
            <div className="slide-up-1 text-6xl md:text-8xl font-bold text-pink-600 drop-shadow-lg">4/6/2025</div>
            <div className="slide-up-2 text-3xl md:text-5xl text-pink-500 font-semibold">This date look familiar?</div>
            <div className="slide-up-3 text-4xl md:text-6xl text-pink-400">...</div>
            <div className="slide-up-6 text-3xl md:text-5xl text-pink-500 italic font-medium">Oh wait...</div>
          </div>
        </div>
      )}

      {/* Phase 3: Birthday Announcement */}
      {currentPhase === 3 && (
        <div
          className={`h-screen w-full bg-[#fae6e7] flex items-center justify-center relative transition-all duration-1000 ${getTransitionClasses(true)}`}
        >
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-purple-800 animate-bounce drop-shadow-lg">
              IT'S SEORI'S BIRTHDAY! 🎉
            </h1>
          </div>
          {/* Confetti */}
          <div className="confetti-container">{createConfetti()}</div>
        </div>
      )}

      {/* Phase 4: Letter Invitation */}
      {currentPhase === 4 && (
        <div
          className={`h-screen w-full bg-[#fae6e7] flex flex-col items-center justify-center transition-all duration-1000 ${getTransitionClasses(true)}`}
        >
          <div className="letter-envelope shake-animation mb-8">
            <img
              src="/letter.jpg"  // Make sure to add this image to your public folder
              alt="Letter Envelope"
              className="w-96 h-72 object-cover rounded-lg shadow-2xl border-4 border-white transform rotate-3 hover:rotate-0 transition-all duration-300"
            />
          </div>
          <button
            onClick={() => transitionToPhase(5)}
            className="bg-[#ffffff] text-[#f6afbb] px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            Open the letter
          </button>
        </div>
      )}

      {/* Phase 5: Birthday Message */}
      {currentPhase === 5 && (
        <div
          className={`h-screen w-full bg-[#fae6e7] flex flex-col items-center justify-center transition-all duration-1000 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
        >
          <div className="notebook-paper w-96 h-80 bg-white border-l-4 border-pink-600 shadow-2xl p-8 mb-8 relative transform rotate-1">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-50 to-transparent opacity-30"></div>
            <div className="relative z-10">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-pink-800 mb-6 fade-in-1">Dear Seori,</h2>
                <p className="text-lg text-gray-700 leading-relaxed fade-in-2">Happy Birthday! 🎉</p>
                <p className="text-lg text-gray-700 leading-relaxed fade-in-3">
                  Hope your special day is filled with joy, laughter, and all your favorite things!
                </p>
                <p className="text-lg text-gray-700 leading-relaxed fade-in-4">
                  Aslo sorry for being late yk coding this was somehow a disaster :P
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => transitionToPhase(6)}
            className="bg-[#ffffff] text-pink-600 px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            Blah blah blah
          </button>
        </div>
      )}

      {/* Phase 6: News Surprise */}
      {currentPhase === 6 && (
        <div
          className={`h-screen w-full bg-[#fae6e7] flex flex-col items-center justify-center transition-all duration-1000 p-4 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 fade-in-1">
            Don't be surprised but you're on the news :O
          </h2>
          <div className="news-article bg-white border-4 border-gray-300 rounded-lg shadow-2xl p-6 mb-8 max-w-lg fade-in-2 transform hover:scale-105 transition-transform">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4 text-red-600">🚨 BREAKING NEWS 🚨</h3>
              <img
                src="/nes.png"
                alt="News Article"
                className="w-full h-55 object-cover rounded mb-4"
              />
              <p className="text-lg font-semibold fade-in-3">
                Local Celebrity Seori Celebrates Another Year of Awesomeness!
              </p>
              <p className="text-sm text-gray-600 mt-2 fade-in-4">
                ran out of ideas for this part so I just put a news article here :P
              </p>
            </div>
          </div>
          <button
            onClick={() => transitionToPhase(7)}
            className="bg-[#ffffff] text-pink-600 px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            OMG :3
          </button>
        </div>
      )}

      {/* Phase 7: Enhanced Photo Slideshow */}
      {currentPhase === 7 && (
        <div
          className={`h-screen w-full bg-[#fae6e7] flex flex-col items-center justify-center transition-all duration-1000 p-4 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
        >
          <div className="slideshow-container relative mb-8 fade-in-1 w-full max-w-4xl px-4">
            <div 
              className="flex items-center justify-center h-96 relative"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              {/* Previous Slide */}
              <div className="absolute -left-16 w-64 h-full opacity-40 transform scale-75">
                <img
                  src={slideshowImages[(currentSlide - 1 + slideshowImages.length) % slideshowImages.length]}
                  alt="Previous"
                  className="w-full h-full object-cover rounded-lg blur-[1px]"
                />
              </div>

              {/* Current Slide */}
              <div className="w-80 h-full z-10 transform transition-all duration-500">
                <img
                  src={slideshowImages[currentSlide]}
                  alt={`Seori Photo ${currentSlide + 1}`}
                  className="w-full h-full object-cover rounded-lg shadow-2xl"
                />
              </div>

              {/* Next Slide */}
              <div className="absolute -right-16 w-64 h-full opacity-40 transform scale-75">
                <img
                  src={slideshowImages[(currentSlide + 1) % slideshowImages.length]}
                  alt="Next"
                  className="w-full h-full object-cover rounded-lg blur-[1px]"
                />
              </div>
            </div>
          </div>

          <p className="text-2xl font-bold text-pink-600 text-center fade-in-2">That's adorable :0</p>
          <button
            onClick={() => transitionToPhase(8)}
            className="bg-[#ffffff] text-pink-600 px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg mt-8"
          >
            i know right?
          </button>
        </div>
      )}

      {/* Phase 8: Sweet Messages */}
      {currentPhase === 8 && (
        <div
          className={`h-screen w-full bg-[#fae6e7] flex flex-col items-center justify-center transition-all duration-1000 ${getTransitionClasses(true)}`}
        >
          <div className="text-center space-y-8">
            <div className="slide-up-1 text-4xl md:text-6xl font-bold text-pink-600">Anyways</div>
            <div className="slide-up-2 text-3xl md:text-5xl text-pink-500">I hope You have</div>
            <div className="slide-up-3 text-4xl md:text-6xl text-pink-600">A lovely day</div>
            <div className="slide-up-4 text-3xl md:text-5xl text-pink-500">Sweetie</div>
            <div className="slide-up-5 text-4xl md:text-6xl text-pink-600">:3</div>
          </div>
        </div>
      )}

      {/* Phase 9: Final Message */}
      {currentPhase === 9 && (
        <div
          className={`h-screen w-full bg-[#fae6e7] flex flex-col items-center justify-center transition-all duration-1000 ${getTransitionClasses(true)}`}
        >
          <div className="text-center space-y-8">
            <div className="slide-up-1 text-4xl md:text-6xl font-bold text-pink-600">by the way</div>
            <div className="slide-up-2 text-3xl md:text-5xl text-pink-500">this site is all yours now</div>
            <div className="slide-up-3 text-4xl md:text-6xl text-pink-600">it wont expire for 3 whole months</div>
            <div className="slide-up-4 text-3xl md:text-5xl text-pink-500">or more...</div>
            <div className="slide-up-5 text-4xl md:text-6xl text-pink-600">depends on the server idk</div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        /* Smooth page transitions */
        .transform-gpu {
          will-change: transform, opacity;
          backface-visibility: hidden;
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        /* Update existing animations for smoother timing */
        .slide-up-1 {
          animation: slideUp 0.6s ease-out 0.8s both;
        }
        .slide-up-2 {
          animation: slideUp 0.6s ease-out 1.6s both;
        }
        .slide-up-3 {
          animation: slideUp 0.6s ease-out 2.4s both;
        }
        .slide-up-4 {
          animation: slideUp 0.6s ease-out 2.6s both;
        }
        .slide-up-5 {
          animation: slideUp 0.6s ease-out 4.0s both;
        }
        .slide-up-6 {
          animation: slideUp 0.6s ease-out 5.4s both;
        }

        .fade-in-1 {
          animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both;
        }
        .fade-in-2 {
          animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
        }
        .fade-in-3 {
          animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
        }
        .fade-in-4 {
          animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .shake-animation {
          animation: shake 0.5s ease-in-out 2s infinite;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        
        .confetti-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }
        
        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: confetti-fall linear infinite;
        }
        
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        .notebook-paper {
          background-image: 
            linear-gradient(to right, #ff6b6b 0px, #ff6b6b 1px, transparent 1px),
            repeating-linear-gradient(
              transparent,
              transparent 24px,
              #e0e0e0 24px,
              #e0e0e0 26px
            );
        }

        /* Cursor styles */
        .cursor-grab {
          cursor: grab;
        }
        
        .cursor-grab:active {
          cursor: grabbing;
        }

        /* Active drag effect */
        .slideshow-container .dragging img {
          transform: scale(0.98);
          transition: transform 0.2s ease-out;
        }

        /* Mobile-friendly slideshow styles */
        @media (max-width: 640px) {
          .slideshow-container {
            width: 100%;
            padding: 0 1rem;
          }
          
          /* Adjust side image visibility on mobile */
          .slideshow-container div[class*="absolute"] {
            transition: all 0.3s ease-in-out;
          }
          
          /* Add swipe hint animation */
          .slideshow-container::after {
            content: '←  swipe  →';
            position: absolute;
            bottom: -2rem;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.875rem;
            color: #666;
            opacity: 0.7;
            animation: fadeInOut 2s ease-in-out infinite;
          }
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}
