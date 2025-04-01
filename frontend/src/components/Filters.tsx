import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  Chip,
  Divider,
  Tooltip,
  OutlinedInput,
} from '@mui/material'
import { FilterAlt, CalendarMonth, Clear, Refresh } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import {
  resetFilters,
  setEndDate,
  setStartDate,
  setType,
} from '../app/features/filter/filtersSlice'
import { Calendar } from './index'

export function Filters() {
  const dispatch = useDispatch()
  const { startDate, endDate, type } = useSelector(
    (state: RootState) => state.filters
  )
  return (
    <Box
      borderRadius={2}
      marginTop={2}
      padding={3}
      marginBottom={3}
      sx={{
        backgroundColor: 'rgb(31, 41, 55)',
        mx: {
          xs: 1,
          md: 20,
        },
      }}
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        marginBottom={2}
        flexWrap={'wrap'}
        gap={2}
      >
        <Box display="flex" alignItems="center">
          <FilterAlt sx={{ color: 'rgb(156, 163, 175)', mr: 1 }} />
          <Typography
            variant="h6"
            sx={{ color: 'rgb(229, 231, 235)', fontWeight: 600 }}
          >
            Filtros
          </Typography>
          <Chip label="3" size="small" color="primary" sx={{ ml: 1 }} />
        </Box>

        <Tooltip title="Limpiar todos los filtros">
          <Button
            startIcon={<Refresh />}
            size="small"
            onClick={() => dispatch(resetFilters())}
            sx={{
              color: 'rgb(209, 213, 219)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            Limpiar filtros
          </Button>
        </Tooltip>
      </Box>

      <Divider sx={{ borderColor: 'rgba(229, 231, 235, 0.1)', mb: 3 }} />

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
        }}
      >
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'rgb(209, 213, 219)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <CalendarMonth fontSize="small" sx={{ mr: 0.5 }} />
            Rango de fecha (publicación)
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Calendar
              label="Fecha Inicio"
              value={startDate || ''}
              dispatch={dispatch}
              actionCreator={setStartDate}
            />
            <Calendar
              label="Fecha Fin"
              value={endDate || ''}
              dispatch={dispatch}
              actionCreator={setEndDate}
            />

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant="outlined"
                startIcon={<Clear />}
                size="large"
                onClick={() => {
                  dispatch(setStartDate(null))
                  dispatch(setEndDate(null))
                }}
              >
                Limpiar fechas
              </Button>
            </Box>
          </Box>
        </Box>

        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'rgb(209, 213, 219)',
              mb: 1,
            }}
          >
            Tipo de oportunidad
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: 'rgb(156, 163, 175)' }}>Tipo</InputLabel>
              <Select
                input={<OutlinedInput label="Tipo" />}
                sx={{
                  backgroundColor: 'rgb(55, 65, 81)',
                  color: '#fff',
                }}
                value={type}
                onChange={(e) => dispatch(setType(e.target.value))}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="tender">Tender</MenuItem>
                <MenuItem value="agile">Agile</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<Clear />}
              size="small"
              onClick={() => dispatch(setType(''))}
            >
              Limpiar tipo
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
