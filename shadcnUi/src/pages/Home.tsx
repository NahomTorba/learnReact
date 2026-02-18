import { useState, useEffect, type SyntheticEvent } from "react"
import MovieCard from "../components/layout/MovieCard"
import { getPopularMovies, searchMovies } from "../services/api"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Movie = {
  id: number
  title: string
  overview?: string
  poster_path?: string
  backdrop_path?: string
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [movies, setMovies] = useState<Movie[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies()
        setMovies(popularMovies)
      } catch (err) {
        console.error(err)
        setError("Failed to load movies...")
      } finally {
        setLoading(false)
      }
    }

    loadPopularMovies()
  }, [])

  const handleSearch = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!searchQuery.trim()) return
    if (loading) return

    setLoading(true)

    try {
      const searchResults = await searchMovies(searchQuery)
      setMovies(searchResults)
      setError(null)
    } catch (err) {
      console.error(err)
      setError("Failed to search movies...")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-6 py-6 space-y-6">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
        <Input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>

      {/* Error */}
      {error && (
        <div className="text-destructive font-medium">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-muted-foreground">Loading...</div>
      )}

      {/* Movies Grid */}
      {!loading && (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}
