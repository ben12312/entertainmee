const { gql } = require('apollo-server');
const axios = require('axios');
const baseUrl = 'http://localhost:4002';

module.exports = {
    typeDefs: gql`
    
        type TvSeries {
            _id: ID
            title: String
            overview: String
            poster_path: String
            popularity: String
            tags: [String]
        }

        
        extend type Query {
            showTvSeries: [TvSeries]
            showOneTvSeries(_id: ID): TvSeries
        }

        extend type Mutation {
            createTvSeries(
                title: String,
                overview: String,
                poster_path: String,
                popularity: String,
                tags: [String]
                ): TvSeries

            editTvSeries(
                _id: ID
                title: String,
                overview: String,
                poster_path: String,
                popularity: String,
                tags: [String]
            ): TvSeries

            deleteTvSeries(_id: ID): TvSeries
        }
    `,
    resolvers: {
        Query: {
            // FIND ALL
            showTvSeries: () => {
                return axios({ method: 'GET', url: baseUrl })
                    .then(tvSerieses => {
                        return tvSerieses.data
                    })
                    .catch(err => console.log(err))
            },
            // FIND ONE
            showOneTvSeries: (parent, args, context, info) => {
                return axios({
                    method: 'GET',
                    url: baseUrl + `/${args._id}`
                })
                    .then(tvSeries => {
                        return tvSeries.data
                    })
                    .catch(err => console.log(err))
            }
        },
        Mutation: {
            // CREATE 
            createTvSeries: (_, args) => {
                let newTvSeries = {
                    title: args.title,
                    overview: args.overview,
                    poster_path: args.poster_path,
                    popularity: args.popularity,
                    tags: []
                }
                return axios({
                    method: 'POST',
                    url: baseUrl,
                    data: newTvSeries
                })
                    .then(response => {
                        return response
                    })
                    .catch(err => console.log(err))
            },
            // UPDATE
            editTvSeries: (_, args) => {
                let editedTvSeries = {
                    title: args.title,
                    overview: args.overview,
                    poster_path: args.poster_path,
                    popularity: args.popularity,
                    tags: []
                }
                axios({
                    method: 'PATCH',
                    url: baseUrl + `/${args._id}`,
                    data: editedTvSeries
                })
                    .then(response => {
                        return response
                    })
                    .catch(err => console.log(err))
            },
            // DELETE ONE
            deleteTvSeries: (_, args) => {
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
