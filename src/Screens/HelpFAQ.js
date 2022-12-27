import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Header from "../component/Header";

import color from "../assets/theme/color";
import { FONTS, SIZES } from "../assets/theme/theme";
import { Divider, List } from "react-native-paper";
import CategoryHeading2 from "../component/CategorryHeading2";

export default function HelpFAQ({ navigation }) {
  const [expendedSec1, setExpandedSec1] = useState(true);
  const [expendedSec2, setExpandedSec2] = useState(true);
  const handleexpendedSec1 = () => setExpandedSec1(!expendedSec1);

  const handleexpendedSec2 = () => setExpandedSec2(!expendedSec2);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <CategoryHeading2 CategoryName={"HELP AND FAQ"} />
      {/* <HamburgerHeader hamTitle={"FAQ"} /> */}
      <ScrollView>
        <List.Section>
          <List.Accordion
            style={{
              elevation: 6,
              shadowColor: color.black,
              backgroundColor: color.white,
              marginTop: 20,
              shadowOffset: {
                width: 0,
                height: 20,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
            }}
            titleStyle={{ color: "black", fontSize: 18, fontWeight: "bold" }}
            title={
              <View>
                <Text
                  style={{
                    fontFamily: FONTS.primarytext1,
                    color: color.black,
                    fontSize: SIZES.h3,
                  }}
                >
                  Do you combine shipments?
                </Text>
              </View>
            }
            right={(props) =>
              expendedSec1 ? (
                // <List.Icon {...props} icon="chevron-down" color="black" />
                <View style={{ flexDirection: "row" }}>
                  {/* <List.Icon {...props} icon="download" color="black" /> */}
                  <List.Icon
                    {...props}
                    icon="minus-circle"
                    color={color.text_primary}
                  />
                </View>
              ) : (
                <View style={{ flexDirection: "row" }}>
                  <List.Icon
                    {...props}
                    icon="plus-circle"
                    color={color.text_primary}
                  />
                </View>
              )
            }
            expended={expendedSec1}
            onPress={handleexpendedSec1}
          >
            <List.Accordion
              titleStyle={{
                fontSize: 14,
                color: "black",
                fontWeight: "bold",
                // marginHorizontal: 10,
              }}
              title="Q. Where all is eKhat available?"
            >
              <List.Item
                titleNumberOfLines={3}
                titleStyle={{
                  fontSize: 14,
                  textAlign: "justify",
                  fontFamily: "Times New Roman Italic",
                }}
                title="eKhat is a mobile application hence is only available on Play Store for android users and on App Store for iOS users."
              />
            </List.Accordion>
            <List.Accordion
              titleStyle={{
                fontSize: 14,
                color: "black",
                fontWeight: "bold",
                width: 330,
              }}
              titleNumberOfLines={2}
              title="Q. In how many languages is eKhat Application available?"
            >
              <List.Item
                titleNumberOfLines={3}
                titleStyle={{
                  fontSize: 14,
                  textAlign: "justify",
                  fontFamily: "Times New Roman Italic",
                }}
                title="For now, eKhat has two languages i.e., Hindi and English. Very Soon we will also make eKhat available in other multi languages."
              />
            </List.Accordion>
            <List.Accordion
              titleStyle={{
                textAlign: "justify",
                fontSize: 14,
                color: "black",
                fontWeight: "bold",
                width: 330,
              }}
              titleNumberOfLines={3}
              title="Q. How to Sign Up on eKhat and what all information is required in Sign Up form?"
            >
              <List.Item
                titleNumberOfLines={8}
                titleStyle={{
                  textAlign: "justify",
                  fontSize: 14,
                  fontFamily: "Times New Roman Italic",
                }}
                title="It’s very easily to Sign Up on eKhat as it only requires little bit of your personal information i.e., Name, DOB, marital status and Mobile Number. All these are required to verify age, help to setup app structure and verify user uniqueness respectively.
                  "
              />
              <List.Item
                titleStyle={{
                  textAlign: "justify",
                  fontSize: 14,
                  fontFamily: "Times New Roman Italic",
                }}
                title="Steps to Setup Account:"
              />
              <List.Item
                titleNumberOfLines={4}
                titleStyle={{
                  textAlign: "justify",
                  fontSize: 14,
                  fontFamily: "Times New Roman Italic",
                }}
                title="Start the App -> Select Preferred Language -> Reach Sign Up Screen -> Fill Details -> Verify Mobile Number. Account opens up."
              />
            </List.Accordion>
            <List.Accordion
              titleStyle={{
                fontSize: 14,
                color: "black",
                fontWeight: "bold",
              }}
              title="Q. What if I forgot my password?"
            >
              <List.Item
                titleNumberOfLines={3}
                titleStyle={{
                  fontSize: 14,
                  textAlign: "justify",
                  fontFamily: "Times New Roman Italic",
                }}
                title="There is a forgot password reset button on Login in Screen. Open that Tell your mobile number, verify it and reset your password."
              />
            </List.Accordion>
            <List.Accordion
              titleStyle={{
                fontSize: 14,
                color: "black",
                fontWeight: "bold",
              }}
              title="Q. How to Contact Us?"
            >
              <List.Item
                titleNumberOfLines={3}
                titleStyle={{
                  fontSize: 14,
                  textAlign: "justify",
                  fontFamily: "Times New Roman Italic",
                }}
                title="Any user can contact us on our mail address which is given on About Us Page Bottom in App menu."
              />
            </List.Accordion>
            <List.Accordion
              titleNumberOfLines={2}
              titleStyle={{
                fontSize: 14,
                color: "black",
                fontWeight: "bold",
                width: 330,
                // textAlign: 'justify',
              }}
              title="Q. How can I make changes in my Personal Profile?"
            >
              <List.Item
                titleNumberOfLines={4}
                titleStyle={{
                  fontSize: 14,
                  textAlign: "justify",
                  fontFamily: "Times New Roman Italic",
                }}
                title="There is an edit profile option in Menu in the app. Click that and then option comes to edit your profile. Edit information that you want to edit and then click ‘Save Changes’ and hence changes made."
              />
            </List.Accordion>
          </List.Accordion>
        </List.Section>
        <List.Section>
          <List.Accordion
            style={{
              elevation: 6,
              shadowColor: color.black,
              backgroundColor: color.white,
              shadowOffset: {
                width: 0,
                height: 20,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
            }}
            titleStyle={{ color: "black", fontSize: 18, fontWeight: "bold" }}
            title={
              <View>
                <Text
                  style={{
                    fontFamily: FONTS.primarytext1,
                    color: color.black,
                    fontSize: SIZES.h3,
                  }}
                >
                  Do you ship Internationally?
                </Text>
              </View>
            }
            right={(props) =>
              expendedSec2 ? (
                // <List.Icon {...props} icon="chevron-down" color="black" />
                <View style={{ flexDirection: "row" }}>
                  {/* <List.Icon {...props} icon="download" color="black" /> */}
                  <List.Icon
                    {...props}
                    icon="minus-circle"
                    color={color.text_primary}
                  />
                </View>
              ) : (
                <View style={{ flexDirection: "row" }}>
                  <List.Icon
                    {...props}
                    icon="plus-circle"
                    color={color.text_primary}
                  />
                </View>
              )
            }
            expended={expendedSec2}
            onPress={handleexpendedSec2}
          >
            <List.Accordion
              titleStyle={{
                fontSize: 14,
                color: "black",
                fontWeight: "bold",
              }}
              title="Q. Where all is eKhat available?"
            >
              <List.Item
                titleNumberOfLines={3}
                titleStyle={{
                  fontSize: 14,
                  textAlign: "justify",
                  fontFamily: "Times New Roman Italic",
                }}
                title="eKhat is a mobile application hence is only available on Play Store for android users and on App Store for iOS users."
              />
            </List.Accordion>
            <List.Accordion
              titleStyle={{
                fontSize: 14,
                color: "black",
                fontWeight: "bold",
                width: 330,
              }}
              titleNumberOfLines={2}
              title="Q. In how many languages is eKhat Application available?"
            >
              <List.Item
                titleNumberOfLines={3}
                titleStyle={{
                  fontSize: 14,
                  textAlign: "justify",
                  fontFamily: "Times New Roman Italic",
                }}
                title="For now, eKhat has two languages i.e., Hindi and English. Very Soon we will also make eKhat available in other multi languages."
              />
            </List.Accordion>
            <List.Accordion
              titleStyle={{
                textAlign: "justify",
                fontSize: 14,
                color: "black",
                fontWeight: "bold",
                width: 330,
              }}
              titleNumberOfLines={3}
              title="Q. How to Sign Up on eKhat and what all information is required in Sign Up form?"
            >
              <List.Item
                titleNumberOfLines={8}
                titleStyle={{
                  textAlign: "justify",
                  fontSize: 14,
                  fontFamily: "Times New Roman Italic",
                }}
                title="It’s very easily to Sign Up on eKhat as it only requires little bit of your personal information i.e., Name, DOB, marital status and Mobile Number. All these are required to verify age, help to setup app structure and verify user uniqueness respectively.
                  "
              />
              <List.Item
                titleStyle={{
                  textAlign: "justify",
                  fontSize: 14,
                  fontFamily: "Times New Roman Italic",
                }}
                title="Steps to Setup Account:"
              />
              <List.Item
                titleNumberOfLines={4}
                titleStyle={{
                  textAlign: "justify",
                  fontSize: 14,
                  fontFamily: "Times New Roman Italic",
                }}
                title="Start the App -> Select Preferred Language -> Reach Sign Up Screen -> Fill Details -> Verify Mobile Number. Account opens up."
              />
            </List.Accordion>
            <List.Accordion
              titleStyle={{
                fontSize: 14,
                color: "black",
                fontWeight: "bold",
              }}
              title="Q. What if I forgot my password?"
            >
              <List.Item
                titleNumberOfLines={3}
                titleStyle={{
                  fontSize: 14,
                  textAlign: "justify",
                  fontFamily: "Times New Roman Italic",
                }}
                title="There is a forgot password reset button on Login in Screen. Open that Tell your mobile number, verify it and reset your password."
              />
            </List.Accordion>
            <List.Accordion
              titleStyle={{
                fontSize: 14,
                color: "black",
                fontWeight: "bold",
              }}
              title="Q. How to Contact Us?"
            >
              <List.Item
                titleNumberOfLines={3}
                titleStyle={{
                  fontSize: 14,
                  textAlign: "justify",
                  fontFamily: "Times New Roman Italic",
                }}
                title="Any user can contact us on our mail address which is given on About Us Page Bottom in App menu."
              />
            </List.Accordion>
            <List.Accordion
              titleNumberOfLines={2}
              titleStyle={{
                fontSize: 14,
                color: "black",
                fontWeight: "bold",
                width: 330,
                // textAlign: 'justify',
              }}
              title="Q. How can I make changes in my Personal Profile?"
            >
              <List.Item
                titleNumberOfLines={4}
                titleStyle={{
                  fontSize: 14,
                  textAlign: "justify",
                  fontFamily: "Times New Roman Italic",
                }}
                title="There is an edit profile option in Menu in the app. Click that and then option comes to edit your profile. Edit information that you want to edit and then click ‘Save Changes’ and hence changes made."
              />
            </List.Accordion>
          </List.Accordion>
        </List.Section>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
});
