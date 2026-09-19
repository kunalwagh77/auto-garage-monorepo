package com.autofix.booking.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Booking {
    private Long id;
    private String customerName;
    private String phone;
    private String serviceType;
    private String bookingDate;
    private String status;
}
