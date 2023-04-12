export enum TransactionType {
  Credit = "credit",
  Debit = "debit",
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
