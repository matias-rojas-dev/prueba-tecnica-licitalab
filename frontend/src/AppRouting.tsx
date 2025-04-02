import { Route, Routes } from 'react-router-dom'
import { SideNav } from './components/SideNav'
import { FollowedOpportunitiesPage, OpportunitiesPage } from './pages'
import { Grid } from '@mui/material'
import { Filters } from './components'
import { Fragment, useEffect } from 'react'
import { getAllOpportunities, getFollowedOpportunities } from './api'
import { useDispatch } from 'react-redux'
import {
  setAllOpportunities,
  setLoading,
} from './app/features/opportunity/allOpportunitiesSlice'
import {
  setAllFollowedOpportunities,
  setLoadingFollowedOpportunities,
} from './app/features/opportunity/followedOpportunitiesSlice'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchGetAllOpportunities = async () => {
      dispatch(setLoading(true))
      try {
        const response = await getAllOpportunities()
        dispatch(setAllOpportunities(response))
      } catch (error) {
        console.log(error)
      } finally {
        dispatch(setLoading(false))
      }
    }
    fetchGetAllOpportunities()
  }, [dispatch])

  useEffect(() => {
    const fetchGetFollowedOpportunities = async () => {
      dispatch(setLoadingFollowedOpportunities(true))
      try {
        const response = await getFollowedOpportunities()
        dispatch(setAllFollowedOpportunities(response))
      } catch (error) {
        console.log(error)
      } finally {
        dispatch(setLoadingFollowedOpportunities(false))
      }
    }
    fetchGetFollowedOpportunities()
  }, [dispatch])

  return (
    <Fragment>
      <SideNav />
      <Filters />
      <Grid
        mx={{
          xs: 1,
          md: 20,
        }}
      >
        <Routes>
          <Route path="/" element={<OpportunitiesPage />} />
          <Route path="/seguimiento" element={<FollowedOpportunitiesPage />} />
        </Routes>
      </Grid>
    </Fragment>
  )
}

export default App
