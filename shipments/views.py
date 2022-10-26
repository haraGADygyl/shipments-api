from rest_framework import viewsets

from shipments.models import Shipment
from shipments.serializers import ShipmentSerializer


class ShipmentModelViewSet(viewsets.ModelViewSet):
    queryset = Shipment.objects.all()
    serializer_class = ShipmentSerializer
