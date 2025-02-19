import { useState, useEffect } from 'react';

const EventFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showRegionFilter, setShowRegionFilter] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleCategoryClick = (category) => {
    if (category === '지역') {
      setShowRegionFilter(true);
    } else {
      setShowRegionFilter(false);
      setSelectedRegion(null);
    }
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (selectedCategory === '최신순') {
      console.log('✅ 최신순으로 정렬된 데이터 불러오기');
    } else if (selectedCategory === '지역' && selectedRegion) {
      console.log(`✅ ${selectedRegion} 지역 데이터 불러오기`);
    } else {
      console.log(`✅ ${selectedCategory} 카테고리 데이터 불러오기`);
    }
  }, [selectedCategory, selectedRegion]);

  return { selectedCategory, showRegionFilter, selectedRegion, handleCategoryClick, setSelectedRegion };
};

export default EventFilter;
