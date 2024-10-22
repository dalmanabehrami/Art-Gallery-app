using backend_dotnet7.Core.Dtos.Transaction;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend_dotnet7.Core.Interfaces
{
    public interface ITransactionService
    {
        Task<bool> CreateTransactionAsync(TransactionCreateDto transactionCreateDto);
        Task<IEnumerable<TransactionReadDto>> GetAllTransactionsAsync();
        Task<TransactionReadDto> GetTransactionByIdAsync(int id);
        Task<bool> UpdateTransactionAsync(int id, TransactionUpdateDto transactionUpdateDto);
        Task<bool> DeleteTransactionAsync(int id);
    }
}

