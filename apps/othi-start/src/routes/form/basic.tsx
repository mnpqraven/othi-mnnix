import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/form/basic')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/form/basic"!</div>
}
