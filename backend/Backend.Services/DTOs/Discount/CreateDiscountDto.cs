using System;
using System.Collections.Generic;
using System.Text;

namespace Backend.Services.DTOs.Discount;
public record CreateDiscountDto(
        string Code, 
        int Percentage, 
        DateTime ExpiryDate
    );