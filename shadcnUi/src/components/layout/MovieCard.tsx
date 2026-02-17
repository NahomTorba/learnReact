import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Movie } from "@/services/api"

type MovieCardProps = {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  const onFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // TODO: Implement favorite functionality
    console.log("Favorite clicked for", movie.title)
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
            variant="secondary"
            className="w-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
            onClick={onFavoriteClick}
          >
            Add to Favorites
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

      {/* <CardFooter className="p-4 pt-0">
        <Button className="w-full" variant="outline">View Details</Button>
      </CardFooter> */}
    </Card>
  )
}
