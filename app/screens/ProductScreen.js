import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Content, Text, Picker, Icon } from 'native-base';

import { connect } from 'react-redux';

import { fetchProducts } from '../actions/ProductAction';
import { fetchAds } from "../actions/AdsAction";

import ProductList from '../components/ProductList';
import Loading from '../components/Loading';
import EndCatalogue from '../components/EndCatalogue';

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    header: {
        flex: 1,
        padding: 15,
        height: 350,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c9eb34'
    },
    mainAds: {
        width: 200,
        height: 100,
    },
});

class ProductScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ads: '',
            page: 0,
            sort: 'id',
            products: [],
            end: false
        }
    }

    componentDidMount() {
        this.props.fetchProducts();
        this.props.fetchAds();
    }

    static getDerivedStateFromProps(props, state) {
        let newState = state;
        if (state.ads === '') {
            newState.ads = props.ads;
        }

        if (props.products.length === 0) {
            newState.end    = true;
        } else {
            newState.end    = false;
            if (state.products.length === 0 || state.sort !== props.sort) {
                newState.products   = props.products;
                newState.page       = state.page + 1;
            } else {
                const products = [];
                state.products.forEach(item => {
                    products.push(item);
                });
                props.products.forEach(item => {
                    products.push(item);
                });
                newState.products   = products;
                newState.page       = state.page + 1;
            }
        }

        return newState;
    }

    isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
    }

    onValueChange(value: string) {
        this.props.fetchProducts(0, value);
        this.setState({
            products: [],
            sort: value,
            page: 0
        });
    }

    render() {
        return (
            <Content onScroll={({ nativeEvent }) => {
                if (this.isCloseToBottom(nativeEvent)) {
                    this.props.fetchProducts(this.state.page, this.state.sort);
                }
            }}>
                <View style={ styles.container }>
                    <View style={styles.header}>
                        <Text style={{ fontSize: 16, margin: 15}}>Products Grid</Text>
                        <Text style={{ textAlign: 'center' }}>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to
                            peruse our selection of ascii faces in an exciting range of sizes and prices.</Text>
                        <Text style={{ marginVertical: 15 }}>But first, a word from our sponsors:</Text>
                        { this.state.ads !== '' && <Image
                            style={ styles.mainAds }
                            source={{ uri:  this.state.ads}}
                        />}
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text>Sort By :</Text>
                        <Picker
                            mode="dropdown"
                            iosHeader="Sort By"
                            style={{ width: undefined, borderWidth: 1, borderColor: '#ccc', borderStyle: 'solid' }}
                            selectedValue={this.state.sort}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label="Id" value="id" />
                            <Picker.Item label="Size" value="size" />
                            <Picker.Item label="Price" value="price" />
                        </Picker>
                    </View>

                    <View>
                        <ProductList products={ this.state.products }/>
                        { this.props.loading && <Loading/> }
                        { this.state.end && <EndCatalogue/> }
                    </View>
                </View>
            </Content>
        );
    }
}

function mapStateToProps(state) {
    return {
        ads         : state.adsStore.ads,
        products    : state.productStore.products,
        sort        : state.productStore.sort,
        loading     : state.productStore.loading,
        error       : state.productStore.error
    }
}

export default connect(mapStateToProps, { fetchProducts, fetchAds })(ProductScreen);
