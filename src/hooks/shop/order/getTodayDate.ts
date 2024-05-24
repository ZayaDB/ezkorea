export default function getTodayDate(format: string): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedMonth = month < 10 ? '0' + month : '' + month;
  const formattedDay = day < 10 ? '0' + day : '' + day;

  if (format === 'YYMMDD') {
    const shortYear = (year % 100).toString().padStart(2, '0');
    return `${shortYear}${formattedMonth}${formattedDay}`;
  } else if (format === 'YYYYMMDD') {
    return `${year}${formattedMonth}${formattedDay}`;
  } else if (format === 'YYYY.MM.DD') {
    return `${year}.${formattedMonth}.${formattedDay}`;
  } else {
    throw new Error('올바른 형식의 날짜를 입력하세요.');
  }
}
