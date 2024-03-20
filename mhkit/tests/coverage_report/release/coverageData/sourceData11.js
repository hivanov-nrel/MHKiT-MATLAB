var sourceData11 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB/mhkit/dolfyn/io/read_userdata.m","RawFileContents":["% <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>","%                        Reader Functions","% <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>","function userdata = read_userdata(filename, userdata)","    %%%%%%%%%%%%%%%%%%%%","    %     Reads a userdata.json file and returns the data it contains","    %     as a structure","    %","    % Parameters","    % ------------","    %     filename: string","    %         Filename of Nortek file to read.","    %     userdata: bool or string","    %         true, false, or string of userdata.json filename","    %","    % Returns","    % ---------","    %     userdata: structure","    %","    %%%%%%%%%%%%%%%%%%%%","    if isa(userdata, 'logical')","        if ~userdata","            userdata = struct;","            return","        else","            % determine name of userdata file from base name","            basefile = extractBefore(filename,...","                find(filename == '.', 1, 'last'));","            jsonfile = basefile + \".userdata.json\";","        end","    else","        % use name directly as supplied","        jsonfile = userdata;","    end","    % make sure the file exists","    if ~isfile(jsonfile)","        userdata = struct;","        return","    end","    % read the json data","    fid = fopen(jsonfile);","    raw = fread(fid,inf);","    str = char(raw');","    fclose(fid);","    userdata = jsondecode(str);","","    % quality checks for userdata","","    % if the following fields exist, rename them","    nm_list = {'body2head_rotmat', 'body2head_vec'};","    for i = 1 : length(nm_list)","        nm = nm_list{i};","        if isfield(userdata, nm)","            new_name = append('inst', nm(5:end));","            userdata.(new_name) = userdata.(nm);","            userdata = rmfield(userdata, nm);","        end","    end","    % if inst2head_rotmat data = identity, eye, 1, or 1. then change","    % data to be a 3x3 identity matrix","    if isfield(userdata, 'inst2head_rotmat')","        % check if its a string","        if isa(userdata.('inst2head_rotmat'), 'char')","            if strcmp(userdata.('inst2head_rotmat'),'identity') ||...","                strcmp(userdata.('inst2head_rotmat'),'eye')","                userdata.('inst2head_rotmat') = eye(3);","            end","        else % if not maybe its numeric check if its length 1","            if userdata.('inst2head_rotmat')","                if length(userdata.('inst2head_rotmat')) == 1","                    if userdata.('inst2head_rotmat') == 1","                        userdata.('inst2head_rotmat') = eye(3);","                    end","                end","            end","        end","    end","    % Make sure that coord_sys is not in the userdata","    if isfield(userdata, 'coord_sys')","        msgtext = ['The instrument coordinate system (coord_sys) should' ...","            ' not be specified in the .userdata.json file, remove this' ...","            ' and read the file again.'];","        ME = MException('MATLAB:read_nortek:read_userdata',msgtext);","        throwAsCaller(ME)","    end","end","","% <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>",""],"CoverageDisplayDataPerLine":{"Function":{"LineNumber":4,"Hits":22,"StartColumnNumbers":0,"EndColumnNumbers":53,"ContinuedLine":false},"Statement":[{"LineNumber":21,"Hits":22,"StartColumnNumbers":4,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":22,"Hits":22,"StartColumnNumbers":8,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":23,"Hits":3,"StartColumnNumbers":12,"EndColumnNumbers":30,"ContinuedLine":false},{"LineNumber":24,"Hits":3,"StartColumnNumbers":12,"EndColumnNumbers":19,"ContinuedLine":false},{"LineNumber":27,"Hits":19,"StartColumnNumbers":12,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":28,"Hits":19,"StartColumnNumbers":16,"EndColumnNumbers":50,"ContinuedLine":true},{"LineNumber":29,"Hits":19,"StartColumnNumbers":12,"EndColumnNumbers":51,"ContinuedLine":false},{"LineNumber":33,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":36,"Hits":19,"StartColumnNumbers":4,"EndColumnNumbers":24,"ContinuedLine":false},{"LineNumber":37,"Hits":14,"StartColumnNumbers":8,"EndColumnNumbers":26,"ContinuedLine":false},{"LineNumber":38,"Hits":14,"StartColumnNumbers":8,"EndColumnNumbers":15,"ContinuedLine":false},{"LineNumber":41,"Hits":5,"StartColumnNumbers":4,"EndColumnNumbers":26,"ContinuedLine":false},{"LineNumber":42,"Hits":5,"StartColumnNumbers":4,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":43,"Hits":5,"StartColumnNumbers":4,"EndColumnNumbers":21,"ContinuedLine":false},{"LineNumber":44,"Hits":5,"StartColumnNumbers":4,"EndColumnNumbers":16,"ContinuedLine":false},{"LineNumber":45,"Hits":5,"StartColumnNumbers":4,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":50,"Hits":5,"StartColumnNumbers":4,"EndColumnNumbers":52,"ContinuedLine":false},{"LineNumber":51,"Hits":5,"StartColumnNumbers":4,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":52,"Hits":10,"StartColumnNumbers":8,"EndColumnNumbers":24,"ContinuedLine":false},{"LineNumber":53,"Hits":10,"StartColumnNumbers":8,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":54,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":49,"ContinuedLine":false},{"LineNumber":55,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":48,"ContinuedLine":false},{"LineNumber":56,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":61,"Hits":5,"StartColumnNumbers":4,"EndColumnNumbers":44,"ContinuedLine":false},{"LineNumber":63,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":53,"ContinuedLine":false},{"LineNumber":64,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":65,"ContinuedLine":false},{"LineNumber":65,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":59,"ContinuedLine":true},{"LineNumber":66,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":55,"ContinuedLine":false},{"LineNumber":69,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":44,"ContinuedLine":false},{"LineNumber":70,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":61,"ContinuedLine":false},{"LineNumber":71,"Hits":0,"StartColumnNumbers":20,"EndColumnNumbers":57,"ContinuedLine":false},{"LineNumber":72,"Hits":0,"StartColumnNumbers":24,"EndColumnNumbers":63,"ContinuedLine":false},{"LineNumber":79,"Hits":5,"StartColumnNumbers":4,"EndColumnNumbers":37,"ContinuedLine":false},{"LineNumber":80,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":72,"ContinuedLine":false},{"LineNumber":81,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":71,"ContinuedLine":true},{"LineNumber":82,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":41,"ContinuedLine":true},{"LineNumber":83,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":68,"ContinuedLine":false},{"LineNumber":84,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":25,"ContinuedLine":false}]}}