import React, { Component } from 'react';
import {
  Text, View, Animated, Dimensions, FlatList
} from 'react-native';
import { connect } from 'react-redux';
import SlidingUpPanel from 'rn-sliding-up-panel';

import styles from './styles';
import Header from './Header';
import { Header as navigationHeader } from 'react-navigation';
import { removeFromCart, clearCart, addToCart } from '../../store/actions/MenuActions';
import ShoppingCartItem from './ShoppingCartItem';
import reactotron from 'reactotron-react-native';

const { height } = Dimensions.get('window');

class ShoppingCart extends Component {
  static defaultProps = {
    draggableRange: {
      top: (height - navigationHeader.HEIGHT) / 1.10,
      bottom: 65
    }
  };

  state = {
    panel: ''
  };

  _draggedValue = new Animated.Value(this.props.draggableRange.bottom);

  componentDidMount() {
    this._draggedValue.addListener(this._onAnimatedValueChange);
  }

  componentWillUnmount() {
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
      this.props.addToCart({ ...product, quantity: 1, price: product.price / product.quantity });
    } else if (type === '-') {
      this.props.removeFromCart({...product, quantity: 1, price: product.price / product.quantity });
    }
  }

  _renderItem = ({ item }) => {
    reactotron.log(item);
    return (
      <ShoppingCartItem
        product={item}
        onChangeCount={this._onChangeCount}
      />
  )};

  render() {
    const { cartItemsQuantity, totalFromCart } = this.props;
    return (
      <SlidingUpPanel
        minimumDistanceThreshold={10}
        backdropOpacity={0.1}
        ref={c => (this._panel = c)}
        draggableRange={this.props.draggableRange}
        animatedValue={this._draggedValue}
      >
        <View style={styles.panel}>
          <Header showOrHide={this.showOrHide} count={cartItemsQuantity} total={totalFromCart} />
          <FlatList
            data={this.props.shoppingCart}
            showsHorizontalScrollIndicator={false}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
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

export default connect(mapStateToProps, { removeFromCart, clearCart, addToCart })(ShoppingCart);
