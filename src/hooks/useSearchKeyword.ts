import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

import { useAppSelector } from 'hooks';
import { getSearchDiseasesAPI } from 'services/search';
import { getSearchValue } from 'states/value/searchValue';
import { incrementCount } from 'states/apiCount';
import { setSearchResultList } from 'states/searchResultList';

export const useSearchKeyword = () => {
  const searchValue = useAppSelector(getSearchValue);
  const apiCount = useAppSelector((state) => state.apiCount);

  const dispatch = useDispatch();

  const { data, ...res } = useQuery(
    ['getDiseaseNameAPI', searchValue],
    () => {
      dispatch(incrementCount());
      return getSearchDiseasesAPI({ searchText: searchValue });
    },
    {
      enabled: !!searchValue,
      staleTime: 2 * 60 * 1000,
    }
  );

  useEffect(() => {
    if (apiCount.value <= 0) return;
    // eslint-disable-next-line no-console
    console.log(`API request counts: ${apiCount.value}`);
  }, [apiCount.value]);

  useEffect(() => {
    if (!data) return;
    dispatch(setSearchResultList(data));
  }, [searchValue, data]);

  return { data, ...res };
};
