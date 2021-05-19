
export const codReducer = (state = false, action) => {

    switch (action.type) {
        case "COD_APPLIED":
            return action.payload;
        default:
            return state;
    }
}