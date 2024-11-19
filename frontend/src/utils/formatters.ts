const formatToDate = (date: Date): string => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatToCurrency = (
  amount: number,
  unit: string | null = null
): string => {
  return `${amount.toLocaleString("ko-KR")}${unit ? unit : "원"}`;
};

const formatToSubDate = (m: number, round: number): string => {
  const year = new Date().getFullYear();
  const month = m.toString().padStart(2, "0");
  const firstDayOfMonth = new Date(`${year}-${month}-01`);
  const firstDay = firstDayOfMonth.getDay();

  let firstMondayOffset = (1 - firstDay + 7) % 7;
  if (firstMondayOffset === 0) {
    firstMondayOffset = 7;
  }

  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(1 + firstMondayOffset + (round - 1) * 7);

  const endDate = getDateAfterDays(startDate.toISOString().split("T")[0], 6);

  return `${startDate.toISOString().split("T")[0]} ~ ${endDate}`;
};

const getDateAfterDays = (dateString: string, days: number): string => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};

const formatPhoneNumber = (number: string | undefined): string => {
  if (number === undefined) return "";
  if (number.length !== 11) {
    throw new Error("Input must be an 11-digit string");
  }
  if (!/^\d+$/.test(number)) {
    throw new Error("Input must contain only numbers");
  }
  if (!number.startsWith("010")) {
    throw new Error("Phone number must start with 010");
  }

  return `${number.slice(0, 3)}-${number.slice(3, 7)}-${number.slice(7)}`;
};

const getSortedMonths = (): string[] => {
  const currentMonth = new Date().getMonth();
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const sortedLabels = [
    ...labels.slice(currentMonth + 1),
    ...labels.slice(0, currentMonth + 1),
  ];

  return sortedLabels;
};

const formatMonthLabels = (): string[] => {
  const sortedLabels = getSortedMonths();
  return sortedLabels.map((label) => {
    const month = new Date(`${label} 1`).getMonth() + 1;
    return `${month}월`;
  });
};

interface FormatMonthProps {
  [key: string]: number;
}

const formatMonthData = (data: FormatMonthProps | null): number[] => {
  const sortedData: number[] = [];
  const sortedLabels = getSortedMonths();
  sortedLabels.forEach((label) => {
    sortedData.push(data?.[label as keyof FormatMonthProps] ?? 0);
  });
  return sortedData;
};

const formatAgeGroup = (date: string): number => {
  const birthYear = Number(date.slice(0, 4));
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const range = Math.floor((currentYear - birthYear + 1) / 10) * 10;
  return range;
};

export default {
  formatToDate,
  formatToCurrency,
  formatToSubDate,
  formatPhoneNumber,
  formatMonthLabels,
  formatMonthData,
  formatAgeGroup,
};
