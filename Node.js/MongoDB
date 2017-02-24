router.get('/findPerformanceReport', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    try {
        var st = new Date().valueOf(),
        find_nas_type,
        find_nas_limit,
        find_nas_start_date,
        find_nas_end_date,
        find_nas_by_job_ids,
        performance_chart_os_type_items = setting.performance_chart_os_type_items || [],
        performance_chart_test_items = setting.performance_chart_test_items || [],
        groupBy = function(array, f) {
            var groups = {};
            array.forEach(function(o) {
                var group = JSON.stringify(f(o));
                groups[group] = groups[group] || [];
                groups[group].push(o);
            });
            return Object.keys(groups).map(function(group) {
                return groups[group];
            });
        };
        
        console.log('performance_chart_os_type_items-> ' + performance_chart_os_type_items.length);
        console.log('performance_chart_test_items-> ' + performance_chart_test_items.length);
        
        /* https://docs.mongodb.com/master/reference/operator/aggregation/match/
         * https://docs.mongodb.com/master/reference/operator/aggregation/lookup/#pipe._S_lookup
         * https://docs.mongodb.com/master/reference/operator/aggregation/group/
         */
        db.collection('csv').aggregate([{

            $match: {
                    nas: 'NAS1'
                }
            },
            {
                $lookup:{
                    from: "csv_data",
                    localField: "_id",
                    foreignField: "jobId",
                    as: "results"
                }
            },
            {
                $sort: {
                    results: -1
                }
            }
                

        ]).toArray(function (err, results) {
               
            // Step 1 - Group by results jobId
            var group_by_job_id_data = groupBy(results, function (item) {
                return [item.jobId];
            });
            
            // Step 2 - Build result array object.
            var result = [];
            
            
            // Step 3 - Filter data.
            var filter_data = group_by_job_id_data.filter(function (jobs) {
                if (jobs.length == performance_chart_os_type_items.length) {
                    
                    // Checked test item >= 12
                    var checked_item = jobs.map(function (job) {
                        return job.results.length >= 12;
                    })
                    
                    /* console.log('checked_item-> ');
                    console.log(checked_item);
                    console.log(checked_item.indexOf(false)); */
                    if (checked_item.indexOf(false) >= 0) {
                        return false;
                    }
                    
                    return true;
                }
            });
            
            // Step 5 - Fixed null data.
            filter_data.forEach(function (jobs) {
                jobs.forEach(function (job) {
                    
                    if (job.order == null) {
                        var order = (performance_chart_os_type_items.indexOf(job.env.toUpperCase()) + 1);
                        job.order = order;
                        job.results.forEach(function (result) {
                            result.order = order;
                        });

                    }
                    
                    if (job.results.length != performance_chart_test_items.length) {
                        var compare_result = job.results.map(function (d) {
                            return d.item_name.toUpperCase();
                        });
                        performance_chart_test_items.forEach(function (item) {
                            if (compare_result.indexOf( item.toUpperCase() ) < 0) {
                                var dummy_number = (performance_chart_test_items.indexOf(item) + 1) * 30;
                                job.results.push({
                                    "_id": "dummy_id",
                                    "jobId": "dummy_jobId",
                                    "item_name": item,
                                    "test_size": 0,
                                    "iops": 0,
                                    "throughput": 0,
                                    "line": dummy_number,
                                    "order": dummy_number
                                });
                            }
                        });
                    }
                    
                });
                
            });
            
            // Step 6 - Sort data.
            
            var sort_results_data = filter_data.map(function (arr) {
                return arr.map(function (d) {
                    d.results = d.results.sort(
                        function (a, b) { 
                            return a.line-b.line; 
                        }
                    )
                    
                    return d;
                })
            });
            
            // Step 7 - Sort jobs data by order.
            var r = sort_results_data.sort(function (a, b) {
                return a.order-b.order;
            });
            
            console.log('Step cost time-> ' + (new Date().valueOf() - st));
            res.send(r);
        });

    } catch (err) {
        logger.error(err);

        if (err) {
            res.send('API findPerformanceReport - Exception.');
        }
    }

});
