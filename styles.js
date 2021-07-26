import { StyleSheet } from "react-native";

export const colors = {
  white:'#ffffff',
  lightGrey: '#f2f2f7',
  blue: '#3f91ff',
  lightBlue: '#f3fbff',
  darkBlue: '#065ff6',
  purple: '#634dd3',
}

export const styles = StyleSheet.create({
  // *********************** MAIN SCREEN ***********************
  entitiesBox: {
    backgroundColor: colors.white,
    borderRadius: 20,
    alignItems:'center',
    margin: '4%'
  },
  small:{
    width: 110,
    height: 110,
  } ,
  medium:{
    width: 140,
    height: 140,
  } ,
  large:{
    width: 170,
    height: 170,
  }
})