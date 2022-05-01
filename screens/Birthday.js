import { View, Text, TouchableOpacity, DatePickerAndroid, Dimensions, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import { Icon } from '@rneui/base'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { setDob } from '../Slices';
const height = Dimensions.get('screen').height;
const Birthday = ({navigation}) => {

    const insets = useSafeAreaInsets();

  const [date,setDate] = useState(1);
  const [month,setMonth] = useState(1);
  const [year,setYear] = useState(2022);
  const dispatch = useDispatch();
  const [err,setErr] = useState('');
    const hide = useRef(new Animated.Value(0)).current;
  
    const login = () => {
      Animated.timing(hide,{
        toValue:1,
        duration:0
      }).start();
   
      Animated.timing(hide,{
        toValue:0,
        duration:5000
      }).start();
    }

  const onChange = (props) => {
      console.log(props);
      setDate(props.date);
      setMonth(props.month);
      setYear(props.year);
  }

const show = () => {
    DatePickerAndroid.open(

    )
    .then(res=>{
      console.log(res);
      if(res.action=='dateSetAction'){
        setDate(res.day);
        setMonth(res.month);
        setYear(res.year);
      }
    });
}

  return (
    <View style={{paddingTop:insets.top,height:height}} >
    <Animated.View style={{backgroundColor:'red',padding:10,opacity:hide}} >
        <Text style={{color:'white',textAlign:'center'}} >
          {err}
        </Text>
      </Animated.View>
    <View style={{flex:1}} >
      <Icon
          name='cake'
          size={80}

      />
      <Text style={{fontSize:24,textAlign:'center'}}>Add your birthday</Text>
      <Text style={{textAlign:'center'}} >This won't be visible to public.</Text>
      <TouchableOpacity onPress={()=>show()}  style={{backgroundColor:'#efefef',alignSelf:'stretch',padding:10,borderRadius:5,borderWidth:1,borderColor:'lightgray',flexDirection:'row',alignItems:'center',marginVertical:10,justifyContent:'space-between',margin:14}} >
          <Text>{date} - {month+1} -  {year} </Text>
          <Text style={{color:'red'}} >{new Date().getFullYear() - year} years old</Text>
      </TouchableOpacity>
      </View>
      <View style={{margin:20}} >
          <TouchableOpacity onPress={()=>{
            if((new Date().getFullYear() - year)<18){
                  setErr('You need to be atleast 18 year old.')
                  login();
                  return;
            }
            dispatch(setDob(`${date}-${month}-${year}`));
            navigation.navigate('Username');
          }} style={{backgroundColor:'#728FCE',padding:15,borderRadius:10}} >
              <Text style={{color:'white',textAlign:'center'}} >Next</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

export default Birthday