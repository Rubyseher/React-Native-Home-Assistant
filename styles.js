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
  title:{
    fontSize:34,
    fontWeight:'600',
    paddingBottom:'3%'
  },
  entitiesBox: {
    backgroundColor: colors.lightGrey,
    borderRadius: 20,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    margin:'2%'
  },
  small:{
    width: 80,
    height: 80,
  } ,
  medium:{
    width: 170,
    height: 170,
  } ,
  large:{
    width: 330,
    height: 150,
  }
})