var sourceData70 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB-2/mhkit/river/IO/read_usgs_file.m","RawFileContents":["function datast=read_usgs_file(file_name)","","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","%     Reads a USGS JSON data file (from https://waterdata.usgs.gov/nwis)","%     into a structure","%","% Parameters","% ----------","%     file_name : str","%         Name of USGS JSON data file","%","% Returns","% -------","%     datast : structure","%","%","%         datast.Data: named according to the parameter's variable description","%","%         datast.time: epoch time [s]","%","%         datast.units: units for each parameter","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","","py.importlib.import_module('mhkit');","","datapd=py.mhkit.river.io.usgs.read_usgs_file(file_name);","","","xx=cell(datapd.axes);","v=xx{2};","","","vv=cell(py.list(py.numpy.nditer(v.values,pyargs(\"flags\",{\"refs_ok\"}))));","","vals=double(py.array.array('d',py.numpy.nditer(datapd.values,pyargs(\"flags\",{\"refs_ok\"}))));","sha=cell(datapd.values.shape);","x=int64(sha{1,1});","y=int64(sha{1,2});","","vals=reshape(vals,[x,y]);","si=size(vals);","","for i=1:si(2)","    test=string(py.str(vv{i}));","    newname=split(test,\",\");","    datast.(newname(1))=vals(:,i);","    datast.units.(newname(1))=newname(2);","end","","times = double(    ...","     py.mhkit_python_utils.pandas_dataframe.datetime_index_to_ordinal(datapd));","","datast.time = posixtime(datetime(times,                        ...","                                 'ConvertFrom', 'datenum',     ...","                                 'TimeZone','UTC'));","",""],"CoverageDisplayDataPerLine":{"Function":{"LineNumber":1,"Hits":2,"StartColumnNumbers":0,"EndColumnNumbers":41,"ContinuedLine":false},"Statement":[{"LineNumber":24,"Hits":2,"StartColumnNumbers":0,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":26,"Hits":2,"StartColumnNumbers":0,"EndColumnNumbers":56,"ContinuedLine":false},{"LineNumber":29,"Hits":2,"StartColumnNumbers":0,"EndColumnNumbers":21,"ContinuedLine":false},{"LineNumber":30,"Hits":2,"StartColumnNumbers":0,"EndColumnNumbers":8,"ContinuedLine":false},{"LineNumber":33,"Hits":2,"StartColumnNumbers":0,"EndColumnNumbers":72,"ContinuedLine":false},{"LineNumber":35,"Hits":2,"StartColumnNumbers":0,"EndColumnNumbers":92,"ContinuedLine":false},{"LineNumber":36,"Hits":2,"StartColumnNumbers":0,"EndColumnNumbers":30,"ContinuedLine":false},{"LineNumber":37,"Hits":2,"StartColumnNumbers":0,"EndColumnNumbers":18,"ContinuedLine":false},{"LineNumber":38,"Hits":2,"StartColumnNumbers":0,"EndColumnNumbers":18,"ContinuedLine":false},{"LineNumber":40,"Hits":2,"StartColumnNumbers":0,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":41,"Hits":2,"StartColumnNumbers":0,"EndColumnNumbers":14,"ContinuedLine":false},{"LineNumber":43,"Hits":2,"StartColumnNumbers":0,"EndColumnNumbers":13,"ContinuedLine":false},{"LineNumber":44,"Hits":2,"StartColumnNumbers":4,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":45,"Hits":2,"StartColumnNumbers":4,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":46,"Hits":2,"StartColumnNumbers":4,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":47,"Hits":2,"StartColumnNumbers":4,"EndColumnNumbers":41,"ContinuedLine":false},{"LineNumber":50,"Hits":2,"StartColumnNumbers":0,"EndColumnNumbers":15,"ContinuedLine":false},{"LineNumber":51,"Hits":2,"StartColumnNumbers":5,"EndColumnNumbers":79,"ContinuedLine":true},{"LineNumber":53,"Hits":2,"StartColumnNumbers":0,"EndColumnNumbers":38,"ContinuedLine":false},{"LineNumber":54,"Hits":2,"StartColumnNumbers":33,"EndColumnNumbers":57,"ContinuedLine":true},{"LineNumber":55,"Hits":2,"StartColumnNumbers":33,"EndColumnNumbers":52,"ContinuedLine":true}]}}