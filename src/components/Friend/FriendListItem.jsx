import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import styled from '@emotion/styled/macro';
import { Link } from 'react-router';
import { mutate } from 'swr';
import CheckBox from '../common/CheckBox';
import { PLACE_CATEGORY_CODE_MAP } from '../../constant';
import { ReactComponent as BookmarkDefault } from '../../assets/icons/bookmark_24_1_5_px_line.svg';
import { ReactComponent as BookmarkChecked } from '../../assets/icons/bookmark_24_1_5_px_fill.svg';
import ConfirmDialog from '../common/ConfirmDialog';
import { postPlacesBookMark } from '../../apis/places';

const FriendListItem = ({ place, checkedPlaces }) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = React.useState(false);

  const theme = useTheme();

  const checked = checkedPlaces.some((checkedPlace) => checkedPlace.commonPlaceId === place.commonPlaceId);

  const handleCheckBoxChange = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleBookmark = async () => {
    if (!checked) {
      await postPlacesBookMark(place);

      mutate('/api/friend/places');

      setIsConfirmDialogOpen(false);
    }
  };

  return (
    <>
      <Box
        key={place.commonPlaceId}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          px: '1.5rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            gap: '1rem',
          }}
        >
          <CheckBox
            checked={checked}
            icon={<BookmarkDefault />}
            checkedIcon={<BookmarkChecked />}
            onChange={handleCheckBoxChange}
          />
          <Link to={`/detail?type=place&id=${place.commonPlaceId}`}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: theme.color.main[100],
                }}
              >
                {PLACE_CATEGORY_CODE_MAP[place.subCategory]}
              </Typography>
              <Typography
                sx={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: theme.color.black[900],
                }}
              >
                {place.placeName}
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: theme.color.black[400],
                }}
              >
                {place.addressName}
              </Typography>
            </Box>
          </Link>
        </Box>
        <StyledHr />
      </Box>
      <ConfirmDialog
        open={isConfirmDialogOpen}
        text={checked ? '내 장소에서 삭제하시겠어요?' : '내 장소로 추가하시겠어요?'}
        confirmText={checked ? '삭제' : '추가'}
        onCancel={() => setIsConfirmDialogOpen(false)}
        onConfirm={handleBookmark}
      />
    </>
  );
};

export default FriendListItem;

const StyledHr = styled.hr`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.black[50]};
  margin: 0;
`;
