import Post from '@/service/post';
import { NextResponse } from 'next/server';

const post = new Post();
export async function GET() {
    return post.getPosts().then((data) =>
        NextResponse.json(data.result)
    );
}
