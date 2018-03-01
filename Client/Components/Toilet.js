import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Swiper from 'react-native-swiper';

const Toilet = (props) => {
  const { name, rating, unisex, stallsMen, stallsWomen, urinals, changingTable, needBuy } = props.navigation.state.params;
  return (
    <View style={styles.container}>
      <Swiper style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide1}>
          <Image
            source={require('../../toilet.jpg')}
            style={styles.image}
          />
        </View>
        <View style={styles.slide2}>
          <Image
            source={require('../../babypee.jpg')}
            style={styles.image}
          />
        </View>
      </Swiper>
      <View style={styles.amenities}>
        <Text style={styles.amenitiesText}><Text style={styles.amenity}>Rating: </Text>{rating}</Text>
        <Text style={styles.amenitiesText}><Text style={styles.amenity}>Unisex: </Text>{unisex ? 'Yes' : 'No'}</Text>
        <Text style={styles.amenitiesText}><Text style={styles.amenity}>Men's stalls: </Text>{stallsMen}</Text>
        <Text style={styles.amenitiesText}><Text style={styles.amenity}>Urinals: </Text>{urinals}</Text>
        <Text style={styles.amenitiesText}><Text style={styles.amenity}>Women's stalls: </Text>{stallsWomen}</Text>
        <Text style={styles.amenitiesText}><Text style={styles.amenity}>Changing Table: </Text>{changingTable ? 'Yes' : 'No'}</Text>
        <Text style={styles.amenitiesText}><Text style={styles.amenity}>Need to pay: </Text>{needBuy ? 'Yes' : 'No'}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flex: 1
  },
  amenity: {
    fontWeight: 'bold'
  },
  amenities: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  amenitiesText: {
    marginLeft: 10,
    fontSize: 20
  },
  image: {
    width: 400,
    height: 400
  },
  wrapper: {
    // marginTop: -65
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 400
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 400
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})

export default Toilet;