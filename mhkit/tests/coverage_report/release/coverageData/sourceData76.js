var sourceData76 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB-2/mhkit/river/graphics/plot_velocity_duration_curve.m","RawFileContents":["function figure=plot_velocity_duration_curve(V,F,options)","","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","%     Plots velocity vs exceedance probability as a Flow Duration Curve (FDC)","%","% Parameters","% ------------","%     V: array","%         Velocity [m/s]","%","%     F: array","%          Exceedance probability [unitless]","%","%     title: string (optional)","%          title for the plot","%          to call: plot_velocity_duration_curve(P,F,\"title\",title)","%","%     savepath: string (optional)","%          path and filename to save figure.","%          to call: plot_velocity_duration_curve(P,F,\"savepath\",savepath)","%","% Returns","% ---------","%   figure: plot of velocity vs. exceedance probability","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","","arguments","    V","    F","    options.title = \"\";","    options.savepath = \"\";","end","","temp.V=V;","","temp.F=F;","","T=struct2table(temp);","sortT=sortrows(T,'F','descend');","","","figure=plot(sortT.V,sortT.F);","grid on","xlabel('Velocity [m/s]','FontSize',20)","ylabel('Exceedance Probability','FontSize',20)","","","title(options.title)","","len = strlength(options.savepath);","if len > 1","    saveas(figure, options.savepath);","end","","hold off","",""],"CoverageDisplayDataPerLine":{"Function":{"LineNumber":1,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":57,"ContinuedLine":false},"Statement":[{"LineNumber":30,"Hits":1,"StartColumnNumbers":20,"EndColumnNumbers":22,"ContinuedLine":false},{"LineNumber":31,"Hits":0,"StartColumnNumbers":23,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":34,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":9,"ContinuedLine":false},{"LineNumber":36,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":9,"ContinuedLine":false},{"LineNumber":38,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":21,"ContinuedLine":false},{"LineNumber":39,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":42,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":43,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":8,"ContinuedLine":false},{"LineNumber":44,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":38,"ContinuedLine":false},{"LineNumber":45,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":46,"ContinuedLine":false},{"LineNumber":48,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":50,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":51,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":10,"ContinuedLine":false},{"LineNumber":52,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":37,"ContinuedLine":false},{"LineNumber":55,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":9,"ContinuedLine":false}]}}