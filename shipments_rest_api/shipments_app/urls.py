from rest_framework import routers

from shipments_app.views import ShipmentModelViewSet

RESOURCE_SHIPMENTS = r'shipments'

router = routers.DefaultRouter()
router.register(RESOURCE_SHIPMENTS, ShipmentModelViewSet, basename=RESOURCE_SHIPMENTS)
urlpatterns = router.urls
