import json

from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status

from shipments.models import Shipment
from shipments.serializers import ShipmentSerializer

client = Client()


class ShipmentTests(TestCase):
    def setUp(self):
        self.first_shipment = Shipment.objects.create(
            id=1, order_date="2022-21-10", product_sku="SKU-P01", customer_name="John Smith",
            delivery_address="First street", courier="DHL", status="Awaiting Payment")
        self.second_shipment = Shipment.objects.create(
            id=2, order_date="2022-04-10", product_sku="SKU-P02", customer_name="Jack Daniels",
            delivery_address="Second street", courier="USPS", status="Shipped")
        self.third_shipment = Shipment.objects.create(
            id=3, order_date="2022-11-09", product_sku="SKU-P03", customer_name="Johnny Walker",
            delivery_address="Third street", courier="UPS", status="Delivered")

    VALID_SHIPMENT_DATA = {
        "id": 4,
        "order_date": "2022-21-10",
        "product_sku": "SKU-P01",
        "customer_name": "John Smith",
        "delivery_address": "First street",
        "courier": "DHL",
        "status": "Awaiting Payment"
    }

    INVALID_SHIPMENT_DATA = {
        "id": 100,
        "order_date": "2022-21-10",
        "product_sku": "SKU-R21",
        "customer_name": "John Smith",
        "delivery_address": "1st ave",
        "courier": "USPS",
        "status": "Invalid Status"
    }

    def test_shipment_create_valid_data_expect_success(self):
        shipment = Shipment(**self.VALID_SHIPMENT_DATA)

        self.assertEqual(self.VALID_SHIPMENT_DATA['id'], shipment.id)
        self.assertEqual(self.VALID_SHIPMENT_DATA['order_date'], shipment.order_date)
        self.assertEqual(self.VALID_SHIPMENT_DATA['product_sku'], shipment.product_sku)
        self.assertEqual(self.VALID_SHIPMENT_DATA['customer_name'], shipment.customer_name)
        self.assertEqual(self.VALID_SHIPMENT_DATA['delivery_address'], shipment.delivery_address)
        self.assertEqual(self.VALID_SHIPMENT_DATA['courier'], shipment.courier)
        self.assertEqual(self.VALID_SHIPMENT_DATA['status'], shipment.status)

    def test_shipment_create_invalid_data_expect_failure(self):
        response = client.post(
            reverse('shipments-list'),
            data=json.dumps(self.INVALID_SHIPMENT_DATA),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_shipment_list_valid_data_expect_success(self):
        response = client.get(reverse('shipments-list'))
        shipments = Shipment.objects.all()
        serializer = ShipmentSerializer(shipments, many=True)

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_shipment_get_by_id_valid_data_expect_success(self):
        response = client.get(reverse('shipments-detail', kwargs={'pk': self.first_shipment.id}))
        shipment = Shipment.objects.get(pk=self.first_shipment.id)
        serializer = ShipmentSerializer(shipment)

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_shipment_get_by_id_invalid_data_expect_failure(self):
        response = client.get(
            reverse('shipments-detail', kwargs={'pk': 30}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_shipment_update_valid_data_expect_success(self):
        response = client.put(
            reverse('shipments-detail', kwargs={'pk': self.first_shipment.id}),
            data=json.dumps(self.VALID_SHIPMENT_DATA),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_shipment_update_invalid_data_expect_failure(self):
        response = client.put(
            reverse('shipments-detail', kwargs={'pk': self.first_shipment.pk}),
            data=json.dumps(self.INVALID_SHIPMENT_DATA),
            content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_shipment_delete_valid_data_expect_success(self):
        response = client.delete(
            reverse('shipments-detail', kwargs={'pk': self.first_shipment.id}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_shipment_delete_invalid_data_expect_failure(self):
        response = client.delete(
            reverse('shipments-detail', kwargs={'pk': 30}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
