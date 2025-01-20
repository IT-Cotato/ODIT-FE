/**
 * check nickname is valid
 * @param {string} nickname - The nickname to check.
 * @returns {object} The result object. { isValid: boolean, message: string }
 */
const nicknameValidator = (nickname) => {
  if (nickname.includes(' ')) {
    return {
      isValid: false,
      message: '공백을 제거해 주세요',
    };
  }
  if (nickname.length > 12) {
    return {
      isValid: false,
      message: '12자 이상은 사용할 수 없어요',
    };
  }

  return {
    isValid: true,
    message: '',
  };
};

export default nicknameValidator;
