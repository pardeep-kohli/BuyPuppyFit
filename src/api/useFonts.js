import React from "react";
import * as Font from "expo-font";

export default useFonts = async () => {
  await Font.loadAsync({
    "Bold": require("./../../assets/font/OpenSans-Bold.ttf"),
    "BoldItalic": require("./../../assets/font/OpenSans-BoldItalic.ttf"),
    "ExtraBold": require("./../../assets/font/OpenSans-ExtraBold.ttf"),
    "ExtraBoldItalic": require("./../../assets/font/OpenSans-ExtraBoldItalic.ttf"),
    "Italic": require("./../../assets/font/OpenSans-Italic.ttf"),
    "Light": require("./../../assets/font/OpenSans-Light.ttf"),
    "LightItalic": require("./../../assets/font/OpenSans-LightItalic.ttf"),
    "Medium": require("./../../assets/font/OpenSans-Medium.ttf"),
    "MediumItalic": require("./../../assets/font/OpenSans-MediumItalic.ttf"),
    "Regular": require("./../../assets/font/OpenSans-Regular.ttf"),
    "SemiBold": require("./../../assets/font/OpenSans-SemiBold.ttf"),
    "SemiBoldItalic": require("./../../assets/font/OpenSans-SemiBoldItalic.ttf"),
  });
};
