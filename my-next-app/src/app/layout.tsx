import React from "react";
import Header from "../components/Header"; // ✅ 헤더 추가
import "./globals.css"; // ✅ 글로벌 스타일 추가

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header /> {/* ✅ 공통 헤더 (모든 페이지에 유지) */}
        {children} {/* ✅ 개별 페이지의 컨텐츠가 여기에 표시됨 */}
      </body>
    </html>
  );
}
