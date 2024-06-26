var sourceData134 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB-2/mhkit/wave/IO/NDBC/NDBC_available_data.m","RawFileContents":["function available_data=NDBC_available_data(parameter,options)","","%%%%%%%%%%%%%%%%%%%%","%     For a given parameter this will return a structure of years,","%     station IDs and file names that contain that parameter data.","%","% Parameters","% ------------","%     parameter : string","%         'swden' : 'Raw Spectral Wave Current Year Historical Data'","%         'stdmet': 'Standard Meteorological Current Year Historical Data'","%","%     buoy_number : string (optional)","%         Buoy Number.  5-character alpha-numeric station identifier","%         to call: NDBC_available_data(parameter,\"buoy_number\",buoy_number)","%","%     proxy : None","%         Parameter is now deprecated.","%         To request data from behind a firewall, configure in MATLAB","%         Preferences by navigating to:","%           Home -> Environment -> Preferences","%         then:","%           MATLAB -> Web -> Use a proxy server to connect to the Internet","%         See the following for details:","%           https://www.mathworks.com/help/matlab/import_export/proxy.html","%","% Returns","% ---------","%     available_data : structure","%         Structure with station_id, years, and NDBC file names.","%","%","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","","arguments","    parameter string {mustBeMember(parameter,{'swden','stdmet'})}","    options.buoy_number string = \"\";","end","","if strlength(options.buoy_number) ~= 0 && strlength(options.buoy_number) ~= 5","    ME = MException('MATLAB:NDBC_available_data', ...","                    'Buoy must be a 5-character alpha-numeric identifier.');","end","","MAX_RETRIES = 5;                         % number of query retries if error","FILENAME_IDENTIFIER = \".txt.gz\";","","% Formulate query","data_url = \"https://www.ndbc.noaa.gov/data/historical/\";","api_query = parameter;","","% Display query","disp(\"Data request URL: \" + data_url + api_query)","","% Submit query and get data","for i = 0:MAX_RETRIES","    try","        response = webread(data_url + api_query);","        break;","    catch ME","        if i == MAX_RETRIES","            disp(['MATLAB:NDBC_available_data: ', ME.identifier]);","            rethrow(ME)","        else","            pause(1);   % pause(seconds) and retry query","        end","    end","end","","% Organize a structure containing lists of the available data","data_lines = strsplit(response, '\\n');","available_data.Station_id = [];","available_data.year = [];","available_data.file = [];","for i = 1:length(data_lines)","    if contains(data_lines{i}, FILENAME_IDENTIFIER)","        % Parse and add filename to output structure","        % Note: need to grab between '\"' as escaping '>' or '<' has issues","        % Example filename: '42otpw2000.txt.gz', where:","        %   2000 = year","        %   w = delimiter (can also be an 'h')","        regex_pattern = strcat( ...","            '(?<=\\\")', ...       % look after a '\"'","            '[a-zA-Z0-9_]*', ... % any number of these alphanumerics and underscore","            strrep(FILENAME_IDENTIFIER, '.', '\\.'), ...  % escape the periods","            '(?=\\\")' ...         % look before a '\"'","            );","        filename = regexp(data_lines{i}, regex_pattern, 'match');","        available_data.file = [available_data.file; ...","                               convertCharsToStrings(filename{1})];","","        % Parse year from filename and add to output structure","        filename_no_extension = extractBefore(filename, '.');","        if contains(filename_no_extension, '_')","            % Handles filenames like: 42002w2008_old.txt.gz","            filename_base = extractBefore(filename_no_extension, '_');","        else","            filename_base = filename_no_extension;","        end","        year = str2double(extractAfter( ...","            filename_base, ...","            strlength(filename_base) - 4));     % grab last 4 chars","        available_data.year = [available_data.year; year];","","        % Parse station ID from filename and add to output structure","        station_id = extractBefore( ...","            filename_base, ...","            strlength(filename_base) - 5 + 1);      % grab all but last 5 chars","        available_data.Station_id = [available_data.Station_id; ...","                                     convertCharsToStrings(station_id{1})];","    end","end","","% Filter results to a single buoy if a buoy is specified and it exists","if options.buoy_number ~= \"\"","    indices = ismember(available_data.Station_id, options.buoy_number);","    if any(indices)","        for field_name = fieldnames(available_data)'","            if length(available_data.(field_name{1})) == length(indices)","                available_data.(field_name{1}) = ...","                    available_data.(field_name{1})(indices);","            end","        end","    else","        warning('MATLAB:NDBC_available_data', ...","                'Buoy number \"%s\" could not be found.', ...","                options.buoy_number);","    end","end","",""],"CoverageDisplayDataPerLine":{"Function":{"LineNumber":1,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":62,"ContinuedLine":false},"Statement":[{"LineNumber":36,"Hits":1,"StartColumnNumbers":22,"EndColumnNumbers":64,"ContinuedLine":false},{"LineNumber":37,"Hits":0,"StartColumnNumbers":33,"EndColumnNumbers":35,"ContinuedLine":false},{"LineNumber":40,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":77,"ContinuedLine":false},{"LineNumber":41,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":48,"ContinuedLine":false},{"LineNumber":42,"Hits":0,"StartColumnNumbers":20,"EndColumnNumbers":76,"ContinuedLine":true},{"LineNumber":45,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":16,"ContinuedLine":false},{"LineNumber":46,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":49,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":56,"ContinuedLine":false},{"LineNumber":50,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":22,"ContinuedLine":false},{"LineNumber":53,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":49,"ContinuedLine":false},{"LineNumber":56,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":21,"ContinuedLine":false},{"LineNumber":57,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":7,"ContinuedLine":false},{"LineNumber":58,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":49,"ContinuedLine":false},{"LineNumber":59,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":14,"ContinuedLine":false},{"LineNumber":60,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":12,"ContinuedLine":false},{"LineNumber":61,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":27,"ContinuedLine":false},{"LineNumber":62,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":66,"ContinuedLine":false},{"LineNumber":63,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":65,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":21,"ContinuedLine":false},{"LineNumber":71,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":38,"ContinuedLine":false},{"LineNumber":72,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":73,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":74,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":75,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":76,"Hits":2699,"StartColumnNumbers":4,"EndColumnNumbers":51,"ContinuedLine":false},{"LineNumber":82,"Hits":2677,"StartColumnNumbers":8,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":83,"Hits":2677,"StartColumnNumbers":12,"EndColumnNumbers":21,"ContinuedLine":true},{"LineNumber":84,"Hits":2677,"StartColumnNumbers":12,"EndColumnNumbers":27,"ContinuedLine":true},{"LineNumber":85,"Hits":2677,"StartColumnNumbers":12,"EndColumnNumbers":50,"ContinuedLine":true},{"LineNumber":86,"Hits":2677,"StartColumnNumbers":12,"EndColumnNumbers":20,"ContinuedLine":true},{"LineNumber":87,"Hits":2677,"StartColumnNumbers":12,"EndColumnNumbers":14,"ContinuedLine":true},{"LineNumber":88,"Hits":2677,"StartColumnNumbers":8,"EndColumnNumbers":65,"ContinuedLine":false},{"LineNumber":89,"Hits":2677,"StartColumnNumbers":8,"EndColumnNumbers":50,"ContinuedLine":false},{"LineNumber":90,"Hits":2677,"StartColumnNumbers":31,"EndColumnNumbers":67,"ContinuedLine":true},{"LineNumber":93,"Hits":2677,"StartColumnNumbers":8,"EndColumnNumbers":61,"ContinuedLine":false},{"LineNumber":94,"Hits":2677,"StartColumnNumbers":8,"EndColumnNumbers":47,"ContinuedLine":false},{"LineNumber":96,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":70,"ContinuedLine":false},{"LineNumber":98,"Hits":2677,"StartColumnNumbers":12,"EndColumnNumbers":50,"ContinuedLine":false},{"LineNumber":100,"Hits":2677,"StartColumnNumbers":8,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":101,"Hits":2677,"StartColumnNumbers":12,"EndColumnNumbers":25,"ContinuedLine":true},{"LineNumber":102,"Hits":2677,"StartColumnNumbers":12,"EndColumnNumbers":43,"ContinuedLine":true},{"LineNumber":103,"Hits":2677,"StartColumnNumbers":8,"EndColumnNumbers":58,"ContinuedLine":false},{"LineNumber":106,"Hits":2677,"StartColumnNumbers":8,"EndColumnNumbers":35,"ContinuedLine":false},{"LineNumber":107,"Hits":2677,"StartColumnNumbers":12,"EndColumnNumbers":25,"ContinuedLine":true},{"LineNumber":108,"Hits":2677,"StartColumnNumbers":12,"EndColumnNumbers":46,"ContinuedLine":true},{"LineNumber":109,"Hits":2677,"StartColumnNumbers":8,"EndColumnNumbers":62,"ContinuedLine":false},{"LineNumber":110,"Hits":2677,"StartColumnNumbers":37,"EndColumnNumbers":75,"ContinuedLine":true},{"LineNumber":115,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":116,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":71,"ContinuedLine":false},{"LineNumber":117,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":19,"ContinuedLine":false},{"LineNumber":118,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":52,"ContinuedLine":false},{"LineNumber":119,"Hits":3,"StartColumnNumbers":12,"EndColumnNumbers":72,"ContinuedLine":false},{"LineNumber":120,"Hits":3,"StartColumnNumbers":16,"EndColumnNumbers":48,"ContinuedLine":false},{"LineNumber":121,"Hits":3,"StartColumnNumbers":20,"EndColumnNumbers":60,"ContinuedLine":true},{"LineNumber":125,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":44,"ContinuedLine":false},{"LineNumber":126,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":54,"ContinuedLine":true},{"LineNumber":127,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":37,"ContinuedLine":true}]}}