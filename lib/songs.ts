// lib/songs.ts
export interface Song {
  id: string
  title: string
  artist: string
  album?: string
  duration: number
  coverUrl: string
  audioUrl: string
}

export const songs: Song[] = [
  {
    id: "1",
    title: "Mix Techno Underground",
    artist: "Ben Klock, Marcel Dettmann, Jeff Mills",
    album: "Underground Sessions",
    duration: 178,
    coverUrl: "https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg",
    audioUrl: "https://bucket-qlrc5d.s3.eu-west-2.amazonaws.com/music/03_martyn_hare_-_b1_downtime-oxd.mp3",
  },
  {
    id: "2",
    title: "Mix Minimal Techno",
    artist: "Richie Hawtin, Dubfire, Paco Osuna",
    album: "Minimal Sessions",
    duration: 144,
    coverUrl: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg",
    audioUrl:
      "https://bucket-qlrc5d.s3.eu-west-2.amazonaws.com/music/Tiga,%20Audion%20-%20Let's%20Go%20Dancing%20(Solomun%20Remix).mp3",
  },
  {
    id: "3",
    title: "Mix Tech House",
    artist: "Fisher, Solardo, Hot Since 82",
    album: "Tech House Vibes",
    duration: 119,
    coverUrl: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
    audioUrl:
      "https://bucket-qlrc5d.s3.eu-west-2.amazonaws.com/music/022.%20Age%20Of%20Love%20-%20The%20Age%20of%20Love%20(Solomun%20Renaissance%20Remix).mp3",
  },
  {
    id: "4",
    title: "Mix Techno Rave",
    artist: "Amelie Lens, Charlotte de Witte, FJAAK",
    album: "Rave Sessions",
    duration: 140,
    coverUrl: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
    audioUrl:
      "https://bucket-qlrc5d.s3.eu-west-2.amazonaws.com/music/Noir%20%20Haze%20%20Around%20Solomun%20Vox%20Mix%20%20NMB037.mp3",
  },
]

// Featured playlists with corresponding songs
export const featuredPlaylists = {
  top50: {
    id: "top50",
    title: "Top 50 Global",
    coverUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    songs: [songs[0], songs[1]],
  },
  dance: {
    id: "dance",
    title: "Dance Mix",
    coverUrl: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
    songs: [songs[2], songs[3]],
  },
  chill: {
    id: "chill",
    title: "Chill Vibes",
    coverUrl: "https://i.scdn.co/image/ab67706f00000002c414e7daf34690c9f983f76e",
    songs: [songs[1], songs[2]],
  },
}

// Create category-specific song lists
const createCategorySongs = (categoryId: string, startIndex: number, count: number) => {
  return songs.slice(startIndex, startIndex + count).map((song) => ({
    ...song,
    id: `${categoryId}-${song.id}`,
  }))
}

// Playlists organized by category
export const playlists = {
  top50Global: {
    id: "top50Global",
    title: "Top 50 Global",
    coverUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    songs: [songs[0], songs[1], songs[2]],
  },
  industrial: {
    id: "industrial",
    title: "Industrial Vibes",
    coverUrl: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
    songs: createCategorySongs("industrial", 0, 3),
  },
  electronica: {
    id: "electronica",
    title: "Electrónica Mix",
    coverUrl: "https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg",
    songs: createCategorySongs("electronica", 1, 3),
  },
  tecno: {
    id: "tecno",
    title: "Darklist",
    coverUrl: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg",
    songs: createCategorySongs("tecno", 2, 3),
  },
  house: {
    id: "house",
    title: "House Classics",
    coverUrl: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
    songs: createCategorySongs("house", 3, 2),
  },
  minimal: {
    id: "minimal",
    title: "Minimal Selection",
    coverUrl: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
    songs: createCategorySongs("minimal", 0, 3),
  },
  remixes: {
    id: "remixes",
    title: "Remix Collection",
    coverUrl: "https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg",
    songs: createCategorySongs("remixes", 1, 3),
  },
  tecnoRave: {
    id: "tecnoRave",
    title: "Techno Rave Party",
    coverUrl: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg",
    songs: createCategorySongs("tecnoRave", 2, 3),
  },
  techoHouse: {
    id: "techoHouse",
    title: "Tech House Beats",
    coverUrl: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
    songs: createCategorySongs("techoHouse", 3, 2),
  },
}

