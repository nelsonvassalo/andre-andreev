export const portableTextComponents = {
  marks: {
    link: ({ value, children }) => {
      const { href, blank } = value;
      return (
        <a
          href={href}
          target={blank ? "_blank" : "_self"}
          rel={blank ? "noopener noreferrer" : ""}
          className="text-white hover:text-gray-300 underline transition-colors decoration-1 underline-offset-4"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    // Handle normal paragraphs
    normal: ({ children }) => <p className="mb-4">{children}</p>,
  },
  list: {
    // Customize lists if needed
    bullet: ({ children }) => (
      <ul className="list-disc ml-4 mb-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-4 mb-4">{children}</ol>
    ),
  },
};
