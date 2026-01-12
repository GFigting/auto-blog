import { Github, Twitter, Mail } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 mb-4 md:mb-0">
            <p>© {currentYear} 个人博客. 保留所有权利.</p>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-primary transition-colors" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;