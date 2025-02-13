import React from 'react';
import { Box, Fade, Stack } from '@mui/material';
import TextFieldLarge from '../../components/common/TextFieldLarge';
import usePlaces from '../../hooks/usePlaces';
import MapListItem from '../../components/Map/MapListItem';
import useIsBottomDrawerFullOpenStore from '../../stores/useIsBottomDrawerFullOpenStore';
import MapListCategoryFilter from './MapListCategoryFilter';
import { PLACE_CATEGORY_CODE_WITH_ALL_MAP } from '../../constant';
import useDebounce from '../../hooks/useDebounce';

const MapList = () => {
  const [checkedCategories, setCheckedCategories] = React.useState(['ALL']);
  const [searchText, setSearchText] = React.useState('');

  const debouncedSearchText = useDebounce({ value: searchText, delay: 500 });

  const { isBottomDrawerFullOpen } = useIsBottomDrawerFullOpenStore();

  const { places, handleFilterCategories, handleSearchKeyword } = usePlaces();

  const handleSearchTextChange = (changedText) => {
    setSearchText(changedText);
  };

  const handleCheckedCategoriesChange = (code) => {
    if (code === 'ALL' && !checkedCategories.includes(code)) {
      setCheckedCategories(['ALL']);
    } else if (checkedCategories.includes('ALL')) {
      setCheckedCategories([code]);
    } else if (checkedCategories.length === Object.keys(PLACE_CATEGORY_CODE_WITH_ALL_MAP).length - 2) {
      setCheckedCategories(['ALL']);
    } else if (checkedCategories.includes(code)) {
      setCheckedCategories(checkedCategories.filter((checkedCode) => checkedCode !== code));
    } else {
      setCheckedCategories([...checkedCategories, code]);
    }
  };

  React.useEffect(() => {
    handleFilterCategories(checkedCategories);
  }, [checkedCategories]);

  React.useEffect(() => {
    handleSearchKeyword(debouncedSearchText);
  }, [debouncedSearchText]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {isBottomDrawerFullOpen && (
        <Fade in={isBottomDrawerFullOpen}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1.5rem',
              marginBottom: '-1rem',
            }}
          >
            <TextFieldLarge
              outlined={false}
              placeholder="내가 저장한 장소를 검색하세요."
              value={searchText}
              onChange={handleSearchTextChange}
            />
          </Box>
        </Fade>
      )}
      <MapListCategoryFilter checkedCategories={checkedCategories} onChange={handleCheckedCategoriesChange} />
      <Stack sx={{ gap: '1rem', width: '100%', height: '100%', flex: '1', overflow: 'scroll' }}>
        {places
          ?.filter((place) => {
            if (checkedCategories.includes('ALL')) {
              return true;
            }

            return checkedCategories.includes(place.subCategory);
          })
          .map((place) => (
            <MapListItem key={place.commonPlaceId} place={place} />
          ))}
      </Stack>
    </Box>
  );
};

export default MapList;
