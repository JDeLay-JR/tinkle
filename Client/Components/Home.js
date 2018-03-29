import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import {styles} from '../../public/stylesheets/styles_Home'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        coords: {
          latitude: 40,
          longitude: -74
        }
      },
      error: null
    };
  }

  componentDidMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') this.setState({error: 'Location Access Denied'})
   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location), location });
 };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          zoomEnabled={true}
          >

        </MapView>
      </View>
    );
  }
}

      // <MapView.Marker
      //   key={toilet.name}
      //   coordinate={toilet.latlng}
      //   title={toilet.name}
      // >
      //   <MapView.Callout>
      //     <Text style={styles.calloutText}>{toilet.name}</Text>
      //     <Button title="Dirty Deets" />
      //   </MapView.Callout>
      // </MapView.Marker>

export default Home;
