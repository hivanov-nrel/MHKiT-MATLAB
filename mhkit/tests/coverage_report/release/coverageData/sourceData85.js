var sourceData85 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB-2/mhkit/river/resource/discharge_to_velocity.m","RawFileContents":["function V=discharge_to_velocity(Q,polynomial_coefficients)","","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","%     Calculates velocity given discharge data and the relationship between","%     discharge and velocity at an individual turbine","%","% Parameters","% ------------","%     Q : Discharge data [m3/s]","%","%         Pandas dataframe indexed by time [datetime or s]:","%","%           To make a pandas data frame from user supplied frequency and spectra","%           use py.mhkit_python_utils.pandas_dataframe.timeseries_to_pandas(timeseries,time,x)","%","%         OR","%","%         structure of form:","%","%            Q.Discharge","%","%            Q.time","%","%     polynomial_coefficients : numpy polynomial","%         List of polynomial coefficients that discribe the relationship between","%         discharge and velocity at an individual turbine","%","% Returns","% ------------","%     V: Structure","%","%","%         V.V: Velocity [m/s]","%","%         V.time: time [datetime or s]","%","%","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","","py.importlib.import_module('mhkit');","py.importlib.import_module('mhkit_python_utils');","","if (isa(Q,'py.pandas.core.frame.DataFrame')~=1)","    x=size(Q.Discharge);","    li=py.list();","    if x(2)>1","        for i = 1:x(2)","            app=py.list(Q.Discharge(:,i));","            li=py.mhkit_python_utils.pandas_dataframe.lis(li,app);","","        end","    elseif x(2) ==1","        li=Q.Discharge;","    end","","    if any(isdatetime(Q.time(1)))","        si=size(Q.time);","        for i=1:si(2)","        Q.time(i)=posixtime(Q.time(i));","        end","    end","    % Q=py.mhkit_python_utils.pandas_dataframe.timeseries_to_pandas(li,Q.time,int32(x(2)));","    Q = py.mhkit_python_utils.pandas_dataframe.list_to_series(Q.Discharge, Q.time);","end","","polynomial_coefficients=py.numpy.poly1d(polynomial_coefficients);","","Vdf=py.mhkit.river.resource.discharge_to_velocity(Q,polynomial_coefficients);","","","","xx=cell(Vdf.axes);","v=xx{2};","vv=cell(py.list(py.numpy.nditer(v.values,pyargs(\"flags\",{\"refs_ok\"}))));","","vals=double(py.array.array('d',py.numpy.nditer(Vdf.values)));","sha=cell(Vdf.values.shape);","x=int64(sha{1,1});","y=int64(sha{1,2});","","vals=reshape(vals,[x,y]);","","si=size(vals);"," for i=1:si(2)","    test=string(py.str(vv{i}));","    newname=split(test,\",\");","","    V.(newname(1))=vals(:,i);",""," end"," V.time=double(py.array.array('d',py.numpy.nditer(Vdf.index)));","",""],"CoverageDisplayDataPerLine":{"Function":{"LineNumber":1,"Hits":6,"StartColumnNumbers":0,"EndColumnNumbers":59,"ContinuedLine":false},"Statement":[{"LineNumber":40,"Hits":6,"StartColumnNumbers":0,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":41,"Hits":6,"StartColumnNumbers":0,"EndColumnNumbers":49,"ContinuedLine":false},{"LineNumber":43,"Hits":6,"StartColumnNumbers":0,"EndColumnNumbers":47,"ContinuedLine":false},{"LineNumber":44,"Hits":6,"StartColumnNumbers":4,"EndColumnNumbers":24,"ContinuedLine":false},{"LineNumber":45,"Hits":6,"StartColumnNumbers":4,"EndColumnNumbers":17,"ContinuedLine":false},{"LineNumber":46,"Hits":6,"StartColumnNumbers":4,"EndColumnNumbers":13,"ContinuedLine":false},{"LineNumber":47,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":22,"ContinuedLine":false},{"LineNumber":48,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":42,"ContinuedLine":false},{"LineNumber":49,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":66,"ContinuedLine":false},{"LineNumber":52,"Hits":6,"StartColumnNumbers":4,"EndColumnNumbers":19,"ContinuedLine":false},{"LineNumber":53,"Hits":6,"StartColumnNumbers":8,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":56,"Hits":6,"StartColumnNumbers":4,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":57,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":24,"ContinuedLine":false},{"LineNumber":58,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":21,"ContinuedLine":false},{"LineNumber":59,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":63,"Hits":6,"StartColumnNumbers":4,"EndColumnNumbers":83,"ContinuedLine":false},{"LineNumber":66,"Hits":6,"StartColumnNumbers":0,"EndColumnNumbers":65,"ContinuedLine":false},{"LineNumber":68,"Hits":6,"StartColumnNumbers":0,"EndColumnNumbers":77,"ContinuedLine":false},{"LineNumber":72,"Hits":6,"StartColumnNumbers":0,"EndColumnNumbers":18,"ContinuedLine":false},{"LineNumber":73,"Hits":6,"StartColumnNumbers":0,"EndColumnNumbers":8,"ContinuedLine":false},{"LineNumber":74,"Hits":6,"StartColumnNumbers":0,"EndColumnNumbers":72,"ContinuedLine":false},{"LineNumber":76,"Hits":6,"StartColumnNumbers":0,"EndColumnNumbers":61,"ContinuedLine":false},{"LineNumber":77,"Hits":6,"StartColumnNumbers":0,"EndColumnNumbers":27,"ContinuedLine":false},{"LineNumber":78,"Hits":6,"StartColumnNumbers":0,"EndColumnNumbers":18,"ContinuedLine":false},{"LineNumber":79,"Hits":6,"StartColumnNumbers":0,"EndColumnNumbers":18,"ContinuedLine":false},{"LineNumber":81,"Hits":6,"StartColumnNumbers":0,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":83,"Hits":6,"StartColumnNumbers":0,"EndColumnNumbers":14,"ContinuedLine":false},{"LineNumber":84,"Hits":6,"StartColumnNumbers":1,"EndColumnNumbers":14,"ContinuedLine":false},{"LineNumber":85,"Hits":6,"StartColumnNumbers":4,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":86,"Hits":6,"StartColumnNumbers":4,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":88,"Hits":6,"StartColumnNumbers":4,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":91,"Hits":6,"StartColumnNumbers":1,"EndColumnNumbers":63,"ContinuedLine":false}]}}