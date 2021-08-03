import { StyleSheet } from "react-native";

export const colors = {
  white:'#ffffff',
  lightGrey: '#f4f4f4',
  darkGrey: '#9c9c9c',
  lightBlue: '#66b8ff',
  darkBlue: '#065ff6',
  purple: '#634dd3',
}

export const styles = StyleSheet.create({
  // *********************** MAIN SCREEN ***********************
  title:{
    color:colors.darkBlue,
    fontSize:34,
    fontWeight:'600',
    paddingBottom:10
  },
  entitiesBox: {
    backgroundColor: colors.white,
    borderRadius: 20,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:14,
    marginHorizontal:14,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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