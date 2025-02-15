/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Stack, Box, Typography, Button } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useLocation } from 'react-router';
import CheckBox from '../common/CheckBox';
import { EVENT_CATEGORY_CODE_MAP } from '../../constant';

/**
 * AddSearchList component
 * @param {object} searchResults - search results
 * @param {object} checkedResults - checked results
 * @param {function} onClick - click event for the search list
 * @returns
 */
const AddSearchList = ({ searchResults, checkedResults, onClick }) => {
  const location = useLocation();

  const theme = useTheme();

  const getResultValue = (result) => {
    if (location.pathname.includes('place')) {
      return {
        name: result.place_name,
        category: result.category_group_name,
        address: result.address_name,
      };
    }

    return {
      name: result.name,
      category: EVENT_CATEGORY_CODE_MAP[result.type],
      address: result.location,
    };
  };

  const resultValues = searchResults.map((result) => getResultValue(result));

  return (
    <Stack sx={{ gap: '2rem', width: '100%', flex: '1', overflow: 'scroll' }}>
      {resultValues.map((result, index) => (
        <Button key={index} onClick={() => onClick(index)}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              width: '100%',
              gap: '0.75rem',
            }}
          >
            <CheckBox checked={checkedResults.includes(searchResults[index])} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.125rem',
                    fontWeight: '500',
                    color: theme.color.black[900],
                    textAlign: 'left',
                    width: '80%',
                  }}
                >
                  {result.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    color: theme.color.black[400],
                  }}
                >
                  {result.category}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    color: theme.color.black[400],
                  }}
                >
                  {result.address}
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
