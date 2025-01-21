import React from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import HeaderSub from '../../components/common/HeaderSub';
import TextFieldLarge from '../../components/common/TextFieldLarge';
import { HEADER_HEIGHT } from '../../constant';
import ButtonLarge from '../../components/common/ButtonLarge';
import useDebounce from '../../hooks/useDebounce';
import nicknameValidator from '../../utils/nicknameValidator';

const Register = () => {
  const [isApprovedNickname, setIsApprovedNickname] = React.useState(undefined);
  const [nickname, setNickname] = React.useState('');
  const [failedMessage, setFailedMessage] = React.useState('');

  const debouncedNickname = useDebounce({ value: nickname, delay: 500 });

  const theme = useTheme();

  const handleNicknameChange = (changedText) => {
    setNickname(changedText);
  };

  const handleRegisterButton = () => {};

  const getTextFieldOutlineColor = () => {
    if (isApprovedNickname) {
      return 'success';
    }
    if (isApprovedNickname === false) {
      return 'error';
    }

    return '';
  };

  const renderNicknameInput = () => {
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
          오딧에서 사용할
          <br />
          닉네임을 입력해주세요.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <TextFieldLarge
            hasClearAdornment={nickname !== ''}
            placeholder="닉네임을 입력해 주세요 (12자 이내)"
            value={nickname}
            outlineColor={getTextFieldOutlineColor()}
            onChange={handleNicknameChange}
          />
          {isApprovedNickname !== undefined && (
            <Typography
              sx={{
                fontSize: '0.875rem',
                color: isApprovedNickname ? theme.color.main[100] : theme.color.error,
              }}
            >
              {isApprovedNickname ? '사용할 수 있는 닉네임이에요' : failedMessage}
            </Typography>
          )}
        </Box>
      </Stack>
    );
  };

  const renderRegisterButton = () => (
    <ButtonLarge color={isApprovedNickname ? 'enabled' : 'disabled'} onClick={handleRegisterButton}>
      시작하기
    </ButtonLarge>
  );

  React.useEffect(() => {
    if (!debouncedNickname) {
      setIsApprovedNickname(undefined);
      return;
    }

    const { isValid, message } = nicknameValidator(debouncedNickname);
    setIsApprovedNickname(isValid);
    setFailedMessage(message);
  }, [debouncedNickname]);

  return (
    <>
      <HeaderSub isClose={false} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: `calc(100% - ${HEADER_HEIGHT})`,
          padding: '1.5rem',
          boxSizing: 'border-box',
        }}
      >
        {renderNicknameInput()}
        {renderRegisterButton()}
      </Box>
    </>
  );
};

export default Register;
