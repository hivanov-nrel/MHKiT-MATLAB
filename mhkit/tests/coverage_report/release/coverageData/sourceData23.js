var sourceData23 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB/mhkit/dolfyn/rotate/quaternion2orient.m","RawFileContents":["function omat = quaternion2orient(quaternions)","%     Calculate orientation from Nortek AHRS quaternions, where","%       q = [W, X, Y, Z] instead of the standard","%       q = [X, Y, Z, W] = [q1, q2, q3, q4]","%","%     Parameters","%     ----------","%     quaternions : Structure","%         Quaternion structure from the raw dataset","%","%     Returns","%     -------","%     orientmat : |ndarray|","%         The inst2earth rotation maxtrix as calculated from the","%         quaternions","%","%     See Also","%     --------","%     scipy.spatial.transform.Rotation","","    omat = struct();","    omat.data = zeros([length(quaternions.coords.time),1,3,3], 'double');","    omat.dims = { 'time', 'inst', 'earth' };","    omat.coords.time = quaternions.coords.time;","    omat.coords.inst = {'X' 'Y' 'Z'};","    omat.coords.earth = {'E' 'N' 'U'};","","    for i = 1:length(quaternions.coords.time)","        r = quat2rotmat([quaternions.data(i,:,2),...","                         quaternions.data(i,:,3),...","                         quaternions.data(i,:,4),...","                         quaternions.data(i,:,1)]);","        omat.data(i,:,:,:) = r;","    end","","    omat.data = permute(omat.data,[1, 2, 4, 3]);","","    function R = quat2rotmat(quat)","        R = zeros([3,3]);","        quat = normalize(quat,'norm');","","        R(1,1) =  1-2*(quat(2)^2 + quat(3)^2);","        R(2,1) = -2*(quat(3)*quat(4) - quat(2)*quat(1));","        R(3,1) =  2*(quat(2)*quat(4) + quat(3)*quat(1));","","        R(1,2) =  2*(quat(3)*quat(4) + quat(2)*quat(1));","        R(2,2) = -1*(1-2*(quat(2)^2 + quat(4)^2));","        R(3,2) =  2*(quat(2)*quat(3) - quat(4)*quat(1));","","        R(1,3) = -2*(quat(2)*quat(4) - quat(3)*quat(1));","        R(2,3) =  2*(quat(2)*quat(3) + quat(4)*quat(1));","        R(3,3) = -1*(1-2*(quat(3)^2 + quat(4)^2));","    end","","end","",""],"CoverageDisplayDataPerLine":{"Function":[{"LineNumber":1,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":46,"ContinuedLine":false},{"LineNumber":38,"Hits":100,"StartColumnNumbers":4,"EndColumnNumbers":34,"ContinuedLine":false}],"Statement":[{"LineNumber":21,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":22,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":73,"ContinuedLine":false},{"LineNumber":23,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":44,"ContinuedLine":false},{"LineNumber":24,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":47,"ContinuedLine":false},{"LineNumber":25,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":37,"ContinuedLine":false},{"LineNumber":26,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":38,"ContinuedLine":false},{"LineNumber":28,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":29,"Hits":100,"StartColumnNumbers":8,"EndColumnNumbers":48,"ContinuedLine":false},{"LineNumber":30,"Hits":100,"StartColumnNumbers":25,"EndColumnNumbers":48,"ContinuedLine":true},{"LineNumber":31,"Hits":100,"StartColumnNumbers":25,"EndColumnNumbers":48,"ContinuedLine":true},{"LineNumber":32,"Hits":100,"StartColumnNumbers":25,"EndColumnNumbers":51,"ContinuedLine":true},{"LineNumber":33,"Hits":100,"StartColumnNumbers":8,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":36,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":48,"ContinuedLine":false},{"LineNumber":39,"Hits":100,"StartColumnNumbers":8,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":40,"Hits":100,"StartColumnNumbers":8,"EndColumnNumbers":38,"ContinuedLine":false},{"LineNumber":42,"Hits":100,"StartColumnNumbers":8,"EndColumnNumbers":46,"ContinuedLine":false},{"LineNumber":43,"Hits":100,"StartColumnNumbers":8,"EndColumnNumbers":56,"ContinuedLine":false},{"LineNumber":44,"Hits":100,"StartColumnNumbers":8,"EndColumnNumbers":56,"ContinuedLine":false},{"LineNumber":46,"Hits":100,"StartColumnNumbers":8,"EndColumnNumbers":56,"ContinuedLine":false},{"LineNumber":47,"Hits":100,"StartColumnNumbers":8,"EndColumnNumbers":50,"ContinuedLine":false},{"LineNumber":48,"Hits":100,"StartColumnNumbers":8,"EndColumnNumbers":56,"ContinuedLine":false},{"LineNumber":50,"Hits":100,"StartColumnNumbers":8,"EndColumnNumbers":56,"ContinuedLine":false},{"LineNumber":51,"Hits":100,"StartColumnNumbers":8,"EndColumnNumbers":56,"ContinuedLine":false},{"LineNumber":52,"Hits":100,"StartColumnNumbers":8,"EndColumnNumbers":50,"ContinuedLine":false}]}}