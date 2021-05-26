import { useMutation, useReactiveVar } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { deleteMovie, GET_MOVIES } from '../graphql/queries';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { favoriteVar } from '../graphql/vars';

export default function MovieCard(props) {
    const navigation = useNavigation();
    let movie = props.movie
    let id = props.movie._id

    const [deleteMovieById, { loading, error, data }] = useMutation(deleteMovie(id), {
        refetchQueries: [{
            query: GET_MOVIES
        }],
        onCompleted() {
            navigation.navigate('home')
        }
    })

    if (loading) return <Text style={{ color: 'wheat', fontSize: 20 }}>Loading...</Text>
    if (error) console.log(error);

    function deleteButton(id) {
        return deleteMovieById({
            variables: { _id: id }
        })
    }

    function detailButton(id) {
        navigation.navigate('detail', { id: id })
    }

    function favoriteButton(movie) {
        const favorite = favoriteVar();
        const newFavoriteVar = [...favorite, movie]
        favoriteVar(newFavoriteVar)
        navigation.navigate('favorite')
    }

    return (
        <>
            <Text style={{ color: 'wheat', fontSize: 20, marginBottom: 4 }}>{movie.title}</Text>
            <Image source={{ uri: movie.poster_path }} style={{ width: 300, height: 200 }} />

            <View style={{ flexDirection: 'row', width: '65%', justifyContent: 'space-evenly' }}>
                <TouchableOpacity onPress={() => { detailButton(movie._id) }} style={{ backgroundColor: '#ADD8E6', padding: 10, height: 40, width: 80, marginVertical: 20, borderRadius: 20 }}>
                    <Text style={{ textAlign: 'center' }}>Detail</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { favoriteButton(movie) }} style={{ backgroundColor: '#A52A2A', padding: 10, height: 40, width: 80, marginVertical: 20, borderRadius: 20 }}>
                    <Text style={{ textAlign: 'center', color: 'wheat' }}>Favorite</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { deleteButton(movie._id) }} style={{ backgroundColor: '#A52A2A', padding: 10, height: 40, width: 80, marginVertical: 20, borderRadius: 20 }}>
                    <Text style={{ textAlign: 'center', color: 'black' }}>Delete</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}