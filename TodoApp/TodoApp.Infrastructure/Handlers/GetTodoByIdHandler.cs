using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Threading;
using TodoApp.Core.Entities;
using TodoApp.Core.Queries;
using TodoApp.Infrastructure.Data;

namespace TodoApp.Infrastructure.Handlers
{
    public class GetTodoByIdHandler : IRequestHandler<GetTodoByIdQuery, Todo?>
    {
        private readonly TodoDbContext _context;

        public GetTodoByIdHandler(TodoDbContext context)
        {
            _context = context;
        }

        public async Task<Todo?> Handle(GetTodoByIdQuery request, CancellationToken cancellationToken)
        {
            return await _context.Todos.FindAsync(new object[] { request.Id }, cancellationToken);
        }
    }
}