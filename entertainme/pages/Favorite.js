import { Text, View, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useReactiveVar } from '@apollo/client';
import { favoriteVar } from '../graphql/vars';

export default function Favorite() {
    const navigation = useNavigation();
    const favorites = useReactiveVar(favoriteVar)

    if (favorites.length == 0) {
        return (
            <>
                <ScrollView style={styles.container}>
                    <Text style={{ textAlign: 'center', color: 'wheat', fontSize: 30, marginBottom: 10, marginTop: 70 }}>My Favorites</Text>
                    <Text style={{ textAlign: 'center', color: 'wheat', fontSize: 25, marginBottom: 10, marginTop: 70 }}>There is no Favorites Added</Text>
                </ScrollView>
                <View style={{ backgroundColor: '#282c34' }}>
                    <Navbar></Navbar>
                </View>
            </>
        )
    }

    function deleteFavorite(id) {
        const newFavorite = favorites.filter(fav => fav._id !== id)
        favoriteVar(newFavorite)
    }

    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center', color: 'wheat', fontSize: 30, marginBottom: 10, marginTop: 70 }}>My Favorites</Text>
            <ScrollView contentContainerStyle={styles.scrollView, styles.scrollOuter}>
                {
                    favorites?.map(movie => {
                        return (
                            <View key={movie._id}>
                                <Text style={{ color: 'wheat', fontSize: 20, marginBottom: 4 }}>{movie.title}</Text>
                                <Image source={{ uri: movie.poster_path }} style={{ width: 300, height: 200 }} />

                                <View style={{ flexDirection: 'row', width: '65%', justifyContent: 'space-evenly', alignSelf: 'center' }}>
                                    <TouchableOpacity onPress={() => { deleteFavorite(movie._id) }} style={{ backgroundColor: '#A52A2A', padding: 10, height: 40, width: 80, marginVertical: 20 }}>
                                        <Text style={{ textAlign: 'center' }}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
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