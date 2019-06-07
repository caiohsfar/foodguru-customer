import React from 'react';
import { Icon, Badge } from 'react-native-elements';
// import { Container } from './styles';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

export default ({ showOrHide, count, total }) => (
  <TouchableOpacity style={styles.panelHeader} onPress={showOrHide}>
    <View style={styles.containerCount}>
      <Icon name="shopping-cart" size={20} color="#fff" containerStyle={{ marginRight: 10 }} />
      <Badge
        value={<Text style={{ color: '#fff', fontWeight: 'bold' }}>{count}</Text>}
        badgeStyle={{ backgroundColor: '#b30000', borderColor: '#b30000' }}
      />
    </View>
    <View style={styles.containerShow}>
      <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>Carrinho</Text>
    </View>
    <View style={styles.containerPrice}>
      <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>
R$
        {total.toFixed(2)}
      </Text>
    </View>
  </TouchableOpacity>
);
