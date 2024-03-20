var sourceData92 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB/mhkit/river/performance/multiple_circular.m","RawFileContents":["function [D_E,projected_capture_area]=multiple_circular(diameters)","","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","%     Calculates the equivalent diameter and projected capture area of a","%     multiple circular turbine","%","% Parameters","% ------------","%     diameters: array or vector","%         vector of device diameters [m]","%","% Returns","% ---------","%     D_E : float","%        Equivalent diameter [m]","%","%     projected_capture_area : float","%         Projected capture area [m^2]","%","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","","py.importlib.import_module('mhkit');","diameters=py.list(diameters);","result=py.mhkit.river.performance.multiple_circular(diameters);","","resultc=cell(result);","D_E=resultc{1};","projected_capture_area=resultc{2};","",""],"CoverageDisplayDataPerLine":{"Function":{"LineNumber":1,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":66,"ContinuedLine":false},"Statement":[{"LineNumber":22,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":23,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":24,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":63,"ContinuedLine":false},{"LineNumber":26,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":21,"ContinuedLine":false},{"LineNumber":27,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":15,"ContinuedLine":false},{"LineNumber":28,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":34,"ContinuedLine":false}]}}