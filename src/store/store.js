import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeDataObject = async (key, value) => {
    console.debug('storeDataObject', value);
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        // saving error
      console.debug('storeDataObject error', e);
    }
};

export const storeDataString = async (key, value) => {
  console.debug('storeDataString', value);
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.debug('storeDataString error', e);
  }
};

export const getDataObject = async (key) => {
  console.debug('getDataObject', key);
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    console.debug('jsonValue', jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.debug('getDataObject error', e);
  }
};

export const getDataString = async (key) => {
  console.debug('getDataString', key);
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      console.debug('value', value);
      return value;
    }
  } catch (e) {
    // error reading value
    console.debug('getDataString error', e);
  }
};