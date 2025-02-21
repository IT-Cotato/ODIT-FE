import { useState, useEffect } from 'react';

const EventFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showRegionFilter, setShowRegionFilter] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedSort, setSelectedSort] = useState('latest');

  const handleCategoryClick = (category) => {
    if (category === '지역') {
      setShowRegionFilter(true);
    } else {
      setShowRegionFilter(false);
      setSelectedRegion(null);
    }
    setSelectedCategory(category);
  };

  const handleSortChange = () => {
    setSelectedSort((prev) => (prev === 'latest' ? 'oldest' : 'latest'));
  };

  useEffect(() => {
    if (selectedSort === 'latest') {
      console.log('✅ 최신순으로 정렬된 데이터 불러오기');
    } else {
      console.log('✅ 오래된 순으로 정렬된 데이터 불러오기');
    }

    if (selectedCategory === '지역' && selectedRegion) {
      console.log(`✅ ${selectedRegion} 지역 데이터 불러오기`);
    } else if (selectedCategory) {
      console.log(`✅ ${selectedCategory} 카테고리 데이터 불러오기`);
    }
  }, [selectedCategory, selectedRegion, selectedSort]);

  return {
    selectedCategory,
    showRegionFilter,
    selectedRegion,
    selectedSort,
    handleCategoryClick,
    handleSortChange,
    setSelectedRegion,
  };
};

export default EventFilter;
