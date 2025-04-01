import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOpportunity } from '../../../interfaces/opportunity.interface'

interface AllOpportunitiesState {
  items: IOpportunity[]
}

const initialState: AllOpportunitiesState = {
  items: [],
}

const allOpportunitiesSlice = createSlice({
  name: 'allOpportunities',
  initialState,
  reducers: {
    toggleFollow(state, action: PayloadAction<number>) {
      const id = action.payload
      state.items = state.items.map((opp) =>
        opp.id === id ? { ...opp, is_followed: !opp.is_followed } : opp
      )
    },
    setAllOpportunities(state, action: PayloadAction<IOpportunity[]>) {
      state.items = action.payload
    },
  },
})

export const { toggleFollow, setAllOpportunities } =
  allOpportunitiesSlice.actions
export default allOpportunitiesSlice.reducer
