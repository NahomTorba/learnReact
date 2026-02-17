const API_KEY = "5f2f5ad4451d74a343b708872429e207"
const BASE_URL = "https://api.themoviedb.org/3"

export type Movie = {
  id: number
  title: string
  overview?: string
  poster_path?: string
  backdrop_path?: string
  release_date?: string
  vote_average?: number
}

type TMDBResponse = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export const getPopularMovies = async (): Promise<Movie[]> => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies")
  }

  const data: TMDBResponse = await response.json()
  return data.results
}

export const searchMovies = async (
  query: string
): Promise<Movie[]> => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  )

  if (!response.ok) {
    throw new Error("Failed to search movies")
  }

  const data: TMDBResponse = await response.json()
  return data.results
}
