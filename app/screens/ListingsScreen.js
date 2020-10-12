import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'

import routes from '../components/navigation/routes'
import PatientCard from '../components/PatientCard'
import Screen from '../components/Screen'
import colors from '../config/colors'
import listingsApi from '../api/listings'
import BodyText from '../components/BodyText'
import AppButton from '../components/Button'
import useApi from '../components/hooks/useApi'



export default function ListingsScreen({navigation}) {

    const {data:listings, error, loading, reuqest:loadListings} = useApi(listingsApi.getListings)

    useEffect(()=>{
        loadListings()
    }, [])
    
    return (
        <Screen style={styles.screen}>
            {error && <>
                <BodyText>Couldn't retrieve data</BodyText>
                <AppButton title='Retry' onPress={()=>{
                    console.log("try again")
                    loadlistings
                }}/>
            </>}
            <ActivityIndicator animating={loading} />
            <FlatList
                data={listings}
                keyExtractor={listing=>listing.id.toString()}
                renderItem={({item})=>(
                    <PatientCard
                        title={item.title}
                        subTitle={"$"+item.price}
                        imageUrl={item.images[0].url}
                        onPress={()=>navigation.navigate(routes.LISTING_DETAILS,item)}
                    />
                )}
            />
        </Screen>
    )
}

const styles = StyleSheet.create({
    screen:{
        padding:20,
        backgroundColor:colors.light,
    }
})
