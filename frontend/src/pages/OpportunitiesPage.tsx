import { useSelector } from 'react-redux'
import { isAfter, parse } from 'date-fns'
import { OpportunitiesTable } from '../components'
import { RootState } from '../app/store'

export function OpportunitiesPage() {
  const allOpportunities = useSelector(
    (state: RootState) => state.allOpportunities.items
  )

  const { startDate, endDate, type } = useSelector(
    (state: RootState) => state.filters
  )

  const today = new Date()

  const validItems = allOpportunities.filter((opp) => {
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
    <div>
      <h4 className="text-2xl">
        Se han encontrado {typeFiltered.length} oportunidades
      </h4>
      <OpportunitiesTable opportunities={typeFiltered} />
    </div>
  )
}
