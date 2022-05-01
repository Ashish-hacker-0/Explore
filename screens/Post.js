
import { View, Text, Dimensions, FlatList } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Post from '../components/Post';
const height = Dimensions.get('screen').height;

const Posts = ({route,navigation}) => {

  const insets = useSafeAreaInsets();
  const posts = route.params.posts;

const renderPost = ({item}) => {
  return(
      <Post
          item={item}
          navigation={navigation}
      />
  )
}
  return (
    <View style={{paddingTop:insets.top,height:height,backgroundColor:'white'}} >
      <Text style={{padding:10,fontSize:22,fontWeight:'700'}} >Posts</Text>
      <FlatList
            data={posts}
            renderItem={renderPost}
            keyExtractor={(item,index)=>index}
            
        />
    </View>

  )
}

export default Posts