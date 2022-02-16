import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import React,{useEffect, useState} from 'react';
import Firebase from "../config/firebase"

export default function FoodStock() {

  const { database} = Firebase()
  const [data,setData] = useState([])
  const [keys,setKeys] = useState([])
  const [editIndex,setEditIndex] = useState(0)
  const header = ['S.no', 'BreedName', 'Quantity', 'Purchase Date', 'Breed Cost', 'Edit', 'Delete']
  // const value = 

  useEffect(() => {
    loadData()
  },[])

  const loadData = () => {
    database()
    .ref('/foodstock')
    .on("value",
       snapshot => {
         if (snapshot.val()) {
          let todos = snapshot.val()
          let keys = Object.keys(todos)

          let data =  keys.map(elem => {
             const obj = {
                ...todos[elem],
                   key:elem
             }
             return obj
          })
          setData([header,...data])
          setKeys(keys)
         }
       },
       errorObject => {
         console.log("The read failed: " + errorObject.code);
       }
     );
  }
  

  const upadteData = (index) => {

    if(index <= keys.length){

      let userRef = database().ref('foodstock/' + data[index].key);
      userRef.update(data[index])
      .then(res => {
        setEditIndex(-1)
        ToastAndroid.show('Updated successfully', ToastAndroid.SHORT)
      })
      .catch(err => {
        ToastAndroid.show('Error in updating', ToastAndroid.SHORT)
  
      })
    }else{
      let userRef = database().ref('/foodstock').push(data[index])
      .then(res => {
        loadData()
        setEditIndex(-1)
        ToastAndroid.show('Saved successfully', ToastAndroid.SHORT)
      })
      .catch(err => {
        ToastAndroid.show('Error in Saving', ToastAndroid.SHORT)
  
      })
    }
  }

  const changeText = (text, index, property) => {

    const dupData = [...data]

    dupData[index][property] = text

    setData(dupData)

    console.log("UPDATE", dupData);
  }

  const deleteItem = (index) => {
    let userRef = database().ref('foodstock/' + data[index].key);
    userRef.remove()
    .then(res => {
      // setEditIndex(-1)
      loadData()
      ToastAndroid.show('Deleted successfully', ToastAndroid.SHORT)
    })
    .catch(err => {
      ToastAndroid.show('Error in deleting', ToastAndroid.SHORT)

    })
  }

  const renderRow = (elem, index) => {
    if(index == 0){

      const render = header.map(elem => <Text style={styles.heading}>{elem}</Text>)
      return render
    }
    else{
      if(editIndex === index){
        return(
          header.map((elem, ind) => {
    

            if(ind == 0){
              return (
                <TextInput onChangeText={text => changeText(text, index, 'sno')} style={styles.editText} value={data[index].sno}/>
              )
            }else if(ind == 1){
              return (
                <TextInput style={styles.editText} onChangeText={text => changeText(text, index, 'breedname')} value={data[index].breedname}/>
              )
            }else if(ind == 2){
              return (
                <TextInput style={styles.editText} onChangeText={text => changeText(text, index, 'quantity')} value={data[index]?.quantity}/>
              )
            }else if(ind == 3){
              return (
                <TextInput style={styles.editText} onChangeText={text => changeText(text, index, 'purchaseDate')} value={data[index]?.purchaseDate}/>
              )
            }else if(ind == 4){
              return (
                <TextInput style={styles.editText} onChangeText={text => changeText(text, index, 'breedCost')} value={data[index]?.breedCost}/>
              )
            }
            else if(ind == 5){
              return(
                <View style={{width:110}}>
                  <TouchableOpacity onPress={() => upadteData(index)} style={styles.saveBtn}>
                    <Text style={styles.saveBtnText}>Save</Text>
                  </TouchableOpacity>
                </View>

              )
            }
            else{
              return(
                <TouchableOpacity onPress={() => deleteItem(index)} style={styles.delete}>
                  <Text style={styles.updateBtnText}>Delete</Text>
                </TouchableOpacity>
                )
            }
          })
        )
      }else{

        return (
          header.map((item,ind) => {
  
            if(ind == 0){
              return (
                <Text style={styles.heading}>{elem.sno}</Text>
              )
            }else if(ind == 1){
              return (
                <Text style={styles.heading}>{elem.breedname}</Text>
              )
            }else if(ind == 2){
              return (
                <Text style={styles.heading}>{elem.quantity}</Text>
              )
            }else if(ind == 3){
              return (
                <Text style={styles.heading}>{elem.purchaseDate}</Text>
              )
            }else if(ind == 4){
              return (
                <Text style={styles.heading}>{elem.breedCost}</Text>
              )
            }else if(ind == 5){
              return(
                <View style={{width:110}}>
                <TouchableOpacity  onPress={() => setEditIndex(index)} style={styles.btn}>
                  <Text style={styles.updateBtnText}>Update</Text>
                </TouchableOpacity>
                </View>
              )
            }else{
              return(
                <TouchableOpacity onPress={() => deleteItem(index)} style={styles.delete}>
                  <Text style={styles.updateBtnText}>Delete</Text>
                </TouchableOpacity>
                )
            }
          })
        )
      }

    }
  }

  const addField = () => {
    const obj = {
      sno : '',
      breedname : '',
      breedCost : '',
      quantity : '',
      purchaseDate : ''
    }
    const dupData = [...data, obj]

    setData(dupData)
    setEditIndex(dupData.length-1)

  }


  return (
    <View style={{paddingBottom:100}}>

    <View style={{alignItems:'flex-end',margin:10}}>
    <TouchableOpacity onPress={addField} style={{backgroundColor:'brown',padding:5,paddingHorizontal:15,borderRadius:10}}>
      <Text style={{textAlign:'right', fontSize:15, color:'white', }}>Add</Text>
    </TouchableOpacity>

    </View>

  <ScrollView>
    <ScrollView 
                directionalLockEnabled={false}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
    <View style={{width:'100%',marginHorizontal:15}}>

      {
        data.map((elem,index) => {
          return (
            <View style={{flexDirection:'row', borderColor:'gray', borderWidth:1, marginVertical:2,padding:8, alignItems:'center'}}>
              {renderRow(elem, index)}
            </View>

          )

        })
      }
    </View>
    </ScrollView>
  </ScrollView>

      <Text></Text>
    </View>
  )
}


const styles = StyleSheet.create({
  heading : {
    width:110,
    fontSize:15,
  },
  btn : {
    backgroundColor:'green',
    padding:7,
    width : 50,
    height : 30,
    marginLeft:5

  },
  delete : {
    backgroundColor:'red',
    padding:7,
    width : 50,
    height : 30,
    marginLeft:5

  },
  updateBtnText : {
    fontSize:11,
    color : "white"
  },
  editText : {
    width : 110,
    borderWidth:1,
    borderColor : 'gray',
    borderRadius:5
  },
  saveBtn : {
    backgroundColor: 'green',
    padding:3,
    width : 50,
    height : 30,
    marginLeft:5,
    justifyContent:'center'
  },
  saveBtnText : {
    color : 'white',
    fontSize:11,
    textAlign:'center'
  }
})
