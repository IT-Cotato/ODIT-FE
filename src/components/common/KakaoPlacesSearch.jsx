import React from 'react';

/**
 * AddKakaoSearchList component
 * Function to search with keyword
 *
 * @param {string} keyword - keyword to search
 * @param {*} placeSearchCallback - callback function to search place
 * @returns
 */
const KakaoPlacesSearch = ({ keyword, placeSearchCallback }) => {
  const keywordSearch = React.useRef();

  React.useEffect(() => {
    if (window?.kakao?.maps) {
      window.kakao.maps.load(() => {
        const ps = new window.kakao.maps.services.Places();

        keywordSearch.current = ps.keywordSearch;
      });
    }
  }, []);

  React.useEffect(() => {
    if (keywordSearch.current) {
      keywordSearch.current(keyword, placeSearchCallback);
    }
  }, [keyword, keywordSearch.current]);

  return null;
};

export default KakaoPlacesSearch;
