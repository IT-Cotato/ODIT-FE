import React from 'react';

/**
 * AddKakaoSearchList component
 * Function to search with keyword
 *
 * @param {string} keyword - keyword to search
 * @param {*} placeSearchCallback - callback function to search place
 * @returns
 */
const AddKakaoSearchList = ({ keyword, placeSearchCallback }) => {
  const keywordSearch = React.useRef();

  React.useEffect(() => {
    if (window.kakao && window.kakao.maps) {
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
  }, [keyword]);

  return null;
};

export default AddKakaoSearchList;
