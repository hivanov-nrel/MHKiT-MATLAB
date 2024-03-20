var sourceData94 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB/mhkit/river/performance/rectangular.m","RawFileContents":["function [D_E,projected_capture_area]=rectangular(h,w)","","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","%     Calculates the equivalent diameter and projected capture area of a","%     retangular turbine","%","% Parameters","% ------------","%     h : float","%         Turbine height [m]","%","%     w : float","%         Turbine width [m]","%","% Returns","% ---------","%     D_E : float","%        Equivalent diameter [m]","%","%     projected_capture_area : float","%         Projected capture area [m^2]","%","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","","py.importlib.import_module('mhkit');","","result=py.mhkit.river.performance.rectangular(h,w);","","resultc=cell(result);","D_E=resultc{1};","projected_capture_area=resultc{2};","",""],"CoverageDisplayDataPerLine":{"Function":{"LineNumber":1,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":54,"ContinuedLine":false},"Statement":[{"LineNumber":25,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":27,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":51,"ContinuedLine":false},{"LineNumber":29,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":21,"ContinuedLine":false},{"LineNumber":30,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":15,"ContinuedLine":false},{"LineNumber":31,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":34,"ContinuedLine":false}]}}