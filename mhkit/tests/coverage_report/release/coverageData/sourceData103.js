var sourceData103 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB-2/mhkit/tests/Tidal_TestResource.m","RawFileContents":["classdef Tidal_TestResource < matlab.unittest.TestCase","","    methods (Test)","","        function test_exceedance_probability(testCase)","            Q = struct('Discharge',[0;1;2;3;4;5;6;7;8], 'time', [0 1 2 3 4 5 6 7 8]);","            f = exceedance_probability(Q);","            assertEqual(testCase,min(f.F), 10);","            assertEqual(testCase,max(f.F), 90);","        end","","        function test_principal_flow_directions(testCase)","            relative_file_name = '../../examples/data/tidal/s08010.json';","            full_file_name = fullfile(fileparts(mfilename('fullpath')), relative_file_name);","            data = read_noaa_json(full_file_name);","            data.s = data.s/100;","","            width_direction = 10;","            [direction1, direction2] = principal_flow_directions(data.d, width_direction);","            assertEqual(testCase,direction1,172.0);","            assertEqual(testCase,round(direction2,1),round(352.3,1));","        end","","        function test_plot_current_timeseries(testCase)","            filename = 'tidal_plot_current_timeseries.png';","            if isfile(filename)","                delete(filename);","            end","","            relative_file_name = '../../examples/data/tidal/s08010.json';","            full_file_name = fullfile(fileparts(mfilename('fullpath')), relative_file_name);","            data = read_noaa_json(full_file_name);","            data.s = data.s/100;","            width_direction = 10;","            [direction1, direction2] = principal_flow_directions(data.d, width_direction);","","            plot_current_timeseries(data,direction1,\"savepath\",filename);","","            assertTrue(testCase,isfile(filename));","            delete(filename);","        end","","        function test_plot_joint_probability_distribution(testCase)","            filename = 'tidal_plot_joint_probability_distribution.png';","            if isfile(filename)","                delete(filename)","            end","","            relative_file_name = '../../examples/data/tidal/s08010.json';","            full_file_name = fullfile(fileparts(mfilename('fullpath')), relative_file_name);","            data = read_noaa_json(full_file_name);","            data.s = data.s/100;","            width_direction = 10;","","            data = rmfield(data,'id');","            data = rmfield(data,'name');","            data = rmfield(data,'lat');","            data = rmfield(data,'lon');","            data = rmfield(data,'b');","","            plot_joint_probability_distribution(data,width_direction,0.1,\"savepath\",filename);","","            assertTrue(testCase,isfile(filename))","            delete(filename);","        end","","        function test_plot_rose(testCase)","            filename = 'tidal_plot_rose.png';","            if isfile(filename)","                delete(filename);","            end","","            relative_file_name = '../../examples/data/tidal/s08010.json';","            full_file_name = fullfile(fileparts(mfilename('fullpath')), relative_file_name);","            data = read_noaa_json(full_file_name);","            data.s = data.s/100;","            width_direction = 10;","","            plot_rose(data,width_direction,1,\"savepath\",filename);","","            assertTrue(testCase,isfile(filename))","            delete(filename);","        end","","        function test_plot_phase_probability(testCase)","            filename = 'tidal_plot_phase_probability.png';","            if isfile(filename)","                delete(filename);","            end","","            relative_file_name = '../../examples/data/tidal/s08010.json';","            full_file_name = fullfile(fileparts(mfilename('fullpath')), relative_file_name);","            data = read_noaa_json(full_file_name);","            data.s = data.s/100;","            width_direction = 1;","            [direction1, direction2] = ...","                principal_flow_directions(data.d,width_direction);","            flood = direction1 ;","            ebb = direction2 ;","","            plot_tidal_phase_probability(data,flood,ebb,\"savepath\",filename);","","            assertTrue(testCase,isfile(filename))","            delete(filename);","        end","","        function test_plot_phase_exceedance(testCase)","","            filename = 'tidal_plot_phase_exceedance.png';","            if isfile(filename)","                delete(filename);","            end","","            relative_file_name = '../../examples/data/tidal/s08010.json';","            full_file_name = fullfile(fileparts(mfilename('fullpath')), relative_file_name);","            data = read_noaa_json(full_file_name);","            data.s = data.s/100;","            width_direction = 1;","            [direction1, direction2] = ...","                principal_flow_directions(data.d,width_direction);","            flood = direction1 ;","            ebb = direction2 ;","","            plot_tidal_phase_exceedance(data,flood,ebb,\"savepath\",filename);","","            assertTrue(testCase,isfile(filename))","            delete(filename);","        end","","    end","","end","",""],"CoverageDisplayDataPerLine":{"Function":[{"LineNumber":5,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":54,"ContinuedLine":false},{"LineNumber":12,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":57,"ContinuedLine":false},{"LineNumber":24,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":55,"ContinuedLine":false},{"LineNumber":43,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":67,"ContinuedLine":false},{"LineNumber":67,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":41,"ContinuedLine":false},{"LineNumber":85,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":54,"ContinuedLine":false},{"LineNumber":107,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":53,"ContinuedLine":false}],"Statement":[{"LineNumber":6,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":85,"ContinuedLine":false},{"LineNumber":7,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":42,"ContinuedLine":false},{"LineNumber":8,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":47,"ContinuedLine":false},{"LineNumber":9,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":47,"ContinuedLine":false},{"LineNumber":13,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":73,"ContinuedLine":false},{"LineNumber":14,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":92,"ContinuedLine":false},{"LineNumber":15,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":50,"ContinuedLine":false},{"LineNumber":16,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":18,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":19,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":90,"ContinuedLine":false},{"LineNumber":20,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":51,"ContinuedLine":false},{"LineNumber":21,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":69,"ContinuedLine":false},{"LineNumber":25,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":59,"ContinuedLine":false},{"LineNumber":26,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":27,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":30,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":73,"ContinuedLine":false},{"LineNumber":31,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":92,"ContinuedLine":false},{"LineNumber":32,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":50,"ContinuedLine":false},{"LineNumber":33,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":34,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":35,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":90,"ContinuedLine":false},{"LineNumber":37,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":73,"ContinuedLine":false},{"LineNumber":39,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":50,"ContinuedLine":false},{"LineNumber":40,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":44,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":71,"ContinuedLine":false},{"LineNumber":45,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":46,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":49,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":73,"ContinuedLine":false},{"LineNumber":50,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":92,"ContinuedLine":false},{"LineNumber":51,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":50,"ContinuedLine":false},{"LineNumber":52,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":53,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":55,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":38,"ContinuedLine":false},{"LineNumber":56,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":40,"ContinuedLine":false},{"LineNumber":57,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":58,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":59,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":37,"ContinuedLine":false},{"LineNumber":61,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":94,"ContinuedLine":false},{"LineNumber":63,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":49,"ContinuedLine":false},{"LineNumber":64,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":68,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":69,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":70,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":73,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":73,"ContinuedLine":false},{"LineNumber":74,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":92,"ContinuedLine":false},{"LineNumber":75,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":50,"ContinuedLine":false},{"LineNumber":76,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":77,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":79,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":66,"ContinuedLine":false},{"LineNumber":81,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":49,"ContinuedLine":false},{"LineNumber":82,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":86,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":58,"ContinuedLine":false},{"LineNumber":87,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":88,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":91,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":73,"ContinuedLine":false},{"LineNumber":92,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":92,"ContinuedLine":false},{"LineNumber":93,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":50,"ContinuedLine":false},{"LineNumber":94,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":95,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":96,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":38,"ContinuedLine":false},{"LineNumber":97,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":66,"ContinuedLine":true},{"LineNumber":98,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":99,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":30,"ContinuedLine":false},{"LineNumber":101,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":77,"ContinuedLine":false},{"LineNumber":103,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":49,"ContinuedLine":false},{"LineNumber":104,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":109,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":57,"ContinuedLine":false},{"LineNumber":110,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":111,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":114,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":73,"ContinuedLine":false},{"LineNumber":115,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":92,"ContinuedLine":false},{"LineNumber":116,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":50,"ContinuedLine":false},{"LineNumber":117,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":118,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":119,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":38,"ContinuedLine":false},{"LineNumber":120,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":66,"ContinuedLine":true},{"LineNumber":121,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":122,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":30,"ContinuedLine":false},{"LineNumber":124,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":76,"ContinuedLine":false},{"LineNumber":126,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":49,"ContinuedLine":false},{"LineNumber":127,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":29,"ContinuedLine":false}]}}