export type User = {
  id: number;
  username: string;
  email: string;
};

export type LoginResponse = {
  jwt: string;
  user: User;
};

export type TransactionType = "expense" | "income";

export type Transaction = {
  name: string;
  date: string;
  amount: number;
  categories: string;
  type: TransactionType;
};

export type StrapiResponses<T extends object> = {
  data: {
    id: number;
    attributes: T;
  }[];
};

export type StrapiResponse<T> = {
  data: {
    id: number;
    attributes: T;
  };
};

export type ErrorResponse = {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
  };
};
