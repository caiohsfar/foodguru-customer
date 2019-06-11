import React, { Component } from 'react';
import {
  Image, View, Text, TouchableOpacity, PermissionsAndroid, ActivityIndicator
} from 'react-native';
import {
  Card, CardItem, Left, Right
} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import reactotron from 'reactotron-react-native';
import styles from './styles';

import {
  fetchCategories,
  fetchProducts,
  clearProducts,
  clearCategories,
  addToCart,
  removeFromCart,
  clearCart
} from '../../store/actions/MenuActions';
import ShoppingCart from '../../components/ShoppingCart';
import Modal from './Modal';

class Menu extends Component {
  state={
    isHover: false,
    active: null,
    counter: 1,
    isModalVisible: false,
    selectedProduct: null
  }

  onChangeCounter = (number) => {
    this.setState({ counter: number });
  }

  handleModalPress = (product) => {
    this.setModalVisible(false);
    this.props.addToCart({
      ...product,
      quantity: this.state.counter,
      price: this.state.counter * product.price
    });
  }

  setModalVisible = (status, product) => {
    if (status) {
      this.setState({ selectedProduct: product });
    }
    this.setState({ isModalVisible: status });
    this.setState({ counter: 1 });
  }

  componentWillUnmount = () => {
    this.props.clearProducts();
    this.props.clearCategories();
  }

  componentDidMount = async () => {
    const idEstabelecimento = this.props.navigation.getParam('idEstabelecimento', null);
    this.props.fetchCategories(idEstabelecimento);
    await this.requestReadPermission();
  }

  // ATÉ A FUNCIONALIDADE DE UPLOAD ESTIVER PRONTA
  requestReadPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Food Guru!',
          message:
            'Precisamos do acesso à sua galeria para uma melhor experiência ',
          buttonNeutral: 'Pergunte-me depois',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //   console.log('You can use the camera');
      // } else {
      //   console.log('Camera permission denied');
      // }
    } catch (err) {
      console.warn(err);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { categoryList } = nextProps;
    if (this.props.categoryList !== categoryList && categoryList.length > 0) {
      this.setState({ active: categoryList[0] });
      this.props.fetchProducts(categoryList[0].id);
    }
  }

  handlePlusPress= () => {
    this.setState({ isHover: true });
  }

  handleConfimShopping = () => {
    this.props.navigation.navigate('QrCodeScanner');
  }

  handleTab = (tab) => {
    this.props.fetchProducts(tab.id);
    this.setState({ active: tab });
  }

  renderTab(tab) {
    const { active } = this.state;
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={tab.id}
        onPress={() => this.handleTab(tab)}
        style={[
          styles.tab,
          isActive ? styles.active : null
        ]}
      >
        <Text style={styles.text}>
          {tab.name}
        </Text>
      </TouchableOpacity>
    );
  }

  renderList = () => {
    // TODO: ajeitar o fluxo de loading dos products;
    const {
      productList,
      fetchProductsLoadState,
      fetchCategoriesLoadState,
      fetchProductsError,
      fetchCategoriesError,
      categoryList
    } = this.props;

    if (fetchProductsLoadState) {
      return <ActivityIndicator />;
    }
    if (fetchCategoriesLoadState) {
      return <ActivityIndicator />;
    }
    if (fetchProductsError) {
      return (
        <Text>  ERRO AO CARREGAR PRODUTOS </Text>
      );
    }
    if (categoryList.length === 0 && !fetchCategoriesLoadState && !fetchCategoriesError) {
      return <Text>SEM CATEGORIAS</Text>;
    }
    if (productList.length === 0 && !fetchProductsLoadState && !fetchProductsError) {
      return <Text>SEM PRODUTOS</Text>;
    }

    return (
      productList.map(product => (
        <TouchableOpacity key={product.name}>
          <Card>
            <CardItem button onPress={() => this.setModalVisible(true, product)}>
              <Left>
                <Image
                  source={{ uri: product.image }}
                  style={styles.imageCard}
                />
                <View style={{ top: -2 }}>
                  <Text style={styles.textCardLeft}>{product.name}</Text>
                  <Text style={styles.textStuff}>{product.description}</Text>
                </View>
              </Left>
              <Right style={{ paddingTop: 10, marginLeft: 10 }}>
                <View>
                  <Text style={styles.textCardRight}>
                    R$
                    {' '}
                    {product.price.toFixed(2)}
                  </Text>

                </View>
              </Right>
            </CardItem>
          </Card>
        </TouchableOpacity>
      ))
    );
  }

  render() {
    // categoryList
    return (
      <View style={{ flex: 1 }}>
        { this.state.isModalVisible
          && (
            <Modal
              product={this.state.selectedProduct}
              isVisible={this.state.isModalVisible}
              handlePress={this.handleModalPress}
              setVisible={this.setModalVisible}
              onChangeCounter={this.onChangeCounter}
            />
          )

        }
        <View style={{ flex: 1 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            row
            style={styles.tabs}
          >
            {this.props.categoryList.map(tab => this.renderTab(tab))}
          </ScrollView>
        </View>
        {/* <Header title='Cardápio'/> */}
        <View style={{ flex: 6 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ paddingVertical: 10, marginBottom: 50, flex: 1 }}
          >
            <View flex={0} row space="between" style={styles.categories}>
              {this.renderList()}
            </View>
          </ScrollView>
        </View>
        <ShoppingCart onShopping={this.handleConfimShopping} />
      </View>
    );
  }
}

const mapStateToProps = ({ MenuReducer }) => ({
  productList: MenuReducer.productList,
  categoryList: MenuReducer.categoryList,
  isLoadingFetchingCategories: MenuReducer.isLoadingFetchingCategories,
  isLoadingFetchingProducts: MenuReducer.isLoadingFetchingProducts,
  fetchCategoriesLoadState: MenuReducer.fetchCategoriesLoadState,
  fetchProductsLoadState: MenuReducer.fetchProductsLoadState

});

export default connect(mapStateToProps, {
  fetchCategories,
  fetchProducts,
  clearProducts,
  clearCategories,
  addToCart,
  clearCart,
  removeFromCart
})(Menu);
