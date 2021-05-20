import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { createMovie, GET_MOVIES } from '../graphql/queries';
import Swal from 'sweetalert2'

export default function AddMovie() {
    const [title, setTitle] = useState('');
    const [overview, setOverview] = useState('');
    const [poster_path, setPoster_path] = useState('');
    const [popularity, setPopularity] = useState('');
    let history = useHistory();

    const [addMovie, { loading, error }] = useMutation(createMovie(title, overview, poster_path, popularity), {
        refetchQueries: [{
            query: GET_MOVIES
        }]
    })

    if (loading) return <h3 style={{ color: 'wheat' }}>Loading...</h3>
    if (error) console.log(error);

    function createButton(event) {
        event.preventDefault();
        if (title === '' || overview === '' || poster_path === '' || popularity === '') {
            return Swal.fire({
                title: 'Error!',
                text: 'All data can not be blank',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
        addMovie()
        history.push("/")
    }

    return (
        <>
            <div className="container">
                <h1 style={{ color: 'wheat', marginTop: '1cm', marginBottom: '1cm' }}>Create Movie</h1>
                <form style={{ color: 'wheat' }} onSubmit={(event) => createButton(event)}>
                    <div className="form-outline mb-4">
                        <input onChange={(event) => setTitle(event.target.value)} type="text" className="form-control" placeholder="Title" />
                    </div>

                    <div className="form-outline mb-4">
                        <input onChange={(event) => setOverview(event.target.value)} type="text" className="form-control" placeholder="Overview" />
                    </div>

                    <div className="form-outline mb-4">
                        <input onChange={(event) => setPoster_path(event.target.value)} type="text" className="form-control" placeholder="Poster Patch (Link)" />
                    </div>

                    <div className="form-outline mb-4">
                        <input onChange={(event) => setPopularity(event.target.value)} type="text" className="form-control" placeholder="Popularity" />
                    </div>

                    <button type="submit" className="btn btn-danger btn-block">Create</button>
                </form>
            </div>
        </>
    )
}