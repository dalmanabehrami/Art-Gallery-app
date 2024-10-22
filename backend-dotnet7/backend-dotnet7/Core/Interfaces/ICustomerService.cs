using backend_dotnet7.Core.Dtos.Customer;

namespace backend_dotnet7.Core.Interfaces
{
    public interface ICustomerService
    {
        Task<bool> RegisterCustomerAsync(CustomerCreateDto customerCreateDto);
        Task<CustomerReadDto> GetCustomerByIdAsync(int id);
        Task<IEnumerable<CustomerReadDto>> GetAllCustomersAsync();
        Task<bool> UpdateCustomerAsync(int id, CustomerUpdateDto customerUpdateDto);
        Task<bool> DeleteCustomerAsync(int id);
    }
}
