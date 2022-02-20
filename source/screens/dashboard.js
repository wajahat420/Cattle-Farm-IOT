import { View, Text, Dimensions, ScrollView } from 'react-native';
import React, {useEffect, useState} from 'react';

import Firebase from "../config/firebase"
const { database} = Firebase()

import { BarChart, Grid, XAxis,YAxis } from 'react-native-svg-charts'


export default function Dashboard() {
	const [data,setData] = useState([])


	useEffect(() => {
		loadData()
	 },[])
  
	 const loadData = () => {
		database()
		.ref('/Cattle')
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

				setData(data)
			  }
			},
			errorObject => {
			  console.log("The read failed: " + errorObject.code);
			}
		 );
	 }

  const fill = 'rgb(50, 65, 150)'


	 const initialWeights = data.filter(elem => !!parseInt(elem.InitialWeight)).map(elem => parseInt(elem.InitialWeight))
	 let CurrentWeight = data.filter(elem => !!parseInt(elem.CurrentWeight)).map(elem => parseInt(elem.CurrentWeight))
	 let CurrentName = data.filter(elem => !!parseInt(elem.CurrentWeight)).map(elem => elem.CattleName)
	 const InitialName = data.filter(elem => !!parseInt(elem.InitialWeight)).map(elem => elem.CattleName)


  return (
    <ScrollView style={{flex:1,padding:10}}>

    <View style={{position:'relative'}}>
		 <Text style={{textAlign:'center', fontSize:18, fontWeight:'600',marginTop:20}}>Initial Weights</Text>

       <YAxis
          style={{height:170,position:'absolute', top:70, left:5,margin:0}}
          svg={{fontSize:9,margin:0,fill:"grey"}}
          contentInset={{ left: 10, right: 10,bottom:5,top:5}}

          data ={initialWeights}
          formatLabel={(val, index) => {
            return val
          }}
        />
      <BarChart style={{ height: 200 }} data={initialWeights} svg={{ fill }} contentInset={{ top: 20, bottom: 10, left: 25, right: 10 }}>
        <Grid />
      </BarChart>
        <XAxis
          style={{paddingHorizontal:10,marginTop:10,width:'100%', justifyContent:'space-around'}}
          svg={{fontSize:11,fill:"grey"}}
          contentInset={{ left: 30, right: 15,top:10 }}
          data ={initialWeights}
          formatLabel={(val, index) => {
            return InitialName[val]
          }}
        />

    </View>


	 <View style={{position:'relative',marginTop:30}}>
		<Text style={{textAlign:'center', fontSize:18, fontWeight:'600'}}>Current Weights</Text>
       <YAxis
          style={{height:180,position:'absolute', top:40, left:5,margin:0}}
          svg={{fontSize:9,margin:0,fill:"grey"}}
          contentInset={{ left: 10, right: 10,bottom:5,top:5}}

          data ={CurrentWeight}
          formatLabel={(val, index) => {
            return val
          }}
        />
      <BarChart style={{ height: 200 }} data={CurrentWeight} svg={{ fill }} contentInset={{ top: 20, bottom: 10, left: 25, right: 10 }}>
        <Grid />
      </BarChart>
        <XAxis
          style={{paddingHorizontal:10,marginTop:10,width:'100%', justifyContent:'space-around'}}
          svg={{fontSize:11,fill:"grey"}}
          contentInset={{ left: 30, right: 15,top:10 }}
          data ={CurrentWeight}
          formatLabel={(val, index) => {
            return CurrentName[val]
          }}
        />

    </View>
 


  {/* <Text style={{fontSize:20, textAlign:'center',marginBottom:20}}>Initial Weights</Text>
  <BarChart
    marker={{
      digits:2
    }}
    chartDescription={{ text: '' }}                    	


    drawValueAboveBar={false}
    valueFormatter = {['Jan', 'Feb', 'Mar']}
    style={{height:200, width:'100%'}}
    data={{
      dataSets : 
      [{
        label : 'Initial weights'
        values : [{y:6,x:1}, {y:2,x:2}, {y:3,x:3}]}],
        config: {color: '#D63D55', valueFormatter:'largeValue', valueTextSize: 10},
      }}
  />

<Text style={{fontSize:20, textAlign:'center',marginTop:25,marginBottom:20}}>Current Weights</Text>
  <BarChart
    marker={{
      digits:2
    }}
    chartDescription={{ text: '' }}                    	


    drawValueAboveBar={false}
    valueFormatter = {['Jan', 'Feb', 'Mar']}
    style={{height:200, width:'100%'}}
    legend={legendObj}	
    // yAxis={}
    data={{
      dataSets : 
      [{
        label : 'Current weights',
        values : [{y:6,x:1}, {y:2,x:2}, {y:3,x:3}]}],
        config: {color: '#D63D55', valueFormatter:'largeValue', valueTextSize: 10},
      }}
  /> */}
      
    </ScrollView>
  );
}


const data =  [
	{
		date: '03-06-2017',
		value: 29990
	},
	{
		date: '15-11-2017',
		value: 21990
	},
	{
		date: '12-12-2017',
		value: 21990
	},
	{
		date: '29-12-2017',
		value: 21990
	},
	{
		date: '30-12-2017',
		value: 21990
	},
	{
		date: '31-12-2017',
		value: 21990
	},
	{
		date: '01-01-2018',
		value: 29990
	},
	{
		date: '02-01-2018',
		value: 29990
	},
	{
		date: '03-01-2018',
		value: 29990
	},
	{
		date: '04-01-2018',
		value: 29990
	},
	{
		date: '05-01-2018',
		value: 29990
	},
	{
		date: '03-06-2017',
		value: 29990
	},
	{
		date: '15-11-2017',
		value: 21990
	},
	{
		date: '12-12-2017',
		value: 21990
	},
	{
		date: '29-12-2017',
		value: 21990
	},
	{
		date: '30-12-2017',
		value: 21990
	},
	{
		date: '31-12-2017',
		value: 21990
	},
	{
		date: '01-01-2018',
		value: 29990
	},
	{
		date: '02-01-2018',
		value: 29990
	},
	{
		date: '03-01-2018',
		value: 29990
	},
	{
		date: '04-01-2018',
		value: 29990
	},
	{
		date: '05-01-2018',
		value: 29990
	}
]
