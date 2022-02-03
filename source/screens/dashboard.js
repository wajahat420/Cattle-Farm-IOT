import { View, Text, Dimensions, ScrollView } from 'react-native';
import React from 'react';
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart
// } from 'react-native-chart-kit'
import { LineChart,BarChart } from 'react-native-charts-wrapper'

import { VictoryChart, VictoryGroup, VictoryBar } from 'victory-native'

const {screenWidth, height} = Dimensions.get('window')

export default function Dashboard() {

  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43]
      }
    ]
  };

  const chartConfig = {
      backgroundColor: '#e26a00',
      backgroundGradientFrom: '#fb8c00',
      backgroundGradientTo: '#ffa726',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }

    const xAxisObj={
      valueFormatter: [2017,2018,2019],
      labelRotationAngle: -45,
      // drawLabels : true,
      drawGridLines: false,
      position: 'BOTTOM',
      labelCount: 10,
    }


  const legendObj = {
    enabled: true,
    textSize: 12,
    form: 'CIRCLE',
    formSize: 14, 	
    formToTextSpace: 5,
    wordWrapEnabled: true,
    maxSizePercent: 0.5
  }

  const yAxisObj = {
    left: {
      drawGridLines: true,
      gridColor: '#000000',
      textColor: `#00000077`,
      fontFamily: 'Roboto',
      textSize: 14,
      axisLineWidth: 0,
      labelCount: 5,
      drawAxisLines: true,
      axisLineColor: '#FFFFFF00',
      axisMinimum: 0, //0 
      axisMaximum: 116000,
      valueFormatter:'largeValue'
    },
    right: {
      enabled: false,
    },
  }
  return (
    <ScrollView style={{flex:1,padding:15}}>

    {/* <Text>
      Bezier Line Chart
  </Text> */}

    {/* <VictoryChart>
      <VictoryGroup>
        <VictoryBar/>
        <VictoryBar/>
        <VictoryBar/>
      </VictoryGroup>
    </VictoryChart> */}

    {/* <BarChart
    // style={graphStyle}
    data={data}
    width={screenWidth}
    height={220}
    yAxisLabel="$"
    chartConfig={chartConfig}
    verticalLabelRotation={30}
  /> */}
  {/* <LineChart
    style={{flex:1}}
    data={{dataSets : [{label : 'demo', values : [{y:1}, {y:2}, {y:3}]}]}}
  />   */}
  <Text style={{fontSize:20, textAlign:'center',marginBottom:20}}>Initial Weights</Text>
  <BarChart
    marker={{
      digits:2
    }}
    chartDescription={{ text: '' }}                    	


    drawValueAboveBar={false}
    // highlightFullBarEnabled={false}
    valueFormatter = {['Jan', 'Feb', 'Mar']}
    style={{height:200, width:'100%'}}
    // xAxis={xAxisObj}
    // yAxis={yAxisObj}
    // legend={legendObj}	
    // yAxis={}
    data={{
      dataSets : 
      [{
        label : 'Initial weights',
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
    // highlightFullBarEnabled={false}
    valueFormatter = {['Jan', 'Feb', 'Mar']}
    style={{height:200, width:'100%'}}
    // xAxis={xAxisObj}
    // yAxis={yAxisObj}
    legend={legendObj}	
    // yAxis={}
    data={{
      dataSets : 
      [{
        label : 'Current weights',
        values : [{y:6,x:1}, {y:2,x:2}, {y:3,x:3}]}],
        config: {color: '#D63D55', valueFormatter:'largeValue', valueTextSize: 10},
      }}
  />
      {/* <LineChart
        data={linedata}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisLabel={'$'}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
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
