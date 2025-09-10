import { Routes } from '@/constants/api';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(`${Routes.CHARACTERS}/`)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/characters/"!</div>;
}
