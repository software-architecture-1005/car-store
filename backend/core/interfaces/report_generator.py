from abc import ABC, abstractmethod
from typing import Any

class IVehicleReportGenerator(ABC):
    @abstractmethod
    def generate_report(self, vehicle: Any) -> bytes:
        pass
