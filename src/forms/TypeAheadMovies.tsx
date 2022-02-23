import { Typeahead } from "react-bootstrap-typeahead";
import { movieDTO } from "src/movies/movies.model";

export default function TypeAheadMovies(props: typeAheadMoviesProps) {
  const movies: movieDTO[] = [];

  return (
    <>
      <Typeahead
        id="typeahead"
        onChange={(movie) => {
          console.log(movie);
        }}
        options={movies}
        labelKey={(movie) => movie.title}
        filterBy={["title"]}
        placeholder="Search for movie by title..."
        minLength={1}
        renderMenuItemChildren={(movie) => (
          <>
            <img
              src={movie.poster}
              alt="movie"
              style={{
                height: "64px",
                marginRight: "10px",
                width: "64px",
              }}
            />
            <span>{movie.title}</span>
          </>
        )}
      />
    </>
  );
}

interface typeAheadMoviesProps {
  displayName: string;
  movies: movieDTO[];
}
