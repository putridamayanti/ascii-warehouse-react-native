import React from 'react';
import moment from 'moment';
import { View, StyleSheet } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

import ProductItem from './ProductItem';
import AdsItem from "./AdsItem";

export default class ProductList extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            indexAds: 0,
            ads: []
        }
    }

    static getDerivedStateFromProps(props, state) {
        var ads = [];
        if (props.ads !== '') {
            state.ads.forEach(item => {
                ads.push(item);
            });
            if (ads.indexOf(props.ads) === -1) {
                ads.push(props.ads);
            }
        }
        return {
            ads: ads
        }
    }

    insertAds(index) {
        if (this.state.indexAds < index) {
            this.setState(  {
                indexAds: index+1
            });
            this.props.fetchAds();
        }
    }

    renderAds(index) {
        var ind = Math.floor((Math.random() * this.state.ads.length));
        if ((index + 1) % 20 === 0) {
            return(
                <AdsItem ads={this.state.ads[ind]}/>
            );
        }
        return null;
    }

    render() {
        const { products } = this.props;
        return (
            <View>
                <FlatGrid
                    itemDimension={130}
                    items={products}
                    renderItem={({ item }) => {
                        var itemDate = moment(item.date, "YYYYMMDD").fromNow();

                        if ((i + 1) % 20 === 0) {
                            this.insertAds(i+1);
                        }

                        return [
                            <ProductItem key={i} face={ item.face } size={ item.size } price={ item.price } date={ itemDate }/>,
                            this.renderAds(i)
                        ];
                    }}
                />
            </View>
        );
    }
}
