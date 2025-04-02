import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOpportunity } from '../../../interfaces/opportunity.interface'

interface Props {
  items: IOpportunity[]
  loadingFollowedOpportunities: boolean
}

const initialState: Props = {
  items: [],
  loadingFollowedOpportunities: false,
}

const followedOpportunitiesSlice = createSlice({
  name: 'followedOpportunities',
  initialState,
  reducers: {
    setLoadingFollowedOpportunities(state, action: PayloadAction<boolean>) {
      state.loadingFollowedOpportunities = action.payload
    },
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

export const {
  follow,
  unfollow,
  setAllFollowedOpportunities,
  setLoadingFollowedOpportunities,
} = followedOpportunitiesSlice.actions
export default followedOpportunitiesSlice.reducer
