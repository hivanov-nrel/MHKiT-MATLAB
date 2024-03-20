var sourceData168 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB/mhkit/wave/performance/power_performance_workflow.m","RawFileContents":["function [clmat,maep_matrix] = power_performance_workflow(S, h, P, statistic, options)","","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","%     High-level function to compute power performance quantities of","%     interest following IEC TS 62600-100 for given wave spectra.","%","% Parameters","% ------------","%   S: structure with fields:","%           S.spectrum: Spectral Density [m^2/Hz]","%           S.frequency: frequency [Hz]","%           S.time : time [datetime]","%","%   h: integer","%        Water depth [m]","%","%   P: array or vector","%        Power [W]","%","%   statistic: string or array of strings","%        Capture length statistics for plotting","%        options include: \"mean\", \"std\", \"median\",","%        \"count\", \"sum\", \"min\", \"max\", and \"frequency\".","%        Note that \"std\"","%        uses a degree of freedom of 1 in accordance with IEC/TS 62600-100.","%        To output capture length matrices for multiple binning parameters,","%        define as a string array: statistic = [\"\", \"\", \"\"];","%","%   savepath: string (optional)","%        Path to save figure.","%        to call: power_performance_wave(S,h,P,statistic,\"savepath\",savepath)","%","%   rho: float (optional)","%        Water density [kg/m^3]","%        to call: power_performance_wave(S,h,P,statistic,\"rho\",rho)","%","%   g: float (optional)","%        Gravitational acceleration [m/s^2]","%        to call: power_performance_wave(S,h,P,statistic,\"g\",g)","%","%   frequency_bins: vector (optional)","%      Bin widths for frequency of S. Required for unevenly sized bins","%","% Returns","% ---------","%   cl_matrix: figure","%       Capture length matrix","%","%   maep_matrix: float","%       Mean annual energy production","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","","arguments","    S","    h","    P","    statistic","    options.rho = 1025;","    options.g = 9.80665;","    options.frequency_bins = \"\";","    options.savepath = \"\";","end","","if ~isstruct(S)","    ME = MException('MATLAB:power_performance_wave','S must be a structure. See API header for formatting');","    throw(ME);","end","","if any([~isnumeric(h), ~isnumeric(P)])","    ME = MException('MATLAB:power_performance_wave','h and P must be numbers');","    throw(ME);","end","","% Compute the enegy periods from spectra data","Te = energy_period(S);","","% Compute the significant wave height from spectra data","Hm0 = significant_wave_height(S) ;","","% Compute the energy flux from spectra data and water depth","J = energy_flux(S,h);","","% calculating capture length with power and wave flux in vectors","L = capture_length(P,J);","","% Need to set our Hm0 and Te bins for the capture length matrix","Hm0_bins = -0.5:0.5:max(fix(Hm0))+0.5; % Input is min, max, and n indecies for vector","Hm0_bins = Hm0_bins+0.25 ;","Te_bins = 0:1:max(fix(Te));","Te_bins = Te_bins+0.5;","","% Calculate the necessary capture length matrices for each statistic based","% on IEC/TS 62600-100","clmat.mean = capture_length_matrix(Hm0,Te,L,\"mean\",Hm0_bins,Te_bins);","clmat.std = capture_length_matrix(Hm0,Te,L,\"std\",Hm0_bins,Te_bins);","clmat.median = capture_length_matrix(Hm0,Te,L,\"median\",Hm0_bins,Te_bins);","clmat.count = capture_length_matrix(Hm0,Te,L,\"count\",Hm0_bins,Te_bins);","clmat.sum = capture_length_matrix(Hm0,Te,L,\"sum\",Hm0_bins,Te_bins);","clmat.min = capture_length_matrix(Hm0,Te,L,\"min\",Hm0_bins,Te_bins);","clmat.max = capture_length_matrix(Hm0,Te,L,\"max\",Hm0_bins,Te_bins);","clmat.freq = capture_length_matrix(Hm0,Te,L,\"frequency\",Hm0_bins,Te_bins);","","% Create wave energy flux matrix using statistic","jmat = wave_energy_flux_matrix(Hm0,Te,J,\"mean\",Hm0_bins,Te_bins);","% Calcaulte MAEP from matrix","maep_matrix = mean_annual_energy_production_matrix(clmat.mean,jmat,clmat.freq);","stats_cell = {'mean', 'std', 'median','count', 'sum', 'min', 'max','frequency'};","","% Capture Length Matrix using statistic","cl_matrix = [];","len = strlength(options.savepath);","for i = 1:length(statistic)","    if any(strcmp(stats_cell,statistic(i)))","        figure('Name',sprintf('Capture Length Matrix %s', statistic(i)),'NumberTitle','off')","        cl_matrix(i) = plot_matrix(clmat.(statistic(i)),\"Capture Length\");","        name = [options.savepath, filesep, sprintf('Capture Length Matrix %s', statistic(i)), '.png'];","","        if len > 1","            saveas(cl_matrix(i), name);","        end","    else","         ME = MException('MATLAB:power_performance_wave',...","             'statistic must be a string or string array defined', ...","             'by one or multiple of the following: \"mean\", \"std\", \"median\",\"count\", \"sum\", \"min\", \"max\", \"frequency\"');","         throw(ME);","    end","end","","end","",""],"CoverageDisplayDataPerLine":{"Function":{"LineNumber":1,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":86,"ContinuedLine":false},"Statement":[{"LineNumber":58,"Hits":1,"StartColumnNumbers":18,"EndColumnNumbers":22,"ContinuedLine":false},{"LineNumber":59,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":60,"Hits":1,"StartColumnNumbers":29,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":61,"Hits":0,"StartColumnNumbers":23,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":64,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":15,"ContinuedLine":false},{"LineNumber":65,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":108,"ContinuedLine":false},{"LineNumber":66,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":14,"ContinuedLine":false},{"LineNumber":69,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":38,"ContinuedLine":false},{"LineNumber":70,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":79,"ContinuedLine":false},{"LineNumber":71,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":14,"ContinuedLine":false},{"LineNumber":75,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":22,"ContinuedLine":false},{"LineNumber":78,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":81,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":21,"ContinuedLine":false},{"LineNumber":84,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":24,"ContinuedLine":false},{"LineNumber":87,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":38,"ContinuedLine":false},{"LineNumber":88,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":26,"ContinuedLine":false},{"LineNumber":89,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":27,"ContinuedLine":false},{"LineNumber":90,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":22,"ContinuedLine":false},{"LineNumber":94,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":69,"ContinuedLine":false},{"LineNumber":95,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":67,"ContinuedLine":false},{"LineNumber":96,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":73,"ContinuedLine":false},{"LineNumber":97,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":71,"ContinuedLine":false},{"LineNumber":98,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":67,"ContinuedLine":false},{"LineNumber":99,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":67,"ContinuedLine":false},{"LineNumber":100,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":67,"ContinuedLine":false},{"LineNumber":101,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":74,"ContinuedLine":false},{"LineNumber":104,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":65,"ContinuedLine":false},{"LineNumber":106,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":79,"ContinuedLine":false},{"LineNumber":107,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":80,"ContinuedLine":false},{"LineNumber":110,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":15,"ContinuedLine":false},{"LineNumber":111,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":112,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":27,"ContinuedLine":false},{"LineNumber":113,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":114,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":92,"ContinuedLine":false},{"LineNumber":115,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":74,"ContinuedLine":false},{"LineNumber":116,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":102,"ContinuedLine":false},{"LineNumber":118,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":18,"ContinuedLine":false},{"LineNumber":119,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":122,"Hits":0,"StartColumnNumbers":9,"EndColumnNumbers":56,"ContinuedLine":false},{"LineNumber":123,"Hits":0,"StartColumnNumbers":13,"EndColumnNumbers":65,"ContinuedLine":true},{"LineNumber":124,"Hits":0,"StartColumnNumbers":13,"EndColumnNumbers":119,"ContinuedLine":true},{"LineNumber":125,"Hits":0,"StartColumnNumbers":9,"EndColumnNumbers":19,"ContinuedLine":false}]}}