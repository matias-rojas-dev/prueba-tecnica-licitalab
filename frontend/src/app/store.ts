import { configureStore } from '@reduxjs/toolkit'
import allOpportunitiesReducer from './features/opportunity/allOpportunitiesSlice'
import followedOpportunitiesReducer from './features/opportunity/followedOpportunitiesSlice'
import filtersReducer from './features/filter/filtersSlice'

export const store = configureStore({
  reducer: {
    allOpportunities: allOpportunitiesReducer,
    followedOpportunities: followedOpportunitiesReducer,
    filters: filtersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
