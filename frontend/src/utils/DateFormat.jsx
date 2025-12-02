import dayjs from "dayjs";

export const formatDateTime = (dateString, format = "YYYY/MM/DD HH:mm:ss") => {
  if (!dateString) return "";
  return dayjs(dateString).format(format);
}
