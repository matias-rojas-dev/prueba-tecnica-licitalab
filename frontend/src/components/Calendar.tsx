import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { format, parse } from 'date-fns'
import { es } from 'date-fns/locale'
import { esES } from '@mui/x-date-pickers/locales'
import { Dispatch, UnknownAction } from 'redux'

interface Props {
  label: string
  value: string | null // DD/MM/yyyy
  dispatch: Dispatch<UnknownAction>
  actionCreator: (value: string | null) => UnknownAction
}

export function Calendar({ label, value, dispatch, actionCreator }: Props) {
  const parsedDate = value ? parse(value, 'dd/MM/yyyy', new Date()) : null

  const handleChange = (newValue: Date | null) => {
    if (newValue) {
      const formattedDate = format(newValue, 'dd/MM/yyyy')
      dispatch(actionCreator(formattedDate))
    } else {
      dispatch(actionCreator(null))
    }
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={es}
      localeText={
        esES.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          value={parsedDate}
          label={label}
          onChange={handleChange}
          format="dd/MM/yyyy"
          slotProps={{ field: { shouldRespectLeadingZeros: true } }}
          sx={{
            borderRadius: 1,
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  )
}
