import { gql } from '@apollo/client';

// FETCH MOVIE
export const GET_MOVIES = gql`
    query getMovies {
        movies {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`
// FIND ONE
export function getMovieById(id) {
    return gql`
        query getById {
            movie(_id: "${id}") {
                _id
                title
                overview
                poster_path
                popularity
                tags
            }
        }
    `
}
// CREATE MOVIE
export function createMovie(title, overview, poster_path, popularity) {
    return gql`
        mutation createMovie {
            createMovie(title: "${title}", overview: "${overview}", poster_path: "${poster_path}", popularity: "${popularity}" ) {
                title
            }
        }
    `
}
// EDIT MOVIE
export function editMovie(id, title, overview, poster_path, popularity) {
    return gql`
        mutation editMovie {
            editMovie(_id: "${id}", title: "${title}", overview: "${overview}", poster_path: "${poster_path}", popularity: "${popularity}" ) {                title
            }
        }
    `
}
// DELETE MOVIE
export function deleteMovie(id) {
    return gql`
        mutation deleteMovie {
            deleteMovie(_id: "${id}") {
                title
            }
        }
    `
}