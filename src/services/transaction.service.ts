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

export const getAllTransactionsService = async ({ currentPage, itemsPerPage, sort }: GetAllTransactions) => {
  try {
    const offset: number = (currentPage - 1) * itemsPerPage;
    return await prisma.transactions.findMany({
      skip: offset,
      take: itemsPerPage,
    });
  } catch (error) {
    return error;
  }
};
