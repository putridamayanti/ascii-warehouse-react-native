import { BASE_URL } from '../constants/Api';

export function fetchAds() {

    let r = Math.floor(Math.random()*1000);

    return async dispatch => {
        fetch(BASE_URL + 'ads?r=' + r)
            .then(result => {
                if (result.status === 200) {
                    dispatch({
                        type: 'FETCH_ADS_SUCCESS',
                        payload: result.url
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: 'FETCH_ADS_ERROR',
                    payload: error
                })
            })
    }
}
