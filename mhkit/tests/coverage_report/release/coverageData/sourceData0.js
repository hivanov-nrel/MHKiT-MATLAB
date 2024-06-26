var sourceData0 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB-2/mhkit/dolfyn/adp/correlation_filter.m","RawFileContents":["function out = correlation_filter(ds, options)","% Filters out velocity data where correlation is below a","% threshold in the beam correlation data.","%","% Parameters","% ----------","% ds : Dataset","%   The adcp dataset to clean.","% thresh : numeric","%   The maximum value of correlation to screen, in counts or %, default is","%   50","% val : numeric","%   Value to set masked correlation data to, default is nan","%","% Returns","% -------","% ds : xarray.Dataset","%  Velocity data with low correlation values set to `val`","%","% Notes","% -----","% Does not edit correlation or amplitude data.","","    arguments","        ds;","        options.thresh = 50;","        options.val = nan;","    end","","    % 4 or 5 beam","    if isfield(ds,'vel_b5')","        tag = {'', '_b5'};","    else","        tag = {''};","    end","","    % copy original ref frame","    coord_sys_orig = ds.coord_sys;","","    % correlation is always in beam coordinates","    ds = rotate2(ds, 'beam');","    for qq = 1:numel(tag)","        tg = string(tag{qq});","        field = strcat(\"corr\",tg);","        mask = ds.(field).data < options.thresh;","        field = strcat(\"vel\",tg);","        ds.(field).data(mask) = options.val;","        comment = \"Filtered of data with a correlation value below \" + ...","            string(options.thresh) + string(ds.corr.units);","        ds.(field).comment = comment;","    end","","    out = rotate2(ds, coord_sys_orig);","","end","",""],"CoverageDisplayDataPerLine":{"Function":{"LineNumber":1,"Hits":0,"StartColumnNumbers":0,"EndColumnNumbers":46,"ContinuedLine":false},"Statement":[{"LineNumber":26,"Hits":0,"StartColumnNumbers":25,"EndColumnNumbers":27,"ContinuedLine":false},{"LineNumber":27,"Hits":0,"StartColumnNumbers":22,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":31,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":27,"ContinuedLine":false},{"LineNumber":32,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":26,"ContinuedLine":false},{"LineNumber":34,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":19,"ContinuedLine":false},{"LineNumber":38,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":41,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":42,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":43,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":44,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":45,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":48,"ContinuedLine":false},{"LineNumber":46,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":47,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":44,"ContinuedLine":false},{"LineNumber":48,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":70,"ContinuedLine":false},{"LineNumber":49,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":59,"ContinuedLine":true},{"LineNumber":50,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":37,"ContinuedLine":false},{"LineNumber":53,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":38,"ContinuedLine":false}]}}