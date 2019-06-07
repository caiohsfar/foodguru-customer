import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import Counter from '../../Counter';
// import { Container } from './styles';

export default ({ product, onChangeCount }) => (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={{ uri: product.image }} />
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.info}>{product.name}</Text>
      <Text style={styles.info}>{`R$ ${product.price.toFixed(2)}`}</Text>
    </View>
    <View style={styles.countContainer}>
      <Counter
        start={product.quantity}
        onChange={(value, type) => onChangeCount(value, type, product)}
      />
    </View>
  </View>
);
