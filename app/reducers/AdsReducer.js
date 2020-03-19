let initialState = {
    loading: true,
    ads: '',
    error: ''
};

export default (state = initialState, action) => {
    const result = action.payload;
    switch (action.type) {
        case 'FETCH_ADS_SUCCESS':
            return {
                ...state,
                loading: false,
                ads: result
            };
        case 'FETCH_ADS_ERROR':
            return {
                ...state,
                loading: false,
                error: 'There is something wrong!'
            };
        default:
            return state;
    }
}
