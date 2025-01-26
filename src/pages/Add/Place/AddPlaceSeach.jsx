import React from 'react';
import { Box } from '@mui/material';
import TextFieldLarge from '../../../components/common/TextFieldLarge';
import AddKakaoSearchList from '../../../components/Add/AddKakaoSearchList';
import useDebounce from '../../../hooks/useDebounce';
import AddSearchList from '../../../components/Add/AddSearchList';
import FullContainer from '../../../components/common/FullContainer';
import ButtonLarge from '../../../components/common/ButtonLarge';

const AddPlaceSeach = () => {
  const [searchText, setSearchText] = React.useState('');
  const [searchResult, setSearchResult] = React.useState([]);

  const debouncedSearchText = useDebounce({ value: searchText, delay: 500 });

  const handleSearchTextChange = (changedText) => {
    setSearchText(changedText);
  };

  const handleSearchPlace = (data) => {
    setSearchResult(data);
  };

  return (
    <>
      <FullContainer>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
          }}
        >
          <TextFieldLarge
            hasSearchAdornment
            placeholder="저장하고 싶은 장소를 검색하세요"
            value={searchText}
            onChange={handleSearchTextChange}
          />
          <AddSearchList searchResult={searchResult} />
        </Box>
        <ButtonLarge color="disabled">다음으로</ButtonLarge>
      </FullContainer>
      <AddKakaoSearchList keyword={debouncedSearchText} placeSearchCallback={handleSearchPlace} />
    </>
  );
};

export default AddPlaceSeach;
