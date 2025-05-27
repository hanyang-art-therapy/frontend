/**
 * 비밀번호 유효성 검사
 * @param password - 비밀번호 문자열
 * @returns 유효한 비밀번호인 경우 true, 유효하지 않은 경우 false
 */
export const validatePassword = (password: string) => {
  const regex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&~])[A-Za-z\d@$!%*?&~]{10,}$/;

  return regex.test(password);
};
