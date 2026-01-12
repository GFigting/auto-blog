import { Github, Twitter, Mail } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">关于我</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {/* 个人简介 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">个人简介</h2>
          <p className="text-gray-600 mb-4">
            你好！我是一名热爱技术的前端开发者，专注于React、Next.js和现代Web开发技术。
            我喜欢学习新技术，并将其应用到实际项目中。
          </p>
          <p className="text-gray-600">
            这个博客是我分享技术经验、学习心得和生活感悟的地方。
            希望我的分享能够对你有所帮助。
          </p>
        </section>
        
        {/* 技术栈 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">技术栈</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'HTML', 'CSS', 'JavaScript', 'TypeScript',
              'React', 'Next.js', 'Tailwind CSS',
              'Node.js', 'Git', 'GitHub'
            ].map((tech, index) => (
              <div key={index} className="bg-gray-50 px-4 py-2 rounded-full text-center text-sm text-gray-700">
                {tech}
              </div>
            ))}
          </div>
        </section>
        
        {/* 联系方式 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">联系方式</h2>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              <Github size={24} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              <Twitter size={24} />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              <Mail size={24} />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}