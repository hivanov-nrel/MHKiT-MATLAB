var sourceData177 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB/mhkit/wave/resource/environmental_contour.m","RawFileContents":["function environmental_contour=environmental_contour(x1, x2, dt, period,options)","","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","% Calculates environmental contours of extreme sea","% states using the improved joint probability distributions","% with the inverse first-order reliability method (IFORM)","% probability for the desired return period (period). Given the","% period of interest a circle of iso-probability is created in the","% in the PCA joint probability (x1, x2) reference frame.","% Using the joint probability value the CDF of the marginal","% distribution is used to find the quantile of each component.","% Finally, using the improved PCA methodology","% the component 2 contour lines are calculated from component 1 using","% the relationships defined in Exkert-Gallup et. al. 2016.","%","% Eckert-Gallup, A. C., Sallaberry, C. J., Dallman, A. R., &","% Neary, V. S. (2016). Application of principal component","% analysis (PCA) and improved joint probability distributions to","% the inverse first-order reliability method (I-FORM) for predicting","% extreme sea states. Ocean Engineering, 112, 307-319.","%","% Parameters","% ------------","%     x1 : vector","%         component 1 data","%","%     x2 : vector","%         component 2 data","%","%     dt : double","%         x1 and x2 sample rate (seconds)","%","%     period : scalar or vector","%         Desired return period (years) for calculation of environmental","%         contour, can be a scalar or a vector.","%","%     PCA: Structure (optional)","% \t      principal component analysis dictionary from previous function","%         call. When supplied the function will skip the PCA calculation","%         for the passe x1, and x2.","%         to call: environmental_contour(x1,x2,dt,period,\"PCA\",PCA)","%","%     bin_size : double (optional)","%         Data points in each bin","%         to call: environmental_contour(x1,x2,dt,period,\"bin_size\",bin_size)","%","%     nb_steps : int (optional)","%         Discretization of the circle in the normal space used for","%         IFORM calculation.","%         to call: environmental_contour(x1,x2,dt,period,\"nb_steps\",nb_steps)","%","%     return_PCA: boolean","% \t      Default False, if True will retun the PCA dictionary","%         to call: environmental_contour(x1,x2,dt,period,\"return_PCA\",return_PCA)","%","%","% Returns","% ---------","%     environmental_contour: Structure","%         Structure with fields contour1, contour2, and optionally PCA","%","%","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","","arguments","    x1","    x2","    dt","    period","    options.PCA = py.None;","    options.bin_size = 250;","    options.nb_steps = 1000;","    options.return_PCA = py.False;","end","","py.importlib.import_module('mhkit');","","if options.PCA ~= py.None","   options.PCA = py.dict(options.PCA);","end","","if isscalar(period)","    period_py = period;","elseif isvector(period)","    period_py = py.numpy.array(period);","else","    ME = MException('MATLAB:environmental_contour','period must be a vector or scalar');","    throw(ME);","end","","data = py.mhkit.wave.resource.environmental_contour(py.numpy.array(x1),py.numpy.array(x2),...","    int32(dt),period_py,pyargs('PCA',options.PCA,'bin_size',int32(options.bin_size),...","    'nb_steps',int32(options.nb_steps),'return_PCA',options.return_PCA));","","data_cell = cell(data);","sha = cell(py.numpy.shape(data_cell{1}));","x=int64(sha{1,1});","if isscalar(period)","    y = 1;","else","    y=int64(sha{1,2});","end","environmental_contour.contour1 = array2table(reshape(double(py.array.array('d',py.numpy.nditer(data_cell{1},...","    pyargs(\"flags\",{\"refs_ok\"})))),[x,y]),'VariableNames',string(period));","","environmental_contour.contour2 = array2table(reshape(double(py.array.array('d',py.numpy.nditer(data_cell{2},...","    pyargs(\"flags\",{\"refs_ok\"})))),[x,y]),'VariableNames',string(period));","","if options.return_PCA == py.True","    environmental_contour.PCA = struct(data_cell{3});","end","",""],"CoverageDisplayDataPerLine":{"Function":{"LineNumber":1,"Hits":0,"StartColumnNumbers":0,"EndColumnNumbers":80,"ContinuedLine":false},"Statement":[{"LineNumber":70,"Hits":0,"StartColumnNumbers":18,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":71,"Hits":0,"StartColumnNumbers":23,"EndColumnNumbers":26,"ContinuedLine":false},{"LineNumber":72,"Hits":0,"StartColumnNumbers":23,"EndColumnNumbers":27,"ContinuedLine":false},{"LineNumber":73,"Hits":0,"StartColumnNumbers":25,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":76,"Hits":0,"StartColumnNumbers":0,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":78,"Hits":0,"StartColumnNumbers":0,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":79,"Hits":0,"StartColumnNumbers":3,"EndColumnNumbers":38,"ContinuedLine":false},{"LineNumber":82,"Hits":0,"StartColumnNumbers":0,"EndColumnNumbers":19,"ContinuedLine":false},{"LineNumber":83,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":84,"Hits":0,"StartColumnNumbers":0,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":85,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":87,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":88,"ContinuedLine":false},{"LineNumber":88,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":14,"ContinuedLine":false},{"LineNumber":91,"Hits":0,"StartColumnNumbers":0,"EndColumnNumbers":89,"ContinuedLine":false},{"LineNumber":92,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":83,"ContinuedLine":true},{"LineNumber":93,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":73,"ContinuedLine":true},{"LineNumber":95,"Hits":0,"StartColumnNumbers":0,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":96,"Hits":0,"StartColumnNumbers":0,"EndColumnNumbers":41,"ContinuedLine":false},{"LineNumber":97,"Hits":0,"StartColumnNumbers":0,"EndColumnNumbers":18,"ContinuedLine":false},{"LineNumber":98,"Hits":0,"StartColumnNumbers":0,"EndColumnNumbers":19,"ContinuedLine":false},{"LineNumber":99,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":10,"ContinuedLine":false},{"LineNumber":101,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":22,"ContinuedLine":false},{"LineNumber":103,"Hits":0,"StartColumnNumbers":0,"EndColumnNumbers":107,"ContinuedLine":false},{"LineNumber":104,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":74,"ContinuedLine":true},{"LineNumber":106,"Hits":0,"StartColumnNumbers":0,"EndColumnNumbers":107,"ContinuedLine":false},{"LineNumber":107,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":74,"ContinuedLine":true},{"LineNumber":109,"Hits":0,"StartColumnNumbers":0,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":110,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":53,"ContinuedLine":false}]}}