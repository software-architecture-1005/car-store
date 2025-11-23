from abc import ABC, abstractmethod
from typing import Any

class IVehicleReportGenerator(ABC):
    """
    Interfaz abstracta para la generación de reportes de vehículos.
    Define el contrato que cualquier generador de reportes debe cumplir.
    """
    
    @abstractmethod
    def generate_report(self, vehicle: Any) -> bytes:
        """
        Genera un reporte para un vehículo específico.
        
        Args:
            vehicle: La instancia del vehículo del cual generar el reporte.
            
        Returns:
            bytes: El contenido del reporte generado (ej. PDF) en bytes.
        """
        pass
