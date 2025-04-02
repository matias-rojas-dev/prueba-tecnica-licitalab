import { parse } from 'date-fns'

export function parseDateRange(
  startDate?: string,
  endDate?: string,
  formatString: string = 'dd/MM/yyyy'
): { parsedStartDate: Date | null; parsedEndDate: Date | null } {
  const parsedStartDate = startDate
    ? parse(startDate, formatString, new Date())
    : null
  const parsedEndDate = endDate
    ? parse(endDate, formatString, new Date())
    : null

  return { parsedStartDate, parsedEndDate }
}
