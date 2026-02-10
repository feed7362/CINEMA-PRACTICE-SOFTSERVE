namespace Backend.Domain.Exceptions;

public abstract class BaseApplicationException(string message) : Exception(message);

public class InternalServerException(string message) : BaseApplicationException(message)
{
    public InternalServerException()
        : this("Сталася внутрішня помилка сервера. Будь ласка, спробуйте пізніше.")
    {
    }
}

public abstract class NotFoundException(string entityName, object key)
    : BaseApplicationException($"Сутність \"{entityName}\" ({key}) не знайдена.");

public class BadRequestException(string message) : BaseApplicationException(message);

public class ConflictException(string message) : BaseApplicationException(message);

public abstract class DomainException(string message) : Exception(message);

public class EntityNotFoundException(string name, object key)
    : DomainException($"Запис {name} з ID {key} не знайдено.");

public class BookingConflictException(string message)
    : DomainException(message);

public abstract class PaymentRequiredException(string message)
    : DomainException(message);