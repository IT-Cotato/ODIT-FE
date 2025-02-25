import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { useTheme } from '@emotion/react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router';
import FullContainer from '../../components/common/FullContainer';
import TextFieldLarge from '../../components/common/TextFieldLarge';
import ButtonLarge from '../../components/common/ButtonLarge';

const AddExportLink = () => {
  const [link, setLink] = React.useState('');

  const navigate = useNavigate();

  const location = useLocation();

  const [searchParams, _] = useSearchParams();

  const theme = useTheme();

  const handleLinkChange = (changedText) => {
    setLink(changedText);
  };

  const handleExportButton = () => {
    navigate(`/add/loading${location.search}`, {
      state: { link },
    });
  };

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
              링크 없이 저장하고 싶으신가요? &nbsp;
              <Link
                to={searchParams.get('type') === 'event' ? '/add/event/0' : '/add/search/place'}
                style={{
                  textDecoration: 'none',
                  color: theme.color.main[50],
                }}
              >
                직접 추가하기
              </Link>
            </Typography>
          </Box>
        </Box>
      </Stack>
    );
  };

  const renderExportButton = () => {
    return (
      <ButtonLarge disabled={link === ''} color="enabled" onClick={handleExportButton}>
        정보 추출하기
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

export default AddExportLink;
