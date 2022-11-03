import  React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {View, Text, Dimensions, StatusBar,Button, TouchableOpacity, StyleSheet, ScrollView,Image, TextInput} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as WebBrowser from 'expo-web-browser';
import Modal from './Modal.js';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.telaHome}>
      <ScrollView contentContainerStyle={{padding:20}} style={styles.container}>
      <Text style={styles.txtHeader}>Para onde você deseja navegar?</Text>
      
      <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.btnNavigation}>
      <Ionicons name="md-home" size={29} color='white'/>
      <Text style={styles.txtBtn}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={()=>navigation.navigate('Portfolio')} style={styles.btnNavigation}>
      <Ionicons name="md-briefcase" size={29} color='white'/>
      <Text style={styles.txtBtn}>Portfolio</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={()=>navigation.navigate('Sobre')} style={styles.btnNavigation}>
      <Ionicons name="md-bulb" size={29} color='white'/>
      <Text style={styles.txtBtn}>Sobre</Text>
      </TouchableOpacity>
      
      </ScrollView>
    </View>
  );
}

function PortfolioScreen({ navigation,route }) {
  const [images,setImages]=useState([
    {
      img: require('./resources/img1.png'),
      height: 0,
      widht: 0,
      ratio: 0,
      website:'https://github.com/bernardobb93/Agenda-App',
    },
    {
      img: require('./resources/img3.jpg'),
      height: 0,
      widht: 0,
      ratio: 0,
      website:'https://github.com/bernardobb93/Agenda-Android-React',
    },
    {
      img: require('./resources/img4.png'),
      height: 0,
      widht: 0,
      ratio: 0,
      website:'https://github.com/bernardobb93/App-Github-Repo',
    },

  ]);
  const [windowWidht,setWindowWidth]=useState(0);
  useEffect(()=>{
    let windowWidhtN = Dimensions.get('window').width;
    setWindowWidth(windowWidhtN - 30 - 40);
    let newImages = images.filter(function(val){
      let w = Image.resolveAssetSource(val.img).width;
      let h = Image.resolveAssetSource(val.img).height;
      val.widht = w;
      val.height = h;
      val.ratio = h/w;
      return val;
    });
    setImages(newImages);
  },[]);

  const abrirNavegador = async (website) =>{
    let result = await WebBrowser.openBrowserAsync(website);
  }

  return (
    <ScrollView>
    <View style={styles.telaPortfolio}>
      <Text style={styles.txtHeader}>Alguns projetos!</Text>
      {images.map((val=>{
        return (
          <View style = {styles.parentImage}>
            <Image style={{
              width:windowWidht, 
              height:windowWidht*val.ratio, 
              resizeMode:'stretch'}} source={val.img}/>
              <TouchableOpacity onPress={()=>abrirNavegador(val.website)} style={styles.btnAbrirNavegador}>
              <Ionicons name="md-globe" size={15} color='white'/>
                <Text style={{textAlign:'center',fontSize:15,color:'white'}}>Abrir no navegador.</Text>
                </TouchableOpacity>
          </View>
        );
      }))}
    </View>
    </ScrollView>
  );
}

function SobreScreen({ navigation }) {
  const[showModal,setModal]=useState(false);
  
const abrirModalContato = ()=>{

  setModal(!showModal);
}




  let widthWindow = Dimensions.get('window').width - 30 -40;
  return (
    <View style={{flex:1}}>
      {
        (showModal)?
        <Modal 
        showModal={showModal} 
        setModal={setModal}/>
        :
        <View></View>
      }
    <View style={styles.telaSobre}>
    <ScrollView contentContainerStyle={{padding:20}} style={styles.container}>
  
      <Text style={styles.txtHeader}>Sobre</Text>
      <Image style={{width:widthWindow,height:widthWindow, marginTop:20}} source={{uri:'https://pbs.twimg.com/profile_images/1239609056337199104/gROhftHD_400x400.jpg'}} />
      <View>
      <Text style={{fontSize:25}}>Desenvolvido por:</Text>
        <Text style={{fontSize:35}}>Bernardo Bueno Barbosa</Text>
        <Text style={{fontSize:20}}>Formado em Análise e Desenvolvimento de Sistemas.</Text>    
        <TouchableOpacity onPress={()=>abrirModalContato()} style={{...styles.btnNavigation,justifyContent:'center'}}>
        <Ionicons name="ios-chatbubbles" size={25} color='white'/>
          <Text style={styles.txtBtn}>Entrar em contato</Text>
        </TouchableOpacity>
        </View>
    </ScrollView>
    </View>
    </View>
  );
}



const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden/>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'Sobre') {
              iconName = focused 
              ? 'ios-bulb' 
              : 'ios-bulb-outline';
            } else if (route.name === 'Portfolio') {
              iconName = focused 
              ? 'ios-briefcase' 
              : 'ios-briefcase-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options= {{headerTransparent:true, title:'Home',headerShown:false}}/>
        <Tab.Screen name="Portfolio" component={PortfolioScreen} options= {{headerTransparent:true, title:'Portfolio',headerShown:false}}/>
        <Tab.Screen name="Sobre" component={SobreScreen} options= {{headerTransparent:true, title:'Sobre',headerShown:false}}/>
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const styles=StyleSheet.create({
  telaHome:{ 
    flex: 1,
    padding:15,
  },
  container:{
    backgroundColor:'white',
  },
  telaPortfolio:{
    flex:1,
    padding:15,
  },
  telaSobre:{
    flex:1,
    padding:15,
  },
  txtHeader:{
    color:'blue',
    fontSize:24,
  },
  btnNavigation:{
    backgroundColor:'blue',
    padding:20,
    marginTop:15,
    flexDirection:'row',
  },
  parentImage:{
    backgroundColor:'lightgray',
    marginTop:30,
    alignItems:'center',
  },
  btnAbrirNavegador:{
    padding:10,
    backgroundColor:'blue',
    width:'100%',
    justifyContent:'center',
    flexDirection:'row',
  },
  txtBtn:{
    color:'white',
    marginTop:8, 
    marginLeft:8,
  },
  modalParent:{
    position:'absolute',
    left:0,
    top:0,
    width:'100%',
    height:'100%',
    backgroundColor:'rgba(0,0,0,0.5)',
    zIndex:1,
  },
  boxModal:{
    backgroundColor:'white',
    height:400,
    width:'100%',
    position:'absolute',
    left:0,
    top:'50%',
    marginTop:-185,
    padding:10
  },
  txtInput:{
    height:40,
    width:'100%',
    borderColor:'#ccc',
    borderWidth:1,
    marginBottom:20,
  },
});
