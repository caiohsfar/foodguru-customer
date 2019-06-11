import React, { Component } from 'react';
import { Text, View, Animated, Dimensions, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import SlidingUpPanel from 'rn-sliding-up-panel';
import NavigationService from '../../services/NavigationService';

import { Header as navigationHeader } from 'react-navigation';
import reactotron from 'reactotron-react-native';
import { Button } from 'react-native-elements';
import styles from './styles';
import Header from './Header';
import { removeFromCart, clearCart, addToCart } from '../../store/actions/MenuActions';
import ShoppingCartItem from './ShoppingCartItem';

const { height } = Dimensions.get('window');

class ShoppingCart extends Component {
  static defaultProps = {
    draggableRange: {
      top: (height - navigationHeader.HEIGHT) / 1.15,
      bottom: 65
    }
  };

  state = {
    panel: '',
  };

  _draggedValue = new Animated.Value(this.props.draggableRange.bottom);

  async componentDidMount() {
    this._draggedValue.addListener(this._onAnimatedValueChange);
  }

  componentWillUnmount() {
    this.props.clearCart();
    this._draggedValue.removeListener(this._onAnimatedValueChange);
  }

  _onAnimatedValueChange = ({ value }) => {
    const { top, bottom } = this.props.draggableRange;
    if (value === top) {
      this.setState({ panel: 'up' });
    }
    if (value === bottom) {
      this.setState({ panel: 'down' });
    }
  };

  showOrHide = () => {
    this.state.panel == 'down' ? this._panel.show() : this._panel.hide();
  };

  _onChangeCount = (value, type, product) => {
    if (type === '+') {
      this.props.addToCart(this.getConsumerItem(product));
    } else if (type === '-') {
      this.props.removeFromCart(this.getConsumerItem(product));
    }
  };

  getConsumerItem = product => ({
    ...product,
    quantity: 1,
    price: product.price / product.quantity
  });

  _renderItem = ({ item }) => {
    reactotron.log(item);
    return <ShoppingCartItem product={item} onChangeCount={this._onChangeCount} />;
  };

  handleClearCart = () => {
    this.props.clearCart();
  };

  getPosition() {
    return this.state.animatedValue;
  }

  render() {
    const { cartItemsQuantity, totalFromCart, draggableRange, shoppingCart } = this.props;

    return (
      <SlidingUpPanel
        minimumDistanceThreshold={10}
        backdropOpacity={0.3}
        ref={c => (this._panel = c)}
        draggableRange={draggableRange}
        animatedValue={this._draggedValue}
      >
        <View style={styles.panel}>
          <Header showOrHide={this.showOrHide} count={cartItemsQuantity} total={totalFromCart} />
          <FlatList
            data={shoppingCart}
            showsHorizontalScrollIndicator={false}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            ListFooterComponent={() =>
              shoppingCart.length > 0 && (
                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 40,
                    marginBottom: 40
                  }}
                >
                  <TouchableOpacity onPress={this.handleClearCart}>
                    <Text style={{ borderBottomWidth: StyleSheet.hairlineWidth, fontSize: 18, color: 'red' }}>
                      Esvaziar carrinho
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            }
          />
          <Button
            disabled={!shoppingCart.length > 0}
            buttonStyle={{ alignSelf: 'center', marginBottom: 20, backgroundColor: 'red', width: 300 }}
            titleStyle={{ fontWeight: 'bold' }}
            title="Confirmar"
            onPress={() => this.props.onShopping()}
          />
        
        </View>
      </SlidingUpPanel>
    );
  }
}
const mapStateToProps = ({ MenuReducer }) => ({
  shoppingCart: MenuReducer.shoppingCart,
  totalFromCart: MenuReducer.totalFromCart,
  cartItemsQuantity: MenuReducer.cartItemsQuantity
});

export default connect(
  mapStateToProps,
  { removeFromCart, clearCart, addToCart }
)(ShoppingCart);
