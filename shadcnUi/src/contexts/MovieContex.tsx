import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react"

export type Movie = {
  id: number
  title: string
  poster_path?: string
  release_date?: string
}

type MovieContextType = {
  favorites: Movie[]
  addToFavorites: (movie: Movie) => void
  removeFromFavorites: (movieId: number) => void
  isFavorite: (movieId: number) => boolean
}

const MovieContext = createContext<MovieContextType | undefined>(
  undefined
)

export const useMovieContext = (): MovieContextType => {
  const context = useContext(MovieContext)
  if (!context) {
    throw new Error(
      "useMovieContext must be used within a MovieProvider"
    )
  }
  return context
}

interface MovieProviderProps {
  children: ReactNode
}

export const MovieProvider = ({
  children,
}: MovieProviderProps) => {
  const [favorites, setFavorites] = useState<Movie[]>([])

  // Load from localStorage
  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites")

    if (storedFavs) {
      try {
        setFavorites(JSON.parse(storedFavs))
      } catch (error) {
        console.error("Failed to parse favorites", error)
      }
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (movie: Movie) => {
    setFavorites((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev
      return [...prev, movie]
    })
  }

  const removeFromFavorites = (movieId: number) => {
    setFavorites((prev) =>
      prev.filter((movie) => movie.id !== movieId)
    )
  }

  const isFavorite = (movieId: number) => {
    return favorites.some((movie) => movie.id === movieId)
  }

  const value: MovieContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  }

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  )
}
