import React from 'react';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import useSWR from 'swr';
import HeaderSub from '../../../components/common/HeaderSub';
import FullContainer from '../../../components/common/FullContainer';
import TextFieldLarge from '../../../components/common/TextFieldLarge';
import useDebounce from '../../../hooks/useDebounce';
import fetcher from '../../../utils/fetcher';
import axiosInstance from '../../../apis/instance';

const FriendAdd = () => {
  const [nickname, setNickname] = React.useState('');
  const [searchFriends, setSearchFriends] = React.useState([]);

  const debouncedNickname = useDebounce({ value: nickname, delay: 500 });

  const theme = useTheme();

  const { data: waiting, mutate: waitingMutate } = useSWR('/api/friends/1/check', fetcher);
  const { data: friends, mutate: friendsMutate } = useSWR(`/api/friends/1`, fetcher);

  const receivedRequests = waiting?.data.filter((friend) => friend.status === 'receivedRequests').at(0)?.userList;
  const sentRequests = waiting?.data.filter((friend) => friend.status === 'sentRequests').at(0)?.userList;

  const handleAccept = (userId) => {
    axiosInstance.post(`/api/friends/accept?requestId=${userId}`).then(() => {
      waitingMutate();
      friendsMutate();
    });
  };

  const handleRequest = (userId) => {
    axiosInstance
      .post(`/api/friends/send`, {
        fromUserId: 1,
        toUserId: userId,
      })
      .then(() => {
        waitingMutate();
        friendsMutate();
      });
  };

  const renderSearchList = () => {
    if (!searchFriends || searchFriends.length === 0) {
      return null;
    }

    return (
      <Box
        sx={{
          m: '1rem',
        }}
      >
        {searchFriends.map((user) => (
          <Box
            key={user.Id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              py: '1rem',
            }}
          >
            <Box
              sx={{
                width: '3.75rem',
                height: '3.75rem',
                borderRadius: '50%',
                backgroundImage: `url(${user.profile})`,
                backgroundSize: 'cover',
              }}
            />
            <Typography
              sx={{
                fontSize: '1rem',
                fontWeight: 500,
                flexGrow: 1,
              }}
            >
              {user.nickname}
            </Typography>
            <Button
              onClick={() => {
                handleRequest(user.Id);
              }}
              sx={{
                width: '3.125rem',
                height: '2rem',
                borderRadius: '1rem',
                backgroundColor: theme.color.main[10],
                color: theme.color.black[900],
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              요청
            </Button>
          </Box>
        ))}
      </Box>
    );
  };

  const renderRequestList = () => {
    if (!receivedRequests || !sentRequests) {
      return null;
    }

    if (receivedRequests.length + sentRequests.length === 0) {
      return null;
    }

    return (
      <Box
        sx={{
          m: '1rem',
        }}
      >
        <Typography
          sx={{
            fontSize: '1.125rem',
            fontWeight: 600,
          }}
        >
          대기중 ({receivedRequests.length + sentRequests.length})
        </Typography>
        <Stack>
          {receivedRequests.map((user) => (
            <Box
              key={user.Id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                py: '1rem',
              }}
            >
              <Box
                sx={{
                  width: '3.75rem',
                  height: '3.75rem',
                  borderRadius: '50%',
                  backgroundImage: `url(${user.profile})`,
                  backgroundSize: 'cover',
                }}
              />
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  flexGrow: 1,
                }}
              >
                {user.nickname}
              </Typography>
              <Button
                onClick={() => {
                  handleAccept(user.Id);
                }}
                sx={{
                  width: '3.125rem',
                  height: '2rem',
                  borderRadius: '1rem',
                  backgroundColor: theme.color.main[10],
                  color: theme.color.black[900],
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                수락
              </Button>
            </Box>
          ))}
          {sentRequests.map((user) => (
            <Box
              key={user.Id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                py: '1rem',
              }}
            >
              <Box
                sx={{
                  width: '3.75rem',
                  height: '3.75rem',
                  borderRadius: '50%',
                  backgroundImage: `url(${user.profile})`,
                  backgroundSize: 'cover',
                }}
              />
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  flexGrow: 1,
                }}
              >
                {user.nickname}
              </Typography>
              <Typography
                sx={{
                  color: theme.color.main[100],
                }}
              >
                수락 대기중
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    );
  };

  const renderFriendList = () => {
    if (!friends || friends.data.length === 0) {
      return null;
    }

    return (
      <Box
        sx={{
          width: '100%',
          m: '1rem',
        }}
      >
        <Typography
          sx={{
            fontSize: '1.125rem',
            fontWeight: 600,
          }}
        >
          나의 친구 ({friends.data.length})
        </Typography>
        <Stack>
          {friends.data.map((friend) => (
            <Box
              key={friend.Id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                py: '1rem',
              }}
            >
              <Box
                sx={{
                  width: '3.75rem',
                  height: '3.75rem',
                  borderRadius: '50%',
                  backgroundImage: `url(${friend.profile})`,
                  backgroundSize: 'cover',
                }}
              />
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
              >
                {friend.nickname}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    );
  };

  React.useEffect(() => {
    if (!debouncedNickname) {
      setSearchFriends([]);
      return;
    }

    axiosInstance.get(`/api/friends/search?NickName=${encodeURIComponent(debouncedNickname)}`).then((res) => {
      const { data } = res.data;
      const list = [];
      data.forEach((user) => {
        const { userList } = user;
        userList.forEach((u) => {
          list.push(u);
        });
      });

      setSearchFriends(list);
    });
  }, [debouncedNickname]);

  return (
    <>
      <HeaderSub isClose={false} text="친구 추가하기" />
      <FullContainer>
        <TextFieldLarge
          hasSearchAdornment
          placeholder="닉네임을 검색해 친구를 추가하세요"
          value={nickname}
          onChange={(v) => setNickname(v)}
        />
        <Stack
          sx={{
            height: '100%',
            width: '100%',
            marginTop: '1rem',
          }}
        >
          {renderSearchList()}
          {renderRequestList()}
          {renderFriendList()}
        </Stack>
      </FullContainer>
    </>
  );
};

export default FriendAdd;
