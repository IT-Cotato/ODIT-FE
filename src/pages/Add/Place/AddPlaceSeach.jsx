import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router';
import TextFieldLarge from '../../../components/common/TextFieldLarge';
import KakaoPlacesSearch from '../../../components/common/KakaoPlacesSearch';
import useDebounce from '../../../hooks/useDebounce';
import AddSearchList from '../../../components/Add/AddSearchList';
import FullContainer from '../../../components/common/FullContainer';
import ButtonLarge from '../../../components/common/ButtonLarge';

const AddPlaceSeach = () => {
  const [searchText, setSearchText] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [checkedResults, setCheckedResults] = React.useState([]);

  const debouncedSearchText = useDebounce({ value: searchText, delay: 500 });

  const navigate = useNavigate();

  const handleSearchTextChange = (changedText) => {
    setSearchText(changedText);
  };

  const handleSearchPlace = (data) => {
    setSearchResults(data);
    setCheckedResults([]);
  };

  const handleCheckPlace = (index) => {
    const newCheckedResults = [...checkedResults];
    const result = searchResults[index];

    if (newCheckedResults.includes(result)) {
      newCheckedResults.splice(newCheckedResults.indexOf(result), 1);
    } else {
      newCheckedResults.push(result);
    }

    setCheckedResults(newCheckedResults);
  };

  const handleNextButton = () => {
    navigate('/add/place/0', {
      state: {
        places: checkedResults,
      },
    });
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
            height: 'inherit',
          }}
        >
          <TextFieldLarge
            hasSearchAdornment
            placeholder="저장하고 싶은 장소를 검색하세요"
            value={searchText}
            onChange={handleSearchTextChange}
          />
          <AddSearchList searchResults={searchResults} checkedResults={checkedResults} onClick={handleCheckPlace} />
        </Box>
        <ButtonLarge disabled={checkedResults.length === 0} color="enabled" onClick={handleNextButton}>
          다음으로
        </ButtonLarge>
      </FullContainer>
      <KakaoPlacesSearch keyword={debouncedSearchText} placeSearchCallback={handleSearchPlace} />
    </>
  );
};

export default AddPlaceSeach;
