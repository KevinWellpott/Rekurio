import { Header } from "@/components/sections/header-1";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: MarketingLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
