import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Movie } from "@/services/api"
import { useMovieContext } from "@/contexts/MovieContex"
import type { MouseEvent } from "react"

type MovieCardProps = {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext()
  const isMovieFavorite = isFavorite(movie.id)

  const onFavoriteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (isMovieFavorite) {
      removeFromFavorites(movie.id)
    } else {
      // Convert API Movie type to Context Movie type (only include fields context expects)
      addToFavorites({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
      })
    }
  }

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden group">
      <div className="relative aspect-[2/3] w-full">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <p className="text-white text-sm line-clamp-3 mb-4">{movie.overview}</p>
          <Button
            variant={isMovieFavorite ? "destructive" : "secondary"}
            className={`w-full transition ${isMovieFavorite
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
              }`}
            onClick={onFavoriteClick}
          >
            {isMovieFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
        </div>
      </div>

      <CardHeader className="p-4">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg leading-tight line-clamp-2" title={movie.title}>
            {movie.title}
          </CardTitle>
          <span className="text-sm font-medium text-muted-foreground shrink-0">
            {movie.release_date?.split('-')[0]}
          </span>
        </div>
      </CardHeader>
    </Card>
  )
}