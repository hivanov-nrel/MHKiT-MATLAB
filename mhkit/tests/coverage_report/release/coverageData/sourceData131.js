var sourceData131 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB/mhkit/tidal/resource/principal_flow_directions.m","RawFileContents":["function [ebb, flood]=principal_flow_directions(directions,width_dir)","","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","%     Calculates the principal flow directions of current data","%     The weighted average (over the working velocity range of the TEC)","%     should be considered to be the principal direction of the current,","%     and should be used for both the ebb and flood cycles to determine","%     the TEC optimum orientation.","%","%     Parameters","%     ----------","%     directions: vector","%       flow directions [degrees]","%","%     width_dir: int or vector","%       width of direction bins [degrees]","%     Returns","%     -------","%     ebb: float","%         principal ebb direction [degrees]","%     flood: float","%         principal flood direction [degrees]","%","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","","% Number of directional bins","N_dir = int32(floor(360/width_dir));","% Compute directional histogram","edges = [0:360/(double(N_dir)):360];","H1 = histcounts(directions, edges);","H1 = pdf(H1, edges);","%  Convert to perecnt","H1 = H1 * 100;","% Determine if there are an even or odd number of bins","odd = logical(rem(N_dir,2));","% Shift by 180 degrees and sum","if odd","    % Then split middle bin counts to left and right","    H0to180    = H1(1:floor(N_dir/2)-1);","    H180to360  = H1(floor(N_dir/2)+1:end);","    H0to180(end)    = H0to180(end) + H1(floor(N_dir/2))/2;","    % Add the two","    H180 = H0to180 + H180to360;","else","    H180 =  H1(1:floor(N_dir/2)) + H1(floor(N_dir/2)+1:end);","end","","% Find the maximum value","maxDegreeStacked = find(H180 == max(H180)) - 1;","% Shift by 90 to find angles normal to principal direction","floodEbbNormalDegree1 = normalize_angle(maxDegreeStacked + 90.);","% Find the complimentary angle","floodEbbNormalDegree2 = normalize_angle(floodEbbNormalDegree1+180.);","% Reset values so that the Degree1 is the smaller angle, and Degree2","% the large","floodEbbNormalDegree1 = min(floodEbbNormalDegree1, floodEbbNormalDegree2);","floodEbbNormalDegree2 = floodEbbNormalDegree1 + 180.;","% Slice directions on the 2 semi circles","d1 = directions(directions(:,1) >= floodEbbNormalDegree1...","    & directions(:,1) <= floodEbbNormalDegree2);","d2 = directions(directions(:,1) < floodEbbNormalDegree1...","    | directions(:,1) > floodEbbNormalDegree2);","% Shift second set of of directions to not break between 360 and 0","d2 = d2 - 180.;","% Renormalize the points (gets rid of negatives)","d2 = arrayfun(@normalize_angle,d2);","% Number of bins for semi-circl","n_dir = int32(floor(180/width_dir));","% Compute 1D histograms on both semi circles","dir1_edges = [min(d1):(max(d1)-min(d1))/(double(n_dir)):max(d1)];","Hd1 = histcounts(d1, dir1_edges);","Hd1 = pdf(Hd1, dir1_edges);","dir2_edges = [min(d2):(max(d2)-min(d2))/(double(n_dir)):max(d2)];","Hd2 = histcounts(d2, dir2_edges);","Hd2 = pdf(Hd2, dir2_edges);","%Convert to perecnt","Hd1 = Hd1 * 100; % [%]","Hd2 = Hd2 * 100; % [%]","% Principal Directions average of the 2 bins","max1 = find(Hd1 == max(Hd1));","max2 = find(Hd2 == max(Hd2));","ebb = 0.5 * (dir1_edges(max1) +...","    dir1_edges(max1 + 1)); % PrincipalDirection1 in python","flood = 0.5 * (dir2_edges(max2) +...","    dir2_edges(max2 + 1)) + 180.; % PrincipalDirection2 in python","","","    function new_degree = normalize_angle(degree)","        % Normalizes degrees to be between 0 and 360","        %","        % Parameters","        % ----------","        % degree: int or float","        %","        % Returns","        % -------","        % new_degree: float","        %     Normalized between 0 and 360 degrees","","        % Set new degree as remainder","        new_degree = rem(degree, 360);","        % Ensure Positive","        new_degree = rem((new_degree + 360),360);","    end","","    function out = pdf(hist, edges)","        % Probability density function:","        % Given a histrogram, the result is the value of the","        % probability density function at the bin, normalized such that","        % the integral over the range is 1. Note that the sum of the","        % histogram values will not be equal to 1 unless bins of unity","        % width are chosen; it is not a probability *mass* function.","        %","        % Parameters","        % ----------","        % hist: array (histogram count)","        % edges: array (edges of histogram)","        %","        % Returns","        % -------","        % out: array","        %     probability density of histogram","","        db = diff(edges);","        out = hist./db./sum(hist);","    end","","end","",""],"CoverageDisplayDataPerLine":{"Function":[{"LineNumber":1,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":69,"ContinuedLine":false},{"LineNumber":88,"Hits":49964,"StartColumnNumbers":4,"EndColumnNumbers":49,"ContinuedLine":false},{"LineNumber":106,"Hits":12,"StartColumnNumbers":4,"EndColumnNumbers":35,"ContinuedLine":false}],"Statement":[{"LineNumber":27,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":29,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":30,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":35,"ContinuedLine":false},{"LineNumber":31,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":33,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":14,"ContinuedLine":false},{"LineNumber":35,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":37,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":6,"ContinuedLine":false},{"LineNumber":39,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":40,"ContinuedLine":false},{"LineNumber":40,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":42,"ContinuedLine":false},{"LineNumber":41,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":58,"ContinuedLine":false},{"LineNumber":43,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":45,"Hits":4,"StartColumnNumbers":4,"EndColumnNumbers":60,"ContinuedLine":false},{"LineNumber":49,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":47,"ContinuedLine":false},{"LineNumber":51,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":64,"ContinuedLine":false},{"LineNumber":53,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":68,"ContinuedLine":false},{"LineNumber":56,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":74,"ContinuedLine":false},{"LineNumber":57,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":53,"ContinuedLine":false},{"LineNumber":59,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":56,"ContinuedLine":false},{"LineNumber":60,"Hits":4,"StartColumnNumbers":4,"EndColumnNumbers":48,"ContinuedLine":true},{"LineNumber":61,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":55,"ContinuedLine":false},{"LineNumber":62,"Hits":4,"StartColumnNumbers":4,"EndColumnNumbers":47,"ContinuedLine":true},{"LineNumber":64,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":15,"ContinuedLine":false},{"LineNumber":66,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":35,"ContinuedLine":false},{"LineNumber":68,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":70,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":65,"ContinuedLine":false},{"LineNumber":71,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":72,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":27,"ContinuedLine":false},{"LineNumber":73,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":65,"ContinuedLine":false},{"LineNumber":74,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":75,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":27,"ContinuedLine":false},{"LineNumber":77,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":16,"ContinuedLine":false},{"LineNumber":78,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":16,"ContinuedLine":false},{"LineNumber":80,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":81,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":82,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":83,"Hits":4,"StartColumnNumbers":4,"EndColumnNumbers":26,"ContinuedLine":true},{"LineNumber":84,"Hits":4,"StartColumnNumbers":0,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":85,"Hits":4,"StartColumnNumbers":4,"EndColumnNumbers":33,"ContinuedLine":true},{"LineNumber":101,"Hits":49964,"StartColumnNumbers":8,"EndColumnNumbers":38,"ContinuedLine":false},{"LineNumber":103,"Hits":49964,"StartColumnNumbers":8,"EndColumnNumbers":49,"ContinuedLine":false},{"LineNumber":124,"Hits":12,"StartColumnNumbers":8,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":125,"Hits":12,"StartColumnNumbers":8,"EndColumnNumbers":34,"ContinuedLine":false}]}}