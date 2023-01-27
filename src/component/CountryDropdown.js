import { View, Text, Image } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import React, { useEffect, useState } from "react";
import { styles } from "../component/Styles";
import axios from "axios";

const down_img = require("../assets/images/down.png");

export default function CountryDropdown({ label, ...props }) {
  const [CountryList, setCountryList] = useState([]);

  const ProcessGetCountry = () => {
    var CountryListHeader = new Headers();
    CountryListHeader.append("accept", "application/json");
    CountryListHeader.append(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    CountryListHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

    var CountryListData = new FormData();
    CountryListData.append("countrylist", "1");
    axios
      .post(
        "http://13.126.10.232/development/beypuppy/appdata/webservice.php",
        CountryListData,
        { headers: CountryListData }
      )
      .then(function (response) {
        if (response.data.success == 1) {
          setCountryList(response.data.data);
        } else {
          console.log("country not found");
        }
      });
  };

  useEffect(() => {
    ProcessGetCountry();
  }, []);

  return (
    <View>
      <Text style={styles.label_text}>{label}</Text>
      <View style={{ flexDirection: "row" }}>
        <SelectDropdown
          data={CountryList.map((list, index) => list.country)}
          buttonTextAfterSelection={(selectedItem, index) => {
            CountryList[index].id;
            CountryList[index].country;

            console.log("id", CountryList[index].country);
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
