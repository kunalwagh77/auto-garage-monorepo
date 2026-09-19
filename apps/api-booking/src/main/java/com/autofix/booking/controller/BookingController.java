package com.autofix.booking.controller;

import com.autofix.booking.model.Booking;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    private final List<Booking> bookings = new ArrayList<>();
    private final AtomicLong counter = new AtomicLong();

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        booking.setId(counter.incrementAndGet());
        booking.setStatus("PENDING");
        bookings.add(booking);
        return booking;
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookings;
    }
}
