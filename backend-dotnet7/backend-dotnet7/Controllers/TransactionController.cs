using backend_dotnet7.Core.Dtos.Transaction;
using backend_dotnet7.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend_dotnet7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        // POST: api/transaction
        [HttpPost]
        public async Task<IActionResult> CreateTransaction([FromBody] TransactionCreateDto transactionCreateDto)
        {
            var result = await _transactionService.CreateTransactionAsync(transactionCreateDto);
            return result ? Ok("Transaction created successfully.") : BadRequest("Failed to create transaction.");
        }

        // GET: api/transaction
        [HttpGet]
        public async Task<IActionResult> GetAllTransactions()
        {
            var transactions = await _transactionService.GetAllTransactionsAsync();
            return Ok(transactions);
        }

        // GET: api/transaction/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransactionById(int id)
        {
            var transaction = await _transactionService.GetTransactionByIdAsync(id);
            return transaction != null ? Ok(transaction) : NotFound("Transaction not found.");
        }

        // PUT: api/transaction/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransaction(int id, [FromBody] TransactionUpdateDto transactionUpdateDto)
        {
            var result = await _transactionService.UpdateTransactionAsync(id, transactionUpdateDto);
            return result ? NoContent() : NotFound("Failed to update transaction.");
        }

        // DELETE: api/transaction/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var result = await _transactionService.DeleteTransactionAsync(id);
            return result ? NoContent() : NotFound("Failed to delete transaction.");
        }
    }
}
