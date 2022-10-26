from django.db import models


class Shipment(models.Model):
    COURIER_OPTIONS = {
        ("DHL", "DHL"),
        ("USPS", "USPS"),
        ("UPS", "UPS"),
        ("Speedy", "Speedy"),
    }

    ORDER_STATUS_OPTIONS = (
        ('Awaiting Payment', 'Awaiting Payment'),
        ('Awaiting Shipment', 'Awaiting Shipment'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
        ('Disputed', 'Disputed'),
    )

    MAX_LENGTH = 100

    order_date = models.DateField(
        auto_now_add=True,
    )

    product_sku = models.CharField(
        max_length=MAX_LENGTH,
    )

    customer_name = models.CharField(
        max_length=MAX_LENGTH,
    )

    delivery_address = models.CharField(
        max_length=MAX_LENGTH,
    )

    courier = models.CharField(
        max_length=max(len(x) for (x, _) in COURIER_OPTIONS),
        choices=COURIER_OPTIONS,
    )

    status = models.CharField(
        max_length=max(len(x) for (x, _) in ORDER_STATUS_OPTIONS),
        choices=ORDER_STATUS_OPTIONS,
    )

    def delivery_information(self):
        """
        Used for testing purposes only
        """
        return f"Dear {self.customer_name}, your order with ID:{self.id} will be delivered by {self.courier} today"

    def __str__(self):
        """
        String representation of an order. Useful for the admin panel.
        """
        return f"Order ID: {self.id} - {self.status}"
