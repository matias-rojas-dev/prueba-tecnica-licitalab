import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { OpportunitiesTable } from '../components'
import { isAfter, parse } from 'date-fns'

export function FollowedOpportunitiesPage() {
  const followedOpportunities = useSelector(
    (state: RootState) => state.followedOpportunities.items
  )

  const { startDate, endDate, type } = useSelector(
    (state: RootState) => state.filters
  )

  const today = new Date()

  const validItems = followedOpportunities.filter((opp) => {
    const close = new Date(opp.close_date)
    return (
      isAfter(close, today) || close.toDateString() === today.toDateString()
    )
  })

  const parsedStartDate = startDate
    ? parse(startDate, 'dd/MM/yyyy', new Date())
    : null
  const parsedEndDate = endDate
    ? parse(endDate, 'dd/MM/yyyy', new Date())
    : null

  const dateFiltered = validItems.filter((opp) => {
    const pubDate = new Date(opp.publish_date)

    const passStart =
      !parsedStartDate ||
      isAfter(pubDate, parsedStartDate) ||
      pubDate.toDateString() === parsedStartDate.toDateString()

    const passEnd =
      !parsedEndDate ||
      isAfter(parsedEndDate, pubDate) ||
      pubDate.toDateString() === parsedEndDate.toDateString()

    return passStart && passEnd
  })

  const typeFiltered = dateFiltered.filter((opp) =>
    type === '' ? true : opp.type === type
  )

  console.log(typeFiltered)
  return (
    <div className="bg-gray-800 p-6 rounded-md">
      {followedOpportunities.length === 0 ? (
        <div className="p-4 text-center text-gray-400">
          No hay oportunidades en seguimiento.
        </div>
      ) : (
        <div>
          <h4 className="text-2xl">
            Hay {followedOpportunities.length} oportunidades que estás siguiendo
          </h4>
          <OpportunitiesTable opportunities={typeFiltered} />
        </div>
      )}
    </div>
  )
}
