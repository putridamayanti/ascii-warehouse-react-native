let initialState = {
    loading: true,
    products: [],
    error: ''
};

export default (state = initialState, action) => {
    const result = action.payload;

    switch (action.type) {
        case 'FETCH_PRODUCT':
            return {
                ...state,
                loading: true
            };
        case 'FETCH_PRODUCT_SUCCESS':
            return {
                ...state,
                loading: false,
                products: result,
                sort: action.sort
            };
        case 'FETCH_PRODUCT_ERROR':
            return {
                ...state,
                loading: false,
                error: 'There is something wrong!'
            };
        default:
            return state;
    }
}
