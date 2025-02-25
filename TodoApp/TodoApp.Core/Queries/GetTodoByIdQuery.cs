using MediatR;
using TodoApp.Core.Entities;

namespace TodoApp.Core.Queries
{
    public class GetTodoByIdQuery : IRequest<Todo?>
    {
        public int Id { get; set; }
    }
}