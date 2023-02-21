import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import color from "../assets/theme/color";
import * as qs from "qs";
import axios from "axios";
import filter from "lodash.filter";
import { useSelector } from "react-redux";
export default function SearchBox({ onPress }) {
  const reduxOnSale = useSelector((state) => state.onsale);
  const [isLoading, setIsLoading] = useState(false);

  // const [groups, setGroups] = useState(reduxOnSale.onsale);
  // const [allData, setAllData] = useState(reduxOnSale.onsale);
  // const [data, setData] = useState([]);
  // const [diaryUrl, setDiaryUrl] = useState("");
  // const [query, setQuery] = useState("");

  const searchRef = useRef();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [oldData, setOldData] = useState([]);

  useEffect(() => {
    var searchHeader = new Headers();
    searchHeader.append("accept", "application/json");
    searchHeader.append("Content-Type", "application/x-www-form-urlencoded");
    searchHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

    var searchHeaderData = qs.stringify({
      getsearchproducts: "1",
      keysearch: search,
      lang_id: "1",
    });

    console.log("searchHeaderData", searchHeaderData);
    setIsLoading(true);
    axios
      .post(
        "https://codewraps.in/beypuppy/appdata/webservice.php",
        searchHeaderData,
        { headers: searchHeader }
      )
      .then(function (responce) {
        console.log("res", responce);
        setData(responce.data.data);
        setOldData(responce.data.data);
        onSearch();
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const onSearch = (text) => {
    if (text == "") {
      setOldData(oldData);
    } else {
      let tempList = data.filter((item) => {
        return item.product_name.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setData(tempList);
    }
  };

  // const contains = ({ gname }) => {
  //   console.log("matching", gname, query);

  //   if (gname.toLowerCase().includes(query.toLowerCase())) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  // const processSearch = (text) => {
  //   if (text.length == 0) {
  //     resetSearch();
  //   } else {
  //     setQuery(text);
  //     var formattedSearch = text.toLowerCase();
  //     console.log("searching", formattedSearch);
  //     const groups = filter(allData, (gname) => {
  //       return contains(gname, formattedSearch);
  //     });
  //     console.log("FILTEr GROUPS", groups);
  //     setGroups(groups);
  //   }
  // };

  // const resetSearch = () => {
  //   setQuery("");
  //   setGroups(allData);
  //   Keyboard.dismiss();
  // };

  return (
    <View
      style={{
        // flex: 1,
        backgroundColor: color.primary_color,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 30,
      }}
    >
      <View style={styles.parent}>
        <View
          style={{
            flex: 0.2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AntDesign name="search1" size={20} color={color.primary_color} />
        </View>
        <View style={{ flexDirection: "row", flex: 2, alignItems: "center" }}>
          {/* <View>
          <Text style={{fontWeight:'bold'}}>Delivering To:</Text>
        </View> */}
          <View
            style={{
              // marginHorizontal: 10,
              // backgroundColor: "red",
              width: wp(74),
            }}
          >
            <TextInput
              ref={searchRef}
              placeholder="Search"
              onChangeText={(text) => {
                setSearch(text);
                onSearch(text);
              }}
              value={search}
            />
          </View>
        </View>
        <View style={styles.ImageView}>
          {search == "" ? null : (
            <TouchableOpacity onPress={onPress}>
              <Image
                style={{
                  height: hp(2.5),
                  width: hp(2.5),
                  marginRight: 10,
                  tintColor: color.primary_color,
                }}
                source={require("../images/filter.png")}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  parent: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 25,
    // marginTop: 20,
    paddingVertical: 10,
    borderColor: color.primary_color,
    paddingHorizontal: 8,
    backgroundColor: color.white,
  },
  ImageView: {
    alignItems: "center",
    justifyContent: "center",
  },
});
