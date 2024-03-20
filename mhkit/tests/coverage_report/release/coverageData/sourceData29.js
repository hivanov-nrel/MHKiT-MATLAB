var sourceData29 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB/mhkit/dolfyn/rotate/tensorproduct_initialize.m","RawFileContents":["function [A_permute,B_permute,R_permute,A_reshape,B_reshape,R_reshape]...","    = tensorproduct_initialize(ind_A,ind_B,ind_R,sizeA,sizeB)","%TENSORPRODUCT_INITIALIZE","% Part of the tensorproduct utility","% Copyright 2021 - by David Codony, PhD (dcodony@cimne.upc.edu)","% This software is distributed without any warranty.","% Permission is granted for anyone to copy, use, or modify this","% software for any uncommercial purposes, provided this copyright","% notice is retained, and note is made of any changes that have","% been made.","%% Assert empty inputs","assert(not(prod(sizeA)==0 || prod(sizeB)==0),'Empty inputs are not admitted.');","%% Parameters","SingletonBuffer = 10; % Trailing singleton dimensions, as default in Matlab","% Initialization only, does not affect performance","%% Fixing indices","% Arrays must have at least 2 dimensions according to Matlab standards","Count   = 96; % char(97) = 'a';","ind_All = fastUnique([ind_A ind_B ind_R]);","while numel(ind_A)<2","    Count = Count + 1;                   % Update char","    if not(any(char(Count)==ind_All))","        ind_All = [ind_All,char(Count)]; % Use this char","        ind_A   = [ind_A  ,char(Count)];","    end","end","while numel(ind_B)<2","    Count = Count + 1;                   % Update char","    if not(any(char(Count)==ind_All))","        ind_All = [ind_All,char(Count)]; % Use this char","        ind_B   = [ind_B  ,char(Count)];","    end","end","while numel(ind_R)<2","    Count = Count + 1;                   % Update char","    if not(any(char(Count)==ind_All))","        ind_All = [ind_All,char(Count)]; % Use this char","        ind_R   = [ind_R  ,char(Count)];","    end","end","sizeA = [sizeA,ones(1,SingletonBuffer)]; % Singleton dimensions added","sizeB = [sizeB,ones(1,SingletonBuffer)]; % Singleton dimensions added","A_inn = zeros(1,0); A_out = zeros(1,0); A_pag = zeros(1,0); A_sin = zeros(1,0);","B_inn = zeros(1,0); B_out = zeros(1,0); B_pag = zeros(1,0); B_sin = zeros(1,0);","R_outA= zeros(1,0); R_outB= zeros(1,0); R_pag = zeros(1,0); R_sin = zeros(1,0);","%% Classification of indices","for iComp = 1:numel(ind_All)","    LOC_A = find(ind_All(iComp)==ind_A);","    LOC_B = find(ind_All(iComp)==ind_B);","    LOC_R = find(ind_All(iComp)==ind_R);","    if LOC_A, assert(numel(LOC_A)<2,'Self-contraction not yet supported');","        if LOC_B, assert(numel(LOC_B)<2,'Self-contraction not yet supported');","            if LOC_R, assert(numel(LOC_R)<2,'Output cannot have repeated indices'); % Page","                A_pag = [A_pag, LOC_A];","                B_pag = [B_pag, LOC_B];","                R_pag = [R_pag, LOC_R];","            else                 % Inner","                A_inn = [A_inn, LOC_A];","                B_inn = [B_inn, LOC_B];","            end","        else","            if LOC_R, assert(numel(LOC_R)<2,'Output cannot have repeated indices'); % Outer","                A_out = [A_out, LOC_A];","                R_outA= [R_outA,LOC_R];","            else                 % Singleton","                A_sin = [A_sin, LOC_A];","            end","        end","    else","        if LOC_B, assert(numel(LOC_B)<2,'Self-contraction not yet supported');","            if LOC_R, assert(numel(LOC_R)<2,'Output cannot have repeated indices'); % Outer","                B_out = [B_out, LOC_B];","                R_outB= [R_outB, LOC_R];","            else                 % Singleton","                B_sin = [B_sin, LOC_B];","            end","        else                     % Singleton","            R_sin = [R_sin,LOC_R];","        end","    end","end","%% Assert dimensions","assert(all( sizeA(A_inn)==sizeB(B_inn)    ),'Inner product dimension mismatch.'     );","assert(all( sizeA(A_pag)==sizeB(B_pag)    ),'Page dimension mismatch.'              );","assert(all([sizeA(A_sin), sizeB(B_sin)]==1),'Ignored dimensions must be singletons.');","%% Rearrangement of input","A_permute = [ A_out,    A_inn,  A_pag, A_sin ];","B_permute = [ B_inn,    B_out,  B_pag, B_sin ];","R_permute = [ R_outA,   R_outB, R_pag, R_sin ];","R_permute(R_permute) = 1:numel(R_permute); % Inverse order","A_reshape = [prod(sizeA(A_out)),prod(sizeA(A_inn)),prod(sizeA(A_pag))                  ];","B_reshape = [prod(sizeB(B_inn)),prod(sizeB(B_out)),prod(sizeB(B_pag))                  ];","R_reshape = [     sizeA(A_out) ,     sizeB(B_out) ,     sizeB(B_pag) ,ones(size(R_sin))];","","end","function c = fastUnique(a)","a = sort(a);","groupsSortA = [ true, a(1:end-1) ~= a(2:end) ];","c = a(groupsSortA);","end"],"CoverageDisplayDataPerLine":{"Function":[{"LineNumber":1,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":73,"ContinuedLine":false},{"LineNumber":2,"Hits":111,"StartColumnNumbers":4,"EndColumnNumbers":61,"ContinuedLine":true},{"LineNumber":96,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":26,"ContinuedLine":false}],"Statement":[{"LineNumber":12,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":79,"ContinuedLine":false},{"LineNumber":14,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":21,"ContinuedLine":false},{"LineNumber":18,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":13,"ContinuedLine":false},{"LineNumber":19,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":42,"ContinuedLine":false},{"LineNumber":20,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":21,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":22,"ContinuedLine":false},{"LineNumber":22,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":37,"ContinuedLine":false},{"LineNumber":23,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":40,"ContinuedLine":false},{"LineNumber":24,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":40,"ContinuedLine":false},{"LineNumber":27,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":28,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":22,"ContinuedLine":false},{"LineNumber":29,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":37,"ContinuedLine":false},{"LineNumber":30,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":40,"ContinuedLine":false},{"LineNumber":31,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":40,"ContinuedLine":false},{"LineNumber":34,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":35,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":22,"ContinuedLine":false},{"LineNumber":36,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":37,"ContinuedLine":false},{"LineNumber":37,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":40,"ContinuedLine":false},{"LineNumber":38,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":40,"ContinuedLine":false},{"LineNumber":41,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":40,"ContinuedLine":false},{"LineNumber":42,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":40,"ContinuedLine":false},{"LineNumber":43,"Hits":[111,111,111,111],"StartColumnNumbers":[0,20,40,60],"EndColumnNumbers":[19,39,59,79],"ContinuedLine":false},{"LineNumber":44,"Hits":[111,111,111,111],"StartColumnNumbers":[0,20,40,60],"EndColumnNumbers":[19,39,59,79],"ContinuedLine":false},{"LineNumber":45,"Hits":[111,111,111,111],"StartColumnNumbers":[0,20,40,60],"EndColumnNumbers":[19,39,59,79],"ContinuedLine":false},{"LineNumber":47,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":48,"Hits":472,"StartColumnNumbers":4,"EndColumnNumbers":40,"ContinuedLine":false},{"LineNumber":49,"Hits":472,"StartColumnNumbers":4,"EndColumnNumbers":40,"ContinuedLine":false},{"LineNumber":50,"Hits":472,"StartColumnNumbers":4,"EndColumnNumbers":40,"ContinuedLine":false},{"LineNumber":51,"Hits":[472,333],"StartColumnNumbers":[4,14],"EndColumnNumbers":[12,74],"ContinuedLine":false},{"LineNumber":52,"Hits":[333,202],"StartColumnNumbers":[8,18],"EndColumnNumbers":[16,78],"ContinuedLine":false},{"LineNumber":53,"Hits":[202,91],"StartColumnNumbers":[12,22],"EndColumnNumbers":[20,83],"ContinuedLine":false},{"LineNumber":54,"Hits":91,"StartColumnNumbers":16,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":55,"Hits":91,"StartColumnNumbers":16,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":56,"Hits":91,"StartColumnNumbers":16,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":58,"Hits":111,"StartColumnNumbers":16,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":59,"Hits":111,"StartColumnNumbers":16,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":62,"Hits":[131,129],"StartColumnNumbers":[12,22],"EndColumnNumbers":[20,83],"ContinuedLine":false},{"LineNumber":63,"Hits":129,"StartColumnNumbers":16,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":64,"Hits":129,"StartColumnNumbers":16,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":66,"Hits":2,"StartColumnNumbers":16,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":70,"Hits":[139,139],"StartColumnNumbers":[8,18],"EndColumnNumbers":[16,78],"ContinuedLine":false},{"LineNumber":71,"Hits":[139,139],"StartColumnNumbers":[12,22],"EndColumnNumbers":[20,83],"ContinuedLine":false},{"LineNumber":72,"Hits":139,"StartColumnNumbers":16,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":73,"Hits":139,"StartColumnNumbers":16,"EndColumnNumbers":40,"ContinuedLine":false},{"LineNumber":75,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":78,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":83,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":86,"ContinuedLine":false},{"LineNumber":84,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":86,"ContinuedLine":false},{"LineNumber":85,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":86,"ContinuedLine":false},{"LineNumber":87,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":47,"ContinuedLine":false},{"LineNumber":88,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":47,"ContinuedLine":false},{"LineNumber":89,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":47,"ContinuedLine":false},{"LineNumber":90,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":42,"ContinuedLine":false},{"LineNumber":91,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":89,"ContinuedLine":false},{"LineNumber":92,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":89,"ContinuedLine":false},{"LineNumber":93,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":89,"ContinuedLine":false},{"LineNumber":97,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":12,"ContinuedLine":false},{"LineNumber":98,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":47,"ContinuedLine":false},{"LineNumber":99,"Hits":111,"StartColumnNumbers":0,"EndColumnNumbers":19,"ContinuedLine":false}]}}