import { View, Text, Image } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import React, { useState, useEffect } from "react";
import { styles } from "../component/Styles";
import axios from "axios";
const down_img = require("../assets/images/down.png");

export default function StateDropdown({ label, ...props }) {
  const [getStateList, setStateList] = useState([]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

    var formdata = new FormData();
    formdata.append("countrylist", "1");
    formdata.append("statelist", "1");

    axios
      .post(
        "http://13.126.10.232/development/beypuppy/appdata/webservice.php?statelist=1&country_id=1",
        formdata,
        { headers: myHeaders }
      )
      .then(function (response) {
        setStateList(response.data.data);
      });
  }, []);

  return (
    <View>
      <Text style={styles.label_text}>{label}</Text>
      <View style={{ flexDirection: "row" }}>
        <SelectDropdown
          data={getStateList.map((list, index) => list.province)}
          buttonTextAfterSelection={(selectedItem, index, id) => {
            ((selectedItem = getStateList[index].province),
            (id = getStateList[index].id)),
              console.log("id's", getStateList[index].id);
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdown}
          buttonTextStyle={styles.text_button}
          rowTextStyle={styles.row_text}
          dropdownStyle={styles.dropdown_style}
          {...props}
        />
        <Image style={styles.downimg} source={down_img}></Image>
      </View>
    </View>
  );
}
