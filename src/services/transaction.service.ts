import prisma from "../helpers/prisma-clitnt";

import {
  CreateTransaction,
  DeleteTransactionParameters,
  GetAllTransactions,
  TransactionType,
  UserTransactionAccounts,
  UpdateTransactionParameters,
  TransactionsUuserTransactionAccounts,
} from "../helpers/interfaces/transaction.interface";

export const createTransactionService = async ({ userId, type, amount }: CreateTransaction) => {
  try {
    const transaction = type === TransactionType.Debit ? "increment" : "decrement";
    const account: UserTransactionAccounts = await prisma.user_transaction_accounts.upsert({
      where: { user_id: userId },
      create: {
        user_id: userId,
        balance: amount,
      },
      update: {
        balance: {
          [transaction]: amount,
        },
      },
    });

    return await prisma.transactions.create({
      data: {
        account_id: account.id,
        type,

        transactions_user_transaction_accounts: {
          create: {
            account_id: account.id,
          },
        },
      },
      include: { transactions_user_transaction_accounts: true },
    });
  } catch (error) {
    return error;
  }
};

export const deleteTransactionService = async ({ transactionId, userId }: DeleteTransactionParameters) => {
  try {
    const account: TransactionsUuserTransactionAccounts | null = await prisma.transactions_user_transaction_accounts.findFirst({
      where: {
        transaction_id: transactionId,
        user_transaction_accounts: {
          user_id: userId,
        },
      },
    });

    if (account?.id) {
      const transaction = await prisma.transactions.findFirst({
        where: {
          account_id: account.account_id,
        },
      });
      const transactionType = transaction?.type === TransactionType.Debit ? "increment" : "decrement";

      await prisma.$transaction([
        prisma.transactions_user_transaction_accounts.deleteMany({
          where: { transaction_id: transactionId, account_id: account.account_id },
        }),
        prisma.transactions.deleteMany({
          where: { id: transactionId, account_id: account.account_id },
        }),
      ]);

      return await prisma.user_transaction_accounts.update({
        data: {
          balance: {
            [transactionType]: transaction?.amount,
          },
        },
        where: {
          user_id: userId,
        },
      });
    }
  } catch (error) {
    return error;
  }
};

export const getAllTransactionsService = async ({ currentPage, itemsPerPage, sortOrder, userId }: GetAllTransactions) => {
  try {
    const offset: number = (currentPage - 1) * itemsPerPage;

    return await prisma.transactions_user_transaction_accounts.findMany({
      where: {
        user_transaction_accounts: {
          user_id: userId,
          users: {
            id: userId,
          },
        },
      },
      include: { transactions: true, user_transaction_accounts: true },
      skip: offset,
      take: itemsPerPage,
      orderBy: {
        user_transaction_accounts: {
          users: {
            name: sortOrder,
          },
        },
      },
    });
  } catch (error) {
    return error;
  }
};

export const updateTransactionService = async ({ transactionId, userId, amount, type }: UpdateTransactionParameters) => {
  try {
    const transactionType = type === TransactionType.Debit ? "increment" : "decrement";
    const transaction = await prisma.transactions.update({
      data: {
        amount,
        type,
      },
      where: { id: transactionId },
    });

    const account: UserTransactionAccounts | null = await prisma.user_transaction_accounts.update({
      data: {
        balance: {
          [transactionType]: amount,
        },
      },
      where: {
        user_id: userId,
      },
    });

    return {
      ...transaction,
      ...account,
    };
  } catch (error) {
    return error;
  }
};
