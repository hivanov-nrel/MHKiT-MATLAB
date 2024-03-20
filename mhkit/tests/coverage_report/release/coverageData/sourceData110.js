var sourceData110 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB/mhkit/tests/QC_Test.m","RawFileContents":["classdef QC_Test < matlab.unittest.TestCase","","    methods (Test)","","        function test_pass(testCase)","            assertEqual(testCase, true, true)","        end","","        function test_check_corrupt(testCase)","","            %  Column C has corrupt data (-999) between 7:30 and 9:30","            simple = readtable('../../examples/data/qc/simple.xlsx');","            data.values = simple.C;","            data.time = simple.Var1;","            corrupt_vals = {-999};","            for i = 1:length(data.values)","                if data.values(i) == -999","                    expect.values(i) = NaN;","                    expect.mask(i) = 0;","                else","                    expect.values(i) = data.values(i);","                    expect.mask(i) = 1;","                end","            end","            expected.values = expect.values.';","            expected.mask = int64(expect.mask.');","            results = check_corrupt(data,corrupt_vals);","            assertEqual(testCase, results.values, expected.values);","            assertEqual(testCase, results.mask, expected.mask);","        end","","        function test_check_delta(testCase)","","            % Column A has the same value (0.5) from 12:00 until 14:30","            % Column C does not follow the expected sine function from 13:00 until 16:15.","            % The change is abrupt and gradually corrected.","            simple = readtable('../../examples/data/qc/simple_expected.xlsx');","            simple_expected = readtable('../../examples/data/qc/simple_expected.xlsx');","","            dataA.values = simple.A;","            dataC.values = simple.C;","            dataA.time = simple.Var1;","            dataC.time = simple.Var1;","            format long","            datenumA = datenum(dataA.time);","            datenumC = datenum(dataC.time);","            bound = [-1.0, 1.0];","            window = 2*3600; % seconds","            resultsA = check_delta(dataA,bound,window);","            resultsC = check_delta(dataC,bound,window);","","            expectedA.values = simple_expected.A;","            expectedC.values = simple_expected.C;","            ABSTOL = 0.00000001;","            assertEqual(testCase, resultsA.values, expectedA.values, 'AbsTol', ABSTOL);","            assertEqual(testCase, resultsC.values, expectedC.values, 'AbsTol', ABSTOL);","        end","","        function test_check_increment(testCase)","","            % Column A has the same value (0.5) from 12:00 until 14:30","            % Column C does not follow the expected sine function from 13:00 until 16:15.","            % The change is abrupt and gradually corrected.","            simple = readtable('../../examples/data/qc/simple.xlsx');","            dataA.values = simple.A;","            dataC.values = simple.C;","            dataA.time = simple.Var1;","            dataC.time = simple.Var1;","","            format long","            datenumA = datenum(dataA.time);","            datenumC = datenum(dataC.time);","","            bound = [0.0001, 0.6];","","            expectA.values = zeros(size(dataA.values));","            for i = 1:96","                if i >= 68 && i <= 69","                    expectA.values(i) = NaN;","                    expectA.mask(i) = 0;","                elseif i >= 49 && i <= 58","","                    expectA.values(i) = NaN;","                    expectA.mask(i) = 0;","                else","                    expectA.values(i) = dataA.values(i);","                    expectA.mask(i) = 1;","                end","            end","            expectC.values = zeros(size(dataC.values));","            for ii = 1:96","                if ii >= 68 && ii <= 69","                    expectC.values(ii) = NaN;","                    expectC.mask(ii) = 0;","                elseif ii >= 30 && ii <= 39","                    expectC.values(ii) = NaN;","                    expectC.mask(ii) = 0;","                elseif ii == 52","                    expectC.values(ii) = NaN;","                    expectC.mask(ii) = 0;","                else","","                    expectC.values(ii) = dataC.values(ii);","                    expectC.mask(ii) = 1;","                end","            end","            expectedA.values = expectA.values;","            expectedA.mask = int64(expectA.mask.');","            expectedC.values = expectC.values;","            expectedC.mask = int64(expectC.mask.');","","            resultsA = check_increment(dataA,bound);","            resultsC = check_increment(dataC,bound);","            assertEqual(testCase, resultsA.values, expectedA.values);","            assertEqual(testCase, resultsA.mask, expectedA.mask);","            assertEqual(testCase, resultsC.values, expectedC.values);","            assertEqual(testCase, resultsC.mask, expectedC.mask);","        end","","        function test_check_missing(testCase)","","            % Column D is missing data from 17:45 until 18:15","            simple = readtable('../../examples/data/qc/simple.xlsx');","            data.values = simple.D;","            data.time = simple.Var1;","            A = ismissing(data.values);","            for i = 1:length(A)","                if A(i) == 1","                    expect.values(i) = NaN;","                    expect.mask(i) = 0;","                else","                    expect.values(i) = data.values(i);","                    expect.mask(i) = 1;","                end","            end","            expected.values = expect.values.';","            expected.mask = int64(expect.mask.');","            results = check_missing(data);","            assertEqual(testCase, results.values, expected.values);","            assertEqual(testCase, results.mask, expected.mask);","        end","","        % function test_check_range(testCase)","        %     % Column B is below the expected lower bound of 0 at 6:30 and above the expected upper bound of 1 at 15:30","        %     % Column D is occasionally below the expected lower bound of -1 around midday (2 time steps)","        %     % and above the expected upper bound of 1 in the early morning and late evening (10 time steps).","        % end","","        function test_check_timestamp(testCase)","","            % Missing timestamp at 5:00","            % Duplicate timestamp 17:00","            % Non-monotonic timestamp 19:30","            simple = readtable('../../examples/data/qc/simple.xlsx');","            simple_expected = readtable('../../examples/data/qc/simple_expected.xlsx');","            data.values = simple.A;","            data.time = simple.Var1;","            freq = 900; % seconds","            expected.values = simple_expected.A;","            expected.time = (simple_expected.Var1);","            results = check_timestamp(data,freq);","            datenum_time = datenum(expected.time) - datenum(results.time.');","            expected_datenum_time = zeros(length(datenum_time),1);","            ABSTOL = 0.00000001;","            assertEqual(testCase, results.values, expected.values, 'AbsTol', ABSTOL);","            assertEqual(testCase, datenum_time, expected_datenum_time, 'AbsTol', ABSTOL);","        end","","    end","","end",""],"CoverageDisplayDataPerLine":{"Function":[{"LineNumber":5,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":9,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":32,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":59,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":47,"ContinuedLine":false},{"LineNumber":120,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":149,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":47,"ContinuedLine":false}],"Statement":[{"LineNumber":6,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":12,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":69,"ContinuedLine":false},{"LineNumber":13,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":35,"ContinuedLine":false},{"LineNumber":14,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":15,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":16,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":41,"ContinuedLine":false},{"LineNumber":17,"Hits":96,"StartColumnNumbers":16,"EndColumnNumbers":41,"ContinuedLine":false},{"LineNumber":18,"Hits":9,"StartColumnNumbers":20,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":19,"Hits":9,"StartColumnNumbers":20,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":21,"Hits":87,"StartColumnNumbers":20,"EndColumnNumbers":54,"ContinuedLine":false},{"LineNumber":22,"Hits":87,"StartColumnNumbers":20,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":25,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":46,"ContinuedLine":false},{"LineNumber":26,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":49,"ContinuedLine":false},{"LineNumber":27,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":55,"ContinuedLine":false},{"LineNumber":28,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":67,"ContinuedLine":false},{"LineNumber":29,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":63,"ContinuedLine":false},{"LineNumber":37,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":78,"ContinuedLine":false},{"LineNumber":38,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":87,"ContinuedLine":false},{"LineNumber":40,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":41,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":42,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":37,"ContinuedLine":false},{"LineNumber":43,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":37,"ContinuedLine":false},{"LineNumber":44,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":24,"ContinuedLine":false},{"LineNumber":45,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":46,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":47,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":48,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":49,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":55,"ContinuedLine":false},{"LineNumber":50,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":55,"ContinuedLine":false},{"LineNumber":52,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":49,"ContinuedLine":false},{"LineNumber":53,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":49,"ContinuedLine":false},{"LineNumber":54,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":55,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":87,"ContinuedLine":false},{"LineNumber":56,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":87,"ContinuedLine":false},{"LineNumber":64,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":69,"ContinuedLine":false},{"LineNumber":65,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":66,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":67,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":37,"ContinuedLine":false},{"LineNumber":68,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":37,"ContinuedLine":false},{"LineNumber":70,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":24,"ContinuedLine":false},{"LineNumber":71,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":72,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":74,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":76,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":55,"ContinuedLine":false},{"LineNumber":77,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":24,"ContinuedLine":false},{"LineNumber":78,"Hits":96,"StartColumnNumbers":16,"EndColumnNumbers":37,"ContinuedLine":false},{"LineNumber":79,"Hits":2,"StartColumnNumbers":20,"EndColumnNumbers":44,"ContinuedLine":false},{"LineNumber":80,"Hits":2,"StartColumnNumbers":20,"EndColumnNumbers":40,"ContinuedLine":false},{"LineNumber":81,"Hits":94,"StartColumnNumbers":16,"EndColumnNumbers":41,"ContinuedLine":false},{"LineNumber":83,"Hits":10,"StartColumnNumbers":20,"EndColumnNumbers":44,"ContinuedLine":false},{"LineNumber":84,"Hits":10,"StartColumnNumbers":20,"EndColumnNumbers":40,"ContinuedLine":false},{"LineNumber":86,"Hits":84,"StartColumnNumbers":20,"EndColumnNumbers":56,"ContinuedLine":false},{"LineNumber":87,"Hits":84,"StartColumnNumbers":20,"EndColumnNumbers":40,"ContinuedLine":false},{"LineNumber":90,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":55,"ContinuedLine":false},{"LineNumber":91,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":92,"Hits":96,"StartColumnNumbers":16,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":93,"Hits":2,"StartColumnNumbers":20,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":94,"Hits":2,"StartColumnNumbers":20,"EndColumnNumbers":41,"ContinuedLine":false},{"LineNumber":95,"Hits":94,"StartColumnNumbers":16,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":96,"Hits":10,"StartColumnNumbers":20,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":97,"Hits":10,"StartColumnNumbers":20,"EndColumnNumbers":41,"ContinuedLine":false},{"LineNumber":98,"Hits":84,"StartColumnNumbers":16,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":99,"Hits":1,"StartColumnNumbers":20,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":100,"Hits":1,"StartColumnNumbers":20,"EndColumnNumbers":41,"ContinuedLine":false},{"LineNumber":103,"Hits":83,"StartColumnNumbers":20,"EndColumnNumbers":58,"ContinuedLine":false},{"LineNumber":104,"Hits":83,"StartColumnNumbers":20,"EndColumnNumbers":41,"ContinuedLine":false},{"LineNumber":107,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":46,"ContinuedLine":false},{"LineNumber":108,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":51,"ContinuedLine":false},{"LineNumber":109,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":46,"ContinuedLine":false},{"LineNumber":110,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":51,"ContinuedLine":false},{"LineNumber":112,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":52,"ContinuedLine":false},{"LineNumber":113,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":52,"ContinuedLine":false},{"LineNumber":114,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":69,"ContinuedLine":false},{"LineNumber":115,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":65,"ContinuedLine":false},{"LineNumber":116,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":69,"ContinuedLine":false},{"LineNumber":117,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":65,"ContinuedLine":false},{"LineNumber":123,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":69,"ContinuedLine":false},{"LineNumber":124,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":35,"ContinuedLine":false},{"LineNumber":125,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":126,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":127,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":128,"Hits":96,"StartColumnNumbers":16,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":129,"Hits":3,"StartColumnNumbers":20,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":130,"Hits":3,"StartColumnNumbers":20,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":132,"Hits":93,"StartColumnNumbers":20,"EndColumnNumbers":54,"ContinuedLine":false},{"LineNumber":133,"Hits":93,"StartColumnNumbers":20,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":136,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":46,"ContinuedLine":false},{"LineNumber":137,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":49,"ContinuedLine":false},{"LineNumber":138,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":42,"ContinuedLine":false},{"LineNumber":139,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":67,"ContinuedLine":false},{"LineNumber":140,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":63,"ContinuedLine":false},{"LineNumber":154,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":69,"ContinuedLine":false},{"LineNumber":155,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":87,"ContinuedLine":false},{"LineNumber":156,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":35,"ContinuedLine":false},{"LineNumber":157,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":158,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":159,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":48,"ContinuedLine":false},{"LineNumber":160,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":51,"ContinuedLine":false},{"LineNumber":161,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":49,"ContinuedLine":false},{"LineNumber":162,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":76,"ContinuedLine":false},{"LineNumber":163,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":66,"ContinuedLine":false},{"LineNumber":164,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":165,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":85,"ContinuedLine":false},{"LineNumber":166,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":89,"ContinuedLine":false}]}}