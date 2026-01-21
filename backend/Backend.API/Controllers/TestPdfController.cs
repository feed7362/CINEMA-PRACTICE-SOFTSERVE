using Backend.Services.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{
    [ApiController]
    [Route("api/pdf")]
    public class TestPdfController : ControllerBase
    {
        [HttpGet("download")]
        public IActionResult GetTicket()
        {
            // Створюємо сервіс і генеруємо файл
            var service = new TicketService();
            var pdfBytes = service.GeneratePdf();

            // Повертаємо файл з назвою ticket.pdf
            return File(pdfBytes, "application/pdf", "ticket.pdf");
        }
    }
}