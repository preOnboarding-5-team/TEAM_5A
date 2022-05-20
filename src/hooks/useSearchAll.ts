import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import { useAppSelector } from 'hooks';
import { getAllDiseasesApi } from 'services/search';
import { getSearchValue } from 'states/value/searchValue';
import { incrementCount } from 'states/apiCount';
import { setSearchResultList } from 'states/searchResultList';

export const useSearchAll = () => {
  const searchValue = useAppSelector(getSearchValue);
  const apiCount = useAppSelector((state) => state.apiCount);

  const dispatch = useDispatch();

  const { data, ...res } = useQuery(
    ['getDiseaseNameAPI', 'all'],
    () => {
      dispatch(incrementCount());
      return getAllDiseasesApi();
    },
    {
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
    const result = searchValue ? data.filter(({ sickNm }) => sickNm.toLowerCase().includes(searchValue)) : [];
    dispatch(setSearchResultList(result));
  }, [searchValue, data, dispatch]);

  return { data, ...res };
};