var sourceData78 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB-2/mhkit/river/performance/circular.m","RawFileContents":["function [D_E,projected_capture_area]=circular(diameter)","","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","%     Calculates the equivalent diameter and projected capture area of a","%     circular turbine","%","% Parameters","% ------------","%     diameter : float","%         Turbine diameter [m]","%","% Returns","% ---------","%     D_E : float","%        Equivalent diameter [m]","%","%     projected_capture_area : float","%         Projected capture area [m^2]","%","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","","py.importlib.import_module('mhkit');","","result=py.mhkit.river.performance.circular(diameter);","","resultc=cell(result);","D_E=resultc{1};","projected_capture_area=resultc{2};","",""],"CoverageDisplayDataPerLine":{"Function":{"LineNumber":1,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":56,"ContinuedLine":false},"Statement":[{"LineNumber":22,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":24,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":53,"ContinuedLine":false},{"LineNumber":26,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":21,"ContinuedLine":false},{"LineNumber":27,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":15,"ContinuedLine":false},{"LineNumber":28,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":34,"ContinuedLine":false}]}}