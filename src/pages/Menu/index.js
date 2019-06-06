import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import { Card, CardItem, Left, Right, Button } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';
import Header from './header';

export default class Menu extends Component {
  state={
    isHover: false,
    active: 'Geral',
    categories:[
      { id: 1,
        image: require('../../assets/img/react.png'),
        name: 'Gayzão Sacana',
        ingredientes: 'Pão bola, hamburguer, ovo, bacon, presunto, queijo, alface, tomate, cebola, batata palha',
        tags: ['Geral', 'Massas'],
        count: 22.50
      },
      { id: 2,
        image: require('../../assets/img/react.png'),
        name: 'Pega na Macaxeira',
        ingredientes: 'Pão bola, carne de 150gm, mussarela, cebola caramelizada, salada e molho especial.',
        tags: ['Geral', 'Massas'],
        count: 150.32
      },
      { id: 3,
        image: require('../../assets/img/react.png'),
        name: 'Rouba dinheiro da Igreja',
        ingredientes: '2 carnes artesanais 150 gramas, 2 mussarela, 2 x- cheddar, salada, molho especial da casa e cebola no shoyo.',
        tags: ['Geral', 'Massas'],
        count: 150.32
      },
      { id: 4,
        image: require('../../assets/img/react.png'),
        name: 'Caio Roludo',
        ingredientes: 'Pão bola, hamburguer, ovo, bacon, presunto, queijo, alface, tomate, cebola, batata palha',
        tags: ['Geral', 'Carnes'],
        count: 150.32
      },
      { id: 5,
        image: require('../../assets/img/react.png'),
        name: 'Anderson, o lindo',
        ingredientes: 'Pão bola, carne de 150gm, mussarela, cebola caramelizada, salada e molho especial.',
        tags: ['Geral', 'Carnes'],
        count: 150.32
      }
      ,
      { id: 6,
        image: require('../../assets/img/react.png'),
        name: 'Teste 1',
        ingredientes: '2 carnes artesanais 150 gramas, 2 mussarela, 2 x- cheddar, salada, molho especial da casa e cebola no shoyo.',
        tags: ['Geral', 'Bebidas'],
        count: 150.32
      },
      { id: 7,
        image: require('../../assets/img/react.png'),
        name: 'Teste 2',
        ingredientes: '2 carnes artesanais 150 gramas, 2 mussarela, 2 x- cheddar, salada, molho especial da casa e cebola no shoyo.',
        tags: ['Geral', 'Bebidas'],
        count: 150.32
      },
      { id: 8,
        image: require('../../assets/img/react.png'),
        name: 'Teste 3',
        ingredientes: '2 carnes artesanais 150 gramas, 2 mussarela, 2 x- cheddar, salada, molho especial da casa e cebola no shoyo.',
        tags: ['Geral', 'Almoço'],
        count: 150.32
      },
      { id: 9,
        image: require('../../assets/img/react.png'),
        name: 'Teste 4',
        ingredientes: '2 carnes artesanais 150 gramas, 2 mussarela, 2 x- cheddar, salada, molho especial da casa e cebola no shoyo.',
        tags: ['Geral', 'Almoço'],
        count: 150.32
      },
      { id: 10,
        image: require('../../assets/img/react.png'),
        name: 'Teste 5',
        ingredientes: '2 carnes artesanais 150 gramas, 2 mussarela, 2 x- cheddar, salada, molho especial da casa e cebola no shoyo.',
        tags: ['Geral', 'Almoço'],
        count: 150.32
      }
    ]
  }

  handlePlusPress=()=>{
    this.setState({isHover: true});
  }

  handleTab = tab=> {
    categories = this.state.categories;
    const filtered = categories.filter(
      category => category.tags.includes(tab)
    );
    this.setState({ active: tab, categories: filtered });
  }

  renderTab(tab){
    const{active} = this.state;
    const isActive = active === tab;

    return(
      <TouchableOpacity 
        key={`tab-${tab}`} 
        onPress={() => this.handleTab(tab)}
        style={[
          styles.tab,
          isActive ? styles.active : null
        ]}
      >
        <Text style={styles.text}>
          {tab}
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const tabs=['Geral','Massas','Carnes','Bebidas', 'Almoço'];
    const {categories, isHover, cardOpacity, qtyCardOpacity} = this.state;
    

    return (
      <View>
        <Header title='Cardápio'/>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} 
        row style={styles.tabs}>
          {tabs.map(tab => this.renderTab(tab))}
        </ScrollView>
        
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: 10,marginBottom: 50}}
        >
          <View flex={0} row space="between" style={styles.categories}>
            {categories.map(category => (
              <TouchableOpacity key={category.name}>
                <Card>  
                  <CardItem>
                    <Left>
                      <Image
                        source={category.image}
                        style={styles.imageCard}/>
                      <View style={{ top:-10}}>
                        <Text style={styles.textCardLeft}>{category.name}</Text>
                        <Text style={styles.textStuff}>{category.ingredientes}</Text>
                      </View>
                    </Left>
                    <Right style={{paddingTop:10, marginLeft:10}}>
                      <View>
                        <Text style={styles.textCardRight}>R$ {category.count}</Text>
                        
                      </View>
                    </Right>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16 * 2,
  },
  text: {
    textAlign: 'center',
    //fontWeight: 'bold',
    fontSize: 18,
  },
  textCardLeft: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14
  },
  textStuff:{
    textAlign: 'center',
    marginTop: 3,
    fontSize: 12
  },
  textCardRight: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: "#ff0000"
  },
  gray: { color: "#9DA3B4" }
  ,
  avatar: {
    height: 16 * 2.2,
    width: 16 * 2.2,
  },
  tabs: {
    borderBottomColor: "#C5CCD6",
    //borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 16,
    marginHorizontal: 16 * 2,
  },
  tab: {
    marginRight: 32,
    paddingBottom: 5
  },
  active: {
    borderBottomColor: "#ff0000",
    borderBottomWidth: 3,
  },
  categories: {
    flexWrap: 'wrap',
    paddingHorizontal: 4,
    marginBottom: 16 * 3.5,
  },
  imageCard:{
    width:60, 
    height:60,
    borderRadius:10, 
    marginRight:5
  }
  ,
  category: {
    minWidth: (35.2 - (25 * 2.4) - 16) / 2,
    maxWidth: (35.2 - (25 * 2.4) - 16) / 2,
    maxHeight: (35.2 - (25 * 2.4) - 16) / 2,
  },
  buttonOrder: {
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  order: {
    height: 20,
    width: 20,
    backgroundColor: '#cd170c',
    borderRadius: 50
  },
  more:{
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
})