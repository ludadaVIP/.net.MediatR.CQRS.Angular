using MediatR;

public class DeleteTodoCommand : IRequest
{
    public int Id { get; set; }
}