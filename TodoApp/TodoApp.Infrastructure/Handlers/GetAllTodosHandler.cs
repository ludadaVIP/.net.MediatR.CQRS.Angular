using MediatR;
using Microsoft.EntityFrameworkCore;
using TodoApp.Core.Entities;
using TodoApp.Core.Queries;
using TodoApp.Infrastructure.Data;

namespace TodoApp.Infrastructure.Handlers
{
    public class GetAllTodosHandler : IRequestHandler<GetAllTodosQuery, IEnumerable<Todo>>
    {
        private readonly TodoDbContext _context;

        public GetAllTodosHandler(TodoDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Todo>> Handle(GetAllTodosQuery request, CancellationToken cancellationToken)
        {
            return await _context.Todos
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync(cancellationToken);
        }
    }
}