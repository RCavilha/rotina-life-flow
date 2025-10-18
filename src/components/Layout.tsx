import BottomNav from "./BottomNav";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      {children}
      <BottomNav />
    </>
  );
};

export default Layout;
