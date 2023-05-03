import {configureStore} from "@reduxjs/toolkit";
import {applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from "@redux-devtools/extension";
import thunk from 'redux-thunk';

const {shopItemsReducer} = require("./Reducers/shopItemsReducer");
const {cartReducer} = require("./Reducers/cartReducer");
const {moladReducer} = require("./Reducers/moladReducer");
const {userReducer} = require("./Reducers/userReducer");

const rootReducer = combineReducers({
    'modal': moladReducer,
    'products': shopItemsReducer,
    'cart': cartReducer,
    'user': userReducer,
})

export const store = configureStore(
    { reducer: rootReducer },
    composeWithDevTools(applyMiddleware(thunk))
);