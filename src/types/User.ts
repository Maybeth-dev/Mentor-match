export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  role: "mentee" | "mentor" | "admin";
  bio?: string;
  skills?: string[];
  goals?: string;
};
