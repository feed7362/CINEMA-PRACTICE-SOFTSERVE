using System;
using System.Collections.Generic;
using System.Text;

namespace Backend.Services.DTOs.Discount;

public record DiscountResponseDto(
        int Id, 
        string Code, 
        int Percentage, 
        DateTime ExpiryDate
    );
