import { Autocomplete, TextField, CircularProgress, SxProps, Theme } from '@mui/material';
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
import { KeyboardEvent, useCallback, useRef } from 'react';
import { fetchForecast } from '../forecast/forecastSlice';

interface SearchProps {
  sx?: SxProps<Theme>;
}

const Search = ({ sx = [] }: SearchProps): JSX.Element => {
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
        dispatch(fetchForecast(value));
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

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.defaultPrevented = true;
    }
  }, []);

  return (
    <Autocomplete
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
      freeSolo
      value={value}
      onChange={(_event, value): void => handleChange(value)}
      inputValue={inputValue}
      onInputChange={async (_event, value): Promise<void> => handleInputChange(value)}
      options={options}
      renderInput={(params): JSX.Element => (
        <TextField
          {...params}
          label="City"
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
          onKeyDown={handleKeyDown}
        />
      )}
    />
  );
};

export default Search;
