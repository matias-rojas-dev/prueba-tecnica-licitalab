import { Box, Pagination } from '@mui/material'

interface Props {
  total: number
  currentPage: number
  rowsPerPage: number
  totalPages: number
  setCurrentPage: (value: number) => void
}

export function PaginationTable({
  total,
  currentPage,
  rowsPerPage,
  totalPages,
  setCurrentPage,
}: Props) {
  return (
    <Box
      marginY={2}
      display={'flex'}
      alignItems={'end'}
      flexDirection={'column'}
    >
      <Box>
        {`${total} Resultados encontrados | Mostrando del ${
          1 + (currentPage - 1) * rowsPerPage
        } al ${Math.min(
          currentPage * rowsPerPage,
          total
        )} | Página ${currentPage} de ${totalPages}`}
      </Box>
      <Box>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, value) => setCurrentPage(value)}
          sx={{
            '& .MuiPaginationItem-root': {
              borderRadius: '50%',
              margin: '0 4px',
              color: 'white',
            },
            '& .MuiPaginationItem-root.Mui-selected': {
              backgroundColor: 'primary.main',
            },
            '& .MuiPaginationItem-root:hover': {
              backgroundColor: 'primary.light',
            },
          }}
        />
      </Box>
    </Box>
  )
}
