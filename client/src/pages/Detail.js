import { useQuery } from '@apollo/client';
import { getMovieById } from '../graphql/queries';
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, useParams, useHistory } from "react-router-dom";

export default function DetailMovie() {
    const history = useHistory();
    const { id } = useParams();

    const { loading, error, data } = useQuery(getMovieById(id))

    if (loading) return <h3 style={{ color: 'wheat' }}>Loading...</h3>
    if (error) console.log(error);

    const movie = data.movie

    function AddToFavorite() {

    }

    function editMovie() {
        history.push(`/edit-movie/${movie._id}`)
    }

    return (
        <>
            <div className="container">
                <h1 className="my-4" style={{ color: 'wheat' }}>{movie.title}</h1>
            </div>
            <div className="row" style={{ marginBottom: '1cm', marginRight: '4cm' }}>

                <div className="col-md-8">
                    <img src={movie.poster_path} style={{ width: '500px', height: '550px' }} className="card-img-top" alt="" />
                </div>

                <div className="col-md-4">
                    <h3 className="my-3" style={{ color: 'wheat' }}>{movie.tagline}</h3>
                    <h4 style={{ color: '#FA8072' }}>Description :</h4>
                    <h5 className="card-text text-muted">{movie.overview}</h5>
                    <h3 style={{ color: '#FA8072' }} className="my-3">Tags :</h3>
                    <ul>
                        {
                            movie.tags?.map(tag => {
                                return <li key={tag.id} className="card-text text-muted">{tag.name}</li>
                            })
                        }
                    </ul>
                    <button onClick={() => AddToFavorite()} className="btn btn-danger" style={{ marginTop: "7cm" }}>Add to Favorite</button><br></br><br></br>
                    <button onClick={() => editMovie()} className="btn btn-danger">Edit</button>
                </div>
                <h3 className="my-4" style={{ color: 'wheat' }}>Popularity : {movie.popularity}</h3>
            </div>
        </>
    )
}