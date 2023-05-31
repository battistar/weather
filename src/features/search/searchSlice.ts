import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import * as client from 'http/client';
import Location from 'models/Location';

interface SearchState {
  value: string;
  inputValue: string;
  options: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SearchState = {
  value: '',
  inputValue: '',
  options: [],
  status: 'idle',
  error: null,
};

export const fetchOptions = createAsyncThunk(
  'search/fetchOptions',
  async (query: string): Promise<Omit<Location, 'tz_id' | 'localtime_epoch' | 'localtime'>[]> => {
    const response = await client.search(query);

    return response.data;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    reset: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOptions.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchOptions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.options = action.payload.map((location): string => {
          return location.name;
        });
      })
      .addCase(fetchOptions.rejected, (state, action) => {
        state.status = 'failed';
        if (action.error.message) {
          state.error = action.error.message;
        }
      });
  },
});

export const { setSearch, setSearchInput, reset } = searchSlice.actions;

export const selectSearch = (state: RootState): typeof state.search.value => state.search.value;

export const selectSearchInput = (state: RootState): typeof state.search.inputValue => state.search.inputValue;

export const selectOptions = (state: RootState): typeof state.search.options => state.search.options;

export const selectStatus = (state: RootState): typeof state.search.status => state.search.status;

export const selectError = (state: RootState): typeof state.search.error => state.search.error;

export default searchSlice.reducer;
