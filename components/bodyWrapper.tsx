"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function BodyWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");

  return (
    <div className={isAdmin ? "admin-body" : "user-body"}>
      {children}
    </div>
  );
}