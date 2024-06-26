var sourceData157 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB-2/mhkit/wave/resource/average_wave_period.m","RawFileContents":["function Tavg=average_wave_period(S,varargin)","","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","% Calculates the average wave period","%","% Parameters","% ------------","%    S: Spectral Density (m^2/Hz)","%       Pandas data frame","%           To make a pandas data frame from user supplied frequency and spectra","%           use py.mhkit_python_utils.pandas_dataframe.spectra_to_pandas(frequency,spectra)","%","%       OR","%","%       structure of form:","%           S.spectrum: Spectral Density (m^2/Hz)","%","%           S.type: String of the spectra type, i.e. Bretschneider,","%           time series, date stamp etc.","%","%           S.frequency: frequency (Hz)","%","%     frequency_bins: vector (optional)","%       Bin widths for frequency of S. Required for unevenly sized bins","%","% Returns","% --------","%     Tavg: float","%           Mean wave period (s)","%","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","","","py.importlib.import_module('mhkit');","py.importlib.import_module('mhkit_python_utils');","","if nargin == 2","    freq_bins = py.numpy.array(varargin{1});","elseif nargin == 1","    freq_bins = py.None;","else","    ME = MException('MATLAB:average_wave_period','Incorrect number of input arguments');","        throw(ME);","end","","if (isa(S,'py.pandas.core.frame.DataFrame')~=1)","    if (isstruct(S)==1)","        x=size(S.spectrum);","        li=py.list();","        if x(2)>1","            for i = 1:x(2)","                app=py.list(S.spectrum(:,i));","                li=py.mhkit_python_utils.pandas_dataframe.lis(li,app);","","            end","            S=py.mhkit_python_utils.pandas_dataframe.spectra_to_pandas(S.frequency(:,1),li,x(2));","        elseif x(2)==1","            S=py.mhkit_python_utils.pandas_dataframe.spectra_to_pandas(S.frequency,py.numpy.array(S.spectrum),x(2));","        end","","    else","        ME = MException('MATLAB:average_wave_period','S needs to be a structure or Pandas dataframe, use py.mhkit_python_utils.pandas_dataframe.spectra_to_pandas to create one');","        throw(ME);","    end","end","","Tm=py.mhkit.wave.resource.average_wave_period(S,pyargs('frequency_bins',freq_bins));","Tavg=double(Tm.values);","",""],"CoverageDisplayDataPerLine":{"Function":{"LineNumber":1,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":45,"ContinuedLine":false},"Statement":[{"LineNumber":34,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":35,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":49,"ContinuedLine":false},{"LineNumber":37,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":14,"ContinuedLine":false},{"LineNumber":38,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":44,"ContinuedLine":false},{"LineNumber":39,"Hits":2,"StartColumnNumbers":0,"EndColumnNumbers":18,"ContinuedLine":false},{"LineNumber":40,"Hits":2,"StartColumnNumbers":4,"EndColumnNumbers":24,"ContinuedLine":false},{"LineNumber":42,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":88,"ContinuedLine":false},{"LineNumber":43,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":18,"ContinuedLine":false},{"LineNumber":46,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":47,"ContinuedLine":false},{"LineNumber":47,"Hits":3,"StartColumnNumbers":4,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":48,"Hits":3,"StartColumnNumbers":8,"EndColumnNumbers":27,"ContinuedLine":false},{"LineNumber":49,"Hits":3,"StartColumnNumbers":8,"EndColumnNumbers":21,"ContinuedLine":false},{"LineNumber":50,"Hits":3,"StartColumnNumbers":8,"EndColumnNumbers":17,"ContinuedLine":false},{"LineNumber":51,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":26,"ContinuedLine":false},{"LineNumber":52,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":53,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":70,"ContinuedLine":false},{"LineNumber":56,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":97,"ContinuedLine":false},{"LineNumber":57,"Hits":3,"StartColumnNumbers":8,"EndColumnNumbers":22,"ContinuedLine":false},{"LineNumber":58,"Hits":3,"StartColumnNumbers":12,"EndColumnNumbers":116,"ContinuedLine":false},{"LineNumber":62,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":178,"ContinuedLine":false},{"LineNumber":63,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":18,"ContinuedLine":false},{"LineNumber":67,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":84,"ContinuedLine":false},{"LineNumber":68,"Hits":3,"StartColumnNumbers":0,"EndColumnNumbers":23,"ContinuedLine":false}]}}