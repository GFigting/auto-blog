import ReactMarkdown from 'react-markdown';

interface PostContentProps {
  content: string;
}

const PostContent = ({ content }: PostContentProps) => {
  return (
    <div className="post-content">
      <ReactMarkdown
        components={{
          // 为代码块添加样式
          pre: ({ children }) => (
            <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto my-4">
              {children}
            </pre>
          ),
          // 为行内代码和代码块中的代码添加样式
          code: ({ className, children }) => (
            <code 
              className={`font-mono text-sm ${className || ''} ${!className ? 'bg-gray-100 px-1 py-0.5 rounded' : ''}`}
            >
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default PostContent;