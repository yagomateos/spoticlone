"use client"

import { useState, useRef, useEffect } from "react"
import type { Song } from "@/lib/songs"

export const useAudioPlayer = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [playlist, setPlaylist] = useState<Song[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isShuffle, setIsShuffle] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }

    const audio = audioRef.current

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      setError(null) // Clear any previous errors
    }

    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0
        audio.play().catch(handlePlayError)
      } else {
        playNextSong()
      }
    }

    const handleError = (e: Event) => {
      const errorEvent = e as ErrorEvent
      console.error("Audio error:", errorEvent.message || "Unknown error")
      setIsPlaying(false)
      setError(errorEvent.message || "Error playing audio")
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
      audio.pause()
      audio.src = ""
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [isRepeat])

  useEffect(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }

    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        if (audioRef.current) {
          setProgress(audioRef.current.currentTime)
        }
      }, 100)
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [isPlaying])

  const handlePlayError = (error: any) => {
    console.error("Playback error:", error)
    setIsPlaying(false)
    setError("Failed to play audio")
  }

  const playSong = (song: Song) => {
    if (!audioRef.current) return

    const audio = audioRef.current

    if (currentSong?.id === song.id) {
      togglePlay()
    } else {
      audio.pause()
      audio.src = song.audioUrl
      audio.load()
      audio
        .play()
        .then(() => {
          setIsPlaying(true)
          setCurrentSong(song)
          setError(null)
        })
        .catch(handlePlayError)
    }
  }

  const togglePlay = () => {
    if (!audioRef.current || !currentSong) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
          setError(null)
        })
        .catch(handlePlayError)
    }
  }

  const playNextSong = () => {
    if (playlist.length === 0) return

    const currentIndex = playlist.findIndex((song) => song.id === currentSong?.id)
    const nextIndex = isShuffle ? Math.floor(Math.random() * playlist.length) : (currentIndex + 1) % playlist.length
    playSong(playlist[nextIndex])
  }

  const playPreviousSong = () => {
    if (playlist.length === 0) return

    const currentIndex = playlist.findIndex((song) => song.id === currentSong?.id)
    const previousIndex = isShuffle
      ? Math.floor(Math.random() * playlist.length)
      : (currentIndex - 1 + playlist.length) % playlist.length
    playSong(playlist[previousIndex])
  }

  const setAudioVolume = (value: number) => {
    if (audioRef.current) {
      const newVolume = Math.max(0, Math.min(1, value))
      audioRef.current.volume = newVolume
      setVolume(newVolume)
    }
  }

  const seekTo = (seconds: number) => {
    if (audioRef.current && !isNaN(seconds)) {
      audioRef.current.currentTime = Math.max(0, Math.min(seconds, audioRef.current.duration || 0))
      setProgress(audioRef.current.currentTime)
    }
  }

  const toggleShuffle = () => setIsShuffle(!isShuffle)
  const toggleRepeat = () => setIsRepeat(!isRepeat)
  const setCurrentPlaylist = (newPlaylist: Song[]) => setPlaylist(newPlaylist)

  return {
    currentSong,
    isPlaying,
    progress,
    duration,
    volume,
    isShuffle,
    isRepeat,
    error,
    playSong,
    togglePlay,
    setAudioVolume,
    seekTo,
    playNextSong,
    playPreviousSong,
    toggleShuffle,
    toggleRepeat,
    setCurrentPlaylist,
  }
}

