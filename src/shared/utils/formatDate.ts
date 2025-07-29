/**
 * Date 객체를 'yyyy. M. d.' 형식의 문자열로 변환하는 함수 (표시용)
 */
export const formatDate = (date: Date) => {
  if (!date) return '';

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}. ${month}. ${day}`;
};

/**
 * Date 객체를 'YYYY-MM-DD' 형식의 문자열로 변환하는 함수 (API 전송용)
 */
export const formatDateForAPI = (date: Date) => {
  if (!date) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
