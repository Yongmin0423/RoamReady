'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import ActivityCard from '@/domain/Activity/components/main/ActivityCard';
import ActivityCardSkeleton from '@/domain/Activity/components/main/ActivityCardSkeleton';
import ActivityFilter from '@/domain/Activity/components/main/ActivityFilter';
import { GetActivitiesRequestQuery } from '@/domain/Activity/schemas/main';
import { getActivities } from '@/domain/Activity/services/main/getActivities';
import Pagination from '@/shared/components/ui/Pagination';

export type SortOption = NonNullable<GetActivitiesRequestQuery['sort']>;

export default function ActivitySection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page') ?? 1);
  const category = searchParams.get(
    'category',
  ) as GetActivitiesRequestQuery['category'];
  const sort = (searchParams.get('sort') ?? 'latest') as SortOption;

  const { data, error, isPending } = useQuery({
    /**
     * ✅ 해결 1: 불안정한 queryKey 수정
     * 객체 '{...}'를 제거하고, 그 안의 원시 값들을 직접 나열하여
     * 렌더링마다 동일한 키가 생성되도록 합니다.
     * 이것으로 무한 재요청 문제가 해결됩니다.
     */
    queryKey: ['activities', 'list', currentPage, category, sort],

    queryFn: () => {
      /**
       * ✅ 해결 2: API 파라미터를 안전하게 구성
       * category가 존재할 때(null이나 undefined가 아닐 때)만
       * 파라미터 객체에 포함시킵니다.
       * 이것으로 `category=undefined` 문제가 해결됩니다.
       */
      const apiParams: {
        method: 'offset';
        page: number;
        size: number;
        sort: SortOption;
        category?: GetActivitiesRequestQuery['category'];
      } = {
        method: 'offset',
        page: currentPage,
        size: 10,
        sort,
      };

      if (category) {
        apiParams.category = category;
      }

      return getActivities(apiParams);
    },
  });
  console.log('📡 isPending:', isPending);
  console.log('📡 error:', error);
  console.log('📡 data:', data);

  /**
   * 💡 개선 제안: useCallback의 의존성 배열 수정
   * searchParams는 렌더링마다 새로운 객체이므로, 불변 값인 searchParams.toString()을
   * 의존성으로 사용하면 불필요한 함수 재생성을 막을 수 있습니다.
   */
  const handleFilterChange = useCallback(
    (key: 'category' | 'sort', value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.set('page', '1');
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams.toString()], // searchParams -> searchParams.toString()
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(page));
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams.toString()], // searchParams -> searchParams.toString()
  );

  const activities = data?.activities ?? [];
  const totalPages = data ? Math.ceil((data?.totalCount ?? 0) / 10) : 1;

  return (
    <article>
      <section className='mb-5'>
        <h2 className='font-size-24 desktop:font-size-26 mb-10 font-bold text-gray-900'>
          🕺 모든 체험
        </h2>
      </section>
      <ActivityFilter
        category={category}
        sort={sort}
        onCategoryChange={(newCategory) =>
          handleFilterChange('category', newCategory)
        }
        onSortChange={(newSort) => handleFilterChange('sort', newSort)}
      />
      <section className='grid grid-cols-2 gap-20 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7'>
        {isPending
          ? Array.from({ length: 10 }).map((_, i) => (
              <ActivityCardSkeleton key={`skeleton-${i}`} />
            ))
          : activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
      </section>
      <div className='mt-30'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </article>
  );
}
