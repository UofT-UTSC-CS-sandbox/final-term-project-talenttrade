import { field_names } from "./types";

const names: field_names = {
  last_name: "Last name",
  first_name: "First name",
};

export const formatErrors = (data: { [key: string]: string[] }) => {
  return Object.entries(data)
    .map(([key, value]) => {
      return `${names[key as keyof field_names]}: ${value.join(", ")}`;
    })
    .join(" ");
};
