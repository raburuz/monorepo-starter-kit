import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Branding } from '@/shared/components/Branding'
import { config } from '@app/config'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div>Not found</div>
    )
  },
})

function RootComponent() {
  return (
    <React.Fragment>
      <title>{config.app.name}</title>
      <Outlet />
      <Branding/>
    </React.Fragment>
  )
}
