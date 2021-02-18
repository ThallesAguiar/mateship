import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';


export const Background = styled.ImageBackground.attrs({
    resizeMode: "cover",
})`
  flex: 1;
  justify-content: center;
`;

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const Form = styled.View`
    /* flex-direction: row;
    padding-bottom: 20px;
    border-bottom-width: 1px; */
    border-color: #eee;
    /* background-color: red; */
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#999'
})`
    /* flex:1; */
    height: 40px;
    background: rgba(0,0,0,0.4);
    border-radius:4px;
    padding: 0 15px;
    border: 1px solid #eee;
    margin-bottom: 30px;
`;

export const SubmitButton = styled(RectButton)`
    justify-content: center;
    align-items: center;
    background: teal;
    border-radius: 4px;
    padding: 0 12px;
    /* opacity: ${props => props.loading ? 0.7 : 1}; */
`;

export const RegisterText = styled.Text`
    color: #FFF;
    padding-top: 20px;
`;

export const RegisterButton = styled(RectButton)`
    width: 121px;
    justify-content: center;
    align-items: center;
    background: #1e90ff;
    border-radius: 4px;
    padding: 0 15px;
    /* opacity: ${props => props.loading ? 0.7 : 1}; */
`;

export const RegisterButtonText = styled.Text`
    color: #FFF;
    padding: 5px;
`;