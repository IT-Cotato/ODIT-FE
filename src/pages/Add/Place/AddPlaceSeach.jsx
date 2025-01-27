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
  const [searchResult, setSearchResult] = React.useState([]);
  const [checkedPlaces, setCheckedPlaces] = React.useState([]);

  const debouncedSearchText = useDebounce({ value: searchText, delay: 500 });

  const navigate = useNavigate();

  const handleSearchTextChange = (changedText) => {
    setSearchText(changedText);
  };

  const handleSearchPlace = (data) => {
    setSearchResult(data);
    setCheckedPlaces([]);
  };

  const handleCheckPlace = (place) => {
    const index = checkedPlaces.findIndex((checkedPlace) => checkedPlace.place_url === place.place_url);

    if (index === -1) {
      setCheckedPlaces([...checkedPlaces, place]);
    } else {
      setCheckedPlaces(checkedPlaces.filter((checkedPlace) => checkedPlace.place_url !== place.place_url));
    }
  };

  const handleNextButton = () => {
    navigate('/add/place/0', {
      state: {
        places: checkedPlaces,
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
          <AddSearchList searchResult={searchResult} checkedPlaces={checkedPlaces} onClick={handleCheckPlace} />
        </Box>
        <ButtonLarge disabled={checkedPlaces.length === 0} color="enabled" onClick={handleNextButton}>
          다음으로
        </ButtonLarge>
      </FullContainer>
      <KakaoPlacesSearch keyword={debouncedSearchText} placeSearchCallback={handleSearchPlace} />
    </>
  );
};

export default AddPlaceSeach;
