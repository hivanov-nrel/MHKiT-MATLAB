var sourceData103 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB/mhkit/tests/Dolfyn_Test_Orient.m","RawFileContents":["classdef Dolfyn_Test_Orient < matlab.unittest.TestCase","","    methods (Test)","","        function orient_testcase(testCase)","            % These tests confirm that the euler2orient and orient2euler","            % functions are consistent, and that they follow the","            % conventions defined in the DOLfYN documentation","            % (data-structure.html#heading-pitch-roll), namely:","","            %   - a \"ZYX\" rotation order. That is, these variables are","            %     computed assuming that rotation from the","            %     earth -> instrument frame happens by rotating around the","            %     z-axis first (heading), then rotating around the y-axis","            %     (pitch), then rotating around the x-axis (roll).","","            %   - heading is defined as the direction the x-axis points,","            %     positive clockwise from North (this is the opposite","            %     direction from the right-hand-rule around the Z-axis)","","            %   - pitch is positive when the x-axis pitches up (this is","            %     opposite the right-hand-rule around the Y-axis)","","            %   - roll is positive according to the right-hand-rule","            %     around the instument's x-axis","","            % IF YOU MAKE CHANGES TO THESE CONVENTIONS, BE SURE TO UPDATE","            % THE DOCUMENTATION.","","            test_omat = [[0, 1, 0];[-1, 0, 0];[0, 0, 1]];","            test_omat = reshape(test_omat,[1,1,3,3]);","            Obj.diff = Dolfyn_Test_Orient.check_hpr(...","                0, 0, 0, test_omat);","            testCase.assertLessThan(Obj.diff, 1e-10);","","            test_omat = [[1, 0, 0];[0, 1, 0];[0, 0, 1]];","            test_omat = reshape(test_omat,[1,1,3,3]);","            Obj.diff = Dolfyn_Test_Orient.check_hpr(...","                90, 0, 0, test_omat);","            testCase.assertLessThan(Obj.diff, 1e-10);","","            test_omat = [[1, 0, 0];[0, 0, 1];[0, -1, 0]];","            test_omat = reshape(test_omat,[1,1,3,3]);","            Obj.diff = Dolfyn_Test_Orient.check_hpr(...","                90, 0, 90, test_omat);","            testCase.assertLessThan(Obj.diff, 1e-10);","","            sq2 = 1/sqrt(2);","","            test_omat = [[sq2, sq2, 0];[-sq2, sq2, 0];[0, 0, 1]];","            test_omat = reshape(test_omat,[1,1,3,3]);","            Obj.diff = Dolfyn_Test_Orient.check_hpr(...","                45, 0, 0, test_omat);","            testCase.assertLessThan(Obj.diff, 1e-10);","","            test_omat = [[0, sq2, sq2];[-1, 0, 0];[0, -sq2, sq2]];","            test_omat = reshape(test_omat,[1,1,3,3]);","            Obj.diff = Dolfyn_Test_Orient.check_hpr(...","                0, 45, 0, test_omat);","            testCase.assertLessThan(Obj.diff, 1e-10);","","            test_omat = [[0, 1, 0];[-sq2, 0, sq2];[sq2, 0, sq2]];","            test_omat = reshape(test_omat,[1,1,3,3]);","            Obj.diff = Dolfyn_Test_Orient.check_hpr(...","                0, 0, 45, test_omat);","            testCase.assertLessThan(Obj.diff, 1e-10);","","            test_omat = [[sq2, 0, sq2];[-sq2, 0, sq2];[0, -1, 0]];","            test_omat = reshape(test_omat,[1,1,3,3]);","            Obj.diff = Dolfyn_Test_Orient.check_hpr(...","                90, 45, 90, test_omat);","            testCase.assertLessThan(Obj.diff, 1e-10);","        end","","        function test_pr_declination(testCase)","            % Test to confirm that pitch and roll don't change when you set","            % declination","            declin = 15.37;","","            dat = read_netcdf('../../examples/data/dolfyn/control/vector_data_imu01.nc');","            [h0, p0, r0] = orient2euler(dat);","","            dat = set_declination(dat, declin);","            [h1, p1, r1] = orient2euler(dat);","","            testCase.assertLessThan(abs(p1-p0), 1e-5,...","                'Pitch changes when setting declination');","            testCase.assertLessThan(abs(r1-r0), 1e-5,...","                'Roll changes when setting declination');","            testCase.assertLessThan(abs((h0+declin)-h1), 1e-5,...","                'Pitch changes when setting declination');","        end","","        function test_q_hpr(testCase)","            dat = read_netcdf('../../examples/data/dolfyn/control/Sig1000_IMU.nc');","            dcm = quaternion2orient(dat.quaternions);","","            diff = 0.0;","            cntrl = dat.orientmat;","            % Data","            tmp1 = isnan(cntrl.data);","            dt1 = double(cntrl.data);","            dt1(tmp1) = 0.0;","            tmp2 = isnan(dcm.data);","            dt2 = double(dcm.data);","            dt2(tmp2) = 0.0;","","            diff = diff + abs(sum(abs(dt1 - dt2),...","                    1:numel(size(dt1)))/length(dt1));","            % Dims","            for kk = 1:length(cntrl.dims)","                diff = diff + double(~strcmpi(...","                    cntrl.dims{kk}, dcm.dims{kk}));","            end","            % Coords","            cntrl_coord_names =fieldnames(cntrl.coords);","            read_coord_names = fieldnames(dcm.coords);","            for kk = 1:numel(cntrl_coord_names)","                chk_nm = cntrl_coord_names{kk};","                diff = diff + ...","                    double(~any(strcmpi(chk_nm,read_coord_names)));","            end","","            testCase.assertLessThan(diff, 5e-4,\"Disagreement b/t \" + ...","                \"quaternion-calc'd & HPR-calc'd orientmat\");","        end","","    end","","    methods (Static)","","        function diff = check_hpr(h, p, r, omatin)","            omat = euler2orient(h, p, r);","            diff = sum(omat - omatin,\"all\",\"omitnan\");","            [heading, pitch, roll] = orient2euler(omat);","            diff = diff + sum(heading - h,\"all\",\"omitnan\");","            diff = diff + sum(pitch - p,\"all\",\"omitnan\");","            diff = diff + sum(roll - r,\"all\",\"omitnan\");","        end","","    end","","end","",""],"CoverageDisplayDataPerLine":{"Function":[{"LineNumber":5,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":42,"ContinuedLine":false},{"LineNumber":75,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":46,"ContinuedLine":false},{"LineNumber":94,"Hits":1,"StartColumnNumbers":8,"EndColumnNumbers":37,"ContinuedLine":false},{"LineNumber":132,"Hits":7,"StartColumnNumbers":8,"EndColumnNumbers":50,"ContinuedLine":false}],"Statement":[{"LineNumber":30,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":57,"ContinuedLine":false},{"LineNumber":31,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":53,"ContinuedLine":false},{"LineNumber":32,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":52,"ContinuedLine":false},{"LineNumber":33,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":36,"ContinuedLine":true},{"LineNumber":34,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":53,"ContinuedLine":false},{"LineNumber":36,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":56,"ContinuedLine":false},{"LineNumber":37,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":53,"ContinuedLine":false},{"LineNumber":38,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":52,"ContinuedLine":false},{"LineNumber":39,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":37,"ContinuedLine":true},{"LineNumber":40,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":53,"ContinuedLine":false},{"LineNumber":42,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":57,"ContinuedLine":false},{"LineNumber":43,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":53,"ContinuedLine":false},{"LineNumber":44,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":52,"ContinuedLine":false},{"LineNumber":45,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":38,"ContinuedLine":true},{"LineNumber":46,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":53,"ContinuedLine":false},{"LineNumber":48,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":50,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":65,"ContinuedLine":false},{"LineNumber":51,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":53,"ContinuedLine":false},{"LineNumber":52,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":52,"ContinuedLine":false},{"LineNumber":53,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":37,"ContinuedLine":true},{"LineNumber":54,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":53,"ContinuedLine":false},{"LineNumber":56,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":66,"ContinuedLine":false},{"LineNumber":57,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":53,"ContinuedLine":false},{"LineNumber":58,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":52,"ContinuedLine":false},{"LineNumber":59,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":37,"ContinuedLine":true},{"LineNumber":60,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":53,"ContinuedLine":false},{"LineNumber":62,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":65,"ContinuedLine":false},{"LineNumber":63,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":53,"ContinuedLine":false},{"LineNumber":64,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":52,"ContinuedLine":false},{"LineNumber":65,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":37,"ContinuedLine":true},{"LineNumber":66,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":53,"ContinuedLine":false},{"LineNumber":68,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":66,"ContinuedLine":false},{"LineNumber":69,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":53,"ContinuedLine":false},{"LineNumber":70,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":52,"ContinuedLine":false},{"LineNumber":71,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":39,"ContinuedLine":true},{"LineNumber":72,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":53,"ContinuedLine":false},{"LineNumber":78,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":27,"ContinuedLine":false},{"LineNumber":80,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":89,"ContinuedLine":false},{"LineNumber":81,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":83,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":47,"ContinuedLine":false},{"LineNumber":84,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":86,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":52,"ContinuedLine":false},{"LineNumber":87,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":58,"ContinuedLine":true},{"LineNumber":88,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":52,"ContinuedLine":false},{"LineNumber":89,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":57,"ContinuedLine":true},{"LineNumber":90,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":61,"ContinuedLine":false},{"LineNumber":91,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":58,"ContinuedLine":true},{"LineNumber":95,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":83,"ContinuedLine":false},{"LineNumber":96,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":53,"ContinuedLine":false},{"LineNumber":98,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":99,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":101,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":37,"ContinuedLine":false},{"LineNumber":102,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":37,"ContinuedLine":false},{"LineNumber":103,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":104,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":35,"ContinuedLine":false},{"LineNumber":105,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":35,"ContinuedLine":false},{"LineNumber":106,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":108,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":48,"ContinuedLine":false},{"LineNumber":109,"Hits":1,"StartColumnNumbers":20,"EndColumnNumbers":53,"ContinuedLine":true},{"LineNumber":111,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":41,"ContinuedLine":false},{"LineNumber":112,"Hits":3,"StartColumnNumbers":16,"EndColumnNumbers":46,"ContinuedLine":false},{"LineNumber":113,"Hits":3,"StartColumnNumbers":20,"EndColumnNumbers":51,"ContinuedLine":true},{"LineNumber":116,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":56,"ContinuedLine":false},{"LineNumber":117,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":54,"ContinuedLine":false},{"LineNumber":118,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":47,"ContinuedLine":false},{"LineNumber":119,"Hits":3,"StartColumnNumbers":16,"EndColumnNumbers":47,"ContinuedLine":false},{"LineNumber":120,"Hits":3,"StartColumnNumbers":16,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":121,"Hits":3,"StartColumnNumbers":20,"EndColumnNumbers":67,"ContinuedLine":true},{"LineNumber":124,"Hits":1,"StartColumnNumbers":12,"EndColumnNumbers":68,"ContinuedLine":false},{"LineNumber":125,"Hits":1,"StartColumnNumbers":16,"EndColumnNumbers":60,"ContinuedLine":true},{"LineNumber":133,"Hits":7,"StartColumnNumbers":12,"EndColumnNumbers":41,"ContinuedLine":false},{"LineNumber":134,"Hits":7,"StartColumnNumbers":12,"EndColumnNumbers":54,"ContinuedLine":false},{"LineNumber":135,"Hits":7,"StartColumnNumbers":12,"EndColumnNumbers":56,"ContinuedLine":false},{"LineNumber":136,"Hits":7,"StartColumnNumbers":12,"EndColumnNumbers":59,"ContinuedLine":false},{"LineNumber":137,"Hits":7,"StartColumnNumbers":12,"EndColumnNumbers":57,"ContinuedLine":false},{"LineNumber":138,"Hits":7,"StartColumnNumbers":12,"EndColumnNumbers":56,"ContinuedLine":false}]}}