const formatToDate = (date: Date, dateType: string): string => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  switch (dateType) {
    case "yyyy.mm.dd":
      return `${year}.${month}.${day}`;
    default:
      throw new Error("Unsupported date format type");
  }
};

export default {
  formatToDate,
};
