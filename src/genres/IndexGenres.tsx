import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { urlGenres } from "src/endpoints";
import Button from "src/utils/Button";
import CustomConfirm from "src/utils/CustomConfirm";
import GenericList from "src/utils/GenericList";
import { genreDTO } from "./genres.model";

export default function IndexGenres() {
  const [genres, setGenres] = useState<genreDTO[]>();

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    axios.get(urlGenres).then((response: AxiosResponse<genreDTO[]>) => {
      setGenres(response.data);
    });
  }

  async function deleteGenre(id: number) {
    try {
      await axios.delete(`${urlGenres}/${id}`);
      loadData();
    } catch (error) {
      if (error && error.response) {
        console.error(error.response.data);
      }
    }
  }

  return (
    <>
      <h3>Genres</h3>
      <Link className="btn btn-primary" to="genres/create">
        Create genre
      </Link>
      <GenericList list={genres}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {genres?.map((genre) => (
              <tr key={genre.id}>
                <td>
                  <Link
                    className="btn btn-success"
                    to={`/genres/edit/${genre.id}`}
                  >
                    Edit
                  </Link>
                  <Button
                    onClick={() => CustomConfirm(() => deleteGenre(genre.id))}
                    className="btn btn-danger"
                  >
                    Delete
                  </Button>
                </td>
                <td>{genre.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GenericList>
    </>
  );
}
