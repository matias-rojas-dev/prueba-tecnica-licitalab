import { isAfter } from 'date-fns'
import { IOpportunity } from '../interfaces/opportunity.interface'

interface DateFilterProps {
  items: IOpportunity[]
  parsedStartDate: Date | null
  parsedEndDate: Date | null
}

export const dateFiltered = ({
  items,
  parsedStartDate,
  parsedEndDate,
}: DateFilterProps): IOpportunity[] => {
  return items.filter((opp) => {
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
}
