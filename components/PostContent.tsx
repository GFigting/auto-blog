import ReactMarkdown from 'react-markdown';

interface PostContentProps {
  content: string;
}

function PostContent({ content }: PostContentProps) {
  return (
    <div className="post-content">
      <ReactMarkdown
        components={{
          pre: ({ children }) => (
            <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto my-4">
              {children}
            </pre>
          ),
          code: ({ className, children }) => {
            const isInline = !className;
            const inlineClassName = isInline ? 'bg-gray-100 px-1 py-0.5 rounded' : '';

            return (
              <code className={`font-mono text-sm ${className || ''} ${inlineClassName}`}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default PostContent;