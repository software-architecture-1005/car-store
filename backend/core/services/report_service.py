from core.interfaces.report_generator import IVehicleReportGenerator

class VehicleReportService:
    def __init__(self, generator: IVehicleReportGenerator):
        self.generator = generator

    def generate_vehicle_report(self, vehicle) -> bytes:
        return self.generator.generate_report(vehicle)
