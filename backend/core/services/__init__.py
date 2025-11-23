# Services package
# Import VehicleSearch from the parent services.py module
import importlib.util
import os

# Get the parent directory
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
services_py_path = os.path.join(parent_dir, 'services.py')

# Load the services.py module
spec = importlib.util.spec_from_file_location("core.services_module", services_py_path)
services_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(services_module)

# Export VehicleSearch
VehicleSearch = services_module.VehicleSearch

__all__ = ['VehicleSearch']

