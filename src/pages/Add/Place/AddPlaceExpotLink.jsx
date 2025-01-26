import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { useTheme } from '@emotion/react';
import FullContainer from '../../../components/common/FullContainer';
import TextFieldLarge from '../../../components/common/TextFieldLarge';
import ButtonLarge from '../../../components/common/ButtonLarge';

const AddPlaceExpotLink = () => {
  const [link, setLink] = React.useState('');

  const theme = useTheme();

  const handleLinkChange = (changedText) => {
    setLink(changedText);
  };

  const handleExportButton = () => {};

  const renderInpuLink = () => {
    return (
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '2.5rem',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: theme.color.black[900],
            fontSize: '1.5rem',
            fontWeight: 700,
            lineHeight: '140%',
          }}
        >
          정보를 추출할
          <br />
          링크를 입력해 주세요
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <TextFieldLarge
            hasClearAdornment={link !== ''}
            placeholder="링크를 입력해 주세요"
            value={link}
            onChange={handleLinkChange}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography
              sx={{
                fontSize: '0.875rem',
                color: theme.color.black[400],
              }}
            >
              링크 없이 저장하고 싶으신가요?
            </Typography>
          </Box>
        </Box>
      </Stack>
    );
  };

  const renderExportButton = () => {
    return (
      <ButtonLarge disabled={link === ''} color={link ? 'enabled' : 'disabled'} onClick={handleExportButton}>
        시작하기
      </ButtonLarge>
    );
  };

  return (
    <FullContainer>
      {renderInpuLink()}
      {renderExportButton()}
    </FullContainer>
  );
};

export default AddPlaceExpotLink;
