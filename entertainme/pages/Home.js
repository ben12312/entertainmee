import MovieCard from '../components/MovieCard';
import React from 'react';
import Navbar from '../components/Navbar';
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useQuery } from '@apollo/client';
import { GET_MOVIES } from '../graphql/queries';

export default function Home() {
    const { loading, error, data } = useQuery(GET_MOVIES, {
        fetchPolicy: 'cache-first'
    })

    if (loading) return <Text style={{ color: 'wheat', fontSize: 20 }}>Loading...</Text>
    if (error) console.log(error);

    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center', color: 'wheat', fontSize: 30, marginBottom: 10, marginTop: 70 }}>Movies
            </Text>
            <ScrollView contentContainerStyle={styles.scrollView, styles.scrollOuter}>
                {
                    data.movies?.map(movie => {
                        return <MovieCard key={movie._id} movie={movie} />
                    })
                }
            </ScrollView>
            <View style={{ borderTopWidth: 3, borderTopColor: 'grey' }} />
                <Navbar></Navbar>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282c34',
    },
    scrollView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',

    },
    scrollOuter: {
        width: '100%',
        alignItems: 'center'
    }
});