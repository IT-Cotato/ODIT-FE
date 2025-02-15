import React from 'react';
import { Box, Button } from '@mui/material';
import { ReactComponent as SquareCheckIcon } from '../../assets/icons/square_check_24_1_5_px_line.svg';
import { ReactComponent as SquareIcon } from '../../assets/icons/square_check_24_1_5_line_default.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete_24_1_5_px.svg';
import { ReactComponent as CheckIcon } from '../../assets/icons/check_24_1_5_px.svg';
import usePlaces from '../../hooks/usePlaces';
import useMapListCheckPlacesStore from '../../stores/useMapListCheckPlacesStore';
import ConfirmDialog from '../common/ConfirmDialog';

const MapListCheckFooter = () => {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = React.useState(false);
  const [isVisitConfirmOpen, setIsVisitConfirmOpen] = React.useState(false);

  const { places, handleVisitPlaces, handleDeletePlaces } = usePlaces();

  const { mapListCheckPlaces, setMapListCheckPlacesAll } = useMapListCheckPlacesStore();

  const FOOTER_LIST = [
    {
      icon: <SquareCheckIcon />,
      text: '전체선택',
      onClick: () => setMapListCheckPlacesAll(places),
    },
    {
      icon: <SquareIcon />,
      text: `선택해제 (${mapListCheckPlaces.length})`,
      onClick: () => setMapListCheckPlacesAll([]),
    },
    {
      icon: <DeleteIcon />,
      text: '항목삭제',
      onClick: () => mapListCheckPlaces.length > 0 && setIsDeleteConfirmOpen(true),
    },
    {
      icon: <CheckIcon />,
      text: '방문함',
      onClick: () => mapListCheckPlaces.length > 0 && setIsVisitConfirmOpen(true),
    },
  ];

  const handleDeleteConfirm = async () => {
    try {
      await handleDeletePlaces(mapListCheckPlaces);

      setMapListCheckPlacesAll([]);
      setIsDeleteConfirmOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
  };

  const handleVisitConfirm = async () => {
    try {
      await handleVisitPlaces(mapListCheckPlaces);

      setMapListCheckPlacesAll([]);
      setIsVisitConfirmOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseVisitConfirm = () => {
    setIsVisitConfirmOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          py: '0.25rem',
          background: (theme) => theme.color.black[800],
        }}
      >
        {FOOTER_LIST.map(({ text, icon, onClick }) => (
          <Button
            key={text}
            onClick={onClick}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minWidth: '25%',
              fontSize: '0.875rem',
              color: (theme) => theme.color.black[0],
            }}
          >
            {icon}
            {text}
          </Button>
        ))}
      </Box>
      <ConfirmDialog
        open={isDeleteConfirmOpen}
        text="장소들을 삭제하시겠어요?"
        confirmText="삭제"
        onConfirm={handleDeleteConfirm}
        onCancel={handleCloseDeleteConfirm}
      />
      <ConfirmDialog
        open={isVisitConfirmOpen}
        text="장소들을 방문하시겠어요?"
        confirmText="방문"
        onConfirm={handleVisitConfirm}
        onCancel={handleCloseVisitConfirm}
      />
    </>
  );
};

export default MapListCheckFooter;
