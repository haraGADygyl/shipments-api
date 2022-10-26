from rest_framework import viewsets

from shipments_app.models import Shipment
from shipments_app.serializers import ShipmentSerializer


class ShipmentModelViewSet(viewsets.ModelViewSet):
    queryset = Shipment.objects.all()
    serializer_class = ShipmentSerializer
