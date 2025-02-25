using MediatR;
using System.Collections.Generic;
using TodoApp.Core.Entities;

namespace TodoApp.Core.Queries
{
    public class GetAllTodosQuery : IRequest<IEnumerable<Todo>>
    {
    }
}