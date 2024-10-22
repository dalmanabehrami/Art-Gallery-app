using backend_dotnet7.Core.Dtos.Customer;
using backend_dotnet7.Core.Entities;
using backend_dotnet7.Core.Interfaces;
using backend_dotnet7.Core.DbContext;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace backend_dotnet7.Core.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CustomerService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> RegisterCustomerAsync(CustomerCreateDto customerCreateDto)
        {
            var customer = _mapper.Map<Customer>(customerCreateDto);

            _context.Customers.Add(customer);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<CustomerReadDto> GetCustomerByIdAsync(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
                return null;

            return _mapper.Map<CustomerReadDto>(customer);
        }

        public async Task<IEnumerable<CustomerReadDto>> GetAllCustomersAsync()
        {
            var customers = await _context.Customers.ToListAsync();
            return _mapper.Map<IEnumerable<CustomerReadDto>>(customers);
        }

        public async Task<bool> UpdateCustomerAsync(int id, CustomerUpdateDto customerUpdateDto)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
                return false;

            _mapper.Map(customerUpdateDto, customer);

            _context.Customers.Update(customer);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteCustomerAsync(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
                return false;

            _context.Customers.Remove(customer);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}

