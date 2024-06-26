var sourceData101 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB-2/mhkit/tests/River_TestResource.m","RawFileContents":["classdef River_TestResource < matlab.unittest.TestCase","","    methods (Test)","","        function test_Froude_number(testCase)","            v = 2;","            h = 5;","            Fr = Froude_number(v, h);","            assertEqual(testCase,Fr, 0.286,'AbsTol',0.001);","        end","","        function test_exceedance_probability(testCase)","            % Create arbitrary discharge between 0 and 8(N=9)","            Q = struct('Discharge',[0;1;2;3;4;5;6;7;8],'time',[0 1 2 3 4 5 6 7 8]);","            % Rank order for non-repeating elements simply adds 1 to each element","            %if N=9, max F = 100((max(Q)+1)/10) =  90%","            %if N=9, min F = 100((min(Q)+1)/10) =  10%","            f = exceedance_probability(Q).F;","            assertEqual(testCase,min(f), 10);","            assertEqual(testCase,max(f), 90);","        end","","        function test_polynomial_fit(testCase)","            % Calculate a first order polynomial on an x=y line","            poly = polynomial_fit(0:1:7, 0:1:7, 1);","            % intercept should be 0","            assertEqual(testCase,poly.coef(2), 0.0,'AbsTol',0.01);","            % slope should be 1","            assertEqual(testCase,poly.coef(1), 1.0,'AbsTol',0.01);","            % r-squared should be perfect","            assertEqual(testCase,poly.fit, 1.0,'AbsTol',0.01);","        end","","        function test_discharge_to_velocity(testCase)","            % Create arbitrary discharge between 0 and 8(N=9)","            Q = struct('Discharge',[0;1;2;3;4;5;6;7;8],'time',[0 1 2 3 4 5 6 7 8]);","            % Calculate a first order polynomial on an DV_Curve x=y line 10 times greater than the Q values","            poly = polynomial_fit(0:1:8, 10*(0:1:8), 1);","            % Becuase the polynomial line fits perfect we should expect the V to equal 10*Q","            V = discharge_to_velocity(Q,poly.coef);","            assertEqual(testCase,sum(10*Q.Discharge - V.V), 0.00,'AbsTol',0.01);","        end","","        function test_velocity_to_power(testCase)","            % Calculate a first order polynomial on an DV_Curve x=y line 10 times greater than the Q values","            poly = polynomial_fit(0:1:8, 10*(0:1:8),1);","            % Because the polynomial line fits perfect we should expect the V to equal 10*Q","            Q = struct('Discharge',[0;1;2;3;4;5;6;7;8],'time',[0 1 2 3 4 5 6 7 8]);","            V = discharge_to_velocity(Q, poly.coef);","            VV = V.V;","            % Calculate a first order polynomial on an VP_Curve x=y line 10 times greater than the V values","            poly2 = polynomial_fit(0:1:8, 10*(0:1:8),1);","            % Set cut in/out to exclude 1 bin on either end of V range","            cut_in  = VV(1);","            cut_out = VV(end);","            % Power should be 10x greater and exclude the ends of V","            P = velocity_to_power(V, poly.coef, cut_in, cut_out);","            %Cut in power zero","            assertEqual(testCase,P.P(1), 0.00,'AbsTol',0.01);","            %Cut out power zero","            assertEqual(testCase,P.P(end), 800,'AbsTol',0.01);","            % Middle 10x greater than velocity","            assertEqual(testCase,sum((P.P - 10*V.V)), 0.00,'AbsTol',0.1);","        end","","        function test_energy_produced(testCase)","            seednum = 123;","            rng(seednum);","            % If power is always X then energy produced with be x*seconds","            X=1;","            seconds=1;","            P = struct('P',[X;X;X;X;X;X;X;X;X;X],'time',[0 1 2 3 4 5 6 7 8 9]);","            EP = energy_produced(P, seconds);","            assertEqual(testCase,EP, X*seconds,'AbsTol',0.1);","            % for a normal distribution of Power EP = mean *seconds","            mu=5;","            sigma=1;","","            function normrnd = normrnd(mu, sigma)","                normrnd = randn * sigma + mu;","            end","","            power_dist = struct('P', ...","                [normrnd(mu,sigma); ...","                normrnd(mu,sigma); ...","                normrnd(mu,sigma); ...","                normrnd(mu,sigma); ...","                normrnd(mu,sigma); ...","                normrnd(mu,sigma); ...","                normrnd(mu,sigma); ...","                normrnd(mu,sigma); ...","                normrnd(mu,sigma); ...","                normrnd(mu,sigma)], ...","                'time',[0 1 2 3 4 5 6 7 8 9]);","            EP2 = energy_produced(power_dist, seconds);","            assertEqual(testCase,EP2, mu*seconds,'AbsTol',0.1);","        end","","        function test_plot_flow_duration_curve(testCase)","            filename = 'river_plot_flow_duration_curve.png';","            if isfile(filename)","                delete(filename);","            end","","            Q = struct('Discharge',[0;1;2;3;4;5;6;7;8],'time',[0 1 2 3 4 5 6 7 8]);","            f = exceedance_probability(Q).F;","","            plot_flow_duration_curve(Q.Discharge, f,\"savepath\",filename);","","            assertTrue(testCase,isfile(filename));","            delete(filename);","        end","","        function test_plot_power_duration_curve(testCase)","            filename = 'river_plot_power_duration_curve.png';","            if isfile(filename)","                delete(filename);","            end","","            Q = struct('Discharge',[0;1;2;3;4;5;6;7;8],'time',[0 1 2 3 4 5 6 7 8]);","            f = exceedance_probability(Q).F;","            poly = polynomial_fit(0:1:8, 10*(0:1:8),1);","            V = discharge_to_velocity(Q, poly.coef);","            VV = V.V;","            % Calculate a first order polynomial on an VP_Curve x=y line 10 times greater than the V values","            poly2 = polynomial_fit(0:1:8, 10*(0:1:8),1);","            % Set cut in/out to exclude 1 bin on either end of V range","            cut_in  = VV(1);","            cut_out = VV(end);","            % Power should be 10x greater and exclude the ends of V","            P = velocity_to_power(V, poly.coef, cut_in, cut_out);","","            plot_power_duration_curve(P.P, f,\"savepath\",filename);","","            assertTrue(testCase,isfile(filename));","            delete(filename);","        end","","        function test_plot_velocity_duration_curve(testCase)","            filename = 'river_plot_velocity_duration_curve.png';","            if isfile(filename)","                delete(filename);","            end","","            Q = struct('Discharge',[0;1;2;3;4;5;6;7;8],'time',[0 1 2 3 4 5 6 7 8]);","            poly = polynomial_fit(0:1:8, 10*(0:1:8),1);","            V = discharge_to_velocity(Q, poly.coef);","            f = exceedance_probability(Q).F;","","            plot_velocity_duration_curve(V.V, f,\"savepath\",filename);","","            assertTrue(testCase,isfile(filename));","            delete(filename);","        end","","        function test_plot_discharge_timeseries(testCase)","            filename = 'river_plot_discharge_timeseries.png';","            if isfile(filename)","                delete(filename);","            end","","            Q = struct('Discharge',[0;1;2;3;4;5;6;7;8],'time',[0 1 2 3 4 5 6 7 8]);","","            plot_discharge_timeseries(Q,\"savepath\",filename);","","            assertTrue(testCase,isfile(filename));","            delete(filename);","        end","","        function test_plot_discharge_vs_velocity(testCase)","            filename = 'river_plot_discharge_vs_velocity.png';","            if isfile(filename)","                delete(filename);","            end","","            Q = struct('Discharge',[0;1;2;3;4;5;6;7;8],'time',[0 1 2 3 4 5 6 7 8]);","            poly = polynomial_fit(0:1:8, 10*(0:1:8),1);","            V = discharge_to_velocity(Q, poly.coef);","","            plot_discharge_vs_velocity(Q.Discharge,V.V,\"savepath\",filename);","","            assertTrue(testCase,isfile(filename));","            delete(filename);","        end","","        function test_plot_velocity_vs_power(testCase)","            filename = 'river_plot_velocity_vs_power.png';","            if isfile(filename)","                delete(filename);","            end","","            Q = struct('Discharge',[0;1;2;3;4;5;6;7;8],'time',[0 1 2 3 4 5 6 7 8]);","            poly = polynomial_fit(0:1:8, 10*(0:1:8),1);","            V = discharge_to_velocity(Q, poly.coef);","            VV = V.V;","            % Calculate a first order polynomial on an VP_Curve x=y line 10 times greater than the V values","            poly2 = polynomial_fit(0:1:8, 10*(0:1:8),1);","            % Set cut in/out to exclude 1 bin on either end of V range","            cut_in  = VV(1);","            cut_out = VV(end);","            % Power should be 10x greater and exclude the ends of V","            P = velocity_to_power(V, poly.coef, cut_in, cut_out);","","            plot_velocity_vs_power(V.V, P.P,\"polynomial_coeff\",poly.coef,\"savepath\",filename);","","            assertTrue(testCase,isfile(filename));","            delete(filename);","            end","","    end","","end",""],"CoverageDisplayDataPerLine":{"Function":[{"LineNumber":5,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":12,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":54,"ContinuedLine":false},{"LineNumber":23,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":46,"ContinuedLine":false},{"LineNumber":34,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":53,"ContinuedLine":false},{"LineNumber":44,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":49,"ContinuedLine":false},{"LineNumber":66,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":47,"ContinuedLine":false},{"LineNumber":79,"Hits":10,"StartColumnNumbers":12,"EndColumnNumbers":49,"ContinuedLine":false},{"LineNumber":99,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":56,"ContinuedLine":false},{"LineNumber":114,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":57,"ContinuedLine":false},{"LineNumber":139,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":60,"ContinuedLine":false},{"LineNumber":156,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":57,"ContinuedLine":false},{"LineNumber":170,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":58,"ContinuedLine":false},{"LineNumber":186,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":54,"ContinuedLine":false}],"Statement":[{"LineNumber":6,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":18,"ContinuedLine":false},{"LineNumber":7,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":18,"ContinuedLine":false},{"LineNumber":8,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":37,"ContinuedLine":false},{"LineNumber":9,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":59,"ContinuedLine":false},{"LineNumber":14,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":83,"ContinuedLine":false},{"LineNumber":18,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":44,"ContinuedLine":false},{"LineNumber":19,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":20,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":25,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":51,"ContinuedLine":false},{"LineNumber":27,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":66,"ContinuedLine":false},{"LineNumber":29,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":66,"ContinuedLine":false},{"LineNumber":31,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":62,"ContinuedLine":false},{"LineNumber":36,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":83,"ContinuedLine":false},{"LineNumber":38,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":56,"ContinuedLine":false},{"LineNumber":40,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":51,"ContinuedLine":false},{"LineNumber":41,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":80,"ContinuedLine":false},{"LineNumber":46,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":55,"ContinuedLine":false},{"LineNumber":48,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":83,"ContinuedLine":false},{"LineNumber":49,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":52,"ContinuedLine":false},{"LineNumber":50,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":21,"ContinuedLine":false},{"LineNumber":52,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":56,"ContinuedLine":false},{"LineNumber":54,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":55,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":30,"ContinuedLine":false},{"LineNumber":57,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":65,"ContinuedLine":false},{"LineNumber":59,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":61,"ContinuedLine":false},{"LineNumber":61,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":62,"ContinuedLine":false},{"LineNumber":63,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":73,"ContinuedLine":false},{"LineNumber":67,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":26,"ContinuedLine":false},{"LineNumber":68,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":70,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":16,"ContinuedLine":false},{"LineNumber":71,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":22,"ContinuedLine":false},{"LineNumber":72,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":79,"ContinuedLine":false},{"LineNumber":73,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":74,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":61,"ContinuedLine":false},{"LineNumber":76,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":17,"ContinuedLine":false},{"LineNumber":77,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":80,"Hits":10,"StartColumnNumbers":16,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":83,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":35,"ContinuedLine":false},{"LineNumber":84,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":34,"ContinuedLine":true},{"LineNumber":85,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":33,"ContinuedLine":true},{"LineNumber":86,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":33,"ContinuedLine":true},{"LineNumber":87,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":33,"ContinuedLine":true},{"LineNumber":88,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":33,"ContinuedLine":true},{"LineNumber":89,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":33,"ContinuedLine":true},{"LineNumber":90,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":33,"ContinuedLine":true},{"LineNumber":91,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":33,"ContinuedLine":true},{"LineNumber":92,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":33,"ContinuedLine":true},{"LineNumber":93,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":34,"ContinuedLine":true},{"LineNumber":94,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":46,"ContinuedLine":true},{"LineNumber":95,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":55,"ContinuedLine":false},{"LineNumber":96,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":63,"ContinuedLine":false},{"LineNumber":100,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":60,"ContinuedLine":false},{"LineNumber":101,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":102,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":105,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":83,"ContinuedLine":false},{"LineNumber":106,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":44,"ContinuedLine":false},{"LineNumber":108,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":73,"ContinuedLine":false},{"LineNumber":110,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":50,"ContinuedLine":false},{"LineNumber":111,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":115,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":61,"ContinuedLine":false},{"LineNumber":116,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":117,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":120,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":83,"ContinuedLine":false},{"LineNumber":121,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":44,"ContinuedLine":false},{"LineNumber":122,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":55,"ContinuedLine":false},{"LineNumber":123,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":52,"ContinuedLine":false},{"LineNumber":124,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":21,"ContinuedLine":false},{"LineNumber":126,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":56,"ContinuedLine":false},{"LineNumber":128,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":129,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":30,"ContinuedLine":false},{"LineNumber":131,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":65,"ContinuedLine":false},{"LineNumber":133,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":66,"ContinuedLine":false},{"LineNumber":135,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":50,"ContinuedLine":false},{"LineNumber":136,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":140,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":64,"ContinuedLine":false},{"LineNumber":141,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":142,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":145,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":83,"ContinuedLine":false},{"LineNumber":146,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":55,"ContinuedLine":false},{"LineNumber":147,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":52,"ContinuedLine":false},{"LineNumber":148,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":44,"ContinuedLine":false},{"LineNumber":150,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":69,"ContinuedLine":false},{"LineNumber":152,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":50,"ContinuedLine":false},{"LineNumber":153,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":157,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":61,"ContinuedLine":false},{"LineNumber":158,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":159,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":162,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":83,"ContinuedLine":false},{"LineNumber":164,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":61,"ContinuedLine":false},{"LineNumber":166,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":50,"ContinuedLine":false},{"LineNumber":167,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":171,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":62,"ContinuedLine":false},{"LineNumber":172,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":173,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":176,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":83,"ContinuedLine":false},{"LineNumber":177,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":55,"ContinuedLine":false},{"LineNumber":178,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":52,"ContinuedLine":false},{"LineNumber":180,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":76,"ContinuedLine":false},{"LineNumber":182,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":50,"ContinuedLine":false},{"LineNumber":183,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":187,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":58,"ContinuedLine":false},{"LineNumber":188,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":189,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":192,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":83,"ContinuedLine":false},{"LineNumber":193,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":55,"ContinuedLine":false},{"LineNumber":194,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":52,"ContinuedLine":false},{"LineNumber":195,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":21,"ContinuedLine":false},{"LineNumber":197,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":56,"ContinuedLine":false},{"LineNumber":199,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":200,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":30,"ContinuedLine":false},{"LineNumber":202,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":65,"ContinuedLine":false},{"LineNumber":204,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":94,"ContinuedLine":false},{"LineNumber":206,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":50,"ContinuedLine":false},{"LineNumber":207,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":29,"ContinuedLine":false}]}}