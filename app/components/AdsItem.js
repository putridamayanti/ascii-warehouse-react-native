import React from 'react';
import { Card } from 'native-base';
import {Image} from "react-native";

export default class AdsItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ads: []
        }
    }

    render() {
        const { ads } = this.props;

        return (
            <Card style={{ height: 150, marginBottom: 15 }}>
                <Card.Body>
                    <Image
                        style={{ height: '100%'}}
                        source={{ uri: ads}}
                    />
                </Card.Body>
            </Card>
        );
    }
}
