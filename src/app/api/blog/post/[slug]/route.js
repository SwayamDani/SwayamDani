// src/app/api/blog/post/[slug]/route.js
import { NextResponse } from 'next/server';
import sanityClient from '@/lib/sanity';

export async function GET(request, context) {
  // Properly await the params object
  const params = await context.params;
  const slug = params.slug;
  
  try {
    // Query for the specific blog post by slug
    const post = await sanityClient.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        body,
        "date": publishedAt,
        "readTime": round(length(pt::text(body)) / 1500) + " min read",
        "category": categories[0]->title,
        mainImage,
        "author": author->{
          name,
          image,
          "bio": bio[0].children[0].text
        }
      }
    `, { slug });
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Query for related posts (same category, excluding current post)
    const relatedPosts = await sanityClient.fetch(`
      *[_type == "post" && slug.current != $slug && count((categories[]->title)[@ in [$category]]) > 0][0...3] {
        _id,
        title,
        slug,
        "excerpt": array::join(string::split(pt::text(body[0...1]), "")[0...150], "") + "...",
        "date": publishedAt,
        "readTime": round(length(pt::text(body)) / 1500) + " min read",
        "category": categories[0]->title,
        mainImage
      }
    `, { 
      slug, 
      category: post.category 
    });

    return NextResponse.json({ post, relatedPosts }, { status: 200 });
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return NextResponse.json({ error: 'Error fetching blog post' }, { status: 500 });
  }
}