import { useQuery } from '@apollo/client';
import { getMovieById } from '../graphql/queries';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Navbar from '../components/Navbar';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { favoriteVar } from '../graphql/vars';

export default function DetailMovie(props) {
    const navigation = useNavigation();
    const id = props.route.params.id

    const { loading, error, data } = useQuery(getMovieById(id))

    if (loading) return <Text style={{ color: 'wheat', fontSize: 20 }}>Loading...</Text>
    if (error) console.log(error);

    const movie = data.movie

    function AddToFavorite(movie) {
        const favorite = favoriteVar();
        const newFavoriteVar = [...favorite, movie]
        favoriteVar(newFavoriteVar)
        navigation.navigate('favorite')
    }

    function editMovie(id) {
        navigation.navigate('edit', { id: id })
    }

    return (
        <>
            <ScrollView style={{ backgroundColor: '#282c34' }}>
                <Text style={{ textAlign: 'center', color: 'wheat', fontSize: 40, marginTop: 70 }}>Detail</Text>
                <View>
                    <Text style={{ color: 'wheat', fontSize: 25, marginLeft: 10 }}>{movie.title}</Text>
                </View>
                <View style={{ marginBottom: 1, marginRight: 4 }}>

                    <View>
                        <Image source={{ uri: movie.poster_path }} style={{ width: 400, height: 400 }} />
                    </View>

                    <View style={{ padding: 7 }}>
                        <Text style={{ color: '#FA8072', fontSize: 20 }}>Description :</Text>
                        <Text style={{ color: 'wheat' }}>{movie.overview}</Text>
                        <Text style={{ color: '#FA8072', fontSize: 20 }} >Tags :</Text>
                        <Text style={{ color: 'wheat', marginTop: 20 }}>Popularity : {movie.popularity}
                            {
                                movie.tags?.map(tag => {
                                    return <Text style={{ color: 'wheat' }}>{tag.title}</Text>
                                })
                            }
                        </Text>
                        <View style={{ flexDirection: 'row', width: '65%', justifyContent: 'space-evenly', alignSelf: 'center' }}>
                            <TouchableOpacity onPress={() => { editMovie(movie._id) }} style={{ backgroundColor: '#ADD8E6', padding: 10, height: 40, width: 80, marginVertical: 20, borderRadius: 20 }}>
                                <Text style={{ textAlign: 'center' }}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { AddToFavorite(movie) }} style={{ backgroundColor: '#A52A2A', padding: 10, height: 40, width: 80, marginVertical: 20, borderRadius: 20 }}>
                                <Text style={{ textAlign: 'center', color: 'wheat' }}>Favorite</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ borderTopWidth: 3, borderTopColor: 'grey' }} />
                <Navbar></Navbar>
            </ScrollView>
        </>
    )
}