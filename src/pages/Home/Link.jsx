import React, { useState } from 'react';
import styled from '@emotion/styled';
import HeaderSub from '../../components/common/HeaderSub';
// http://localhost:3000/
const Link = () => {
  const [link, setLink] = useState('');
  const onChange = (e) => {
    setLink(e.target.value);
  };
  const onSubmit = () => {
    setLink('');
  };

  const isButtonDisabled = link.trim() === '';

  return (
    <div>
      <HeaderSub isShevron isClose />
      <StyledText>
        정보를 추출할
        <br /> 링크를 입력해주세요
      </StyledText>
      <InputLink type="text" placeholder="링크를 입력하세요" value={link} onChange={onChange} />
      <StyledAddText>
        링크 없이 저장하고 싶으신가요?
        <AddLink>직접 추가하기</AddLink>
      </StyledAddText>
      <Button type="button" onClick={onSubmit} disabled={isButtonDisabled}>
        정보 추출하기
      </Button>
    </div>
  );
};

const StyledText = styled.p`
  margin-top: 24px;
  margin-left: 20px;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 33.6px;
  text-align: left;
`;

const InputLink = styled.input`
  width: 335px;
  height: 56px;
  margin-top: 40px;
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  font-size: 16px;
  color: #000000;

  &::placeholder {
    color: #9e9e9e;
    font-size: 16px;
  }
`;

const StyledAddText = styled.p`
  margin-top: 16px;
  margin-left: 58px;
  font-family: Pretendard;
  font-size: 14px;
  line-height: 16.8px;
  color: #757575;
  text-align: left;
`;

const AddLink = styled.span`
  font-size: 14px;
  line-height: 16.8px;
  color: #6420ff;
  margin-left: 8px;
`;

const Button = styled.button`
  width: 335px;
  height: 56px;
  margin-top: 377px;
  padding: 0 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 12px;
  background-color: #e0e0e0;
  color: #ffffff;
  border: none;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  background-color: ${(props) => (props.disabled ? '#E0E0E0' : '#5a1fdf')};
  color: ${(props) => (props.disabled ? '#757575' : '#FFFFFF')};
`;

export default Link;
