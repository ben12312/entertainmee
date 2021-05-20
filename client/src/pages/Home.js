import MovieCard from '../components/MovieCard';
import { useQuery } from '@apollo/client';
import { GET_MOVIES } from '../graphql/queries';

export default function Home() {
    const { loading, error, data } = useQuery(GET_MOVIES, {
        fetchPolicy: 'cache-first'
    })

    if (loading) return <h3 style={{ color: 'wheat' }}>Loading...</h3>
    if (error) console.log(error);

    return (
        <>
            <div className="container">
                <div className="col-md-8 offset-md-2">
                    <h1 className="text-center" style={{ color: 'wheat', marginTop: '1cm', marginBottom: '1cm' }}>Movies</h1>
                </div>

                <div className="row bg-faded">
                    {
                        data.movies?.map(movie => {
                            return <MovieCard key={movie.id} movie={movie} />
                        })
                    }
                </div>
            </div>
        </>
    )
}