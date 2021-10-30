import { combineReducers } from "redux";

import user from "./user";
import cart from "./cart";
// import wishlist from "./wishlist";

const rootReducers = combineReducers({user, cart});

export default rootReducers;