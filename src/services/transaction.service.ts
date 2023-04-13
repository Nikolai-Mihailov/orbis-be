import prisma from "../helpers/prisma-clitnt";

import { CreateTransaction, DeleteTransactionParameters, GetAllTransactions } from "../helpers/interfaces/transaction.interface";

export const createTransactionService = async ({ account_id, type, amount }: CreateTransaction) => {
  try {
    return await prisma.transactions.create({
      data: {
        account_id,
        type,
        amount,
      },
    });
  } catch (error) {
    return error;
  }
};

export const deleteTransactionService = async ({ transactionId, userId }: DeleteTransactionParameters) => {
  try {
    // For some reason prisma.transactions.delete dosn't detect any other parameters besides id... TO FIX
    // TO DO - to add table relations

    return await prisma.transactions.delete({
      where: {
        id: transactionId,
        // account_id: userId <---  user shuld be able to delete only his transactions
      },
    });
  } catch (error) {
    return error;
  }
};

export const getAllTransactionsService = async ({ currentPage, itemsPerPage, sortOrder }: GetAllTransactions) => {
  try {
    const offset: number = (currentPage - 1) * itemsPerPage;
    const query = await prisma.$queryRaw`SELECT 
      u.name, t.type, t.amount
      FROM
        db.users u
      LEFT JOIN
        user_transaction_accounts ut ON u.id = ut.user_id
      LEFT JOIN
        transactions t ON t.account_id = ut.user_id
       WHERE
        t.amount IS NOT NULL
        LIMIT ${itemsPerPage} OFFSET ${offset}`;
    return query;
  } catch (error) {
    return error;
  }
};
