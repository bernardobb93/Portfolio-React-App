import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {View, Text, SafeAreaView, StatusBar,Button, TouchableOpacity, StyleSheet, ScrollView,Image} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.telaHome}>
      <ScrollView contentContainerStyle={{padding:20}} style={styles.container}>
      <Text style={styles.txtHome}>Para onde você deseja navegar?</Text>
      
      <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.btnNavigation}>
      <Ionicons name="md-home" size={29} color='white'/>
      <Text style={{color:'white',marginTop:8, marginLeft:8}}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={()=>navigation.navigate('Portfolio')} style={styles.btnNavigation}>
      <Ionicons name="md-briefcase" size={29} color='white'/>
      <Text style={{color:'white',marginTop:8, marginLeft:8}}>Portfolio</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={()=>navigation.navigate('Sobre')} style={styles.btnNavigation}>
      <Ionicons name="md-bulb" size={29} color='white'/>
      <Text style={{color:'white',marginTop:8, marginLeft:8}}>Sobre</Text>
      </TouchableOpacity>
      
      </ScrollView>
    </View>
  );
}

function PortfolioScreen({ navigation }) {
  return (
    <View style={styles.tela}>
      <Text>Portfolio</Text>
    </View>
  );
}

function SobreScreen({ navigation }) {
  return (
    <View style={styles.tela}>
      <Text>Sobre</Text>
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
  tela:{
    flex:1,
    padding:15,
  },
  txtHome:{
    color:'blue',
    fontSize:24,
  },
  btnNavigation:{
    backgroundColor:'blue',
    padding:20,
    marginTop:15,
    flexDirection:'row',
  },
});
