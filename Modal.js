import * as React from 'react';
import {View,Text,StyleSheet,Image,Dimensions,TextInput,TouchableOpacity}from 'react-native';
import { useEffect,useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {db} from './firebase.js'

export default function Modal(props){
  const [nome,setNome]=useState('');
  const[mensagem,setMensagem]=useState('');
  const[email,setEmail]=useState('');
  const enviarMensagem = ()=>{
    db.collection('contato').add({
      nome: nome,
      mensagem: mensagem,
      email: email,
    });
    alert('Sua mensagem foi enviada!');
    setNome('');
    setMensagem('');
    setEmail('');
  }
    return(
<View style={styles.modalParent}>
          <View style={{position:'absolute',right:0,top:0,zIndex:2,justifyContent:'center'}}>
            <TouchableOpacity onPress={()=>props.setModal(!props.showModal)} style={{width:'100%',height:'100%',justifyContent:'center'}}>
          <Ionicons name="md-close-circle" size={50} color='black'/>
          </TouchableOpacity>
          </View>
          <View style={styles.boxModal}>
            <Text style={{...styles.txtHeader,fontSize:15}}>Qual seu nome?</Text>
            <TextInput onChangeText={(text)=>setNome(text)} style={styles.txtInput} numberOfLines={4}></TextInput>
            <Text style={{...styles.txtHeader,fontSize:15}}>Qual sua mensagem?</Text>
            <TextInput onChangeText={(text)=>setMensagem(text)} style={{...styles.txtInput,height:80}} numberOfLines={80}></TextInput>
            <Text style={{...styles.txtHeader,fontSize:15}}>Qual seu email?</Text>
            <TextInput onChangeText={(text)=>setEmail(text)} style={styles.txtInput} numberOfLines={1}></TextInput>
            <TouchableOpacity onPress={()=>enviarMensagem()} style={{...styles.btnNavigation,justifyContent:'center'}}>
          <Text style={{color:'white',fontSize:14}}>Enviar</Text>
        </TouchableOpacity>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
