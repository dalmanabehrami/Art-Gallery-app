﻿using backend_dotnet7.Core.Dtos.Log;
using System.Security.Claims;

namespace backend_dotnet7.Core.Interfaces
{
    public interface ILogService
    {
        Task SaveNewLog(string username, string description);
        Task<IEnumerable<GetLogDto>> GetLogsAsync();
        Task<IEnumerable<GetLogDto>> GetMyLogsAsync(ClaimsPrincipal user);
    }
}