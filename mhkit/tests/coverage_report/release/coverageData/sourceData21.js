var sourceData21 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB/mhkit/dolfyn/rotate/inst2head.m","RawFileContents":["function ds = inst2head(advo, reverse)","if ~ check_inst2head_rotmat(advo)","    ds = advo;","    return","end","","rotmat = advo.inst2head_rotmat.data;","if reverse","    v_shape = size(advo.vel.data);","    advo.vel.data = reshape(squeeze(advo.vel.data)*rotmat',v_shape);","else","    v_shape = size(advo.vel.data);","    advo.vel.data = reshape(squeeze(advo.vel.data)*rotmat,v_shape);","end","","ds = advo;","","    function result = check_inst2head_rotmat(advo)","        if ~isfield(advo, 'inst2head_rotmat')","            % This is the default value, and we do nothing.","            result = false;","            return","        end","        if ~advo.attrs.inst2head_rotmat_was_set","            msgtext = ['The inst2head rotation matrix exists in props,' ...","                'but it was not set using `set_inst2head_rotmat.'];","            ME = MException('MATLAB:dolfyn:rotate:inst2head',msgtext);","            throwAsCaller(ME)","        end","        if det(advo.inst2head_rotmat.data) ~= 1","            ME = MException('MATLAB:dolfyn:rotate:inst2head',\"Invalid \" + ...","                \"inst2head_rotmat (determinant != 1)\");","            throwAsCaller(ME)","        end","        result = true;","    end","end","",""],"CoverageDisplayDataPerLine":{"Function":[{"LineNumber":1,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":38,"ContinuedLine":false},{"LineNumber":18,"Hits":4,"StartColumnNumbers":4,"EndColumnNumbers":50,"ContinuedLine":false}],"Statement":[{"LineNumber":2,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":3,"Hits":2,"StartColumnNumbers":4,"EndColumnNumbers":14,"ContinuedLine":false},{"LineNumber":4,"Hits":2,"StartColumnNumbers":4,"EndColumnNumbers":11,"ContinuedLine":false},{"LineNumber":7,"Hits":2,"StartColumnNumbers":0,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":8,"Hits":2,"StartColumnNumbers":0,"EndColumnNumbers":10,"ContinuedLine":false},{"LineNumber":9,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":10,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":68,"ContinuedLine":false},{"LineNumber":12,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":13,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":67,"ContinuedLine":false},{"LineNumber":16,"Hits":2,"StartColumnNumbers":0,"EndColumnNumbers":10,"ContinuedLine":false},{"LineNumber":19,"Hits":4,"StartColumnNumbers":8,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":21,"Hits":2,"StartColumnNumbers":12,"EndColumnNumbers":27,"ContinuedLine":false},{"LineNumber":22,"Hits":2,"StartColumnNumbers":12,"EndColumnNumbers":19,"ContinuedLine":false},{"LineNumber":24,"Hits":2,"StartColumnNumbers":8,"EndColumnNumbers":47,"ContinuedLine":false},{"LineNumber":25,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":71,"ContinuedLine":false},{"LineNumber":26,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":67,"ContinuedLine":true},{"LineNumber":27,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":70,"ContinuedLine":false},{"LineNumber":28,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":30,"Hits":2,"StartColumnNumbers":8,"EndColumnNumbers":47,"ContinuedLine":false},{"LineNumber":31,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":73,"ContinuedLine":false},{"LineNumber":32,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":55,"ContinuedLine":true},{"LineNumber":33,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":35,"Hits":2,"StartColumnNumbers":8,"EndColumnNumbers":22,"ContinuedLine":false}]}}