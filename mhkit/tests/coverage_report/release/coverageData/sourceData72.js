var sourceData72 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB-2/mhkit/river/graphics/plot_discharge_timeseries.m","RawFileContents":["function figure=plot_discharge_timeseries(Q,options)","","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","%     Plots discharge vs time","%","% Parameters","% ------------","%     Q: structure","%","%      Q.Discharge: Discharge [m/s]","%","%      Q.time: epoch time [s]","%","%     title: string (optional)","%       title for the plot","%       to call: plot_discharge_timeseries(Q,\"title\",title)","%","%     savepath: string (optional)","%         path and filename to save figure.","%         to call: plot_discharge_timeseries(Q,\"savepath\",savepath)","%","% Returns","% ---------","%     figure: Plot of discharge vs. time","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","","arguments","    Q","    options.title = \"\";","    options.savepath = \"\";","end","","figure=plot(datetime(Q.time, 'convertfrom','posixtime'),Q.Discharge);","datetick('x',1,'keeplimits');","grid on","xlabel('Date','FontSize',20)","ylabel('Discharge [m^{3}/s]','FontSize',20)","","title(options.title)","","len = strlength(options.savepath);","if len > 1","    saveas(figure, options.savepath);","end","","hold off","",""],"CoverageDisplayDataPerLine":{"Function":{"LineNumber":1,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":52,"ContinuedLine":false},"Statement":[{"LineNumber":29,"Hits":1,"StartColumnNumbers":20,"EndColumnNumbers":22,"ContinuedLine":false},{"LineNumber":30,"Hits":0,"StartColumnNumbers":23,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":33,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":69,"ContinuedLine":false},{"LineNumber":34,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":35,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":8,"ContinuedLine":false},{"LineNumber":36,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":37,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":39,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":41,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":42,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":10,"ContinuedLine":false},{"LineNumber":43,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":37,"ContinuedLine":false},{"LineNumber":46,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":9,"ContinuedLine":false}]}}