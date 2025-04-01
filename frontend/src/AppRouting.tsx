import { Route, Routes } from 'react-router-dom'
import { SideNav } from './components/SideNav'
import { FollowedOpportunitiesPage, OpportunitiesPage } from './pages'
import { Grid } from '@mui/material'
import { Filters } from './components'
import { useEffect } from 'react'
import { getAllOpportunities, getFollowedOpportunities } from './api'
import { useDispatch } from 'react-redux'
import { setAllOpportunities } from './app/features/opportunity/allOpportunitiesSlice'
import { setAllFollowedOpportunities } from './app/features/opportunity/followedOpportunitiesSlice'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchGetAllOpportunities = async () => {
      const response = await getAllOpportunities()
      dispatch(setAllOpportunities(response))
    }
    fetchGetAllOpportunities()
  }, [])

  useEffect(() => {
    const fetchGetAllOpportunities = async () => {
      try {
        const response = await getFollowedOpportunities()
        dispatch(setAllFollowedOpportunities(response))
      } catch (error) {
        console.log(error)
      }
    }
    fetchGetAllOpportunities()
  }, [])

  return (
    <>
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
    </>
  )
}

export default App
