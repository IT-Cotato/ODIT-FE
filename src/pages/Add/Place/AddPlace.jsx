import React from 'react';
import { Box } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router';
import FullContainer from '../../../components/common/FullContainer';
import TextFieldLarge from '../../../components/common/TextFieldLarge';
import ButtonLarge from '../../../components/common/ButtonLarge';
import { postPlaces } from '../../../apis/places';

const AddPlace = () => {
  const [memo, setMemo] = React.useState('');
  const [placeList, setPlaceList] = React.useState([]);

  const location = useLocation();

  const navigate = useNavigate();

  const { index } = useParams();
  const numericIndex = Number(index);

  const {
    place_name: placeName,
    category_group_name: categoryGroupName,
    address_name: addressName,
  } = placeList.at(numericIndex) ?? {};

  const handleMemoChange = (changedMemo) => {
    setMemo(changedMemo);

    const newPlaceList = [...placeList];
    newPlaceList[numericIndex].memo = changedMemo;
    setPlaceList(newPlaceList);
  };

  const handleNextButton = () => {
    postPlaces(placeList[numericIndex]).then(() => {
      navigate(`/add/place/${numericIndex + 1}`);
    });
  };

  const handleSubmitButton = () => {
    postPlaces(placeList[numericIndex]).then(() => {
      navigate('/');
    });
  };

  React.useEffect(() => {
    if (location.state?.places) {
      const newPlaces = location.state.places.map((place) => ({ ...place, memo: '' }));
      setPlaceList(newPlaces);
    } else {
      navigate('/add/export?type=place');
    }
  }, []);

  return (
    <FullContainer>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.75rem',
        }}
      >
        <TextFieldLarge disabled label="장소명" value={placeName} />
        <TextFieldLarge disabled label="카테고리" value={categoryGroupName} />
        <TextFieldLarge disabled label="위치" value={addressName} />
        <TextFieldLarge
          label="메모(선택)"
          value={memo}
          placeholder="메모를 입력해 주세요"
          onChange={handleMemoChange}
        />
      </Box>
      {numericIndex < placeList.length - 1 ? (
        <ButtonLarge color="enabled" onClick={handleNextButton}>
          다음 장소 확인하기
        </ButtonLarge>
      ) : (
        <ButtonLarge color="enabled" onClick={handleSubmitButton}>
          저장하기
        </ButtonLarge>
      )}
    </FullContainer>
  );
};

export default AddPlace;
