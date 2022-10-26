from django.test import TestCase

from shipments.models import Shipment


class ShipmentTests(TestCase):
    VALID_SHIPMENT_DATA = {
        "id": 3,
        "order_date": "2022-21-10",
        "product_sku": "SKU-R21",
        "customer_name": "John Smith",
        "delivery_address": "1st ave",
        "courier": "USPS",
        "status": "Awaiting Payment"
    }

    def test_shipment_model_delivery_information_valid_data_expect_success(self):
        shipment = Shipment(**self.VALID_SHIPMENT_DATA)
        self.assertEqual(
            f"Dear {self.VALID_SHIPMENT_DATA['customer_name']}, your order with ID:"
            f"{self.VALID_SHIPMENT_DATA['id']} will be delivered by {self.VALID_SHIPMENT_DATA['courier']} today",
            shipment.delivery_information()
        )

    def test_shipment_model_str_valid_data_expect_success(self):
        shipment = Shipment(**self.VALID_SHIPMENT_DATA)
        self.assertEqual(
            f"Order ID: {self.VALID_SHIPMENT_DATA['id']} - {self.VALID_SHIPMENT_DATA['status']}",
            str(shipment))
