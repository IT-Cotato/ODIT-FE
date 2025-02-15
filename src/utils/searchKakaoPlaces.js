/**
 * Search places using Kakao Maps API.
 * @param {string} keyword - Search keyword.
 * @returns {Promise} - Promise object represents the search result.
 */
const searchKakaoPlaces = async (keyword) => {
  return new Promise((resolve, reject) => {
    if (!window?.kakao?.maps) {
      reject(new Error('Did not load Kakao Maps API.'));
      return;
    }

    window.kakao.maps.load(() => {
      const ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(keyword, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve(data);
        } else {
          reject(new Error('Failed to search places.'));
        }
      });
    });
  });
};

export default searchKakaoPlaces;
