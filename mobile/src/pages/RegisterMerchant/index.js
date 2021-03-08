import React, { Component, createRef } from "react";
import { Camera } from "expo-camera";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { RectButton } from "react-native-gesture-handler";
import { onlyNumbering } from "../../utils/onlyNumbering";
import api from "../../services/api";
import countries from "../../data/countries.json";

export default class RegisterMerchant extends Component {
  constructor(props) {
    super(props);
    this.camRef = createRef();
  }

  state = {
    company: {
      name: "",
      description: "",
      phone: "",
      whats: "",
      saleType: "fixed",
    },
    isBusiness: {
      value: "business",
      numbering: "",
    },
    country: {
      dialCode: "",
      name: "",
      flag: "",
    },
    capturedPhoto: null,
    loading: false,
    hasPermission: null,
    type: Camera.Constants.Type.back,
    cameraON: false,
    open: false,
  };

  async componentDidMount() {
    const { company, isBusiness, capturedPhoto } = this.state;
    await AsyncStorage.setItem("provider", JSON.stringify(company, isBusiness));
    await AsyncStorage.setItem("avatar", JSON.stringify(capturedPhoto));

    // this.imagePickerCall();
    this.permissionCamera();
  }

  // methods
  permissionCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasPermission: status === "granted" });

    if (this.state.hasPermission === null) {
      return <View />;
    }
    if (this.state.hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  };

  imagePickerCall = async () => {
    if (Constants.platform.ios) {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }

    const photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (photo.cancelled) {
      return;
    }
    if (!photo.uri) {
      return;
    }
    this.setState({ capturedPhoto: photo });
    // console.log(photo);
  };

  register = async () => {
    const { capturedPhoto, company, isBusiness, country } = this.state;

    // this.setState({ loading: true });
    isBusiness.numbering = onlyNumbering(isBusiness.numbering);
    if (company.phone) {
      company.phone = onlyNumbering(company.phone);
      company.phone = country.dialCode.concat(company.phone);
    }
    if (company.whats) {
      company.whats = onlyNumbering(company.whats);
      company.whats = country.dialCode.concat(company.whats);
    }

    if (capturedPhoto) {
      this.uploadImage(capturedPhoto);
      // const photo = new FormData(); /**Este formData serve para validar o envio de arquivos. */
      // photo.append("file", capturedPhoto);
      // const responseFile = await api.post('/files', photo);
      // console.log(responseFile);
    }

    // try {
    //   const responseProvider = await api.post("/provider", {
    //     company,
    //     isBusiness,
    //   });

    //   await AsyncStorage.setItem(
    //     "provider",
    //     JSON.stringify(responseProvider.data.provider)
    //   );

    //   await api.put("/users", {
    //     id_provider: responseProvider.data.provider._id,
    //   });

    //   this.setState({ loading: false });
    //   this.props.navigation.navigate("Main");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  uploadImage = async (capturedPhoto) => {
    // console.log(capturedPhoto);
    const formData = new FormData();
    
    formData.append("file", {
      uri: capturedPhoto.uri,
      type: capturedPhoto.type,
    });
    console.log(formData);
    
    // const responsePhoto = await api.post("/files", formData);
    // console.log(responsePhoto);
  };

  activeCamera = () => {
    this.setState({ cameraON: true });
  };

  takePicture = async () => {
    if (this.camRef) {
      const picture = await this.camRef.current.takePictureAsync();
      this.setState({ capturedPhoto: picture, open: true });
    }
  };

  render() {
    const {
      capturedPhoto,
      company,
      isBusiness,
      loading,
      type,
      cameraON,
      open,
    } = this.state; 

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* camera acionada ou não */}
        {cameraON ? (
          <>
            <Camera style={{ flex: 1 }} type={type} ref={this.camRef}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={{ position: "absolute", bottom: 20, left: 20 }}
                  onPress={() => {
                    this.setState({
                      type:
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back,
                    });
                  }}
                >
                  <MaterialIcons
                    name="flip-camera-ios"
                    size={30}
                    color="#fff"
                    style={{ margin: 15 }}
                  />
                </TouchableOpacity>
              </View>
            </Camera>

            <TouchableOpacity
              style={{ position: "absolute", bottom: 20, left: 140 }}
              onPress={this.takePicture}
            >
              <MaterialIcons
                name="photo-camera"
                size={50}
                color="#fff"
                style={{ margin: 15 }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ position: "absolute", top: 20, right: 20 }}
              onPress={() => this.setState({ cameraON: false })}
            >
              <MaterialIcons name="close" size={30} color="#fff" />
            </TouchableOpacity>

            {capturedPhoto && (
              <Modal animationType="slide" transparent={false} visible={open}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 20,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={{ margin: 10 }}
                      onPress={() => this.setState({ open: false })}
                    >
                      <MaterialIcons name="cancel" size={50} color="#ff0000" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ margin: 10 }}
                      onPress={() =>
                        this.setState({ open: false, cameraON: false })
                      }
                    >
                      <MaterialIcons
                        name="check-circle"
                        size={50}
                        color="#008080"
                      />
                    </TouchableOpacity>
                  </View>
                  <Image
                    style={{ width: 300, height: 300, borderRadius: 20 }}
                    source={{ uri: capturedPhoto.uri }}
                  />
                </View>
              </Modal>
            )}
          </>
        ) : (
          <ScrollView>
            <View style={style.container}>
              <View style={style.pictureContainer}>
                <RectButton
                  style={style.pictureButton}
                  onPress={this.activeCamera}
                >
                  {capturedPhoto ? (
                    <Image
                      style={{ width: 150, height: 150, borderRadius: 75 }}
                      source={{ uri: capturedPhoto.uri }}
                    />
                  ) : (
                    <MaterialIcons
                      style={{ padding: 50 }}
                      name="add-a-photo"
                      color="#FFF"
                      size={50}
                    />
                  )}
                </RectButton>
              </View>

              <TouchableOpacity
                style={{ position: "relative" }}
                onPress={() => this.imagePickerCall()}
              >
                <MaterialIcons name="collections" size={30} color="#000" />
              </TouchableOpacity>

              <TextInput
                style={style.input}
                autoCorrect={false}
                autoCapitalize="words"
                placeholder="Store name"
                placeholderTextColor="#333"
                value={company.name}
                onChangeText={(text) =>
                  this.setState({ company: { ...company, name: text } })
                }
              />

              <Text>Record type</Text>
              <Picker
                style={style.picker}
                selectedValue={isBusiness.value}
                onValueChange={(itemValue) =>
                  this.setState({ isBusiness: { value: itemValue } })
                }
              >
                <Picker.Item label="Business" value="business" />
                <Picker.Item label="Personal" value="personal" />
              </Picker>

              <Text>Register {isBusiness.value} numbering</Text>
              <TextInput
                style={style.input}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="business ."
                placeholder={`Your unique ${isBusiness.value} numbering`}
                placeholderTextColor="#333"
                keyboardType="numeric"
                onChangeText={(number) =>
                  this.setState({
                    isBusiness: { ...isBusiness, numbering: number },
                  })
                }
              />

              <TextInput
                multiline={true}
                numberOfLines={2}
                style={style.input}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Store description"
                placeholderTextColor="#333"
                value={company.description}
                onChangeText={(text) =>
                  this.setState({ company: { ...company, description: text } })
                }
              />

              <View style={style.containerPhone}>
                {this.state.country.flag ? (
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={{ uri: this.state.country.flag }}
                  />
                ) : (
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    Country
                  </Text>
                )}
                <Picker
                  style={{ height: 40, paddingLeft: 15, paddingRight: 15 }}
                  selectedValue={this.state.country}
                  onValueChange={(itemValue) =>
                    this.setState({ country: itemValue })
                  }
                >
                  {countries.map((country) => (
                    <Picker.Item
                      key={country.isoCode}
                      label={country.name}
                      value={country}
                    />
                  ))}
                </Picker>
                {this.state.country.dialCode ? (
                  <Text
                    style={{
                      fontSize: 10,
                      marginTop: 15,
                      paddingRight: 10,
                      fontWeight: "bold",
                    }}
                  >
                    {this.state.country.dialCode}
                  </Text>
                ) : null}
                <TextInput
                  style={[style.input, { width: 150 }]}
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder="WhatsApp"
                  placeholderTextColor="#333"
                  keyboardType="numeric"
                  onChangeText={(number) =>
                    this.setState({ company: { ...company, whats: number } })
                  }
                />
              </View>
              <View>
                <Text>{this.state.country.dialCode}</Text>
                <TextInput
                  style={style.input}
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder="Phone (DDD) Number"
                  placeholderTextColor="#333"
                  keyboardType="numeric"
                  onChangeText={(number) =>
                    this.setState({ company: { ...company, phone: number } })
                  }
                />
              </View>

              <Text>How do you sell your products?</Text>
              <Picker
                style={style.picker}
                selectedValue={company.saleType}
                onValueChange={(itemValue) =>
                  this.setState({
                    company: { ...company, saleType: itemValue },
                  })
                }
              >
                <Picker.Item label="Fixed establishment" value="fixed" />
                <Picker.Item label="Door to door" value="door_to_door" />
                <Picker.Item label="internet sale" value="internet" />
              </Picker>

              <RectButton
                style={style.submitButton}
                loading={loading}
                onPress={this.register}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" size={30} />
                ) : (
                  <Text
                    style={{ color: "#fff", fontWeight: "bold", padding: 10 }}
                  >
                    Register
                  </Text>
                )}
              </RectButton>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },

  pictureContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  pictureButton: {
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  input: {
    height: 40,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 4,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: "#eee",
    borderStyle: "solid",
    marginBottom: 30,
    color: "#FFF",
  },

  picker: {
    height: 40,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 4,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: "#eee",
    borderStyle: "solid",
    marginBottom: 30,
    color: "#FFF",
  },

  submitButton: {
    backgroundColor: "#008080",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  containerPhone: {
    flexDirection: "row",
  },
});
