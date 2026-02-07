using Ardalis.Specification;
using Microsoft.EntityFrameworkCore.Storage;
using System.Data;
using System.Linq.Expressions;

namespace Backend.Domain.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class, IEntity
    {
        Task<List<TEntity>> GetAllAsync();
        Task<TEntity?> GetByIdAsync(int? id);
        TEntity Insert(TEntity entity);

        IEnumerable<TEntity> GetListBySpec(
                ISpecification<TEntity> specification
            );
        TEntity? GetFirstBySpec(ISpecification<TEntity> specification);
        
        Task<bool> AnyAsync(Expression<Func<TEntity, bool>> predicate);


        Task<TEntity> AddAsync(TEntity entity);
        Task<TEntity?> UpdateAsync(TEntity entity);
        Task<TEntity?> DeleteAsync(TEntity entity);
        Task<TEntity?> DeleteAsync(int id);
        Task SaveChangesAsync();

        Task<TEntity?> GetFirstBySpecAsync(ISpecification<TEntity> spec);
        Task<List<TEntity>> GetListBySpecAsync(ISpecification<TEntity> spec);

        // for projections
        Task<TResult> GetBySpecAsync<TResult>(
                ISpecification<TEntity, 
                TResult> specification
            );
        Task<List<TResult>> GetListBySpecAsync<TResult>(
                ISpecification<TEntity, 
                TResult> specification
            );

        Task<int> CountAsync(ISpecification<TEntity> spec);

        Task<IDbContextTransaction> BeginTransactionAsync(
                IsolationLevel isolationLevel
            );
    }
}