import { StyleSheet } from "react-native";
import { PlatformColor } from "react-native-windows";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  listItemContainer: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },

  settings: { // Not currently in use, but search for application in commented code in RosterScreen.js
    position: 'absolute',
    top: 20,
    right: 20,
  },

  systemColorBackground: {
    backgroundColor: PlatformColor('SolidBackgroundFillColorBase'),
  }
});