const { gql } = require('apollo-server');
const axios = require('axios');
const baseUrl = 'http://localhost:4001';

module.exports = {
    typeDefs: gql`
    
        type Movie {
            _id: ID
            title: String
            overview: String
            poster_path: String
            popularity: String
            tags: [String]
        }

        
        extend type Query {
            movies: [Movie]
            movie(_id: ID): Movie
        }

        extend type Mutation {
            createMovie(
                title: String,
                overview: String,
                poster_path: String,
                popularity: String,
                tags: [String]
                ): Movie

            editMovie(
                _id: ID
                title: String,
                overview: String,
                poster_path: String,
                popularity: String,
                tags: [String]
            ): Movie

            deleteMovie(_id: ID): Movie
        }
    `,
    resolvers: {
        Query: {
            // FIND ALL
            movies: () => {
                return axios({ method: 'GET', url: baseUrl })
                    .then(movies => {
                        return movies.data
                    })
                    .catch(err => console.log(err))
            },
            // FIND ONE
            movie: (parent, args, context, info) => {
                return axios({
                    method: 'GET',
                    url: baseUrl + `/${args._id}`
                })
                    .then(movie => {
                        return movie.data
                    })
                    .catch(err => console.log(err))
            }
        },
        Mutation: {
            // CREATE MOVIE
            createMovie: (_, args) => {
                let newMovie = {
                    title: args.title,
                    overview: args.overview,
                    poster_path: args.poster_path,
                    popularity: args.popularity,
                    tags: []
                }
                return axios({
                    method: 'POST',
                    url: baseUrl,
                    data: newMovie
                })
                    .then(response => {
                        return response
                    })
                    .catch(err => console.log(err))
            },
            // UPDATE MOVIE
            editMovie: (_, args) => {
                let editedMovie = {
                    title: args.title,
                    overview: args.overview,
                    poster_path: args.poster_path,
                    popularity: args.popularity,
                    tags: []
                }
                axios({
                    method: 'PATCH',
                    url: baseUrl + `/${args._id}`,
                    data: editedMovie
                })
                    .then(response => {
                        return response
                    })
                    .catch(err => console.log(err))
            },
            // DELETE ONE
            deleteMovie: (_, args) => {
                return axios({
                    method: 'DELETE',
                    url: baseUrl + `/${args._id}`
                })
                    .then(response => {
                        return response
                    })
                    .catch(err => console.log(err))
            }
        }
    }
}
