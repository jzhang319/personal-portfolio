import React, { createContext, useReducer, useContext } from "react";
import { appReducer } from "./appReducer";

const initialState = {
    blurredBg: false,
};

const AppContext = createContext(initialState);

const appActions = (dispatch) => {
    return {
        setBlurred: (value) =>
            dispatch({ type: "SET_BLURRED", payload: value }),
    };
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const actions = appActions(dispatch);
    return (
        <AppContext.Provider value={{ ...state, ...actions }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, AppContext, useAppContext };
