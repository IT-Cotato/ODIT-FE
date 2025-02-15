import { postUserValidation } from '../apis/user';

/**
 * check nickname is valid
 * @param {string} nickname - The nickname to check.
 * @returns {object} The result object. { isValid: boolean, message: string }
 */
const nicknameValidator = async (nickname) => {
  if (nickname.includes(' ')) {
    return {
      isValid: false,
      message: '공백을 제거해 주세요',
    };
  }

  if (nickname.length < 2) {
    return {
      isValid: false,
      message: '2자 이상 입력해 주세요',
    };
  }

  if (nickname.length > 12) {
    return {
      isValid: false,
      message: '12자 이상은 사용할 수 없어요',
    };
  }

  const data = await postUserValidation(nickname);

  if (!data.success) {
    return {
      isValid: false,
      message: '이미 사용중인 닉네임이에요',
    };
  }

  return {
    isValid: true,
    message: '',
  };
};

export default nicknameValidator;
