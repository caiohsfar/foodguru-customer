import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { LoginManager } from 'react-native-fbsdk';
// import styles from './styles';
import {
  ScrollView, View, Text, StyleSheet, Dimensions, TouchableOpacity
} from 'react-native';
import MapView from 'react-native-maps';
import api from '../../services/api';
import { getIdToken } from '../../services/userService';
import { getMinDistanceMarker } from '../../services/geoLocationService';
import reactotron from 'reactotron-react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      places: [
        {
          id: 20,
          name: 'San Botequim',
          email: 'sanbotequim@gmail.com',
          cep: '50761320',
          street: 'Rua Comendador José Vita',
          state: 'Pernambuco',
          neighborhood: 'San Martin',
          cnpj: '12261658000136',
          city: 'Recife',
          number: '384',
          password: '123456',
          latitude: -8.068914,
          longitude: -34.927495
        }
      ],
    };
  }


  findPlaces = async () => {
    const token = await getIdToken();
    api.defaults.headers.common['x-access-token'] = token;
    try {
      const { data } = await api.get('/establishments');
      this.setState({ places: [...this.state.places, ...data] });
    } catch (e) {
      alert(e);
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        reactotron.log({ latitude, longitude });
        this.setState({ latitude, longitude });
        this.findPlaces();
      },
      (error) => { console.log(error); },
      { enableHighAccuracy: true, timeout: 30000 }
    );
  }

  _mapReady = () => {
    this.state.places[0].mark.showCallout();
    // this.state.places[0].mark.showCallout();
  };

  render() {
    const { latitude, longitude } = this.state.places[0];
    return (
      <View style={styles.container}>
        <MapView
          ref={map => (this.mapView = map)}
          showsUserLocation
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0015,
            longitudeDelta: 0.0121
          }}
          style={styles.mapView}
          showsPointsOfInterest={false}
          showBuildings={false}
          onMapReady={this._mapReady}
        >
          {this.state.places.map(place => (
            <MapView.Marker
              ref={mark => (place.mark = mark)}
              title={place.name}
              description={place.street}
              key={place.id}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude
              }}
            />
          ))}
        </MapView>
        <ScrollView
          style={styles.placesContainer}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const place = e.nativeEvent.contentOffset.x > 0
              ? e.nativeEvent.contentOffset.x / Dimensions.get('window').width
              : 0;

            const { latitude, longitude, mark } = this.state.places[place];

            this.mapView.animateToCoordinate(
              {
                latitude,
                longitude
              },
              500
            );

            setTimeout(() => {
              mark.showCallout();
            }, 500);
          }}
        >
          {this.state.places.map(place => (
            <View key={place.id} style={styles.place}>
              <Text style={styles.title}>{place.name}</Text>
              <Text style={styles.description}>{place.neighborhood}</Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu', { idEstabelecimento: place.id })} style={styles.buttonMenu}>
                <View style={styles.menu}>
                  <Text style={styles.menuFont}>Cardápio</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },

  mapView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  placesContainer: {
    width: '100%',
    maxHeight: 150
  },
  place: {
    width: width - 40,
    maxHeight: 150,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: 'transparent'
  },
  description: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginTop: 5
  },
  buttonMenu: {
    marginTop: 10
  },
  menu: {
    width: width - 80,
    height: 30,
    backgroundColor: '#cd170c',
    borderRadius: 3
  },
  menuFont: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff'
  }
});
