var sourceData78 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB/mhkit/river/IO/delft_3d/delft_3d_get_keys.m","RawFileContents":["function result = delft_3d_get_keys(delft_3d_py_object)","","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","% Returns a struct of the key/values of a Delft 3D netCDF object.","%","% Parameters","% ------------","%    delft_3d_py_object: py.netCDF4._netCDF4.Dataset","%       A netCDF python object.","%","% Returns","% ---------","%    result: struct","%        A struct containing the keys and their corresponding values from","%        the Delft 3D netCDF object.","%","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","","    if ~isa(delft_3d_py_object, 'py.netCDF4._netCDF4.Dataset')","        error('MATLAB:get_delft_3d_keys:InvalidInput', 'Input must be a py.netCDF4._netCDF4.Dataset object.');","    end","","    % get_d3d_keys returns a list with the following elements:","    %   1: List of keys","    %   2: List of values","    python_result = py.mhkit_python_utils.delft_3d_helper.get_d3d_keys(delft_3d_py_object);","","    keys = cell(python_result{1});  % Convert python string array to matlab char array","    values = cell(python_result{2});  % Convert python string array to matlab char array","","    result = struct();","","    for i = 1:numel(keys)","        key = char(keys{i});","        value = char(values{i});","        result.(key) = value;","    end","end",""],"CoverageDisplayDataPerLine":{"Function":{"LineNumber":1,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":55,"ContinuedLine":false},"Statement":[{"LineNumber":19,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":62,"ContinuedLine":false},{"LineNumber":20,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":110,"ContinuedLine":false},{"LineNumber":26,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":91,"ContinuedLine":false},{"LineNumber":28,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":29,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":31,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":22,"ContinuedLine":false},{"LineNumber":33,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":34,"Hits":52,"StartColumnNumbers":8,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":35,"Hits":52,"StartColumnNumbers":8,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":36,"Hits":52,"StartColumnNumbers":8,"EndColumnNumbers":29,"ContinuedLine":false}]}}