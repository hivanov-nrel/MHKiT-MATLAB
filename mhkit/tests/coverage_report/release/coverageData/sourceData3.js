var sourceData3 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB/mhkit/dolfyn/adp/set_range_offset.m","RawFileContents":["function out = set_range_offset(ds, h_deploy)","% Adds an instrument's height above seafloor (for an up-facing instrument)","% or depth below water surface (for a down-facing instrument) to the range","% coordinate. Also adds an attribute to the Dataset with the current","% \"h_deploy\" distance.","%","% Parameters","% ----------","% ds : xarray.Dataset","%   The adcp dataset to ajust 'range' on","% h_deploy : numeric","%   Deployment location in the water column, in [m]","%","% Returns","% -------","% None, operates \"in place\"","%","% Notes","% -----","% Center of bin 1 = h_deploy + blank_dist + cell_size","%","% Nortek doesn't take h_deploy into account, so the range that DOLfYN","% calculates distance is from the ADCP transducers. TRDI asks for h_deploy","% input in their deployment software and is thereby known by DOLfYN.","%","% If the ADCP is mounted on a tripod on the seafloor, h_deploy will be","% the height of the tripod +/- any extra distance to the transducer faces.","% If the instrument is vessel-mounted, h_deploy is the distance between","% the surface and downward-facing ADCP's transducers.","","cords = fieldnames(ds.coords);","r = {};","for qq = 1:numel(cords)","    if contains(cords{qq}, \"range\")","        r{end+1} = cords{qq};","        ds.coords.(cords{qq}) = ds.coords.(cords{qq}) + h_deploy;","    end","end","","if isfield(ds.attrs, 'h_deploy')","    ds.attrs.h_deploy = ds.attrs.h_deploy + h_deploy;","else","    ds.attrs.h_deploy = h_deploy;","end","","% If any of the range values changed we need to propogate that through the","% fields that would be affected","fn = fieldnames(ds);","for qq = 1:numel(fn)","    field = fn{qq};","    if isfield(ds.(field),'coords')","        % This is a data field","        for kk = 1:numel(r)","            % Check the coords for any range values","            if isfield(ds.(field).coords,r{kk})","                ds.(field).coords.(r{kk}) =...","                    ds.(field).coords.(r{kk}) + h_deploy;","            end","        end","    end","end","","out = ds;","","end","",""],"CoverageDisplayDataPerLine":{"Function":{"LineNumber":1,"Hits":0,"StartColumnNumbers":0,"EndColumnNumbers":45,"ContinuedLine":false},"Statement":[{"LineNumber":31,"Hits":0,"StartColumnNumbers":0,"EndColumnNumbers":30,"ContinuedLine":false},{"LineNumber":32,"Hits":0,"StartColumnNumbers":0,"EndColumnNumbers":7,"ContinuedLine":false},{"LineNumber":33,"Hits":0,"StartColumnNumbers":0,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":34,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":35,"ContinuedLine":false},{"LineNumber":35,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":36,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":65,"ContinuedLine":false},{"LineNumber":40,"Hits":0,"StartColumnNumbers":0,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":41,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":53,"ContinuedLine":false},{"LineNumber":43,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":48,"Hits":0,"StartColumnNumbers":0,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":49,"Hits":0,"StartColumnNumbers":0,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":50,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":19,"ContinuedLine":false},{"LineNumber":51,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":35,"ContinuedLine":false},{"LineNumber":53,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":27,"ContinuedLine":false},{"LineNumber":55,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":47,"ContinuedLine":false},{"LineNumber":56,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":57,"Hits":0,"StartColumnNumbers":20,"EndColumnNumbers":57,"ContinuedLine":true},{"LineNumber":63,"Hits":0,"StartColumnNumbers":0,"EndColumnNumbers":9,"ContinuedLine":false}]}}