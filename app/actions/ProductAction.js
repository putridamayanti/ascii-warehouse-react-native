import { BASE_URL } from '../constants/Api';

export function fetchProducts(page = 0, sort = 'id') {
    console.log(BASE_URL + 'api/products?limit=10&skip=' + page + '&sort=' + sort);
    return async dispatch => {
        dispatch({
            type: 'FETCH',
        });
        fetch(BASE_URL + 'api/products?limit=10&skip=' + page + '&sort=' + sort)
            .then(result => {
                if (result.status === 200) {
                    return result.json();
                }
            })
            .then(json => {
                dispatch({
                    type: 'FETCH_PRODUCT_SUCCESS',
                    payload: json,
                    sort: sort
                })
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: 'FETCH_PRODUCT_ERROR',
                    payload: error
                })
            })
    }
}
