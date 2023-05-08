import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'pages/app/hook';
import {
  fetchOptions,
  reset,
  selectOptions,
  selectSearch,
  selectSearchInput,
  selectStatus,
  setSearch,
  setSearchInput,
} from './searchSlice';
import { debounce } from 'lodash';
import { useCallback, useRef } from 'react';

const Search = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectSearch);
  const inputValue = useAppSelector(selectSearchInput);
  const options = useAppSelector(selectOptions);
  const status = useAppSelector(selectStatus);

  const delayedQuery = useRef(
    debounce((query) => {
      dispatch(fetchOptions(query));
    }, 200)
  ).current;

  const handleChange = useCallback(
    (value: string | null): void => {
      if (value !== null) {
        dispatch(setSearch(value));
      }
    },
    [dispatch]
  );

  const handleInputChange = useCallback(
    (value: string): void => {
      if (value === '') {
        dispatch(reset());

        return;
      }

      dispatch(setSearchInput(value));
      delayedQuery(value);
    },
    [dispatch, delayedQuery]
  );

  return (
    <Autocomplete
      freeSolo
      value={value}
      onChange={(_event, value): void => handleChange(value)}
      inputValue={inputValue}
      onInputChange={async (_event, value): Promise<void> => handleInputChange(value)}
      options={options}
      renderInput={(params): JSX.Element => (
        <TextField
          {...params}
          label="Search input"
          InputProps={{
            ...params.InputProps,
            type: 'search',
            endAdornment: (
              <>
                {status === 'loading' ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default Search;
