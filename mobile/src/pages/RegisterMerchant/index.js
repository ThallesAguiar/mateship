import React, { Component, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { StyleSheet, Text, TextInput, View, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { RectButton } from 'react-native-gesture-handler';
import { onlyNumbering } from '../../utils/onlyNumbering';

export default class RegisterMerchant extends Component {

  state = {
    user: {},
    token: '',
    company: {
      name: '',
      description: '',
      storeType: 'fixed'
    },
    photo: '',
    isBusiness: {
      value: 'Business',
      numbering: ''
    },
    loading: false,
    hasPermission: null,
    type: Camera.Constants.Type.back,
  }
  async componentDidMount() {
    // const user = await AsyncStorage.getItem('user');
    // const token = await AsyncStorage.getItem('token');

    // this.setState({ user: JSON.parse(user), token });
  }

  register = async () => {
    const { user, token, photo, company, isBusiness } = this.state;
    // const {numbering} = isBusiness
    isBusiness.numbering = onlyNumbering(isBusiness.numbering);
    console.log(company, isBusiness);
  }

  takePicture = () => {
    console.warn('Tirou foto!');
  }

  render() {

    const { user, token, photo, company, isBusiness, loading } = this.state;

    return (
      <ScrollView>
        <View style={style.container}>
          <View style={style.pictureContainer} >
            <RectButton style={style.pictureIcon} onPress={this.takePicture}>
              <MaterialIcons name='add-a-photo' color='#FFF' size={50} />
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
            selectedValue={company.storeType}
            onValueChange={(itemValue) => this.setState({ company: { ...company, storeType: itemValue } })}
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

  pictureIcon: {
    // height: 100,
    // width: 100,
    padding: 50,
    borderRadius: 100,
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