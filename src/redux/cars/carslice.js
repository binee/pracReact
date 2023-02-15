const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
    carsData : [],
    loading: true
}
 const carslice = createSlice({
    name: 'cars',
    initialState,
    //combination action methods.
    reducers:{
        allCarsLoading : (state) => {
            state.loading = (state.loading === true) ? true : false;
        },
        allCarsReceived : (state, {payload}) => {
            state.loading = false;
            state.carData = payload;
        },
    },
    //based on async thunk middleware
    extraReducers: (builder) => {}
 });

 //Export action Methods
 export const {allCarsLoading, allCarsReceived} = carslice.actions;
 
 //Selectors
 export const getAllCars = (state) => state.car.carData;
 export const getLoading = state => state.car.loading;

 export default carslice.reducer;