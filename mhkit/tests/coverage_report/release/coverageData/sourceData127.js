var sourceData127 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB/mhkit/tidal/graphics/plot_tidal_phase_exceedance.m","RawFileContents":["function figure=plot_tidal_phase_exceedance(data, flood, ebb, ...","                                                          options)","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","%     Returns a stacked area plot of the exceedance probability for the","%     flood and ebb tidal phases.","%","% Parameters","% ------------","%    data: structure","%","%      data.time: vector","%       days from January 0, 0000 in the proleptic ISO calendar","%","%      data.d: vector","%       time-series of directions [degrees]","%","%      data.s: vector","%       time-series of speeds [cm/s]","%","%    flood: float","%        principal flood direction [degrees]","%","%    ebb: float","%        principal ebb direction [degrees]","%","%    bin_size: numeric (optional)","%       Speed bin size. Default = 0.1 m/s","%       to call: plot_tidal_phase_probability(data, flood, ebb,\"bin_size\",bin_size)","%","%    title: string (optional)","%       title for the plot","%       to call: plot_tidal_phase_probability(data, flood, ebb,\"title\",title)","%","%    savepath: string (optional)","%       path and filename to save figure.","%       to call: plot_tidal_phase_probability(data, flood, ebb,\"savepath\",savepath)","%","% Returns","% ---------","%   figure: stacked bar graph of the probability of exceedance in","%           flood and ebb directions","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","","arguments","    data","    flood","    ebb","    options.bin_size = 0.1; % m/s","    options.title = \"\";","    options.savepath = \"\";","end","","%check to see if the first input argument is a structure","if any(~isstruct(data))","    ME = MException('MATLAB:plot_tidal_phase_probability','data must be a structure');","    throw(ME);","end","","%check to see if the second input argument is a number","if any([~isnumeric(flood), length(flood) ~= 1])","    ME = MException('MATLAB:plot_tidal_phase_probability','flood must be a number');","    throw(ME);","end","","%check to see if the third input argument is a number","if any([~isnumeric(ebb), length(ebb) ~= 1])","    ME = MException('MATLAB:plot_tidal_phase_probability','ebb must be a number');","    throw(ME);","end","","directions = data.d; % degrees","timestamps = data.time;","velocities = data.s; % cm per second","","    isEbb = flood_or_ebb(directions, flood, ebb);","","    ebb_velocities = velocities(isEbb);","    ebb_timestamps = timestamps(isEbb);","","    flood_velocities = velocities(~isEbb);","    flood_timestamps = timestamps(~isEbb);","","    F_struct_total = exceedance_probability(struct('Discharge', velocities, 'time', timestamps));","    F = F_struct_total.F;","","    F_struct_ebb = exceedance_probability(struct('Discharge', ebb_velocities, 'time', ebb_timestamps));","    F_ebb = F_struct_ebb.F;","","    F_struct_flood = exceedance_probability(struct('Discharge', flood_velocities, 'time', flood_timestamps));","    F_flood = F_struct_flood.F;","","    bin_size = options.bin_size;","","    % Remove duplicate points before interpolation","    [ebb_velocities, unique_idx_ebb] = unique(ebb_velocities);","    [flood_velocities, unique_idx_flood] = unique(flood_velocities);","    [velocities, unique_idx_velocities] = unique(velocities);","","    F_ebb = F_ebb(unique_idx_ebb);","    F_flood = F_flood(unique_idx_flood);","    F = F(unique_idx_velocities);","","    decimals = round(bin_size/0.1);","    s_new = round(min(velocities), decimals):bin_size:round(max(velocities), decimals)+bin_size;","","    f_total = griddedInterpolant(velocities, F, 'linear', 'nearest');","    f_ebb = griddedInterpolant(ebb_velocities, F_ebb, 'linear', 'nearest');","    f_flood = griddedInterpolant(flood_velocities, F_flood, 'linear', 'nearest');","","    F_total = f_total(s_new);","    F_ebb = f_ebb(s_new);","    F_flood = f_flood(s_new);","","    % This differs from the python version but is necessary to keep the exceedance probability between 0 and 100","    F_max_total = max(max(F_ebb), max(F_flood)) * 2;","","    area(s_new, [F_ebb/F_max_total*100; F_flood/F_max_total*100].', 'EdgeColor', 'none');","","    xlabel('Velocity [\\itm/s\\rm]','FontSize',20);","    ylabel('Probability of Exceedance','FontSize',18);","    legend('Ebb','Flood')","    grid on","    title(options.title)","","    len = strlength(options.savepath);","    if len > 1","        exportgraphics(gca, options.savepath);","    end","","end","","function isEbb = flood_or_ebb(directions, flood, ebb)","    max_angle = max(ebb, flood);","    min_angle = min(ebb, flood);","","    lower_split = rem((min_angle + (360 - max_angle + min_angle)/2 ), 360);","    upper_split = lower_split + 180;","","    if (lower_split <= ebb) && (ebb < upper_split)","        isEbb = ((directions < upper_split) & (directions >= lower_split));","    else","        isEbb = ~((directions < upper_split) & (directions >= lower_split));","    end","end",""],"CoverageDisplayDataPerLine":{"Function":[{"LineNumber":1,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":65,"ContinuedLine":false},{"LineNumber":2,"Hits":1,"StartColumnNumbers":58,"EndColumnNumbers":66,"ContinuedLine":true},{"LineNumber":132,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":53,"ContinuedLine":false}],"Statement":[{"LineNumber":48,"Hits":1,"StartColumnNumbers":23,"EndColumnNumbers":26,"ContinuedLine":false},{"LineNumber":49,"Hits":1,"StartColumnNumbers":20,"EndColumnNumbers":22,"ContinuedLine":false},{"LineNumber":50,"Hits":0,"StartColumnNumbers":23,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":54,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":55,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":86,"ContinuedLine":false},{"LineNumber":56,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":14,"ContinuedLine":false},{"LineNumber":60,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":47,"ContinuedLine":false},{"LineNumber":61,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":84,"ContinuedLine":false},{"LineNumber":62,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":14,"ContinuedLine":false},{"LineNumber":66,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":67,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":82,"ContinuedLine":false},{"LineNumber":68,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":14,"ContinuedLine":false},{"LineNumber":71,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":72,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":73,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":75,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":49,"ContinuedLine":false},{"LineNumber":77,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":78,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":80,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":42,"ContinuedLine":false},{"LineNumber":81,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":42,"ContinuedLine":false},{"LineNumber":83,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":97,"ContinuedLine":false},{"LineNumber":84,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":86,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":103,"ContinuedLine":false},{"LineNumber":87,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":27,"ContinuedLine":false},{"LineNumber":89,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":109,"ContinuedLine":false},{"LineNumber":90,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":92,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":95,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":62,"ContinuedLine":false},{"LineNumber":96,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":68,"ContinuedLine":false},{"LineNumber":97,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":61,"ContinuedLine":false},{"LineNumber":99,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":100,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":40,"ContinuedLine":false},{"LineNumber":101,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":103,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":35,"ContinuedLine":false},{"LineNumber":104,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":96,"ContinuedLine":false},{"LineNumber":106,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":69,"ContinuedLine":false},{"LineNumber":107,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":75,"ContinuedLine":false},{"LineNumber":108,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":81,"ContinuedLine":false},{"LineNumber":110,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":111,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":112,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":115,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":52,"ContinuedLine":false},{"LineNumber":117,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":89,"ContinuedLine":false},{"LineNumber":119,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":49,"ContinuedLine":false},{"LineNumber":120,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":54,"ContinuedLine":false},{"LineNumber":121,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":122,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":12,"ContinuedLine":false},{"LineNumber":123,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":24,"ContinuedLine":false},{"LineNumber":125,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":38,"ContinuedLine":false},{"LineNumber":126,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":14,"ContinuedLine":false},{"LineNumber":127,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":46,"ContinuedLine":false},{"LineNumber":133,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":134,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":136,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":75,"ContinuedLine":false},{"LineNumber":137,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":139,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":50,"ContinuedLine":false},{"LineNumber":140,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":75,"ContinuedLine":false},{"LineNumber":142,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":76,"ContinuedLine":false}]}}