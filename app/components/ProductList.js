import React from 'react';
import moment from 'moment';
import {View, Image} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

import ProductItem from './ProductItem';
import {connect} from "react-redux";
import {fetchAds} from "../actions/AdsAction";

class ProductList extends React.Component{

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

    render() {
        const { products } = this.props;
        return (
            <View>
                <FlatGrid
                    itemDimension={130}
                    items={products}
                    renderItem={({ index, item }) => {
                        var newDate = new Date(item.date);
                        var itemDate = moment(newDate, "YYYYMMDD").fromNow();

                        var ind = Math.floor((Math.random() * this.state.ads.length));
                        if ((index + 1) % 20 === 0) {
                            this.insertAds(index+1);
                            return (
                                <View key={index}>
                                    <Image source={{ uri: this.state.ads[ind] }} style={{ width: '100%', height: 130}}/>
                                </View>
                            )
                        }

                        return (
                            <View key={index}>
                                <ProductItem face={ item.face } size={ item.size } price={ item.price } date={ itemDate }/>
                            </View>
                        );
                    }}
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        ads         : state.adsStore.ads,
        loading     : state.productStore.loading,
        error       : state.productStore.error
    }
}

export default connect(mapStateToProps, { fetchAds })(ProductList);

