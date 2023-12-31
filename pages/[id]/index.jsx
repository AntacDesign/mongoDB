import React from "react";
import conectarDB from "@/lib/dbConnect";
import Movie from "@/models/Movie";
import Link from "next/link";

const MoviePage = ({ success, error, movie }) => {
  console.log(success);
  console.log(error);
  console.log(movie);

  if (!success) {
    return (
      <div className="container text-center my-5">
        <h1>{error}🤯</h1>
        <Link href={'/'} className="btn btn-success">Volver...</Link>
      </div>
    );
  }
  return (
    <div className="container">
      <h1>Detalle de Movie</h1>
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h5 className="text-uppercase">{movie.title}</h5>
          </div>
          <p className="fw-light">{movie.plot}</p>
      <Link href={'/'} className="btn btn-success btn-sm me-2">Volver...</Link>
      <Link href={`${movie._id}/edit`} className="btn btn-warning btn-sm me-2">Editar</Link>
        <button className="btn btn-danger btn-sm">Eliminar</button>
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps({ params }) {
  try {
    await conectarDB();
    const movie = await Movie.findById(params.id).lean();
    if (!movie) {
      return { props: { success: false, error: "pelicula no encontrada" } };
    }

    console.log(movie);
    movie._id = `${movie._id} `;

    return { props: { success: true, movie } };
  } catch (error) {
    console.log(error);
    if(error.kind === 'ObjectId'){
      return { props: { success: false, error:'id no valido' } };
    }
    return { props: { success: false, error:'error de Servidor' } };
  }
}

export default MoviePage;
