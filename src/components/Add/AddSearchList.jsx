import React from 'react';
import { Stack, Box, Typography, Button } from '@mui/material';
import { useTheme } from '@emotion/react';
import CheckBox from '../common/CheckBox';

const AddSearchList = ({ searchResult, checkedPlaces, onClick }) => {
  const theme = useTheme();

  return (
    <Stack sx={{ gap: '2rem', width: '100%', flex: '1', overflow: 'scroll' }}>
      {searchResult.map((place) => (
        <Button key={place.place_url} onClick={() => onClick(place)}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              width: '100%',
              gap: '0.75rem',
            }}
          >
            <CheckBox checked={checkedPlaces.includes(place)} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Typography
                  sx={{
                    fontSize: '1.125rem',
                    fontWeight: '500',
                    color: theme.color.black[900],
                  }}
                >
                  {place.place_name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    color: theme.color.black[400],
                  }}
                >
                  {place.category_group_name}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    color: theme.color.black[400],
                  }}
                >
                  {place.address_name}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Button>
      ))}
    </Stack>
  );
};

export default AddSearchList;
