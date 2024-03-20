var sourceData44 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB/mhkit/loads/graphics/plot_bin_statistics.m","RawFileContents":["function figure=plot_bin_statistics(bin_centers,bin_mean,bin_max,bin_min,bin_mean_std,bin_max_std,bin_min_std,options)","","%%%%%%%%%%%%%%%%%%%%","%     Plot showing standard binned statistics of single variable","%","% Parameters","% ------------","%     bin_centers: vector","%         x-axis bin center values","%","%     bin_mean: vector","%         Binned mean statistical values of variable","%","%     bin_max: vector","%         Binned max statistical values of variable","%","%     bin_min: vector","%         Binned min statistical values of variable","%","%     bin_mean_std: vector","%         Standard deviations of mean binned statistics","%","%     bin_max_std: vector","%         Standard deviations of max binned statistics","%","%     bin_min_std: vector","%         Standard deviations of min binned statistics","%","%     xlabel: string (optional)","%         x-axis lable for the plot","%         to call: binplotter(bcenters,bmean,bmax,bmin,bstdmean,bstdmax,bstdmin,\"xlable\",xlable)","%","%     ylabel: string (optional)","%         y-axis lable for the plot","%         to call: binplotter(bcenters,bmean,bmax,bmin,bstdmean,bstdmax,bstdmin,\"ylable\",ylable)","%","%     title: string (optional)","%         title for the plot","%         to call: binplotter(bcenters,bmean,bmax,bmin,bstdmean,bstdmax,bstdmin,\"title\",title)","%","%     savepath: string (optional)","%         path and filename to save figure.","%         to call: binplotter(bcenters,bmean,bmax,bmin,bstdmean,bstdmax,bstdmin,\"savepath\",savepath)","%","% Returns","% ---------","%     figure: figure","%","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","","arguments","    bin_centers","    bin_mean","    bin_max","    bin_min","    bin_mean_std","    bin_max_std","    bin_min_std","    options.xlabel = \"\";","    options.ylabel = \"\";","    options.title = \"\";","    options.savepath = \"\";","end","I = ~isnan(bin_max);","figure = errorbar(bin_centers,bin_mean,bin_mean_std);","hold on","grid on","errorbar(bin_centers(I),bin_max(I),bin_max_std(I));","errorbar(bin_centers(I),bin_min(I),bin_min_std(I));","legend({'mean','max','min'},'Location','northeast')","","","title(options.title)","xlabel(options.xlabel)","ylabel(options.ylabel)","","if strlength(options.savepath) > 1","    saveas(figure, options.savepath)","end","hold off","",""],"CoverageDisplayDataPerLine":{"Function":{"LineNumber":1,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":118,"ContinuedLine":false},"Statement":[{"LineNumber":59,"Hits":0,"StartColumnNumbers":21,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":60,"Hits":0,"StartColumnNumbers":21,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":61,"Hits":0,"StartColumnNumbers":20,"EndColumnNumbers":22,"ContinuedLine":false},{"LineNumber":62,"Hits":0,"StartColumnNumbers":23,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":64,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":65,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":53,"ContinuedLine":false},{"LineNumber":66,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":8,"ContinuedLine":false},{"LineNumber":67,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":8,"ContinuedLine":false},{"LineNumber":68,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":51,"ContinuedLine":false},{"LineNumber":69,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":51,"ContinuedLine":false},{"LineNumber":70,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":51,"ContinuedLine":false},{"LineNumber":73,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":74,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":22,"ContinuedLine":false},{"LineNumber":75,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":22,"ContinuedLine":false},{"LineNumber":77,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":78,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":80,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":9,"ContinuedLine":false}]}}