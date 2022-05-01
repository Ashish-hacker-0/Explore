import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Edit = () => {

    const insets = useSafeAreaInsets();

  return (
    <View style={{paddingTop:insets.top}} >
      <Text style={{fontWeight:'700',fontSize:20,padding:10}} >Edit Profile</Text>
      <View style={{alignItems:'center'}} >
          <Image
              source={{
                  uri:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
              }}
              style={{height:100,width:100,borderRadius:50}}
          />
          <Text style={{color:'#728FCE',fontSize:16,padding:10}} >Change Profile Photo</Text>
      </View>
      <View style={{padding:10}} >
          <Text style={{color:'gray',paddingTop:15}} >Name</Text>
          <TextInput placeholder='Full Name' style={{borderBottomColor:'lightgray',borderBottomWidth:1}} />
          <Text style={{color:'gray',paddingTop:15}}>Username</Text>
          <TextInput placeholder='Username'  style={{borderBottomColor:'lightgray',borderBottomWidth:1}} />
          <Text style={{color:'gray',paddingTop:15}}>Bio</Text>
          <TextInput placeholder='Your Bio' style={{borderBottomColor:'lightgray',borderBottomWidth:1}}  />
      </View>
      <TouchableOpacity style={{padding:10,backgroundColor:'#728FCE',alignSelf:'flex-start',margin:10,paddingHorizontal:20,borderRadius:5}} ><Text style={{color:'white'}} >Save</Text></TouchableOpacity>
    </View>
  )
}

export default Edit