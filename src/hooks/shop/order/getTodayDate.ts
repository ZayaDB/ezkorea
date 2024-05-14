export default function getTodayDate(inputDate: string): string {
  // 입력 형식에 따라서 날짜를 파싱합니다.
  let date: Date;
  if (inputDate.length === 6) {
    // YYDDMM 형식
    const year: number = parseInt(inputDate.slice(0, 2));
    const month: number = parseInt(inputDate.slice(4, 6));
    const day: number = parseInt(inputDate.slice(2, 4));
    date = new Date(year + 2000, month - 1, day); // 2000년 이후로 가정하여 연도를 계산합니다.
  } else if (inputDate.length === 8) {
    // YYYYMMDD 형식
    const year: number = parseInt(inputDate.slice(0, 4));
    const month: number = parseInt(inputDate.slice(4, 6));
    const day: number = parseInt(inputDate.slice(6, 8));
    date = new Date(year, month - 1, day); // 월은 0부터 시작하므로 1을 빼줍니다.
  } else if (inputDate.length === 10) {
    // YYYY.MM.DD 형식
    const [yearStr, monthStr, dayStr] = inputDate.split('.');
    const year: number = parseInt(yearStr);
    const month: number = parseInt(monthStr);
    const day: number = parseInt(dayStr);
    date = new Date(year, month - 1, day); // 월은 0부터 시작하므로 1을 빼줍니다.
  } else {
    throw new Error('올바른 형식의 날짜를 입력하세요.');
  }

  // YYYY-MM-DD 형식으로 날짜를 반환합니다.
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
  const day: number = date.getDate();

  // 월과 일이 한 자리 수인 경우 앞에 0을 붙여줍니다.
  const formattedMonth: string = month < 10 ? '0' + month : '' + month;
  const formattedDay: string = day < 10 ? '0' + day : '' + day;

  // 입력 형식에 따라 반환합니다.
  if (inputDate.length === 6) {
    return `${year}-${formattedMonth}-${formattedDay}`;
  } else if (inputDate.length === 8) {
    return `${year}${formattedMonth}${formattedDay}`;
  } else {
    return `${year}.${formattedMonth}.${formattedDay}`;
  }
}
