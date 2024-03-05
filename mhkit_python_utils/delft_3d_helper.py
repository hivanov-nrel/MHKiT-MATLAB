import os

from mhkit.river.io import d3d
import netCDF4


def open_netcdf_file(filename):
    """
    Opens a Delft3D NetCDF file.

    Args:
        filename (str): The path to the NetCDF file.

    Returns:
        netCDF4.Dataset: The opened NetCDF dataset object.

    Raises:
        FileNotFoundError: If the specified file does not exist.
    """
    if not os.path.exists(filename):
        raise FileNotFoundError(f"The file '{filename}' does not exist.")

    return netCDF4.Dataset(filename)


def get_d3d_keys(netcdf_root):
    """
    Extracts variable keys and their corresponding long names from a Delft3D NetCDF root object.

    Args:
        netcdf_root (netCDF4.Dataset): The root object of a Delft3D NetCDF dataset.

    Returns:
        Tuple[list, list]: A tuple containing two lists - the first list contains variable keys,
        and the second list contains their corresponding long names. If a variable does not have a
        long name, an empty string is returned instead.
    """
    if not isinstance(netcdf_root, netCDF4.Dataset):
        raise ValueError("Input must be a netCDF4 Dataset object")

    result = {}
    for var in netcdf_root.variables.keys():
        try:
            result[var] = str(netcdf_root[var].long_name)
        except AttributeError:
            result[var] = ""

    return [list(result.keys()), list(result.values())]


def call_convert_time(netcdf_root, seconds_run):
    """
    Calls the _convert_time function from the mhkit d3d module to find the closest time index to the specified number
    of seconds, using information from the provided netCDF4 Dataset object.

    Args:
        netcdf_root (netCDF4.Dataset): The root object of a Delft3D NetCDF dataset.
        seconds_run (int): The number of seconds to find the closest time index to.

    Returns:
        int: The index of the closest time index to the specified number of seconds.

    Raises:
        ValueError: If the input netCDF4 Dataset object is not provided.
    """
    if not isinstance(netcdf_root, netCDF4.Dataset):
        raise ValueError("Input must be a netCDF4 Dataset object")

    return d3d._convert_time(netcdf_root, seconds_run=seconds_run)
