import { Bookmark } from 'lucide-react';

import { Badge, IconButton } from '@/components';
import { useBookmark } from '@/features/bookmark';
import { PostMetaData, PostPathData } from '@/features/post';

const ColorIconFilled = '#8c3fff';

export function MDXHeader({
  metaData,
  pathData,
}: {
  metaData: PostMetaData;
  pathData: PostPathData;
}) {
  const { isBookmarked, handleBookmark } = useBookmark({
    metaData,
    pathData,
  });

  return (
    <header className="mt-3 flex flex-col items-start border-b border-b-muted pb-4">
      <div className="flex w-full items-center justify-between">
        <Badge
          className="mb-2 rounded-lg bg-green px-1.5 text-background"
          size={'xs'}
          variant="green"
        >
          {metaData.language.toUpperCase()}
        </Badge>
        <IconButton
          name="북마크"
          buttonProps={{ className: 'hover:bg-transparent' }}
          onClick={handleBookmark}
        >
          {isBookmarked ? (
            <Bookmark size={30} color={ColorIconFilled} fill={ColorIconFilled} />
          ) : (
            <Bookmark size={30} />
          )}
        </IconButton>
      </div>

      <h1 className="mb-3 text-3xl font-medium">{metaData.title}</h1>

      <span className="mb-2 text-[0.7rem] text-muted-foreground">
        Updated On : {metaData.dateModified}
      </span>

      <div className="flex w-full flex-wrap items-center gap-1">
        {metaData.tags.map((tag: string) => (
          <Badge
            className="whitespace-nowrap border-primary/20 text-primary/60 dark:border-primary/30 dark:text-primary/80"
            key={tag}
            rounded="full"
            size="xxs"
            variant={'outline'}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </header>
  );
}
