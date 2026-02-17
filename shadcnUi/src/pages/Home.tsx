import MovieCard from "../components/layout/MovieCard"
import SearchBar from "../components/layout/SearchBar"
import { useEffect, useState } from "react"
import { getPopularMovies, searchMovies, type Movie } from "../services/api"
import { Loader2 } from "lucide-react"

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        loadPopularMovies()
    }, [])

    const loadPopularMovies = async () => {
        try {
            setLoading(true)
            const popularMovies = await getPopularMovies()
            setMovies(popularMovies)
            setError(null)
        } catch (err) {
            setError("Failed to load movies")
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!searchQuery.trim()) return

        try {
            setLoading(true)
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            setError("Failed to search movies")
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
        if (e.target.value === "") {
            loadPopularMovies()
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <form onSubmit={handleSearch} className="mb-8">
                <div className="w-full flex justify-center">
                    <SearchBar
                        value={searchQuery}
                        onChange={handleInputChange}
                    />
                </div>
            </form>


            {error && (
                <div className="text-center text-red-500 mb-8">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}

            {!loading && movies.length === 0 && (
                <div className="text-center text-muted-foreground">
                    No movies found
                </div>
            )}
        </div>
    )
}