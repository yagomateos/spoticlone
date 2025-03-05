"use client"

import type React from "react"

import { useState } from "react"
import { Play, Pause } from "lucide-react"
import { songs, featuredPlaylists } from "@/lib/songs"
import { useAudioPlayer } from "@/hooks/useAudioPlayer"

export default function HomePage() {
  const { playSong, isPlaying, currentSong, setCurrentPlaylist } = useAudioPlayer()
  const [error, setError] = useState<string | null>(null)

  const technoMixes = [
    {
      id: "underground",
      title: "Mix Techno Underground",
      artists: "Ben Klock, Marcel Dettmann, Jeff Mills",
      song: songs[0],
    },
    {
      id: "minimal",
      title: "Mix Minimal Techno",
      artists: "Richie Hawtin, Dubfire, Paco Osuna",
      song: songs[1],
    },
    {
      id: "house",
      title: "Mix Tech House",
      artists: "Fisher, Solardo, Hot Since 82",
      song: songs[2],
    },
    {
      id: "rave",
      title: "Mix Techno Rave",
      artists: "Amelie Lens, Charlotte de Witte, FJAAK",
      song: songs[3],
    },
  ]

  const handlePlayPlaylist = (playlistId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const playlist = featuredPlaylists[playlistId as keyof typeof featuredPlaylists]
    if (playlist && playlist.songs.length > 0) {
      setCurrentPlaylist(playlist.songs)
      playSong(playlist.songs[0])
    }
  }

  const handlePlayMix = (mix: (typeof technoMixes)[0], e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentPlaylist([mix.song])
    playSong(mix.song)
  }

  const isPlayingMix = (mix: (typeof technoMixes)[0]) => {
    return isPlaying && currentSong?.id === mix.song.id
  }

  const isPlayingPlaylist = (playlistId: string) => {
    const playlist = featuredPlaylists[playlistId as keyof typeof featuredPlaylists]
    return isPlaying && playlist?.songs.some((song) => song.id === currentSong?.id)
  }

  return (
    <div className="flex-1 overflow-auto bg-black p-6">
      <h1 className="text-3xl font-bold mb-6">Spoty Tech</h1>

      {error && <div className="bg-red-500 text-white p-4 rounded-md mb-6">{error}</div>}

      {/* Featured Playlists */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {Object.values(featuredPlaylists).map((playlist) => (
          <div
            key={playlist.id}
            className="bg-[#181818] hover:bg-[#282828] transition-colors rounded-md overflow-hidden cursor-pointer group relative flex items-center gap-4 p-4"
          >
            <div className="w-12 h-12 flex-shrink-0">
              <img
                src={playlist.coverUrl || "/placeholder.svg"}
                alt={playlist.title}
                className="w-full h-full object-cover rounded-sm"
              />
            </div>
            <h3 className="font-bold text-base flex-grow">{playlist.title}</h3>
            <button
              onClick={(e) => handlePlayPlaylist(playlist.id, e)}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1DB954] text-black opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-xl"
            >
              {isPlayingPlaylist(playlist.id) ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>
          </div>
        ))}
      </div>

      {/* Techno Mixes */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Mixes de techno</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {technoMixes.map((mix) => (
            <div
              key={mix.id}
              className="bg-[#181818] rounded-md hover:bg-[#282828] transition-colors group relative cursor-pointer"
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={mix.song.coverUrl || "/placeholder.svg"}
                  alt={mix.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  onClick={(e) => handlePlayMix(mix, e)}
                  className="absolute right-4 bottom-4 w-12 h-12 flex items-center justify-center rounded-full bg-[#1DB954] text-black opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-xl transform translate-y-2 group-hover:translate-y-0"
                >
                  {isPlayingMix(mix) ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-base mb-1 truncate">{mix.title}</h3>
                <p className="text-sm text-zinc-400 truncate">{mix.artists}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

