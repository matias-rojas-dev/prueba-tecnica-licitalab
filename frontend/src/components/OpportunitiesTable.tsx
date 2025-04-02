import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TableContainer,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { IOpportunity } from '../interfaces/opportunity.interface'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import {
  follow,
  unfollow,
} from '../app/features/opportunity/followedOpportunitiesSlice'
import { toggleFollow } from '../app/features/opportunity/allOpportunitiesSlice'
import { updateFollowedOpportunity } from '../api'
import { format, parseISO } from 'date-fns'
import { PaginationTable } from './PaginationTable'
import { useState } from 'react'

interface Props {
  opportunities: IOpportunity[]
}

export function OpportunitiesTable({ opportunities }: Props) {
  const dispatch = useDispatch()
  const [loadingId, setLoadingId] = useState<number | null>(null)

  const handleToggleFollow = async (opp: IOpportunity) => {
    setLoadingId(opp.id)
    try {
      await updateFollowedOpportunity(opp.id)
      dispatch(toggleFollow(opp.id))
      if (opp.is_followed) {
        dispatch(unfollow(opp))
      } else {
        dispatch(follow(opp))
      }
    } catch (error) {
      console.error('Error al actualizar el seguimiento:', error)
    } finally {
      setLoadingId(null)
    }
  }

  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5
  const total = opportunities.length
  const totalPages = Math.ceil(total / rowsPerPage)
  const opportunitiesOnPage = opportunities.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )
  return (
    <Box>
      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: 'rgb(31, 41, 55)',
              }}
            >
              <TableCell sx={{ color: '#E5E7EB', fontWeight: 600 }}>
                Título
              </TableCell>
              <TableCell
                sx={{ color: '#E5E7EB', fontWeight: 600, textAlign: 'center' }}
              >
                Tipo
              </TableCell>
              <TableCell
                sx={{ color: '#E5E7EB', fontWeight: 600, textAlign: 'center' }}
              >
                Fecha Publicación
              </TableCell>
              <TableCell
                sx={{ color: '#E5E7EB', fontWeight: 600, textAlign: 'center' }}
              >
                Fecha Cierre
              </TableCell>
              <TableCell
                sx={{ color: '#E5E7EB', fontWeight: 600, textAlign: 'center' }}
              >
                Acción
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {opportunitiesOnPage.map((opp) => (
              <TableRow
                key={opp.id}
                hover
                sx={{
                  '&:last-child td, &:last-child th': { borderBottom: 0 },
                }}
              >
                <TableCell>{opp.title}</TableCell>
                <TableCell
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      textTransform: 'capitalize',
                      bgcolor: opp.type === 'tender' ? '#ef4444' : '#3b82f6',
                      p: 1,
                      borderRadius: 2,
                      fontWeight: 600,
                    }}
                  >
                    {opp.type}
                  </Typography>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {format(parseISO(opp.publish_date), 'dd/MM/yyyy')}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {format(parseISO(opp.close_date), 'dd/MM/yyyy')}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {loadingId === opp.id ? (
                    <Button
                      variant={'outlined'}
                      color={'primary'}
                      disabled
                      sx={{
                        textTransform: 'none',
                        minWidth: 160,
                      }}
                    >
                      <CircularProgress size={25} />
                    </Button>
                  ) : (
                    <Button
                      variant={opp.is_followed ? 'contained' : 'outlined'}
                      color={opp.is_followed ? 'success' : 'primary'}
                      startIcon={
                        opp.is_followed ? (
                          <FavoriteIcon />
                        ) : (
                          <FavoriteBorderIcon sx={{ color: 'inherit' }} />
                        )
                      }
                      onClick={() => handleToggleFollow(opp)}
                      sx={{
                        textTransform: 'none',
                        minWidth: 160,
                      }}
                    >
                      {opp.is_followed ? 'En seguimiento' : 'Seguir'}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}

            {opportunities.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>
                  <Box display="flex" justifyContent="center" py={4}>
                    <Typography color="text.secondary">
                      No hay oportunidades disponibles
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <PaginationTable
        total={total}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  )
}
