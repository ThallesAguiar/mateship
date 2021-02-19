import React, { Component, createRef } from 'react';
import { Camera } from 'expo-camera';
import { StyleSheet, Text, TextInput, View, ScrollView, ActivityIndicator, SafeAreaView, TouchableOpacity, Modal, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { RectButton } from 'react-native-gesture-handler';
import { onlyNumbering } from '../../utils/onlyNumbering';

export default class RegisterMerchant extends Component {
  constructor(props) {
    super(props);
    this.camRef = createRef();
  };

  state = {
    user: {},
    token: '',
    company: {
      name: '',
      description: '',
      typeSale: 'fixed'
    },
    // capturedPhoto: 'https://i.pinimg.com/originals/57/7e/d1/577ed19b71ff5b1ccaa72641b5511a61.jpg',
    capturedPhoto: null,
    isBusiness: {
      value: 'Business',
      numbering: ''
    },
    loading: false,
    hasPermission: null,
    type: Camera.Constants.Type.back,
    cameraON: false,
    open: false
  };

  async componentDidMount() {
    // const user = await AsyncStorage.getItem('user');
    // const token = await AsyncStorage.getItem('token');

    // this.setState({ user: JSON.parse(user), token });

    this.permissionCamera();
  };

  // methods
  permissionCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasPermission: status === 'granted' });

    // console.log(this.state.hasPermission)
    if (this.state.hasPermission === null) {
      return <View />;
    }
    if (this.state.hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  }

  register = async () => {
    const { user, token, capturedPhoto, company, isBusiness } = this.state;
    this.setState({ loading: true });
    // const {numbering} = isBusiness
    isBusiness.numbering = onlyNumbering(isBusiness.numbering);
    console.log(company, isBusiness);
    console.log(typeof (isBusiness.numbering));

    this.setState({ loading: false });
  }

  activeCamera = () => {
    // console.log(this.useRef)
    this.setState({ cameraON: true })
  }

  takePicture = async () => {
    if (this.camRef) {
      const { uri } = await this.camRef.current.takePictureAsync();
      // console.log(data);
      this.setState({ capturedPhoto: uri, open: true });
    }
  }


  render() {

    const { user, token, capturedPhoto, company, isBusiness, loading, type, cameraON, open } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* camera acionada ou não */}
        {cameraON ?
          (
            <>
              <Camera style={{ flex: 1 }} type={type} ref={this.camRef}>
                <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={{ position: 'absolute', bottom: 20, left: 20 }}
                    onPress={() => {
                      this.setState({ type: type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back });
                    }}
                  >
                    <MaterialIcons name="flip-camera-ios" size={30} color="#fff" style={{ margin: 15 }} />
                  </TouchableOpacity>
                </View>
              </Camera>

              <TouchableOpacity style={{ position: 'absolute', bottom: 20, left: 140 }} onPress={this.takePicture}>
                <MaterialIcons name="photo-camera" size={50} color="#fff" style={{ margin: 15 }} />
              </TouchableOpacity>

              <TouchableOpacity style={{ position: 'absolute', top: 20, right: 20 }} onPress={() => this.setState({ cameraON: false })}>
                <MaterialIcons name="close" size={30} color="#fff" />
              </TouchableOpacity>

              { capturedPhoto &&
                <Modal animationType="slide" transparent={false} visible={open}>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity style={{ margin: 10 }} onPress={() => this.setState({ open: false })}>
                        <MaterialIcons name="cancel" size={50} color="#ff0000" />
                      </TouchableOpacity>
                      <TouchableOpacity style={{ margin: 10 }} onPress={() => this.setState({ open: false, cameraON: false })}>
                        <MaterialIcons name="check-circle" size={50} color="#008080" />
                      </TouchableOpacity>
                    </View>
                    <Image style={{ width: 300, height: 300, borderRadius: 20 }} source={{ uri: capturedPhoto }} />
                  </View>
                </Modal>}
            </>
          )
          :
          (
            <ScrollView>
              <View style={style.container}>
                <View style={style.pictureContainer} >
                  <RectButton style={style.pictureButton} onPress={this.activeCamera}>
                    {capturedPhoto
                      ? (
                        <Image style={{ width: 150, height: 150, borderRadius: 75 }} source={{ uri: capturedPhoto }} />
                      )
                      : (
                        <MaterialIcons style={{ padding: 50 }} name='add-a-photo' color='#FFF' size={50} />
                      )
                    }

                  </RectButton>
                </View>
                <TextInput
                  style={style.input}
                  autoCorrect={false}
                  autoCapitalize="words"
                  placeholder="Store name"
                  placeholderTextColor="#333"
                  value={company.name}
                  onChangeText={text => this.setState({ company: { ...company, name: text } })}
                />

                <Text>Record type</Text>
                <Picker
                  style={style.picker}
                  selectedValue={isBusiness.value}
                  onValueChange={(itemValue) => this.setState({ isBusiness: { value: itemValue } })}
                >
                  <Picker.Item label="Business" value="Business" />
                  <Picker.Item label="Personal" value="Personal" />
                </Picker>

                <Text>Register {isBusiness.value} numbering</Text>

                {isBusiness.value === 'Business' ?
                  (
                    <TextInput
                      style={style.input}
                      autoCorrect={false}
                      autoCapitalize="none"
                      placeholder="Your unique business numbering."
                      placeholderTextColor="#333"
                      keyboardType='numeric'
                      onChangeText={number => this.setState({ isBusiness: { ...isBusiness, numbering: number } })}
                    />
                  ) :
                  (
                    <TextInput
                      style={style.input}
                      autoCorrect={false}
                      autoCapitalize="none"
                      placeholder="Your unique personal numbering."
                      placeholderTextColor="#333"
                      keyboardType='numeric'
                      onChangeText={number => this.setState({ isBusiness: { ...isBusiness, numbering: number } })}
                    />
                  )}


                <TextInput
                  multiline={true}
                  numberOfLines={2}
                  style={style.input}
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder="Store description"
                  placeholderTextColor="#333"
                  value={company.description}
                  onChangeText={text => this.setState({ company: { ...company, description: text } })}
                />

                <Text>How do you sell your products?</Text>
                <Picker
                  style={style.picker}
                  selectedValue={company.typeSale}
                  onValueChange={(itemValue) => this.setState({ company: { ...company, typeSale: itemValue } })}
                >
                  <Picker.Item label="Fixed establishment" value="fixed" />
                  <Picker.Item label="Door to door" value="door_to_door" />
                  <Picker.Item label="internet sale" value="internet" />
                </Picker>

                <RectButton style={style.submitButton} loading={loading} onPress={this.register}>
                  {loading
                    ? <ActivityIndicator color="#fff" size={30} />
                    : <Text style={{ color: '#fff', fontWeight: 'bold', padding: 10, }}>Register</Text>}
                </RectButton>
              </View>
            </ScrollView>
          )
        }
      </SafeAreaView>
    )
  }
}


const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },

  pictureContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  pictureButton: {
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  input: {
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 4,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: '#eee',
    borderStyle: 'solid',
    marginBottom: 30,
    color: '#FFF'
  },

  picker: {
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 4,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: '#eee',
    borderStyle: 'solid',
    marginBottom: 30,
    color: '#FFF'
  },

  submitButton: {
    backgroundColor: '#008080',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  }
}); 