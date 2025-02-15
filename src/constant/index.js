export const HEADER_HEIGHT = '4.5rem';
export const NAVIGATION_BAR_HEIGHT = '3.75rem';

export const PLACE_CATEGORY_CODE_MAP = {
  FD6: '음식점',
  CE7: '카페',
  CT1: '문화시설',
  AT4: '관광명소',
  AD5: '숙박',
  MT1: '대형마트',
  CS2: '편의점',
  PO3: '공공기관',
  AG2: '중개업소',
  SC4: '학교',
  AC5: '학원',
  PS3: '어린이집, 유치원',
  PK6: '주차장',
  OL7: '주유소, 충전소',
  SW8: '지하철역',
  BK9: '은행',
  HP8: '병원',
  PM9: '약국',
  '': '기타',
};

export const PLACE_CATEGORY_CODE_WITH_ALL_MAP = {
  ALL: '전체',
  ...PLACE_CATEGORY_CODE_MAP,
};

export const EVENT_CATEGORY_CODE_MAP = {
  PERFORMANCE: '공연',
  EXHIBITION: '전시',
};
