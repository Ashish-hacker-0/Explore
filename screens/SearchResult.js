import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { Icon } from '@rneui/base'
import { FlatList, TextInput } from 'react-native-gesture-handler'

const SearchResult = () => {
  const [data,setData] = useState([]);
  const renderItem = ({item}) => {
    return(
      <View>
        <Image
          source={{
            uri:item.photo
          }}
        />
        <View>
          <Text>{item.username}</Text>
          <Text>{item.name}</Text>
        </View>
      </View>
    )
  }
  return (
    <View>
      <View><Icon name="search" /><TextInput placeholder='seach "username"' /></View>
      <View>
        <Text>Accounts</Text>
      </View>
      <FlatList
         data={data}
         renderItem={renderItem}
      />
    </View>
  )
}

export default SearchResult