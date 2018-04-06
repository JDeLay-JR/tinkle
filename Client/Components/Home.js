import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { MapView, Location, Permissions, Marker } from 'expo';
import axios from 'axios'
import {IP} from '../../secrets'
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
      error: null,
      bathrooms : []
    };
  }

  async componentDidMount() {
    await this._getLocationAsync();
    axios.post(`http://${IP}/getBathrooms`, this.state.location.coords)
    .then(res => this.setState({bathrooms: res.data}))
  }

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') this.setState({error: 'Location Access Denied'})
   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location), location });
 };

  render() {
    const {bathrooms} = this.state
    console.log(bathrooms)
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          zoomEnabled={true}
          >
          {
            bathrooms.map(bathroom => {
        return (
              <MapView.Marker
              key = {bathroom.id}
              coordinate={{
                latitude: bathroom.coords.lat,
                longitude: bathroom.coords.lng,
              }}
              title={bathroom.name}
              />
              )
            })
          }

        </MapView>
      </View>
    );
  }
}

export default Home;
