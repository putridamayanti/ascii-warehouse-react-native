import React from 'react';
import { ScrollView, View, StyleSheet, Image } from 'react-native';
import { Content, Text, Card, CardItem, Body } from 'native-base';

import { connect } from 'react-redux';

import { fetchProducts } from "../actions/ProductAction";
import { fetchAds } from "../actions/AdsAction";

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    header: {
        height: 200,
        textAlign: 'center'
    },
    mainAds: {
        width: 300,
        height: 100
    }
});

class ProductScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ads: '',
            products: []
        }
    }

    componentDidMount() {
        this.props.fetchProducts();
        this.props.fetchAds();
    }

    static getDerivedStateFromProps(props, state) {
        if (state.products.length === 0 || state.sort !== props.sort) {
            return {
                products: props.products
            }
        }

        if (state.ads === '') {
            return {
                ads: props.ads
            }
        }

        return null;
    }

    render() {
        const { products, ads } = this.props;
        return (
            <ScrollView>
                <View style={ styles.container }>
                    <View style={styles.header}>
                        <Text>Products Grid</Text>
                        <Text>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to
                            peruse our selection of ascii faces in an exciting range of sizes and prices.</Text>
                        <Text>But first, a word from our sponsors:</Text>
                        <Image source={ this.state.ads }/>
                        { this.state.ads !== '' && <Image
                            style={ styles.mainAds }
                            source={{ uri:  this.state.ads}}
                        />}
                    </View>

                    <View>
                        { products.map((item, i) => {
                            return(
                                <Card key={i}>
                                    <CardItem>
                                        <Body>
                                        <Text>
                                            { item.face }
                                        </Text>
                                        <Text>
                                            { item.price }
                                        </Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem footer>
                                        <Text>GeekyAnts</Text>
                                    </CardItem>
                                </Card>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {
        ads         : state.adsStore.ads,
        products    : state.productStore.products,
        loading     : state.productStore.loading,
        error       : state.productStore.error
    }
}

export default connect(mapStateToProps, { fetchProducts, fetchAds })(ProductScreen);
