import { Header } from '@/components/Header';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="p-4 sm:p-6">{children}</main>
    </>
  );
}
