using Ardalis.Specification;

namespace Backend.Domain.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class, IEntity
    {
        IEnumerable<TEntity> GetAll();
        TEntity? GetById(int id);
        void Insert(TEntity entity);
        void Update(TEntity entity);
        void Delete(int id);
        void Delete(TEntity entity);

        IEnumerable<TEntity> GetListBySpec(ISpecification<TEntity> specification);
        TEntity? GetFirstBySpec(ISpecification<TEntity> specification);

        void Save();
    }
}