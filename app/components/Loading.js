import React from 'react';
import { View } from 'react-native';
import { Spinner } from "native-base";


export default class Loading extends React.Component{
    render() {
        return (
            <View style={{ justifyContent: 'center'}}>
                <Spinner color='green' />
            </View>
        );
    }
}
