import React, { useState } from 'react';
import { Keyboard, ActivityIndicator, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import background from '../../../assets/images/background.jpg';

import { Container, Form, Input, Background, SubmitButton, RegisterText, RegisterButton, RegisterButtonText } from './styles';

const Login = ({ navigation }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  // methods
  function newRegistration() {
    // console.warn("Registracion");
    navigation.navigate('Register');
  }

  return (
    <Background source={background} >
      <Container>
        <Text style={{ color: '#FFF', paddingBottom: 10, textAlign: 'center', fontSize: 15 }}>
          BEM-VINDO AO MATESHIP
        </Text>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Name / email"
          />
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Password"
          />

          <SubmitButton loading={loading}>
            {loading ? <ActivityIndicator color="#fff" size={30} /> : <Text style={{ color: '#fff', fontWeight: 'bold', padding: 10, }}>Login</Text>}
          </SubmitButton>

        </Form>

        <RegisterText>Don't have an account?</RegisterText>
        <RegisterButton onPress={newRegistration}>
          <RegisterButtonText>Register</RegisterButtonText>
        </RegisterButton>

      </Container>
    </Background>
  );
}



export default Login;