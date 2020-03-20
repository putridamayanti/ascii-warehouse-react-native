import React from 'react';
import { View, StyleSheet } from 'react-native';
import {Body, Card, CardItem, Text} from "native-base";

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default class ProductItem extends React.Component{
    render() {
        const { face, price, size, date } = this.props;
        return (
            <Card>
                <CardItem>
                    <Body>
                    <Text>
                        { face }
                    </Text>
                    <Text>
                        { price }
                    </Text>
                    <Text>
                        Size : { size }
                    </Text>
                    </Body>
                </CardItem>
                <CardItem footer style={styles.footer}>
                    <Text>{ date }</Text>
                </CardItem>
            </Card>
        );
    }
}
