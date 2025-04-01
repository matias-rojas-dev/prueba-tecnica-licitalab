import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOpportunity } from '../../../interfaces/opportunity.interface'

interface Props {
  items: IOpportunity[]
}

const initialState: Props = {
  items: [],
}

const followedOpportunitiesSlice = createSlice({
  name: 'followedOpportunities',
  initialState,
  reducers: {
    setAllFollowedOpportunities(state, action: PayloadAction<IOpportunity[]>) {
      state.items = action.payload
    },
    follow(state, action) {
      const opportunity = action.payload
      const exists = state.items.find((opp) => opp.id === opportunity.id)
      if (!exists)
        state.items.push({
          ...opportunity,
          is_followed: true,
        })
    },
    unfollow(state, action) {
      const opportunity = action.payload
      state.items = state.items.filter((opp) => opp.id !== opportunity.id)
      return state
    },
  },
})

export const { follow, unfollow, setAllFollowedOpportunities } =
  followedOpportunitiesSlice.actions
export default followedOpportunitiesSlice.reducer
