import type { Metadata } from "next";

interface BlogPostProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  // Return at least one param for cacheComponents compatibility
  return [{ id: "default" }];
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Blog Post ${id}`,
    description: "Blog post",
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { id } = await params;
  return (
    <div>
      <h1>Blog Post {id}</h1>
    </div>
  );
}
