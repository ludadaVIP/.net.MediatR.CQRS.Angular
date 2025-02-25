using MediatR;
using TodoApp.Core.Commands;
using TodoApp.Core.Entities;
using TodoApp.Core.Exceptions;
using TodoApp.Infrastructure.Data;

namespace TodoApp.Infrastructure.Handlers
{
    public class UpdateTodoHandler : IRequestHandler<UpdateTodoCommand>
    {
        private readonly TodoDbContext _context;

        public UpdateTodoHandler(TodoDbContext context)
        {
            _context = context;
        }

        public async Task Handle(UpdateTodoCommand request, CancellationToken cancellationToken)
        {
            var todo = await _context.Todos.FindAsync(new object[] { request.Id }, cancellationToken);
            if (todo == null)
                throw new NotFoundException($"Todo with ID {request.Id} not found");

            todo.Title = request.Title;
            todo.Description = request.Description;
            todo.IsCompleted = request.IsCompleted;
            if (request.IsCompleted && !todo.CompletedAt.HasValue)
                todo.CompletedAt = DateTime.UtcNow;
            else if (!request.IsCompleted)
                todo.CompletedAt = null;

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}