import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useMutation } from '@apollo/client';
import { createMovie, GET_MOVIES } from '../graphql/queries';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';

export default function AddMovie({ navigation }) {
    const [title, setTitle] = useState('');
    const [overview, setOverview] = useState('');
    const [poster_path, setPoster_path] = useState('');
    const [popularity, setPopularity] = useState('');

    const [addMovie, { loading, error }] = useMutation(createMovie(title, overview, poster_path, popularity), {
        refetchQueries: [{
            query: GET_MOVIES
        }],
        onCompleted() {
            navigation.navigate('home')
        }
    })

    if (loading) return <Text style={{ color: 'wheat', fontSize: 20 }}>Loading...</Text>
    if (error) console.log(error);

    function createButton() {
        if (title === '' || overview === '' || poster_path === '' || popularity === '') {
            return <Text style={{ color: 'wheat', fontSize: 20 }}>Loading...</Text>
        }
        addMovie()
    }

    return (
        <>
            <ScrollView style={{ padding: 30, marginTop: 50, backgroundColor: '#282c34' }}>
                <Text style={{ color: 'wheat', marginTop: 1, marginBottom: 10, fontSize: 30 }}>Create Movie</Text>

                <View>
                    <Text style={{ color: 'wheat', fontSize: 20 }}>Title</Text>
                    <TextInput onChangeText={(event) => setTitle(event)} style={{ borderColor: 'grey', borderWidth: 3, color: 'wheat' }} />
                </View>

                <View>
                    <Text style={{ color: 'wheat', fontSize: 20 }}>Overview</Text>
                    <TextInput onChangeText={(event) => setOverview(event)} style={{ borderColor: 'grey', borderWidth: 3, color: 'wheat' }} />
                </View>

                <View>
                    <Text style={{ color: 'wheat', fontSize: 20 }}>Poster Patch (Link)</Text>
                    <TextInput onChangeText={(event) => setPoster_path(event)} style={{ borderColor: 'grey', borderWidth: 3, color: 'wheat' }} />
                </View>

                <View>
                    <Text style={{ color: 'wheat', fontSize: 20 }}>Popularity</Text>
                    <TextInput onChangeText={(event) => setPopularity(event)} style={{ borderColor: 'grey', borderWidth: 3, color: 'wheat' }} />
                </View>

                <TouchableOpacity onPress={() => createButton()} style={{ backgroundColor: '#ADD8E6', padding: 10, height: 40, width: 80, marginVertical: 20 }}>
                    <Text style={{ textAlign: 'center' }}>Create</Text>
                </TouchableOpacity>
            </ScrollView>
            <View style={{ backgroundColor: '#282c34' }}>
                <Navbar></Navbar>
            </View>
        </>
    )
}