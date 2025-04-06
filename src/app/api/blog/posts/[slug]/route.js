import { NextResponse } from 'next/server';
import { getPostData } from '@/utils/blogUtils';

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const post = await getPostData(slug);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json({ post });
  } catch (error) {
    console.error(`Error fetching blog post with slug ${params.slug}:`, error);
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 });
  }
}