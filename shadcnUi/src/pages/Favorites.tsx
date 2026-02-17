import { useMovieContext } from "../contexts/MovieContex"
import MovieCard from "../components/layout/MovieCard"

export default function Favorites() {
  const { favorites } = useMovieContext()

  return (
    <div className="container mx-auto px-6 py-6 space-y-6">
      {favorites.length > 0 ? (
        <>
          <h2 className="text-2xl font-semibold">
            Your Favorites
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
          <h2 className="text-2xl font-semibold">
            No Favorites Yet
          </h2>
          <p className="text-muted-foreground">
            Start adding movies to your favorites
          </p>
        </div>
      )}
    </div>
  )
}
