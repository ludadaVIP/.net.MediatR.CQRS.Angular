using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TodoApp.Core.Commands;
using TodoApp.Core.Exceptions;
using TodoApp.Infrastructure.Data;

namespace TodoApp.Infrastructure.Handlers
{
    public class DeleteTodoHandler : IRequestHandler<DeleteTodoCommand>
    {
        private readonly TodoDbContext _context;

        public DeleteTodoHandler(TodoDbContext context)
        {
            _context = context;
        }

        public async Task Handle(DeleteTodoCommand request, CancellationToken cancellationToken)
        {
            var todo = await _context.Todos.FindAsync(new object[] { request.Id }, cancellationToken);
            if (todo == null)
                throw new NotFoundException($"Todo with ID {request.Id} not found");

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}