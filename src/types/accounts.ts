export type Account = {
  id: string;
  name: string;
  code: string;
};

export type CategoryAccounts = {
  name: string;
  accounts: Account[];
};

export type AccountCategoryMap = {
  [category: string]: CategoryAccounts;
};
