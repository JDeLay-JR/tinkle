import React from 'react';
import { StyleSheet, Text, ScrollView, View, Image, Dimensions } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

const Toilet = (props) => {
  const { name, rating, unisex, stallsMen, stallsWomen, urinals, changingTable, needBuy } = props.navigation.state.params;
  return (
    <View style={styles.container}>
      <View height={height / 2}>
        <Swiper style={styles.wrapper}>
          <View style={styles.slide}>
            <Image
              source={require('../../toilet.jpg')}
              style={styles.image}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../../babypee.jpg')}
              style={styles.image}
            />
          </View>
        </Swiper>
      </View>
      <View style={styles.amenities}>
        <View style={styles.headerContainer}>
          <Text style={styles.bathroomHeader}>{name}</Text>
          <Text style={styles.amenitiesText}><Text style={styles.amenity}>Rating: </Text>{rating}</Text>
        </View>
        <View style={styles.amenitiesContainer}>
          <View style={styles.amenitiesColumn}>
            <Text style={styles.amenitiesText}><Text style={styles.amenity}>Unisex: </Text>{unisex ? 'Yes' : 'No'}</Text>
            <Text style={styles.amenitiesText}><Text style={styles.amenity}>Men's stalls: </Text>{stallsMen}</Text>
            <Text style={styles.amenitiesText}><Text style={styles.amenity}>Urinals: </Text>{urinals}</Text>
          </View>
          <View style={styles.amenitiesColumn}>
            <Text style={styles.amenitiesText}><Text style={styles.amenity}>Women's stalls: </Text>{stallsWomen}</Text>
            <Text style={styles.amenitiesText}><Text style={styles.amenity}>Changing Table: </Text>{changingTable ? 'Yes' : 'No'}</Text>
            <Text style={styles.amenitiesText}><Text style={styles.amenity}>Need to pay: </Text>{needBuy ? 'Yes' : 'No'}</Text>
          </View>
        </View>
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
  headerContainer: {
    alignItems: 'center',
    marginBottom: 10
  },
  amenitiesContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  amenity: {
    fontWeight: 'bold'
  },
  amenities: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 10
  },
  amenitiesText: {
    marginLeft: 10,
    fontSize: 20
  },
  amenitiesColumn: {
    width: 150
  },
  bathroomHeader: {
    fontSize: 40
  },
  image: {
    height: height / 2,
    width: 400
  },
  wrapper: {
  },
  slide1: {
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