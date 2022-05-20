import { useMemo } from 'react';
import { debounce } from 'lodash';

import { useSearchAll } from 'hooks/useSearchAll';
import { useAppSelector, useAppDispatch } from 'hooks';
import { getSearchValue, setSearchValue } from 'states/value/searchValue';
import SearchList from 'components/SearchList';

import styles from './SearchDiseases.module.scss';

const SearchDiseases = () => {
  // TODO: managed state
  // const [inputValue, setInputValue] = useState('');
  const { isLoading } = useSearchAll();

  const searchValue = useAppSelector(getSearchValue);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChangeHandler = useMemo(() => debounce(handleChange, 1000), []);

  return (
    <div className={styles.bg}>
      <div className={styles.bgCenter}>
        <div className={styles.container}>
          <div className={styles.searchContainer}>
            <h1>
              <p>국내 모든 임상시험 검색하고</p> 온라인으로 참여하기
            </h1>
            <form className={styles.searchWrapper} onSubmit={handleSubmit}>
              <div className={styles.inputWrapper}>
                <input
                  className={styles.searchInput}
                  type='text'
                  placeholder='질환명을 입력해 주세요.'
                  onChange={debouncedChangeHandler}
                />
              </div>
              <button className={styles.searchTextbox} type='submit'>
                검색
              </button>
            </form>
            {(isLoading || searchValue) && <SearchList isLoading={isLoading} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDiseases;