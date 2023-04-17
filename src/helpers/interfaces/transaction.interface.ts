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
  userId?: number;
  amount: number;
  type: TransactionType;
}

export interface CreateTransaction {
  userId: number;
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
  userId: number;
  sortOrder: SortOrder;
}

export interface TransactionsResult {
  name: string;
  type: TransactionType;
  amount: number;
}

export interface TransactionsUuserTransactionAccounts {
  id: number;
  account_id: number;
  transaction_id: number;
}

export interface GetAllTransactionsQuery {
  currentPage: string;
  itemsPerPage: string;
  sortOrder: SortOrder;
}

export interface UserTransactionAccounts {
  id: number;
  user_id: number;
  balance: number;
}

export interface CreatedTransaction {
  id: number;
  account_id: number;
  amount: number;
  type: TransactionType;
  transactions_user_transaction_accounts: {
    id: number;
    transaction_id: number;
    account_id: number;
  };
}

export interface UpdateTransaction {
  amount: number;
  type: TransactionType;
}

export interface UpdateTransactionParameters {
  transactionId: number;
  userId: number;
  amount: number;
  type: TransactionType;
}

export interface UpdateTransactionResult {
  account_id: number;
  amount: number;
  balance: number;
  id: number;
  type: TransactionType;
  user_id: number;
}
