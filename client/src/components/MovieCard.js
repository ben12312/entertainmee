// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2'
import { deleteMovie, GET_MOVIES } from '../graphql/queries';

export default function MovieCard(props) {
    let movie = props.movie
    let id = props.movie._id
    // eslint-disable-next-line
    const [deleteMovieById, { loading, error, data }] = useMutation(deleteMovie(id), {
        refetchQueries: [{
            query: GET_MOVIES
        }]
    })

    if (loading) return <h3 style={{ color: 'wheat' }}>Loading...</h3>
    if (error) console.log(error);

    function deleteButton(id) {
        return Swal.fire({
            title: 'Do you want to delete this movie?',
            showDenyButton: true,
            confirmButtonText: `Delete`,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMovieById({
                    variables: { _id: id }
                })
                Swal.fire('Deleted!', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Okay', '', 'info')
            }
        })
    }

    return (
        <>
            <div key={movie._id} className="col-md-3">
                <img src={movie.poster_path} className="card-img-top" alt="" />
                <div className="card-body">
                    <h5 className="card-title" style={{ color: 'wheat' }}>{movie.title}</h5>
                    <p className="card-text text-muted">{movie.overview}</p>
                    <div>
                        <Link to={`/detail/${movie._id}`} style={{ textAlign: "center", marginLeft: '1cm' }} type="button" className="btn btn-danger btn-sm">Detail</Link>
                        <button onClick={() => { deleteButton(movie._id) }} style={{ textAlign: "center", marginLeft: '1cm' }} className="btn btn-danger btn-sm">Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}