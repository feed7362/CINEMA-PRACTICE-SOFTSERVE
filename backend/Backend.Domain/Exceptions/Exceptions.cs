using System;
using System.Collections.Generic;
using System.Text;

namespace Backend.Domain.Exceptions;
public abstract class BaseApplicationException : Exception
{
    protected BaseApplicationException(string message) : base(message) { }
}

public class NotFoundException : BaseApplicationException
{
    public NotFoundException(string entityName, object key)
        : base($"Сутність \"{entityName}\" ({key}) не знайдена.") { }
}

public class BadRequestException : BaseApplicationException
{
    public BadRequestException(string message) : base(message) { }
}

public class ConflictException : BaseApplicationException
{
    public ConflictException(string message) : base(message) { }
}

public abstract class DomainException(string message) : Exception(message);

public class EntityNotFoundException(string name, object key)
    : DomainException($"Запис {name} з ID {key} не знайдено.");

public class BookingConflictException(string message)
    : DomainException(message);

public class PaymentRequiredException(string message)
    : DomainException(message);