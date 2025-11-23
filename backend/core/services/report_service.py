from core.interfaces.report_generator import IVehicleReportGenerator

class VehicleReportService:
    """
    Servicio de alto nivel que depende de la abstracción IVehicleReportGenerator.
    No conoce los detalles de cómo se genera el PDF (ReportLab, etc).
    """
    def __init__(self, generator: IVehicleReportGenerator):
        self.generator = generator

    def generate_vehicle_report(self, vehicle) -> bytes:
        return self.generator.generate_report(vehicle)
