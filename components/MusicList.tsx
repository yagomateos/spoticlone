"use client"

import { Clock, Play, Pause } from "lucide-react"
import { useState, useEffect } from "react"
import { playlists } from "@/lib/songs"
import { useAudioPlayer } from "@/hooks/useAudioPlayer"

// Definir la estructura de una canción
interface Song {
  id: string
  number?: number
  title: string
  artist: string
  album?: string
  dateAdded?: string
  duration: number
  coverUrl: string
  audioUrl: string
}

// Definir la estructura de una playlist
interface Playlist {
  id: string
  title: string
  coverUrl: string
  creator?: string
  songCount?: number
  duration?: string
  songs: Song[]
}

// Format duration from seconds to mm:ss
const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

interface MusicListProps {
  category: string
}

export default function MusicList({ category }: MusicListProps) {
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null)
  const { playSong, currentSong, isPlaying, setCurrentPlaylist: setAudioPlayerCurrentPlaylist } = useAudioPlayer()

  useEffect(() => {
    // Actualizar la playlist cuando cambia la categoría
    if (playlists[category]) {
      setCurrentPlaylist(playlists[category])
      setAudioPlayerCurrentPlaylist(playlists[category].songs)
    } else {
      // Si la categoría no existe, usar tecno como fallback
      setCurrentPlaylist(playlists.tecno)
      setAudioPlayerCurrentPlaylist(playlists.tecno.songs)
    }
  }, [category, setAudioPlayerCurrentPlaylist])

  if (!currentPlaylist) {
    return <div className="flex-1 flex items-center justify-center">Cargando...</div>
  }

  const handlePlaySong = (song: Song) => {
    playSong(song)
  }

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-b from-[#1e1e1e] to-[#121212] p-6">
      {/* Playlist header */}
      <div className="flex items-end gap-6 mb-6">
        <div className="w-56 h-56 shadow-lg">
          <img
            src={currentPlaylist.coverUrl || "/placeholder.svg"}
            alt={currentPlaylist.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-xs uppercase mb-2">Lista pública</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{currentPlaylist.title}</h1>
          <div className="flex items-center text-sm text-zinc-300">
            <span>{currentPlaylist.creator || "Spoty Tech"}</span>
            <span className="mx-1">•</span>
            <span>{currentPlaylist.songs.length} canciones,</span>
            <span className="ml-1">
              {currentPlaylist.duration ||
                formatDuration(currentPlaylist.songs.reduce((acc, song) => acc + song.duration, 0))}
            </span>
          </div>
        </div>
      </div>

      {/* Playlist controls */}
      <div className="flex items-center gap-6 mb-6">
        <button
          className="w-14 h-14 flex items-center justify-center rounded-full bg-[#1DB954] text-black hover:scale-105 transition"
          onClick={() => currentPlaylist.songs.length > 0 && handlePlaySong(currentPlaylist.songs[0])}
        >
          {isPlaying && currentSong?.id === currentPlaylist.songs[0].id ? (
            <Pause className="w-6 h-6 fill-black" />
          ) : (
            <Play className="w-6 h-6 fill-black ml-1" />
          )}
        </button>
      </div>

      {/* Songs table */}
      <table className="w-full text-left text-sm text-zinc-400 mt-4">
        <thead className="border-b border-zinc-700">
          <tr>
            <th className="pb-2 w-10">#</th>
            <th className="pb-2">Título</th>
            <th className="pb-2 hidden md:table-cell">Álbum</th>
            <th className="pb-2 hidden md:table-cell">Fecha</th>
            <th className="pb-2 text-right">
              <Clock size={16} />
            </th>
          </tr>
        </thead>
        <tbody>
          {currentPlaylist.songs.map((song, index) => (
            <tr
              key={song.id}
              className={`hover:bg-white/10 group cursor-pointer ${currentSong?.id === song.id ? "text-[#1DB954]" : ""}`}
              onClick={() => handlePlaySong(song)}
            >
              <td className="py-3 align-middle">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <span className="group-hover:hidden">{index + 1}</span>
                  <button className="hidden group-hover:block">
                    <Play className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </td>
              <td className="py-3">
                <div className="flex items-center">
                  <img src={song.coverUrl || "/placeholder.svg"} alt={song.title} className="w-10 h-10 mr-4" />
                  <div>
                    <div className={`font-medium ${currentSong?.id === song.id ? "text-[#1DB954]" : "text-white"}`}>
                      {song.title}
                    </div>
                    <div>{song.artist}</div>
                  </div>
                </div>
              </td>
              <td className="py-3 hidden md:table-cell">{song.album || "-"}</td>
              <td className="py-3 hidden md:table-cell">{song.dateAdded || "hace 1 semana"}</td>
              <td className="py-3 text-right">{formatDuration(song.duration)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

