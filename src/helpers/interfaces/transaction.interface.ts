export enum TransactionType {
  Credit = "credit",
  Debit = "debit",
}

export enum SortOrder {
  Ascending = "asc",
  Descending = "desc",
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
  sortOrder: SortOrder;
}

export interface TransactionsResult {
  name: string;
  type: TransactionType;
  amount: number;
}

export interface GetAllTransactionsQuery {
  currentPage: string;
  itemsPerPage: string;
  sortOrder: SortOrder;
}
