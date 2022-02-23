import { movieCreationDTO } from "src/movies/movies.model";

export function convertMovieToFormData(movie: movieCreationDTO) {
  const formData = new FormData();

  formData.append("title", movie.title);

  if (movie.summary) {
    formData.append("summary", movie.summary);
  }

  formData.append("trailer", movie.trailer);
  formData.append("inTheaters", String(movie.inTheaters));

  if (movie.releaseDate) {
    formData.append("releaseDate", formatDate(movie.releaseDate));
  }

  if (movie.poster) {
    formData.append("poster", movie.poster);
  }

  formData.append("genresIds", JSON.stringify(movie.genresIds));

  return formData;
}

function formatDate(date: Date) {
  date = new Date(date);
  const format = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [{ value: month }, , { value: day }, , { value: year }] =
    format.formatToParts(date);

  return `${year}-${month}-${day}`;
}
