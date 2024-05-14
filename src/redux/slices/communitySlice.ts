// store.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormInput } from '../../types/communityTypes';

interface CommunityState {
  feed: IFormInput | null;
}

const initialState: CommunityState = {
  feed: null,
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setFeed(state, action: PayloadAction<IFormInput>) {
      state.feed = action.payload;
    },
    // 폼 데이터 받아와 스토어에 저장
    submitFeed(state, action: PayloadAction<IFormInput>) {
      state.feed = action.payload;
    },
  },
});

export const { setFeed, submitFeed } = communitySlice.actions;
export default communitySlice.reducer;