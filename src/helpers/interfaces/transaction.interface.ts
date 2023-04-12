export enum TransactionType {
  Credit = "credit",
  Debit = "debit",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export interface Transactions {
  id?: number;
  account_id?: number;
  amount: number;
  type: TransactionType;
}

export interface CreateTransaction {
  account_id: number;
  amount: number;
  type: TransactionType;
}

export interface DeleteTransaction {
  transactionId: string;
}

export interface DeleteTransactionParameters {
  transactionId: number;
  userId: number;
}

export interface GetAllTransactions {
  currentPage: number;
  itemsPerPage: number;
  sort: SortOrder;
}
