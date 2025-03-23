'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function TutorialsTeaser({ tutorial }) {
  // Early return if tutorial is invalid
  if (!tutorial || !tutorial.title || !tutorial.slug) {
    return null;
  }
  
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      {tutorial.image && (
        <div className="relative h-48 w-full">
          <Image 
            src={tutorial.image} 
            alt={tutorial.title} 
            fill 
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{tutorial.title}</h2>
        <p className="text-gray-600 mb-4">{tutorial.excerpt || "No description available."}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{tutorial.readTime || "Read time unknown"}</span>
          <Link 
            href={`/tutorials/${tutorial.slug}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}