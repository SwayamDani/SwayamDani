// src/lib/portableTextComponents.js
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from './sanity';

export const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-8 relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Blog post image'}
            fill
            className="object-cover"
          />
        </div>
      );
    },
    code: ({ value }) => (
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4">
        <code className="text-sm">{value.code}</code>
      </pre>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <Link 
          href={value.href} 
          rel={rel} 
          target={rel ? '_blank' : undefined}
          className="text-green-500 hover:text-green-600 transition-colors underline"
        >
          {children}
        </Link>
      );
    },
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-100 dark:bg-gray-800 text-red-500 dark:text-red-400 p-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-12 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-4">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-bold mt-6 mb-4">{children}</h4>,
    normal: ({ children }) => <p className="mb-4 text-lg">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-green-500 pl-4 italic my-6 text-gray-700 dark:text-gray-300">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="ml-6 mb-6 list-disc space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="ml-6 mb-6 list-decimal space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-lg">{children}</li>,
    number: ({ children }) => <li className="text-lg">{children}</li>,
  },
};