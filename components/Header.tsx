import { BookOpen, Home, User, Menu } from 'lucide-react';
import Link from 'next/link';

function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4 max-w-5xl">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            个人博客
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors">
              <Home size={18} />
              <span>首页</span>
            </Link>
            <Link href="/posts" className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors">
              <BookOpen size={18} />
              <span>文章</span>
            </Link>
            <Link href="/about" className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors">
              <User size={18} />
              <span>关于</span>
            </Link>
          </nav>

          <button className="md:hidden text-gray-700" aria-label="Open menu">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;