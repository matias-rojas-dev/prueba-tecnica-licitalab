import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FiltersState {
  startDate: string | null
  endDate: string | null
  type: string
}

const initialState: FiltersState = {
  startDate: null,
  endDate: null,
  type: '',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStartDate(state, action: PayloadAction<string | null>) {
      state.startDate = action.payload
    },
    setEndDate(state, action: PayloadAction<string | null>) {
      state.endDate = action.payload
    },
    setType(state, action: PayloadAction<string>) {
      state.type = action.payload
    },
    resetFilters(state) {
      state.startDate = null
      state.endDate = null
      state.type = ''
    },
  },
})

export const { setStartDate, setEndDate, setType, resetFilters } =
  filtersSlice.actions
export default filtersSlice.reducer
