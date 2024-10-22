using backend_dotnet7.Core.Dtos.Transaction;
using backend_dotnet7.Core.Entities;
using backend_dotnet7.Core.Interfaces;
using backend_dotnet7.Core.DbContext;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend_dotnet7.Core.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public TransactionService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> CreateTransactionAsync(TransactionCreateDto transactionCreateDto)
        {
            var transaction = _mapper.Map<Transaction>(transactionCreateDto);
            _context.Transactions.Add(transaction);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<TransactionReadDto>> GetAllTransactionsAsync()
        {
            var transactions = await _context.Transactions.ToListAsync();
            return _mapper.Map<IEnumerable<TransactionReadDto>>(transactions);
        }

        public async Task<TransactionReadDto> GetTransactionByIdAsync(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            return transaction != null ? _mapper.Map<TransactionReadDto>(transaction) : null;
        }

        public async Task<bool> UpdateTransactionAsync(int id, TransactionUpdateDto transactionUpdateDto)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null) return false;

            // Përdor AutoMapper për të përditësuar entitetin
            _mapper.Map(transactionUpdateDto, transaction);
            _context.Transactions.Update(transaction);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteTransactionAsync(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null) return false;

            _context.Transactions.Remove(transaction);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}

