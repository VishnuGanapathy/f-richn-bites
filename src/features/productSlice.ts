import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
    productType: string;
    chocolateBase: string;
    weight: string;
    toppings: string[];
    packaging: string;
    quantity: number;
    productPrice: number; // raw price for the selected product type (no weight multiplier)
    basePrice: number;
    finalPrice: number;
}

const initialState: ProductState = {
    productType: 'bar',
    chocolateBase: 'Milk Chocolate',
    weight: '100g',
    toppings: [],
    packaging: 'Standard Box',
    quantity: 1,
    productPrice: 499,
    basePrice: 499,
    finalPrice: 499,
};

const getWeightMultiplier = (weight: string) => {
    if (weight === '500g') return 4;
    if (weight === '250g') return 2;
    return 1;
};

const calculatePrice = (state: ProductState) => {
    const toppingCost = state.toppings.length * 50;
    const packagingCost = state.packaging === 'Magnetic Box' ? 200 : state.packaging === 'Jar' ? 150 : 0;
    state.basePrice = state.productPrice * getWeightMultiplier(state.weight);
    state.finalPrice = (state.basePrice + toppingCost + packagingCost) * state.quantity;
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProductType: (state, action: PayloadAction<string>) => {
            state.productType = action.payload;
            state.productPrice = action.payload === 'bites' ? 799 : action.payload === 'pops' ? 349 : 499;
            state.toppings = [];
            calculatePrice(state);
        },
        setChocolateBase: (state, action: PayloadAction<string>) => {
            state.chocolateBase = action.payload;
        },
        setWeight: (state, action: PayloadAction<string>) => {
            state.weight = action.payload;
            calculatePrice(state);
        },
        toggleTopping: (state, action: PayloadAction<string>) => {
            const idx = state.toppings.indexOf(action.payload);
            if (idx >= 0) {
                state.toppings.splice(idx, 1);
            } else {
                if (state.toppings.length < 5) state.toppings.push(action.payload); // Max 5 toppings
            }
            calculatePrice(state);
        },
        setPackaging: (state, action: PayloadAction<string>) => {
            state.packaging = action.payload;
            calculatePrice(state);
        },
        setQuantity: (state, action: PayloadAction<number>) => {
            state.quantity = Math.max(1, action.payload);
            calculatePrice(state);
        },
        resetConfig: (state) => {
            return initialState;
        }
    },
});

export const {
    setProductType,
    setChocolateBase,
    setWeight,
    toggleTopping,
    setPackaging,
    setQuantity,
    resetConfig
} = productSlice.actions;

export default productSlice.reducer;
