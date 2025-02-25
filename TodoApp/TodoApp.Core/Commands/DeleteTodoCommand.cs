using MediatR;

namespace TodoApp.Core.Commands
{
    public class CreateTodoCommand : IRequest<int>
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}