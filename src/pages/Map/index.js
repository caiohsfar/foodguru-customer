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

export default class Map extends Component {
  state = {
    minDistancePlace: null,
    currentPosition: {
      latitude: null,
      longitude: null
    },
    places: [
      {
        id: 150,
        title: 'Yoki Galetos',
        description: 'Torrões',
        latitude: -8.062283,
        longitude: -34.932594
      }
    ],
    // places: [

    //   {
    //     id: 2,
    //     title: 'Arena Camarão',
    //     description: 'Cordeiro',
    //     latitude: -8.060282,
    //     longitude: -34.928128
    //   },
    //   {
    //     id: 3,
    //     title: 'Coni Móvel Temakeria',
    //     description: 'Soledade',
    //     latitude: -8.056676,
    //     longitude: -34.892925
    //   },
    //   {
    //     id: 4,
    //     title: 'Cachacaria Tradição',
    //     description: 'Graças',
    //     latitude: -8.044604,
    //     longitude: -34.898989
    //   }
    // ]
  };

  /* requestExemplo = async () => {
    const token = await getIdToken();
    // Tem sempre que setar esse token pra validar a requisição
    api.defaults.headers.common['x-access-token'] = token;
    try {
      const response = await api.get('/establishments');
      this.setState({places:response.data}),
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }; */
  componentDidMount() {
    // eslint-disable-next-line no-undef
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.setState({ currentPosition: { latitude, longitude } });
        this.findPlaces();
      },
      (error) => { console.log(error); },
      { enableHighAccuracy: true, timeout: 30000 }
    );
  }

  findPlaces = async () => {
    const token = await getIdToken();
    api.defaults.headers.common['x-access-token'] = token;
    try {
      const { data } = await api.get('/establishments');
      this.setState({ places: [...this.state.places, ...data] });
      const minDistancePlace = getMinDistanceMarker(
        this.state.currentPosition,
        this.state.places
      );
      this.setState({ minDistancePlace });
    } catch (e) {
      alert(e);
    }
  }

  _mapReady = () => {
    this.state.places[0].mark.showCallout();
    // this.state.places[0].mark.showCallout();

  };


  render() {
    console.ignoredYellowBox = true;
    const { latitude, longitude } = this.state.places[0];
    // const  {latitude, longitude} = this.state;

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
              <Text style={styles.description}>{place.description}</Text>
              <TouchableOpacity onPress={this.props.Cardapio} style={styles.buttonMenu}>
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
    // flex: 0.5,
    // flexDirection: 'row',
    width: width - 80,
    height: 30,
    // paddingVertical: 20,
    // padding: 20,
    backgroundColor: '#cd170c',
    borderRadius: 3
  },
  menuFont: {
    textAlign: 'center',
    // padding: 20,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff'
  }
});
