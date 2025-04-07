// src/app/api/blog/posts/route.js
import { NextResponse } from 'next/server';
import sanityClient from '@/lib/sanity';

export async function GET() {
  try {
    // Query for all blog posts, ordered by publishedAt date in descending order
    const posts = await sanityClient.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        "excerpt": array::join(string::split(pt::text(body[0...1]), "")[0...200], "") + "...",
        "date": publishedAt,
        "readTime": round(length(pt::text(body)) / 1500) + " min read",
        "category": categories[0]->title,
        mainImage
      }
    `);

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Error fetching blog posts' }, { status: 500 });
  }
}