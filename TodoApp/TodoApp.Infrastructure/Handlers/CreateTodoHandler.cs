using MediatR;
using System.Threading.Tasks;
using System.Threading;
using System;
using TodoApp.Core.Commands;
using TodoApp.Core.Entities;
using TodoApp.Infrastructure.Data;

namespace TodoApp.Infrastructure.Handlers
{
    public class CreateTodoHandler : IRequestHandler<CreateTodoCommand, int>
    {
        private readonly TodoDbContext _context;

        public CreateTodoHandler(TodoDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateTodoCommand request, CancellationToken cancellationToken)
        {
            var todo = new Todo
            {
                Title = request.Title,
                Description = request.Description,
                CreatedAt = DateTime.UtcNow,
                IsCompleted = false
            };

            _context.Todos.Add(todo);
            await _context.SaveChangesAsync(cancellationToken);

            return todo.Id;
        }
    }
}