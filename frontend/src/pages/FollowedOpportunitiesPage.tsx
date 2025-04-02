import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { Loading, OpportunitiesTable } from '../components'
import { dateFiltered } from '../utils/dateFiltered'
import { parseDateRange } from '../utils/parsedDates'

export function FollowedOpportunitiesPage() {
  const { items, loadingFollowedOpportunities } = useSelector(
    (state: RootState) => state.followedOpportunities
  )

  const { startDate, endDate, type } = useSelector(
    (state: RootState) => state.filters
  )

  const { parsedStartDate, parsedEndDate } = parseDateRange(
    startDate!,
    endDate!
  )

  const filteredItems = dateFiltered({
    items,
    parsedStartDate,
    parsedEndDate,
  })

  const typeFiltered = filteredItems.filter((opp) =>
    type === '' ? true : opp.type === type
  )

  if (loadingFollowedOpportunities) {
    return <Loading />
  }
  return (
    <div className="bg-gray-800 p-6 rounded-md">
      {items.length === 0 ? (
        <div className="p-4 text-center text-gray-400">
          No hay oportunidades en seguimiento.
        </div>
      ) : (
        <div>
          <h4 className="text-2xl">
            Hay {items.length} oportunidades que estás siguiendo
          </h4>
          <OpportunitiesTable opportunities={typeFiltered} />
        </div>
      )}
    </div>
  )
}
