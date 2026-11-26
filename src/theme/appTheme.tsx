
import { StyleSheet } from "react-native";

export const appTheme = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    fontSize: 30,
    color: '#C65D5D',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textInput: {
    fontSize: 25,
    backgroundColor: '#FFF9F7',
    textAlign: 'center',
    width: 350,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DFA5A5',
    marginTop: 10
  }
});