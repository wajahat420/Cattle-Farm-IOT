import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import React,{useEffect, useState} from 'react';
import Firebase from "../config/firebase"

export default function FoodStock({ navigation }) {

  const { database} = Firebase()
  const [data,setData] = useState([])
  const [keys,setKeys] = useState([])
  const [editIndex,setEditIndex] = useState(0)
  const [headerVal,setHeader] = useState(0)
  const [text,setText] = useState('')

  const table = headerVal == 0 ? 'cattleFinance' : headerVal == 1 ? 'expense' : 'other_expense'
  const header = headerVal == 0 ?
  ['ID', 'CattleName', 'CattleExpense', 'PurchaseCost', 'SaleCost', 'Margin', 'Edit', 'Delete']
  :
  headerVal == 1
  ?
  ['ID', 'CattleName','Expense name', 'Cattle Expense', 'Expense date', 'Edit', 'Delete']
  :
  ['ID', 'Expense','Cost', 'Date', 'Edit', 'Delete']


  // const value = 

  useEffect(() => {
    loadData()
  },[headerVal])

  const loadData = () => {

    setData([header])
    database()
    .ref(`/finance/${table}`)
    .on("value",
       snapshot => {
         if (snapshot.val()) {
          let todos = snapshot.val()
          let keys = Object.keys(todos)

          console.log('KEYS', keys);
          console.log('todos', todos);
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

      let userRef = database().ref(`finance/${table}/` + data[index].key);
      userRef.update(data[index])
      .then(res => {
        setEditIndex(-1)
        ToastAndroid.show('Updated successfully', ToastAndroid.SHORT)
      })
      .catch(err => {
        ToastAndroid.show('Error in updating', ToastAndroid.SHORT)
  
      })
    }else{
      database().ref(`/finance/${table}`).push(data[index])
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

  }

  const deleteItem = (index) => {
    let userRef = database().ref('finance/' + data[index].key);
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

  const renderCattleFinance = (elem, index) => {


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
                <TextInput onChangeText={text => changeText(text, index, 'CattleID')} style={styles.editText} value={data[index].CattleID}/>
              )
            }else if(ind == 1){
              return (
                <TextInput style={styles.editText} onChangeText={text => changeText(text, index, 'CattleName')} value={data[index].CattleName}/>
              )
            }else if(ind == 2){
              return (
                <TextInput style={styles.editText} onChangeText={text => changeText(text, index, 'CattleExpense')} value={data[index]?.CattleExpense}/>
              )
            }else if(ind == 3){
              return (
                <TextInput style={styles.editText} onChangeText={text => changeText(text, index, 'PurchaseCost')} value={data[index]?.PurchaseCost}/>
              )
            }else if(ind == 4){
              return (
                <TextInput style={styles.editText} onChangeText={text => changeText(text, index, 'SaleCost')} value={data[index]?.SaleCost}/>
              )
            }
            else if(ind == 5){
              return (
                <TextInput style={styles.editText} onChangeText={text => changeText(text, index, 'Margin')} value={data[index]?.Margin}/>
              )
            }
            else if(ind == 6){
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
                <Text style={styles.heading}>{elem.CattleID}</Text>
              )
            }else if(ind == 1){
              return (
                <Text style={styles.heading}>{elem.CattleName}</Text>
              )
            }else if(ind == 2){
              return (
                <Text style={styles.heading}>{elem.CattleExpense}</Text>
              )
            }else if(ind == 3){
              return (
                <Text style={styles.heading}>{elem.PurchaseCost}</Text>
              )
            }else if(ind == 4){
              return (
                <Text style={styles.heading}>{elem.SaleCost}</Text>
              )
            }
            else if(ind == 5){
              return (
                <Text style={styles.heading}>{elem.Margin}</Text>
              )
            }
            else if(ind == 6){
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

  const renderCattleExpense = (elem, index) => {


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
                <TextInput onChangeText={text => changeText(text, index, 'CattleID')} style={styles.editText} value={data[index].CattleID}/>
              )
            }else if(ind == 1){
              return (
                <TextInput style={styles.editText} onChangeText={text => changeText(text, index, 'CattleName')} value={data[index].CattleName}/>
              )
            }else if(ind == 2){
              return (
                <TextInput style={styles.editText} onChangeText={text => changeText(text, index, 'ExpenseName')} value={data[index]?.ExpenseName}/>
              )
            }else if(ind == 3){
              return (
                <TextInput style={styles.editText} onChangeText={text => changeText(text, index, 'CattleExpense')} value={data[index]?.CattleExpense}/>
              )
            }else if(ind == 4){
              return (
                <TextInput style={styles.editText} onChangeText={text => changeText(text, index, 'ExpenseDate')} value={data[index]?.ExpenseDate}/>
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
                <Text style={styles.heading}>{elem.CattleID}</Text>
              )
            }else if(ind == 1){
              return (
                <Text style={styles.heading}>{elem.CattleName}</Text>
              )
            }else if(ind == 2){
              return (
                <Text style={styles.heading}>{elem.ExpenseName}</Text>
              )
            }else if(ind == 3){
              return (
                <Text style={styles.heading}>{elem.CattleExpense}</Text>
              )
            }else if(ind == 4){
              return (
                <Text style={styles.heading}>{elem.ExpenseDate}</Text>
              )
            }
           
            else if(ind == 5){
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

  const renderOtherExpense = (elem, index) => {


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
                <TextInput onChangeText={text => changeText(text, index, 'CattleID')} style={styles.editText} value={data[index].CattleID}/>
              )
            }else if(ind == 1){
              return (
                <TextInput style={styles.editText} onChangeText={text => changeText(text, index, 'Expense')} value={data[index].Expense}/>
              )
            }else if(ind == 2){
              return (
                <TextInput style={styles.editText} onChangeText={text => changeText(text, index, 'Cost')} value={data[index]?.Cost}/>
              )
            }else if(ind == 3){
              return (
                <TextInput style={styles.editText} onChangeText={text => changeText(text, index, 'Date')} value={data[index]?.Date}/>
              )
            }
           
            else if(ind == 4){
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
                <Text style={styles.heading}>{elem.CattleID}</Text>
              )
            }else if(ind == 1){
              return (
                <Text style={styles.heading}>{elem.Expense}</Text>
              )
            }else if(ind == 2){
              return (
                <Text style={styles.heading}>{elem.Cost}</Text>
              )
            }else if(ind == 3){
              return (
                <Text style={styles.heading}>{elem.Date}</Text>
              )
            }
           
            else if(ind == 4){
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
 
    const dupData = [...data, {}]

    setData(dupData)
    setEditIndex(dupData.length-1)

  }

  console.log('DATA', data)
  const dataArr = text.length > 0 ? data.filter((elem, index) => (index == 0 || elem?.CattleID.includes(text) || elem?.CattleName?.includes(text) )) : data


  return (
    <View style={{paddingBottom:100}}>

    <View style={{alignItems:'flex-end',margin:10}}>
      <TouchableOpacity onPress={addField} style={{backgroundColor:'brown',padding:5,paddingHorizontal:15,borderRadius:10}}>
        <Text style={{textAlign:'right', fontSize:15, color:'white', }}>Add</Text>
      </TouchableOpacity>
    </View>


  <View style={{flexDirection:'row', marginBottom:15, justifyContent:'space-around', borderBottomColor:'gray', borderBottomWidth:1, alignItems:'center'}}>
    <TouchableOpacity 
    onPress={() => setHeader(0)}
    style={[styles.header, headerVal == 0 && {backgroundColor:'#d9d9d9'}]}>
      <Text style={styles.headerText}>Cattle Finance</Text>
    </TouchableOpacity>

    <TouchableOpacity 
    onPress={() => setHeader(1)}
    style={[styles.header , headerVal == 1 && {backgroundColor:'#d9d9d9'}]}>
      <Text style={styles.headerText}>Cattle Expense</Text>
    </TouchableOpacity>

    <TouchableOpacity 
    onPress={() => setHeader(2)}
    style={[styles.header, headerVal == 2 && {backgroundColor:'#d9d9d9'}]}>
      <Text style={styles.headerText}>Other Expense</Text>
    </TouchableOpacity>
  </View>


  <TextInput onChangeText={setText} style={{borderWidth:1, margin:10, padding:10}} placeholder='search by Cattle ID / Name'/>


    <ScrollView>
      <ScrollView 
                  directionalLockEnabled={false}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
      <View style={{width:'100%',marginHorizontal:15}}>

        {
          dataArr.map((elem,index) => {
            return (
              <View style={{flexDirection:'row', borderColor:'gray', borderWidth:1, marginVertical:2,padding:8, alignItems:'center'}}>
                {
                  headerVal == 0
                  ?
                  renderCattleFinance(elem, index)
                  :
                  headerVal == 1
                  ?
                  renderCattleExpense(elem, index)
                  :
                  renderOtherExpense(elem, index)
                }
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
  headerText : {
    fontSize:15,
    fontWeight:'600'
  },
  header : {
    padding : 10,
    backgroundColor:'white',
    elevation:4
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
