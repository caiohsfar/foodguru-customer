import React, { Component } from 'react';
import {
  Text, View, Button, PermissionsAndroid, StyleSheet, Alert
} from 'react-native';
import { Card } from 'react-native-elements';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from './styles';

export default class QrCodeScanner extends Component {
  state = {
    cameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    await this.requestCameraPermission();
  }

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'Permissão para acessar a camera',
        message: 'Para fazer a leitura do QrCode precisamos do acesso à sua camera',
        buttonNeutral: 'Pergunte-me depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK'
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({ cameraPermission: true });
      } else {
        this.setState({ cameraPermission: false });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  componentWillReceiveProps(nextProps) {
    // if (this.props.qrCodeError !== nextProps.qrCodeError && nextProps.qrCodeError === true) {
    //   Alert.alert('Erro', 'O código escaneado não é válido.');
    // } else {
    //   nextProps.navigation.navigate('Bill');
    // }
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    //this.props.validadeCode(data);
    alert("Ele leu, seu pau no cu do caralho", data)
  };

  componentWillUnmount() {
    this.setState({ visible: false });
  }

  render() {
    const { cameraPermission, scanned } = this.state;

    if (cameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (cameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, { flex: 1 }]}
      > 
        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
          <Card
            containerStyle={{
              alignSelf: 'center',
              opacity: 0.2,
              borderRadius: 4,
              borderColor: 'red',
              borderWidth: 1,
              width: 200,
              height: 200
            }}
          />
        </View>
        <Text style={styles.info}> Escaneie o Qr Code para confirmar o pedido!</Text>
      </BarCodeScanner>
    );
  }
}
