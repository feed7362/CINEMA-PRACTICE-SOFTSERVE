using System.ComponentModel.DataAnnotations;

namespace Backend.Services.DTOs.Contact;

public class CreateContactDto
{
    [Required(ErrorMessage = "Ім'я обов'язкове")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Email обов'язковий")]
    [EmailAddress(ErrorMessage = "Некоректний формат email")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Повідомлення не може бути пустим")]
    public string Message { get; set; } = string.Empty;
}