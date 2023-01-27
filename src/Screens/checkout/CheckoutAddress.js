import React from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import Header from "../../component/Header";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import color from "../../assets/theme/color";
import { SIZES } from "../../assets/theme/theme";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { RadioButton } from "react-native-paper";
import VioletButton from "../../component/VioletButton";
import CategorryHeading2 from "../../component/CategorryHeading2";

export default function CheckoutAddress({ navigation }) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [addresschecked, setAddressChecked] = React.useState("");
  const [paymentchecked, setPaymentChecked] = React.useState("");

  const [routes] = React.useState([
    { key: "first", title: "DELIVERY DETAILS" },
    { key: "second", title: "PAYMENT DETAILS" },
  ]);

  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: color.background_color }}>
      <>
        <View style={styles.addressView}>
          <View style={styles.addressType1}>
            <Text style={styles.txt1}>Home, Deepak singh</Text>
            <Text style={styles.txt2}>
              J326 Dakshinpuri new delhi 110062 j Block dakshinpuri ambedkar
              nagar sec 5 , Near Kali building school
            </Text>
          </View>
          <View style={styles.radioBtnView}>
            <RadioButton
              color={color.primary_color}
              value="first"
              status={addresschecked === "first" ? "checked" : "unchecked"}
              onPress={() => setAddressChecked("first")}
            />
          </View>
        </View>
        {/* <View style={styles.addressView}>
          <View style={styles.addressType1}>
            <Text style={styles.txt1}>Work, Deepak singh </Text>
            <Text style={styles.txt2}>
              J326 Dakshinpuri new delhi 110062 j Block dakshinpuri ambedkar
              nagar sec 5 , Near Kali building school
            </Text>
          </View>
          <View style={styles.radioBtnView}>
            <RadioButton
              color={color.text_primary}
              value="second"
              status={checked === "second" ? "checked" : "unchecked"}
              onPress={() => setChecked("second")}
            />
          </View>
        </View> */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <VioletButton
            buttonName={"ADD ADDRESS"}
            onPress={() => navigation.navigate("AccountStack")}
          />
        </View>
        {/* <View style={styles.bottomView}>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <MaterialIcons name="refresh" color={color.black} size={25} />
            <Text>Recent</Text>
          </TouchableOpacity>
        </View> */}
      </>
    </View>
  );
  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: color.background_color }}>
      {/* <View style={styles.paymentView}>
        <Text style={[styles.txt1, { fontSize: SIZES.h3 }]}>
          Cash at the door
        </Text>
        <RadioButton
          color={color.text_primary}
          value="first"
          status={checked === "first" ? "checked" : "unchecked"}
          onPress={() => setChecked("first")}
        />
      </View> */}
      <View style={styles.paymentView}>
        <Text style={[styles.txt1, { fontSize: SIZES.h3 }]}>Paypal</Text>
        <RadioButton
          color={color.primary_color}
          value="first"
          status={paymentchecked === "first" ? "checked" : "unchecked"}
          onPress={() => setPaymentChecked("first")}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <VioletButton
          buttonName={"CONTINUE"}
          onPress={() => navigation.navigate("OrderSuccess")}
        />
      </View>
      {/* <View style={styles.bottomView}>
        <TouchableOpacity style={{ alignItems: "center" }}>
          <MaterialIcons name="refresh" color={color.black} size={25} />
          <Text>Recent</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );

  // const renderScene = SceneMap({
  //   first: FirstRoute,
  //   second: SecondRoute,
  // });

  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case "first":
        return <FirstRoute jumpTo={"second"} />;
      case "second":
        return <SecondRoute jumpTo={jumpTo} />;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        borderWidth: 1,
        borderColor: color.primary_color,
      }}
      style={{
        backgroundColor: color.white,
        // marginTop: SIZES.height / 35,
        paddingVertical: SIZES.height / 64 - 5,
        elevation: 4,
      }}
      renderLabel={({ route, focused }) =>
        focused ? (
          <Text
            style={{
              color: color.primary_color,
              fontFamily: "RubikBold",
              fontSize: SIZES.h4 - 2,
            }}
          >
            {route.title}
          </Text>
        ) : (
          <Text
            style={{
              color: color.light_grey,
              fontFamily: "RubikBold",
              fontSize: SIZES.h4 - 2,
            }}
          >
            {route.title}
          </Text>
        )
      }
    />
  );
  return (
    <View style={{ flex: 1, backgroundColor: color.background_color }}>
      <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutScreen")}
      />
      <CategorryHeading2 CategoryName={"CHECKOUT"} />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addressView: {
    marginVertical: SIZES.height / 50,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.width / 30,
  },
  addressType1: {
    flex: 0.8,
    // flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    marginHorizontal: SIZES.width / 40,
  },
  txt1: {
    fontSize: SIZES.h2 - 2,
    fontFamily: "RubikSemiBold",
    marginBottom: SIZES.height / 64,
  },
  txt2: {
    textAlign: "justify",
    fontSize: SIZES.h3 - 3,
    fontFamily: "RubikRegular",
  },
  radioBtnView: {
    flex: 0.2,
    alignItems: "flex-end",
  },

  paymentView: {
    marginTop: SIZES.height / 50,
    marginBottom: SIZES.height / 64 - 10,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.width / 30,
  },
  bottomView: {
    alignItems: "center",
    justifyContent: "center",
  },
});
