import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { MapView } from 'expo';
import firebase, {firestore} from 'firebase'

class Home extends React.Component {
  render() {
    let { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.0092;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const { navigate } = this.props.navigation;
    console.log(this.props)
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 40.7050758,
            longitude: -74.00916039999998,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          showsUserLocation={true}
        >
        {/* {
  toilets.map(toilet => {
    return (
      <MapView.Marker
        key={toilet.name}
        coordinate={toilet.latlng}
        title={toilet.name}
      >
        <MapView.Callout>
          <Text style={styles.calloutText}>{toilet.name}</Text>
          <Button title="Dirty Deets" />
        </MapView.Callout>
      </MapView.Marker>
    )
  })
} */}
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(74, 74, 74, 1)'
  },
  map: {
    flex: 1,
    width: 400,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  calloutText: {
    textAlign: 'center'
  }
});


export default Home;
