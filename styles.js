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
    width: 140,
    height: 140,
    alignItems:'center',
    // justifyContent:"space-ev",
    margin: '4%'
  },
  entitiesContainer: {
    // height:"100%",
    // width:"100%",
    // flexDirection: 'row',
    // padding:'10%',
    // justifyContent:'c-',
    // flexWrap:'wrap'
  }
})