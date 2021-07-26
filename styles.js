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
    width: "40%",
    height: 140,
    alignItems:'center',
    justifyContent:'center',
    marginVertical: '3%'
  },
  entitiesContainer: {
    height:90,
    width:"100%",
    flexDirection: 'row',
    justifyContent:'space-evenly',
    flexWrap:'wrap'
  }
})