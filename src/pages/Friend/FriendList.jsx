import React from 'react';
import { Box, Fade, Stack, Typography } from '@mui/material';
import useSWR from 'swr';
import TextFieldLarge from '../../components/common/TextFieldLarge';
import useIsBottomDrawerFullOpenStore from '../../stores/useIsBottomDrawerFullOpenStore';
import MapListCategoryFilter from '../../components/Map/MapListCategoryFilter';
import { PLACE_CATEGORY_CODE_WITH_ALL_MAP } from '../../constant';
import useDebounce from '../../hooks/useDebounce';
import { ReactComponent as PlaceEmpty } from '../../assets/icons/place_empty.svg';
import useFriendPlaces from '../../hooks/useFriendPlaces';
import FriendListItem from '../../components/Friend/FriendListItem';
import fetcher from '../../utils/fetcher';

const FriendList = () => {
  const [checkedCategories, setCheckedCategories] = React.useState(['ALL']);
  const [searchText, setSearchText] = React.useState('');
  const [checkedFriendPlaces, setCheckedFriendPlaces] = React.useState([]);

  const debouncedSearchText = useDebounce({ value: searchText, delay: 500 });

  const { isBottomDrawerFullOpen } = useIsBottomDrawerFullOpenStore();

  const { data } = useSWR('/api/places', fetcher);
  const myPlaces = data?.data || [];

  const { friendPlaces, handleSearchKeyword, handleFilterCategories } = useFriendPlaces();

  const handleCheckedCategoriesChange = (code) => {
    if (code === 'ALL' && !checkedCategories.includes(code)) {
      setCheckedCategories(['ALL']);
    } else if (checkedCategories.includes('ALL')) {
      setCheckedCategories([code]);
    } else if (checkedCategories.length === Object.keys(PLACE_CATEGORY_CODE_WITH_ALL_MAP).length - 2) {
      setCheckedCategories(['ALL']);
    } else if (checkedCategories.includes(code) && checkedCategories.length === 1) {
      setCheckedCategories(['ALL']);
    } else if (checkedCategories.includes(code)) {
      setCheckedCategories(checkedCategories.filter((checkedCode) => checkedCode !== code));
    } else {
      setCheckedCategories([...checkedCategories, code]);
    }
  };

  const handleSearchTextChange = (changedText) => {
    setSearchText(changedText);
  };

  const renderPlaceList = () => {
    const places = friendPlaces?.map((friendPlace) => friendPlace.place) || [];

    const filteredPlaces = places.filter((place) => {
      if (checkedCategories.includes('ALL')) {
        return true;
      }

      return checkedCategories.includes(place.subCategory);
    });

    if (filteredPlaces.length === 0) {
      return (
        <Box
          sx={{
            flex: '1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '1rem',
            marginTop: '4rem',
          }}
        >
          <PlaceEmpty />
          <Typography
            sx={{
              fontSize: '1rem',
              fontWeight: '500',
              color: (theme) => theme.color.main[100],
              textAlign: 'center',
            }}
          >
            아직 저장한 장소가 없어요
          </Typography>
        </Box>
      );
    }

    return filteredPlaces.map((place) => (
      <FriendListItem
        key={place.commonPlaceId}
        place={place}
        checkedPlaces={checkedFriendPlaces.map((friendPlace) => friendPlace.place)}
      />
    ));
  };

  React.useEffect(() => {
    handleFilterCategories(checkedCategories);
  }, [checkedCategories]);

  React.useEffect(() => {
    handleSearchKeyword(debouncedSearchText);
  }, [debouncedSearchText]);

  React.useEffect(() => {
    if (!friendPlaces || !myPlaces) {
      return;
    }

    setCheckedFriendPlaces(
      friendPlaces.filter((friendPlace) =>
        myPlaces.some((myPlace) => myPlace.commonPlaceId === friendPlace.place.commonPlaceId),
      ),
    );
  }, [friendPlaces, myPlaces]);

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
        {renderPlaceList()}
      </Stack>
    </Box>
  );
};

export default FriendList;
