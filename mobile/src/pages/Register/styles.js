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
    border-color: #eee;
    flex: 1;
    /* flex-direction: column; */
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#999'
})`
    height: 40px;
    background: rgba(0,0,0,0.4);
    border-radius:4px;
    padding: 0 15px;
    border: 1px solid #eee;
    margin-bottom: 30px;
    color: #FFF;
`;

export const Password = styled.TextInput.attrs({
    // editar como JS e não CSS
    placeholderTextColor: '#999'
})`
    /* flex:1; */
    width: 260px;
    height: 40px;
    background: rgba(0,0,0,0.4);
    border-radius:4px;
    padding: 0 15px;
    border: 1px solid #eee;
    margin-bottom: 30px;
    color: #FFF;
`;

export const PasswordButton = styled(RectButton)`
    justify-content: center;
    align-items: center;
    width:40px;
    height: 40px;
    background: rgba(0,0,0,0.4);
    border-radius: 4px;
`;

export const ToggleView = styled.Text`
    flex-direction: row;
    color: #999;
    font-weight: bold;
    background: rgba(0,0,0,0.4);
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 10px;
    border: 1px solid #eee;
`;

export const Toggle = styled.Switch`
    padding: 0 60px;
`;

export const Coords = styled.Text`
    font-size:8px;
    color: #fff;
    background: rgba(0,0,0,0.6);
    text-align: center;
    border-radius: 4px;
    border: 1px solid #eee;
    margin-bottom: 10px;
    /* padding: 5px; */
`;

export const SubmitButton = styled(RectButton)`
    justify-content: center;
    align-items: center;
    background: teal;
    border-radius: 4px;
    padding: 0 12px;
    /* opacity: ${props => props.loading ? 0.7 : 1}; */
`;