import React from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import FullContainer from '../../../components/common/FullContainer';
import searchKakaoPlaces from '../../../utils/searchKakaoPlaces';
import AddSearchList from '../../../components/Add/AddSearchList';
import ButtonLarge from '../../../components/common/ButtonLarge';

const AddPlaceSelect = () => {
  const [searchedResults, setSearchedResults] = React.useState([]);
  const [checkedResults, setCheckedResults] = React.useState([]);

  const navigate = useNavigate();

  const location = useLocation();

  const handleCheckPlace = (index) => {
    const newCheckedResults = [...checkedResults];
    const result = searchedResults[index];

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

  React.useEffect(() => {
    const searchPlace = async (place) => {
      try {
        const response = await searchKakaoPlaces(place);
        return response;
      } catch {
        return null;
      }
    };

    if (location.state) {
      const fetchPlaces = async () => {
        try {
          const placePromises = location.state.contentResponseList.map(async (place) => {
            const response = await searchPlace(place.name);

            const index = response?.findIndex(
              (res) => place.location.includes(res.address_name) || res.address_name.includes(place.road_address_name),
            );
            return index !== -1 ? response[index] : response[0];
          });

          const settledResults = await Promise.allSettled(placePromises);

          const validPlaces = settledResults
            .filter((result) => result.status === 'fulfilled' && result.value !== null)
            .map((result) => result.value);

          setSearchedResults(validPlaces);
        } catch {
          //
        }
      };

      fetchPlaces();
    }
  }, [location.state?.data]);

  return (
    <FullContainer>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '2.5rem',
          height: 'inherit',
          width: '100%',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: '1.5rem',
            fontWeight: 700,
            lineHeight: '140%',
          }}
        >
          저장하고 싶은
          <br />
          장소를 선택해 주세요
        </Typography>
        <AddSearchList searchResults={searchedResults} checkedResults={checkedResults} onClick={handleCheckPlace} />
      </Box>
      <ButtonLarge disabled={checkedResults.length === 0} color="enabled" onClick={handleNextButton}>
        다음으로
      </ButtonLarge>
    </FullContainer>
  );
};

export default AddPlaceSelect;
