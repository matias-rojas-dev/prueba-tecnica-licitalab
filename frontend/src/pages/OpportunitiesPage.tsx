import { useSelector } from 'react-redux'
import { Loading, OpportunitiesTable } from '../components'
import { RootState } from '../app/store'
import { dateFiltered } from '../utils/dateFiltered'
import { parseDateRange } from '../utils/parsedDates'

export function OpportunitiesPage() {
  const { items, loading } = useSelector(
    (state: RootState) => state.allOpportunities
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

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <h4 className="text-2xl">
        Se han encontrado {typeFiltered.length} oportunidades
      </h4>
      {typeFiltered.length === 0 && (
        <h4 className="text-2xl">No se han encontrado oportunidades</h4>
      )}
      <OpportunitiesTable opportunities={typeFiltered} />
    </div>
  )
}
