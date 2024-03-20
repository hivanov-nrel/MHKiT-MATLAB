var sourceData101 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB/mhkit/river/resource/velocity_to_power.m","RawFileContents":["function p=velocity_to_power(V,polynomial_coefficients,cut_in,cut_out)","","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","%     Calculates power given velocity data and the relationship","%     between velocity and power from an individual turbine","%","% Parameters","% ----------","%     V : Velocity [m/s]","%","%          Pandas dataframe indexed by time [datetime or s]","%","%           To make a pandas data frame from user supplied frequency and spectra","%           use py.mhkit_python_utils.pandas_dataframe.timeseries_to_pandas(timeseries,time,x)","%","%         OR","%","%         structure of form:","%","%           V.V: Velocity [m/s]","%","%           V.time: time [datetime or s]","%","%     polynomial_coefficients : vector","%         vector of polynomial coefficients that discribe the relationship between","%         velocity and power at an individual turbine","%","%     cut_in: float","%         Velocity values below cut_in are not used to compute P","%","%     cut_out: float","%         Velocity values above cut_out are not used to compute P","%","% Returns","% -------","%     p : Structure","%","%","%        P.P: Power [W]","%","%        P.time: epoch time [s]","%","%","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","","","py.importlib.import_module('mhkit_python_utils');","py.importlib.import_module('mhkit');","","if (isa(V,'py.pandas.core.frame.DataFrame')~=1)","    x=size(V.V);","    li=py.list();","    if x(2)>1","        for i = 1:x(2)","            app=py.list(V.V(:,i));","            li=py.mhkit_python_utils.pandas_dataframe.lis(li,app);","","        end","    elseif x(2) ==1","        li=V.V;","    end","","","    % V=py.mhkit_python_utils.pandas_dataframe.timeseries_to_pandas(li,V.time,int32(x(2)));","    V = py.mhkit_python_utils.pandas_dataframe.list_to_series(li, V.time);","end","","polynomial_coefficients=py.numpy.poly1d(polynomial_coefficients);","cut_in=py.float(cut_in);","cut_out=py.float(cut_out);","Pdf=py.mhkit.river.resource.velocity_to_power(V,polynomial_coefficients,cut_in,cut_out);","","","","xx=cell(Pdf.axes);","v=xx{2};","vv=cell(py.list(py.numpy.nditer(v.values,pyargs(\"flags\",{\"refs_ok\"}))));","","vals=double(py.array.array('d',py.numpy.nditer(Pdf.values)));","sha=cell(Pdf.values.shape);","x=int64(sha{1,1});","y=int64(sha{1,2});","","vals=reshape(vals,[x,y]);","","si=size(vals);"," for i=1:si(2)","    test=string(py.str(vv{i}));","    newname=split(test,\",\");","","    p.(newname(1))=vals(:,i);",""," end"," p.time=double(py.array.array('d',py.numpy.nditer(Pdf.index)));","",""],"CoverageDisplayDataPerLine":{"Function":{"LineNumber":1,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":70,"ContinuedLine":false},"Statement":[{"LineNumber":47,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":49,"ContinuedLine":false},{"LineNumber":48,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":50,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":47,"ContinuedLine":false},{"LineNumber":51,"Hits":3,"StartColumnNumbers":4,"EndColumnNumbers":16,"ContinuedLine":false},{"LineNumber":52,"Hits":3,"StartColumnNumbers":4,"EndColumnNumbers":17,"ContinuedLine":false},{"LineNumber":53,"Hits":3,"StartColumnNumbers":4,"EndColumnNumbers":13,"ContinuedLine":false},{"LineNumber":54,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":22,"ContinuedLine":false},{"LineNumber":55,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":56,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":66,"ContinuedLine":false},{"LineNumber":59,"Hits":3,"StartColumnNumbers":4,"EndColumnNumbers":19,"ContinuedLine":false},{"LineNumber":60,"Hits":3,"StartColumnNumbers":8,"EndColumnNumbers":15,"ContinuedLine":false},{"LineNumber":65,"Hits":3,"StartColumnNumbers":4,"EndColumnNumbers":74,"ContinuedLine":false},{"LineNumber":68,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":65,"ContinuedLine":false},{"LineNumber":69,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":24,"ContinuedLine":false},{"LineNumber":70,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":26,"ContinuedLine":false},{"LineNumber":71,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":88,"ContinuedLine":false},{"LineNumber":75,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":18,"ContinuedLine":false},{"LineNumber":76,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":8,"ContinuedLine":false},{"LineNumber":77,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":72,"ContinuedLine":false},{"LineNumber":79,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":61,"ContinuedLine":false},{"LineNumber":80,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":27,"ContinuedLine":false},{"LineNumber":81,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":18,"ContinuedLine":false},{"LineNumber":82,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":18,"ContinuedLine":false},{"LineNumber":84,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":86,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":14,"ContinuedLine":false},{"LineNumber":87,"Hits":3,"StartColumnNumbers":1,"EndColumnNumbers":14,"ContinuedLine":false},{"LineNumber":88,"Hits":3,"StartColumnNumbers":4,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":89,"Hits":3,"StartColumnNumbers":4,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":91,"Hits":3,"StartColumnNumbers":4,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":94,"Hits":3,"StartColumnNumbers":1,"EndColumnNumbers":63,"ContinuedLine":false}]}}