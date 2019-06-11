import React from 'react';
import {
  View, Image, Text, Dimensions
} from 'react-native';
import { Overlay, Button } from 'react-native-elements';
// import { Container } from './styles';
import Counter from '../../components/Counter';
import styles from './styles';

export default class ModalMenu extends React.Component {
  state = {
    counter: 1
  };

  _onChangeCounter = (value, type) => {
    this.setState({ counter: value });
    this.props.onChangeCounter(value);
  };

  render() {
    const {
      isVisible, product, handlePress, setVisible
    } = this.props;

    return (
      <Overlay
        borderRadius={4}
        animated
        animationType='fade'
        isVisible={isVisible}
        windowBackgroundColor="rgba(166, 166, 166, .5)"
        overlayBackgroundColor="#fff"
        onBackdropPress={() => setVisible(false, null)}
        height={180}
        width={Dimensions.get('window').width - 30}
      >
        <View style={styles.modalContentContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: product.image }} />
          </View>
          <View style={styles.modalProductInfoContainer}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>
        </View>
        <View style={styles.modalFooter}>
          <Counter start={1} onChange={this._onChangeCounter} ref={e => (this.counter = e)} />

          <Button
            disabled={this.state.counter === 0}
            titleStyle={{ color: 'red' }}
            buttonStyle={{ borderColor: 'red' }}
            type="outline"
            title={`Adicionar   R$ ${product.price * this.state.counter}`}
            onPress={() => handlePress(product)}
          />
        </View>
      </Overlay>
    );
  }
}
