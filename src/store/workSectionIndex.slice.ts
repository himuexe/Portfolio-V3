import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";

interface WorkSectionIndexState {
  value: number;
}

const initialState: WorkSectionIndexState = {
  value: 0,
};

export const workSectionIndexSlice = createSlice({
  name: "workSectionIndex",
  initialState,
  reducers: {
    setWorkSectionIndex: (state, action: PayloadAction<number>) => {
      return { ...state, value: action.payload };
    },
  },
});

export const { setWorkSectionIndex } = workSectionIndexSlice.actions;

export const useWorkSectionIndexFromStore = () => {
  const workSectionIndex = useSelector((state: RootState) => state.workSectionIndex);
  const dispatch = useDispatch();
  const dispatchSetWorkSectionIndex = (index: number) => dispatch(setWorkSectionIndex(index));
  return { workSectionIndex, dispatchSetWorkSectionIndex };
};

export default workSectionIndexSlice.reducer; 