"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Play, Pause, Volume2, SkipBack, SkipForward, Repeat, Shuffle, Menu } from "lucide-react"
import Image from "next/image"
import { Slider } from "@/components/ui/slider"
import { useAudioPlayer } from "@/hooks/useAudioPlayer"
import MusicList from "@/components/MusicList"
import HomePage from "@/components/HomePage"

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

export default function Home() {
  const {
    currentSong,
    isPlaying,
    progress,
    duration,
    volume,
    isShuffle,
    isRepeat,
    togglePlay,
    setAudioVolume,
    seekTo,
    playNextSong,
    playPreviousSong,
    toggleShuffle,
    toggleRepeat,
  } = useAudioPlayer()
  const [activeCategory, setActiveCategory] = useState<string>("tecno")
  const [currentView, setCurrentView] = useState<string>("home")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId)
    setCurrentView("category")
  }

  const handleHomeClick = () => {
    setCurrentView("home")
  }

  const handleVolumeChange = (value: number[]) => {
    setAudioVolume(value[0] / 100)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    seekTo(percent * duration)
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault()
        togglePlay()
      } else if (e.code === "ArrowLeft") {
        playPreviousSong()
      } else if (e.code === "ArrowRight") {
        playNextSong()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [togglePlay, playPreviousSong, playNextSong])

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile menu button */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 text-white"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Sidebar */}
        <aside
          className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:relative z-40 w-64 bg-black p-6 flex flex-col h-full transition-transform duration-300 ease-in-out`}
        >
          <div className="mb-6 flex justify-center md:justify-start">
            <svg viewBox="0 0 78 24" height="24" className="text-white">
              <path
                d="M18.616 10.639c-3.77-2.297-9.99-2.509-13.592-1.388a1.077 1.077 0 0 1-1.164-.363 1.14 1.14 0 0 1-.119-1.237c.136-.262.37-.46.648-.548 4.132-1.287 11-1.038 15.342 1.605a1.138 1.138 0 0 1 .099 1.863 1.081 1.081 0 0 1-.813.213c-.142-.02-.28-.07-.4-.145Zm-.124 3.402a.915.915 0 0 1-.563.42.894.894 0 0 1-.69-.112c-3.144-1.983-7.937-2.557-11.657-1.398a.898.898 0 0 1-.971-.303.952.952 0 0 1-.098-1.03.929.929 0 0 1 .54-.458c4.248-1.323 9.53-.682 13.14 1.595a.95.95 0 0 1 .3 1.286Zm-1.43 3.267a.73.73 0 0 1-.45.338.712.712 0 0 1-.553-.089c-2.748-1.722-6.204-2.111-10.276-1.156a.718.718 0 0 1-.758-.298.745.745 0 0 1-.115-.265.757.757 0 0 1 .092-.563.737.737 0 0 1 .457-.333c4.455-1.045 8.277-.595 11.361 1.338a.762.762 0 0 1 .241 1.028ZM11.696 0C5.237 0 0 5.373 0 12c0 6.628 5.236 12 11.697 12 6.46 0 11.698-5.372 11.698-12 0-6.627-5.238-12-11.699-12h.001Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <nav className="space-y-3 mb-6">
            <a
              href="#"
              className={`flex items-center gap-3 text-sm font-semibold ${currentView === "home" ? "text-white" : "text-zinc-400 hover:text-white"}`}
              onClick={(e) => {
                e.preventDefault()
                handleHomeClick()
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Inicio
            </a>
            <a href="#" className="flex items-center gap-3 text-sm font-semibold text-zinc-400 hover:text-white">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              Buscar
            </a>
            <a href="#" className="flex items-center gap-3 text-sm font-semibold text-zinc-400 hover:text-white">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
              Tu Biblioteca
            </a>
          </nav>

          <div className="mt-6 pt-6 border-t border-zinc-800">
            <nav className="space-y-2">
              <a
                href="#"
                className={`block text-sm ${currentView === "category" && activeCategory === "industrial" ? "text-white font-semibold" : "text-zinc-400 hover:text-white"}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleCategoryClick("industrial")
                }}
              >
                Industrial
              </a>
              <a
                href="#"
                className={`block text-sm ${currentView === "category" && activeCategory === "electronica" ? "text-white font-semibold" : "text-zinc-400 hover:text-white"}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleCategoryClick("electronica")
                }}
              >
                Electrónica
              </a>
              <a
                href="#"
                className={`block text-sm ${currentView === "category" && activeCategory === "tecno" ? "text-white font-semibold" : "text-zinc-400 hover:text-white"}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleCategoryClick("tecno")
                }}
              >
                Techno
              </a>
              <a
                href="#"
                className={`block text-sm ${currentView === "category" && activeCategory === "house" ? "text-white font-semibold" : "text-zinc-400 hover:text-white"}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleCategoryClick("house")
                }}
              >
                House
              </a>
              <a
                href="#"
                className={`block text-sm ${currentView === "category" && activeCategory === "minimal" ? "text-white font-semibold" : "text-zinc-400 hover:text-white"}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleCategoryClick("minimal")
                }}
              >
                Minimal
              </a>
              <a
                href="#"
                className={`block text-sm ${currentView === "category" && activeCategory === "remixes" ? "text-white font-semibold" : "text-zinc-400 hover:text-white"}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleCategoryClick("remixes")
                }}
              >
                Remixes
              </a>
              <a
                href="#"
                className={`block text-sm ${currentView === "category" && activeCategory === "tecnoRave" ? "text-white font-semibold" : "text-zinc-400 hover:text-white"}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleCategoryClick("tecnoRave")
                }}
              >
                Techno Rave
              </a>
              <a
                href="#"
                className={`block text-sm ${currentView === "category" && activeCategory === "techoHouse" ? "text-white font-semibold" : "text-zinc-400 hover:text-white"}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleCategoryClick("techoHouse")
                }}
              >
                Techno House
              </a>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {currentView === "home" ? <HomePage /> : <MusicList category={activeCategory} />}
        </main>
      </div>

      {/* Footer with player */}
      <footer className="h-20 bg-[#181818] border-t border-[#282828] px-4 flex items-center">
        <div className="w-1/3 flex items-center">
          {currentSong && (
            <>
              <div className="w-14 h-14 mr-3 relative hidden sm:block">
                {currentSong.coverUrl && (
                  <Image
                    src={currentSong.coverUrl || "/placeholder.svg"}
                    alt={currentSong.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="truncate">
                <div className="text-sm text-white truncate">{currentSong.title}</div>
                <div className="text-xs text-zinc-400 truncate">{currentSong.artist}</div>
              </div>
            </>
          )}
        </div>

        <div className="w-1/3 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-2">
            <button
              className={`text-zinc-400 hover:text-white ${isShuffle ? "text-[#1DB954]" : ""} hidden sm:block`}
              onClick={toggleShuffle}
            >
              <Shuffle size={16} />
            </button>
            <button className="text-zinc-400 hover:text-white" onClick={playPreviousSong}>
              <SkipBack size={16} />
            </button>
            <button
              onClick={togglePlay}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} fill="black" />}
            </button>
            <button className="text-zinc-400 hover:text-white" onClick={playNextSong}>
              <SkipForward size={16} />
            </button>
            <button
              className={`text-zinc-400 hover:text-white ${isRepeat ? "text-[#1DB954]" : ""} hidden sm:block`}
              onClick={toggleRepeat}
            >
              <Repeat size={16} />
            </button>
          </div>
          <div className="w-full flex items-center gap-2">
            <span className="text-xs text-zinc-400 hidden sm:inline">{formatTime(progress)}</span>
            <div className="flex-1 h-1 bg-zinc-600 rounded-full cursor-pointer" onClick={handleProgressClick}>
              <div className="h-full bg-white rounded-full" style={{ width: `${(progress / duration) * 100}%` }}></div>
            </div>
            <span className="text-xs text-zinc-400 hidden sm:inline">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="w-1/3 flex justify-end">
          <div className="flex items-center gap-2">
            <Volume2 size={16} className="text-zinc-400 hidden sm:block" />
            <div className="w-24 hidden sm:block">
              <Slider value={[volume * 100]} max={100} step={1} onValueChange={handleVolumeChange} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

