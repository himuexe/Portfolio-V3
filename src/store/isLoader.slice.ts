import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";

interface IsLoaderState {
  active: boolean;
}

const initialState: IsLoaderState = {
  active: true,
};

export const isLoaderSlice = createSlice({
  name: "isLoader",
  initialState,
  reducers: {
    toggleIsLoader: (state) => {
      return { ...state, active: !state.active };
    },
    setLoaderActive: (state, action: PayloadAction<boolean>) => {
      return { ...state, active: action.payload };
    }
  },
});

export const { toggleIsLoader, setLoaderActive } = isLoaderSlice.actions;

export const useIsLoaderFromStore = () => {
  const isLoader = useSelector((state: RootState) => state.isLoader);
  const dispatch = useDispatch();
  const dispatchToggleIsLoader = () => dispatch(toggleIsLoader());
  const dispatchSetLoaderActive = (active: boolean) => dispatch(setLoaderActive(active));
  
  return { isLoader, dispatchToggleIsLoader, dispatchSetLoaderActive };
};

export default isLoaderSlice.reducer; 