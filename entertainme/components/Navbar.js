import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Navbar() {
    const navigation = useNavigation();
    return (
        <View style={{ flexDirection: 'row', width: '65%', justifyContent: 'space-evenly', alignSelf: 'center', backgroundColor: '#282c34' }}>
            <TouchableOpacity onPress={() => { navigation.navigate('home') }} style={{ backgroundColor: '#808080', padding: 10, height: 40, width: 80, marginVertical: 10, borderRadius: 20, marginRight: 50 }}>
                <Text style={{ textAlign: 'center', color: 'wheat' }}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('create') }} style={{ backgroundColor: '#808080', padding: 10, height: 40, width: 80, marginVertical: 10, borderRadius: 20 }}>
                <Text style={{ textAlign: 'center', color: 'wheat' }}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('favorite') }} style={{ backgroundColor: '#808080', padding: 10, height: 40, width: 80, marginVertical: 10, borderRadius: 20, marginLeft: 50 }}>
                <Text style={{ textAlign: 'center', color: 'wheat' }}>Favorite</Text>
            </TouchableOpacity>
        </View>
    )
}