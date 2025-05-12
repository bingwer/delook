import { useCallback } from 'react';

import { MetaTags } from '@/components';
import { SITE_URL } from '@/constants';
import { ErrorPage } from '@/features/error';
import { getPostsByCategory, RenderPost, usePostList } from '@/features/post';

export default function ArchivePage() {
  const fetchPostList = useCallback(async () => {
    const posts = await getPostsByCategory();
    return posts;
  }, []);

  const { post, selectedPost } = usePostList({ fetchPostList });

  if (!post || !selectedPost) {
    return <ErrorPage type="NOT_FOUND" />;
  }
  const {
    metaData: { title },
  } = post;

  const { category, filename } = selectedPost;

  return (
    <>
      <MetaTags
        title={`${category}/${title}`}
        description={`${category}의${title}에 대한 내용`}
        url={`${SITE_URL}/archive?category=${category}&filename=${filename}`}
        keywords={`${category}, ${title}, ${filename}`}
      />
      <RenderPost post={{ ...post, ...selectedPost }} />
    </>
  );
}
