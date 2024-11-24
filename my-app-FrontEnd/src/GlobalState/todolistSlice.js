import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const todolistSlice = createSlice({
  name: "todolist",
  initialState,
  reducers: {
    getTitle(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    DeadLineDateGet(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;

        state.balance += state.loan;
      },
    },
    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;
