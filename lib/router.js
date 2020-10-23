import React from 'react';  
import {createAppContainer} from 'react-navigation';   
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';  
import HomeScreen from "../components/screens/index";  
import ProfileScreen from "../components/screens/profile";  
import SettingScreen from "../components/screens/setting";  
  
let days = '10 days'
const AppNavigator = createMaterialTopTabNavigator(  
    {  
        TODAY: HomeScreen,  
        Tomorrow: ProfileScreen,  
        days: SettingScreen,  
    },  
    {  
        tabBarOptions: {  
            activeTintColor: 'white',  
            showIcon: false,  
            showLabel:true,  
            style: {  
                backgroundColor:'#368AAD'  
            }  
        },  
    }  
)  
export default createAppContainer(AppNavigator);  