var sourceData126 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB-2/mhkit/utils/nc_get_var_info.m","RawFileContents":["function res = nc_get_var_info(filename,vinfo,varpath,res)","","%%%%%%%%%%%%%%%%%%%%","%     Append NetCDF variable data and info to an existring structure (res).","%","% Parameters","% ------------","%   filename: string","%       Filename of NetCDF file to read.","%   vinfo:","%       NetCDF variable schema, a structure.","%   varpath:","%       Variable path in the NetCDF file,","%       E.G., 'GROUP_NAME/SUBGROUP_NAME/VAR_NAME'","%   res:","%       Structure to hold the variable info","%","%","% Returns","% ---------","%   res: structure that holds the variable info","%       fields will include variables from nc file","%       e.g., res.(varname1), res.(varname2), ...","%       res.(varname) includes fields:","%           res.(varname).Name: full name of the variable","%           res.(varname).Data: metadata","%           res.(varname).Dims: dimension names","%           res.(varname).FillValue: V.FillValue or","%               V.Attributes{'_FillValue'} if","%               the former is not given.","%           res.(varname).Attrs: V.Attributes except for","%               V.Attributes{'_FillValue'}","%","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","","    vname = vinfo.Name;","    % check & convert vname","    vname = check_name(vname);","    res.(vname).Name = vinfo.Name;","","    % assign data to the variable","    res.(vname).Data = ncread(filename, varpath);","","    % assign dims to the variable","    if ~isempty(vinfo.Dimensions)","        res.(vname).Dims = {vinfo.Dimensions.Name};","    else","        res.(vname).Dims = {};","    end","","    % assign FillValue to the variable","    if ~isnumeric(vinfo.FillValue)","        res.(vname).FillValue = ...","            str2double(vinfo.FillValue);","    else","        res.(vname).FillValue = vinfo.FillValue;","    end","","    res.(vname).Attrs = struct();","    % assign attrs to the variable & check _FillValue","    if ~isempty(vinfo.Attributes)","        attrnames = {vinfo.Attributes.Name};","        for iattr = 1:numel(attrnames)","            aname = attrnames{iattr};","            % _FillValue in data attributes:","            if strcmp(aname,'_FillValue')","                % assign a new FillValue only if it was NaN","                if isnan(res.(vname).FillValue)","                    res.(vname).FillValue = ...","                        vinfo.Attributes(iattr).Value;","                end","                continue","            else","                aname = check_name(aname);","                res.(vname).Attrs.(aname) = ...","                    vinfo.Attributes(iattr).Value;","            end","        end","    end","end","",""],"CoverageDisplayDataPerLine":{"Function":{"LineNumber":1,"Hits":524,"StartColumnNumbers":0,"EndColumnNumbers":58,"ContinuedLine":false},"Statement":[{"LineNumber":36,"Hits":524,"StartColumnNumbers":4,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":38,"Hits":524,"StartColumnNumbers":4,"EndColumnNumbers":30,"ContinuedLine":false},{"LineNumber":39,"Hits":524,"StartColumnNumbers":4,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":42,"Hits":524,"StartColumnNumbers":4,"EndColumnNumbers":49,"ContinuedLine":false},{"LineNumber":45,"Hits":524,"StartColumnNumbers":4,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":46,"Hits":516,"StartColumnNumbers":8,"EndColumnNumbers":51,"ContinuedLine":false},{"LineNumber":48,"Hits":8,"StartColumnNumbers":8,"EndColumnNumbers":30,"ContinuedLine":false},{"LineNumber":52,"Hits":524,"StartColumnNumbers":4,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":53,"Hits":37,"StartColumnNumbers":8,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":54,"Hits":37,"StartColumnNumbers":12,"EndColumnNumbers":40,"ContinuedLine":true},{"LineNumber":56,"Hits":487,"StartColumnNumbers":8,"EndColumnNumbers":48,"ContinuedLine":false},{"LineNumber":59,"Hits":524,"StartColumnNumbers":4,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":61,"Hits":524,"StartColumnNumbers":4,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":62,"Hits":474,"StartColumnNumbers":8,"EndColumnNumbers":44,"ContinuedLine":false},{"LineNumber":63,"Hits":474,"StartColumnNumbers":8,"EndColumnNumbers":38,"ContinuedLine":false},{"LineNumber":64,"Hits":1788,"StartColumnNumbers":12,"EndColumnNumbers":37,"ContinuedLine":false},{"LineNumber":66,"Hits":1788,"StartColumnNumbers":12,"EndColumnNumbers":41,"ContinuedLine":false},{"LineNumber":68,"Hits":360,"StartColumnNumbers":16,"EndColumnNumbers":47,"ContinuedLine":false},{"LineNumber":69,"Hits":173,"StartColumnNumbers":20,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":70,"Hits":173,"StartColumnNumbers":24,"EndColumnNumbers":54,"ContinuedLine":true},{"LineNumber":72,"Hits":360,"StartColumnNumbers":16,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":74,"Hits":1428,"StartColumnNumbers":16,"EndColumnNumbers":42,"ContinuedLine":false},{"LineNumber":75,"Hits":1428,"StartColumnNumbers":16,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":76,"Hits":1428,"StartColumnNumbers":20,"EndColumnNumbers":50,"ContinuedLine":true}]}}