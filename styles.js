import { StyleSheet } from "react-native";

export const colors = {
  white: '#ffffff',
  white90:'rgba(255, 255, 255, 0.9)',
  white50: 'rgba(255, 255, 255, 0.51)',
  lightGrey: '#f4f4f4',
  darkGrey: '#9c9c9c',
  lightBlue: '#66b8ff',
  darkBlue: '#065ff6',
  orange: '#ff7300',
  purple: '#634dd3',
}

export const styles = StyleSheet.create({
  // *********************** MAIN SCREEN ***********************
  title: {
    color: colors.white,
    fontSize: 34,
    fontWeight: '600',
    paddingBottom: 10
  },
  mainBg: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 40,
    position: 'absolute'
  },
  entitiesBox: {
    borderRadius: 20,
    backgroundColor:colors.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 14,
    marginHorizontal: 14,
  },
  small: {
    width: 80,
    height: 80,
  },
  medium: {
    width: 170,
    height: 170,
  },
  large: {
    width: 330,
    height: 150,
  }
})