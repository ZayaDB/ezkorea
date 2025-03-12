"use client"; // ✅ 클라이언트 컴포넌트 설정

import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* 로고 */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          EduMentor
        </Link>

        {/* 네비게이션 */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/courses" className="hover:text-blue-500">
            Courses
          </Link>
          <Link href="/mentoring" className="hover:text-blue-500">
            Mentoring
          </Link>
          <Link href="/freelancing" className="hover:text-blue-500">
            Freelancing
          </Link>
          <Link href="/community" className="hover:text-blue-500">
            Community
          </Link>
        </nav>

        {/* 로그인 버튼 추가 */}
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
