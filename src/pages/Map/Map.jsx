import styled from '@emotion/styled/macro';
import React from 'react';
import { useTransition, animated } from '@react-spring/web';
import TextFieldLarge from '../../components/common/TextFieldLarge';
import MapList from './MapList';
import usePlaces from '../../hooks/usePlaces';
import BottomDrawer from '../../components/common/BottomDrawer';
import useDebounce from '../../hooks/useDebounce';
import useKakaomap from '../../hooks/useKakaomap';
import NavigationBar from '../../components/common/NavigationBar';
import useMapListCheckPlacesStore from '../../stores/useMapListCheckPlacesStore';
import MapListCheckFooter from '../../components/Map/MapListCheckFooter';

const Map = () => {
  const [searchText, setSearchText] = React.useState('');

  const debouncedSearchText = useDebounce({ value: searchText, delay: 500 });

  const mapContainerRef = React.useRef(null);

  useKakaomap({ mapContainerRef });

  const { handleSearchKeyword } = usePlaces();

  const { mapListCheckPlaces } = useMapListCheckPlacesStore();

  const handleSearchTextChange = (changedText) => {
    setSearchText(changedText);
  };

  const renderBottomDrawerFooter = () => {
    const transitions = useTransition(mapListCheckPlaces.length > 0, {
      from: { transform: 'translateY(100%)', opacity: 0 },
      enter: { transform: 'translateY(0%)', opacity: 1 },
      leave: { transform: 'translateY(100%)', opacity: 0 },
      config: { mass: 1, tension: 280, friction: 26 },
      immediate: false,
    });

    return transitions((styles, isMapListCheckFooter) => (
      <animated.div key={isMapListCheckFooter ? 'footer' : 'nav'} style={styles}>
        {isMapListCheckFooter ? <MapListCheckFooter /> : <NavigationBar />}
      </animated.div>
    ));
  };

  React.useEffect(() => {
    handleSearchKeyword(debouncedSearchText);
  }, [debouncedSearchText]);

  return (
    <>
      <StyledMap ref={mapContainerRef} />
      <OverlayBox>
        <PointerEventsBox>
          <TextFieldLarge
            hasSearchAdornment
            placeholder="내가 저장한 장소를 검색하세요."
            value={searchText}
            onChange={handleSearchTextChange}
          />
        </PointerEventsBox>
      </OverlayBox>
      <PointerEventsBox>
        <BottomDrawer footer={renderBottomDrawerFooter()}>
          <MapList />
        </BottomDrawer>
      </PointerEventsBox>
    </>
  );
};

export default Map;

const StyledMap = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const OverlayBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 1.5rem;
  box-sizing: border-box;
  background: transparent;
  pointer-events: none;
`;

const PointerEventsBox = styled.div`
  pointer-events: auto;
`;
