using System.Collections.Generic;

namespace JsBoard.Data.Contracts
{
    public interface IRepository<T> where T : class 
    {
        void Add(T entity);
        void Remove(T entity);
        void RemoveById(object id);
        void Update(T entity);

        IEnumerable<T> GetAll();
    }
}