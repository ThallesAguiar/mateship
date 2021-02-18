import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Keyboard, ActivityIndicator, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/api';
import background from '../../../assets/images/background.jpg';

import { Container, Form, Input, Password, PasswordButton, Background, SubmitButton, ToggleView, Toggle, Coords } from './styles';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMerchant, setIsMerchant] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    async function loadInitialPosition() {
      try {
        const { granted } = await Location.requestPermissionsAsync();

        if (granted) {
          const { coords } = await Location.getCurrentPositionAsync({
            enableHighAccuracy: true,
          });

          const { latitude, longitude } = coords;

          setLatitude(latitude);
          setLongitude(longitude);
        }
      } catch (error) {
        console.warn('ERROR IN LOCATION', error);
        // navigation.navigate('Register');
      }

    };

    loadInitialPosition();

  }, [latitude, longitude]);


  // Methods
  const toggleSwitch = () => setIsMerchant(event => !event);
  const showPassword = () => setIsVisible(event => !event);

  async function registerUser() {

    setLoading(true);

    try {
      const response = await api.post('/users', { name, email, password, provider: isMerchant, latitude, longitude });

      const { token, user } = response.data;

      response.headers.Authorization = `Bearer ${token}`;

      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('token', token);

      setLoading(false);

      if (isMerchant === false) {
        navigation.navigate('Main', { user });
      } else {
        navigation.navigate('RegisterMerchant', { user });
      }
    } catch (error) {
      console.warn("ERROR IN REGISTER", error);
      setLoading(false);
    }
  }

  return (
    <Background source={background} >
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Name"
            onChangeText={text => setName(text)}
            value={name}
          />

          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            value={email}
          />

          <View style={{ flexDirection: 'row', }}>
            <Password
              secureTextEntry={isVisible}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Password"
              onChangeText={text => setPassword(text)}
              value={password}
            />
            <PasswordButton onPress={showPassword}>
              <MaterialIcons name={`${isVisible ? "visibility-off" : "visibility"}`} size={20} color="#FFF" />
            </PasswordButton>
          </View>

          <ToggleView>
            {/* Are you merchant? */}
            Você é comerciante de mercadorias de chimarrão?
            {isMerchant ? ' Yes' : ' No'}
            <Toggle
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isMerchant ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isMerchant}
            />
          </ToggleView>

          {latitude && longitude
            ? <Coords>
              Lat: {latitude}
              <MaterialIcons name="explore" size={15} color="#FFF" />
            Lgt: {longitude}
            </Coords>
            : <Coords>Você precisa fornecer sua localização. Programador, trate esse ERRO.</Coords>}


          <SubmitButton loading={loading} onPress={registerUser}>
            {loading
              ? <ActivityIndicator color="#fff" size={30} />
              : <Text style={{ color: '#fff', fontWeight: 'bold', padding: 10, }}>Register</Text>}
          </SubmitButton>

        </Form>

      </Container>
    </Background>
  );
}



export default Register;