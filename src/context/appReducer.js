export const appReducer = (state, action) => {
    switch (action.type) {
        case "SET_BLURRED":
            typeof window !== "undefined"
                ? localStorage.setItem("IS_BLURRED", action.payload)
                : null;
            return { ...state, blurredBg: action.payload };

        default:
            return state;
    }
};
