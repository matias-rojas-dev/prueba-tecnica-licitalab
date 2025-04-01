import { AppBar, Toolbar, Button, Badge } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { RootState } from '../app/store'

type PathsProps = {
  name: string
  href: string
}

const PATHS: PathsProps[] = [
  {
    name: 'Todas las Oportunidades',
    href: '/',
  },
  {
    name: 'En Seguimiento',
    href: '/seguimiento',
  },
]

export function SideNav() {
  const { pathname } = useLocation()

  const followedOpportunities = useSelector(
    (state: RootState) => state.followedOpportunities.items
  )

  return (
    <AppBar
      position="static"
      sx={{
        mx: {
          xs: 0,
        },
        py: 2,
      }}
    >
      <Toolbar
        sx={{
          ml: {
            xs: 0,
            md: 20,
          },
        }}
      >
        {PATHS.map(({ name, href }) => {
          const isActive = pathname === href
          const isSeguimiento = href === '/seguimiento'

          const content = (
            <Button
              key={name}
              component={Link}
              to={href}
              variant={isActive ? 'contained' : 'text'}
              color="inherit"
              sx={{
                marginRight: 1,
                backgroundColor: isActive
                  ? 'rgba(255, 255, 255, 0.2)'
                  : 'inherit',
              }}
            >
              {name}
            </Button>
          )

          return isSeguimiento ? (
            <Badge
              key={name}
              badgeContent={followedOpportunities.length}
              color="error"
              overlap="rectangular"
            >
              {content}
            </Badge>
          ) : (
            content
          )
        })}
      </Toolbar>
    </AppBar>
  )
}
