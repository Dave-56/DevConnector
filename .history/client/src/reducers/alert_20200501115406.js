import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initiaState = [];

export default function(state = initiaState, action) {
    const { type, payload } = action;

    switch(type) {
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert !== payload);
    }
}