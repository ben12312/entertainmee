import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { editMovie, getMovieById, GET_MOVIES } from '../graphql/queries';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';

export default function EditMovie(props) {
    const navigation = useNavigation();
    const { id } = props.route.params
    const { loading, error, data } = useQuery(getMovieById(id))
    const movie = data.movie

    const [title, setTitle] = useState(movie.title);
    const [overview, setOverview] = useState(movie.overview);
    const [poster_path, setPoster_path] = useState(movie.poster_path);
    const [popularity, setPopularity] = useState(movie.popularity);

    const [editMovieById] = useMutation(editMovie(id, title, overview, poster_path, popularity), {
        refetchQueries: [{
            query: GET_MOVIES
        }],
        onCompleted() {
            navigation.navigate('home')
        }
    })

    if (loading) return <Text style={{ color: 'wheat', fontSize: 20 }}>Loading...</Text>
    if (error) console.log(error);

    function editButton() {
        if (title === '' || overview === '' || poster_path === '' || popularity === '') {
            return <Text style={{ color: 'wheat', fontSize: 20 }}>All input should not be empty</Text>
        }
        editMovieById()
    }

    return (
        <>
            <ScrollView style={{ padding: 30, marginTop: 50, backgroundColor: '#282c34' }}>
                <Text style={{ color: 'wheat', marginTop: 1, marginBottom: 10, fontSize: 30, marginBottom: 100 }}>Create Movie</Text>
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ color: 'wheat', fontSize: 20 }}>Title</Text>
                    <TextInput onChangeText={(event) => setTitle(event)} defaultValue={movie.title} style={{ borderColor: 'grey', borderWidth: 3, color: 'wheat' }} />
                </View>

                <View style={{ marginBottom: 20 }}>
                    <Text style={{ color: 'wheat', fontSize: 20 }}>Overview</Text>
                    <TextInput onChangeText={(event) => setOverview(event)} defaultValue={movie.overview} style={{ borderColor: 'grey', borderWidth: 3, color: 'wheat' }} />
                </View>

                <View style={{ marginBottom: 20 }}>
                    <Text style={{ color: 'wheat', fontSize: 20 }}>Poster Patch (Link)</Text>
                    <TextInput onChangeText={(event) => setPoster_path(event)} defaultValue={movie.poster_path} style={{ borderColor: 'grey', borderWidth: 3, color: 'wheat' }} />
                </View>

                <View style={{ marginBottom: 20 }}>
                    <Text style={{ color: 'wheat', fontSize: 20 }}>Popularity</Text>
                    <TextInput onChangeText={(event) => setPopularity(event)} defaultValue={movie.popularity} style={{ borderColor: 'grey', borderWidth: 3, color: 'wheat' }} />
                </View>

                <TouchableOpacity onPress={() => editButton()} style={{ backgroundColor: '#ADD8E6', padding: 10, height: 40, width: 80, marginVertical: 20 }}>
                    <Text style={{ textAlign: 'center' }}>Edit</Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    )
}