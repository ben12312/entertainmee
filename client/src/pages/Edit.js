import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { editMovie, getMovieById, GET_MOVIES } from '../graphql/queries';
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, useParams, useHistory } from "react-router-dom";
import Swal from 'sweetalert2'

export default function AddMovie() {
    const history = useHistory();
    const { id } = useParams();
    const { loading, error, data } = useQuery(getMovieById(id))
    const movie = data.movie

    const [title, setTitle] = useState(movie.title);
    const [overview, setOverview] = useState(movie.overview);
    const [poster_path, setPoster_path] = useState(movie.poster_path);
    const [popularity, setPopularity] = useState(movie.popularity);

    const [editMovieById] = useMutation(editMovie(id, title, overview, poster_path, popularity), {
        refetchQueries: [{
            query: GET_MOVIES
        }]
    })

    if (loading) return <h3 style={{ color: 'wheat' }}>Loading...</h3>
    if (error) console.log(error);

    function updateButton(event) {
        event.preventDefault();
        if (title === '' || overview === '' || poster_path === '' || popularity === '') {
            return Swal.fire({
                title: 'Error!',
                text: 'All data can not be blank',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
        editMovieById()
        history.push("/")
    }

    return (
        <>
            <div className="container">
                <h1 style={{ color: 'wheat', marginTop: '1cm', marginBottom: '1cm' }}>Create Movie</h1>
                <form style={{ color: 'wheat' }} onSubmit={(event) => updateButton(event)}>
                    <div className="form-outline mb-4">
                        <input onChange={(event) => setTitle(event.target.value)} defaultValue={movie.title} type="text" className="form-control" placeholder="Title" />
                    </div>

                    <div className="form-outline mb-4">
                        <input onChange={(event) => setOverview(event.target.value)} defaultValue={movie.overview} type="text" className="form-control" placeholder="Overview" />
                    </div>

                    <div className="form-outline mb-4">
                        <input onChange={(event) => setPoster_path(event.target.value)} defaultValue={movie.poster_path} type="text" className="form-control" placeholder="Poster Patch (Link)" />
                    </div>

                    <div className="form-outline mb-4">
                        <input onChange={(event) => setPopularity(event.target.value)} defaultValue={movie.popularity} type="text" className="form-control" placeholder="Popularity" />
                    </div>

                    <button type="submit" className="btn btn-danger btn-block">Update</button>
                </form>
            </div>
        </>
    )
}