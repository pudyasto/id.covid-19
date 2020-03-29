
$(document).ready(function () {
    var column_list_provinsi = [{
        "data": "regions",
        render: function (data, type, row) {
            return (data);
        },
        "className": "text-left"
    },
    {
        "data": "positive",
        render: function (data, type, row) {
            return type === 'export' ? data : numeral(data).format('0,0');
        },
        "className": "text-right"
    },
    {
        "data": "recovered",
        render: function (data, type, row) {
            return type === 'export' ? data : numeral(data).format('0,0');
        },
        "className": "text-right"
    },
    {
        "data": "deaths",
        render: function (data, type, row) {
            return type === 'export' ? data : numeral(data).format('0,0');
        },
        "className": "text-right"
    },
    {
        "data": "per_positive",
        render: function (data, type, row) {
            return type === 'export' ? data : numeral(data).format('0,0.00');
        },
        "className": "text-right"
    },
    {
        "data": "per_recovered",
        render: function (data, type, row) {
            return type === 'export' ? data : numeral(data).format('0,0.00');
        },
        "className": "text-right"
    },
    {
        "data": "per_deaths",
        render: function (data, type, row) {
            return type === 'export' ? data : numeral(data).format('0,0.00');
        },
        "className": "text-right"
    }
    ];

    var column_def_provinsi = [{
        "orderable": true,
        "targets": 0,
    }];

    table_provinsi = $('.table-provinsi').DataTable({
        "bProcessing": false,
        "bServerSide": false,
        "searchDelay": 150,
        "lengthMenu": [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"]
        ],
        "columnDefs": column_def_provinsi,
        "columns": column_list_provinsi,
        "order": [
            [1, "desc"]
        ],
        buttons: {
            dom: {
                button: {
                    tag: 'button',
                    className: ''
                }
            },

            buttons: [{
                extend: 'excel',
                exportOptions: {
                    orthogonal: 'export'
                },
                className: 'btn btn-sm btn-outline-success'
            },
            {
                extend: 'pdf',
                orientation: 'landscape',
                exportOptions: {
                    orthogonal: 'export-pdf'
                },
                className: 'btn btn-sm btn-outline-danger'
            }
            ]
        },
        "sDom": "<'row'<'col-sm-6' B><'col-sm-6 text-right' l> r> t <'row'<'col-sm-6' i><'col-sm-6 text-right' p>> ",
        "oLanguage": {
            "sLengthMenu": "_MENU_",
            "sZeroRecords": "Maaf, data yang anda cari tidak ditemukan",
            "sProcessing": "Silahkan Tunggu",
            "sInfo": "_START_ - _END_ / _TOTAL_",
            "sInfoEmpty": "0 - 0 / 0",
            "infoFiltered": "(_MAX_)",
            "oPaginate": {
                "sPrevious": "<i class='fa fa-angle-double-left'></i>",
                "sNext": "<i class='fa fa-angle-double-right'></i>"
            }
        }
    });

    $('.table-provinsi').tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    });

    $('.table-provinsi tfoot th').each(function () {
        var title = $('.table-provinsi tfoot th').eq($(this).index()).text();
        if (title !== "Aksi" && title !== "ID") {
            $(this).html('<input type="text" class="form-datatable" style="width:100%;border-radius: 0px;" placeholder="Cari ' + title + '" />');
        } else {
            $(this).html('');
        }
    });

    var input_filter_value;
    var input_filter_timeout = null;
    table_provinsi.columns().every(function () {
        var that = this;
        $('input', this.footer()).on('keyup change', function (ev) {
            input_filter_value = this.value;
            clearTimeout(input_filter_timeout);
            input_filter_timeout = setTimeout(function () {
                table_provinsi.search(input_filter_value).draw();
            }, table_provinsi.context[0].searchDelay);
        });
    });

    getRoadMap();
});

mapboxgl.accessToken = $('meta[name=mapbookapi]').attr("content");
var map = new mapboxgl.Map({
    container: 'mapid',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [119.34347138338468, -2.461902015116017],
    zoom: 3.5
});

map.on('style.load', function (e) {
    $.ajax({
        type: "POST",
        url: base_url('home/getGlobal/'),
        data: {
            request: true,
            csrf_token: $('meta[name=csrf]').attr("content")
        },
        beforeSend: function (result) {

        },
        success: function (resp) {
            if (isJson(resp)) {
                var obj = jQuery.parseJSON(resp);
                var circles = [];
                var total_positif = 0;
                var unknown_case = 0;
                $.each(obj.features, function (i, val) {
                    if (val.attributes.Provinsi == "Indonesia") {
                        unknown_case = Number(val.attributes.Kasus_Posi);
                    }
                    total_positif += Number(val.attributes.Kasus_Posi);
                });
                $(".unknown-case").html(unknown_case);
                hitungPersen(obj.features);
                $.each(obj.features, function (i, val) {
                    if (val.attributes.Provinsi !== "Indonesia") {
                        circles.push({
                            "type": "Feature",
                            "properties": {
                                'description': dataSuspect(val.attributes),
                                "modelId": caseCircles(Number(val.attributes.Kasus_Posi)),
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [val.geometry.x, val.geometry.y]
                            },
                        });
                        initEvent(caseCircles(Number(val.attributes.Kasus_Posi)));
                    }
                });
                map.addSource('markers', {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: circles
                    },
                });
                map.addLayer({
                    id: 'circles1',
                    source: 'markers',
                    type: 'circle',
                    paint: {
                        'circle-radius': 4,
                        'circle-color': '#ee5b5b',
                        'circle-opacity': 0.9,
                        'circle-stroke-width': 0,
                    },
                    filter: ['==', 'modelId', 1],
                });
                map.addLayer({
                    id: 'circles2',
                    source: 'markers',
                    type: 'circle',
                    paint: {
                        'circle-radius': 8,
                        'circle-color': '#ee5b5b',
                        'circle-opacity': 0.9,
                        'circle-stroke-width': 0,
                    },
                    filter: ['==', 'modelId', 2],
                });
                map.addLayer({
                    id: 'circles3',
                    source: 'markers',
                    type: 'circle',
                    paint: {
                        'circle-radius': 12,
                        'circle-color': '#ee5b5b',
                        'circle-opacity': 0.9,
                        'circle-stroke-width': 0,
                    },
                    filter: ['==', 'modelId', 3],
                });
                map.addLayer({
                    id: 'circles4',
                    source: 'markers',
                    type: 'circle',
                    paint: {
                        'circle-radius': 16,
                        'circle-color': '#ee5b5b',
                        'circle-opacity': 0.9,
                        'circle-stroke-width': 0,
                    },
                    filter: ['==', 'modelId', 4],
                });
                map.addLayer({
                    id: 'circles5',
                    source: 'markers',
                    type: 'circle',
                    paint: {
                        'circle-radius': 20,
                        'circle-color': '#ee5b5b',
                        'circle-opacity': 0.9,
                        'circle-stroke-width': 0,
                    },
                    filter: ['==', 'modelId', 5],
                });

            } else {
                console.log('Kesalahan : server tidak memberikan respon yang sesuai');
            }


        },
        timeout: 30000,
        error: function (event, textStatus, errorThrown) {
            console.log('Pesan: ' + textStatus + ' , HTTP: ' + errorThrown);
        }
    });
});

function getRoadMap() {
    $.ajax({
        type: "POST",
        url: base_url('home/getRoadMap/'),
        data: {
            request: true,
            csrf_token: $('meta[name=csrf]').attr("content")
        },
        beforeSend: function (result) {

        },
        success: function (resp) {
            if (isJson(resp)) {
                var obj = jQuery.parseJSON(resp);
                var roadmap = [];
                var no = 0;
                $.each(obj.features, function (i, val) {
                    if (val.attributes.Jumlah_Kasus_Kumulatif !== null) {
                        roadmap[no] = {
                            hari_ke: 'Hari ke ' + (val.attributes.Hari_ke),
                            tanggal: time_to_month(val.attributes.Tanggal),
                            kasus_baru: Number(val.attributes.Jumlah_Kasus_Baru_per_Hari),
                            kasus_dirawat: Number(val.attributes.Jumlah_Kasus_Dirawat_per_Hari),
                            kasus_sembuh: Number(val.attributes.Jumlah_Kasus_Sembuh_per_Hari),
                            kasus_meninggal: Number(val.attributes.Jumlah_Kasus_Meninggal_per_Hari),
                        }
                        no++;
                    }

                });
                generateHistoryNewCases(roadmap);
                generateHistoryActive(roadmap);
                generateHistoryRecover(roadmap);
                generateHistoryDeath(roadmap);
                generateHistoryDeathRecover(roadmap);
            } else {
                console.log('Kesalahan : server tidak memberikan respon yang sesuai');
            }


        },
        timeout: 30000,
        error: function (event, textStatus, errorThrown) {
            console.log('Pesan: ' + textStatus + ' , HTTP: ' + errorThrown);
        }
    });
}

function initEvent(num_cases) {
    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on('click', 'circles' + num_cases, function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'circles' + num_cases, function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'circles' + num_cases, function () {
        map.getCanvas().style.cursor = '';
    });
}

function caseCircles(jml) {
    if (jml > 0 && jml <= 10) {
        return 1;
    } else if (jml > 10 && jml <= 80) {
        return 2;
    } else if (jml > 80 && jml <= 150) {
        return 3;
    } else if (jml > 150 && jml <= 230) {
        return 4;
    } else if (jml > 230 && jml > 230) {
        return 5;
    }
}

function hitungPersen(obj) {
    var total_data = $(".total-data").html();
    var regions = [];
    var per_positive = {};
    var per_death = {};
    var per_recover = {};
    var no = 0;
    $.each(obj, function (i, val) {
        if (Number(val.attributes.Kasus_Posi) > 0) {
            if (val.attributes.Provinsi == "Indonesia") {
                prov = "Wilayah Investigasi";
            } else {
                prov = val.attributes.Provinsi;
            }
            regions[no] = {
                regions: prov,

                positive: Number(val.attributes.Kasus_Posi),
                deaths: Number(val.attributes.Kasus_Meni),
                recovered: Number(val.attributes.Kasus_Semb),

                per_positive: Number(((Number(val.attributes.Kasus_Posi) / numeral(total_data).value()) * 100).toFixed(2)),
                per_deaths: Number(((Number(val.attributes.Kasus_Meni) / Number(val.attributes.Kasus_Posi)) * 100).toFixed(2)),
                per_recovered: Number(((Number(val.attributes.Kasus_Semb) / Number(val.attributes.Kasus_Posi)) * 100).toFixed(2)),
            }

            per_positive[prov] = Number(((Number(val.attributes.Kasus_Posi) / numeral(total_data).value()) * 100).toFixed(2));
            per_death[prov] = Number(((Number(val.attributes.Kasus_Meni) / Number(val.attributes.Kasus_Posi)) * 100).toFixed(2));
            per_recover[prov] = Number(((Number(val.attributes.Kasus_Semb) / Number(val.attributes.Kasus_Posi)) * 100).toFixed(2));
            no++;
        }
    });
    table_provinsi.rows.add(regions).draw();

    var sort_positive = [];
    for (var positive in per_positive) {
        sort_positive.push([positive, per_positive[positive]]);
    }

    sort_positive.sort(function (a, b) {
        return b[1] - a[1];
    });
    // var positive_desc = first(sort_positive, 10);
    // generateAvgRegion(sort_positive);

    var sort_death = [];
    for (var death in per_death) {
        sort_death.push([death, per_death[death]]);
    }

    sort_death.sort(function (a, b) {
        return b[1] - a[1];
    });
    var death_desc = first(sort_death, 10);
    generateTopDeath(death_desc);

    var sort_recover = [];
    for (var recover in per_recover) {
        sort_recover.push([recover, per_recover[recover]]);
    }

    sort_recover.sort(function (a, b) {
        return b[1] - a[1];
    });
    var recover_desc = first(sort_recover, 10);
    generateTopRecover(recover_desc);
}

function generateTopRecover(arr) {
    var PLabel = [];
    var PData = [];

    $.each(arr, function (i, val) {
        PLabel.push(val[0]);
        PData.push(val[1]);
    });
    
    var chartOpt = {
        segmentShowStroke: true,
        segmentStrokeColor: '#fff',
        segmentStrokeWidth: 1,
        percentageInnerCutout: 0,
        animationSteps: 100,
        animationEasing: 'easeOutBounce',
        animateRotate: true,
        animateScale: false,
        responsive: true,
        maintainAspectRatio: false,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
        legend: {
            display: false,
            position: 'bottom',
            fontSize: 9,
            boxWidth: 20
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    var label = data.labels[tooltipItem.index];
                    var jumlah = data.datasets[0].data[tooltipItem.index];
                    var total = 0;
                    $.each(data.datasets[0].data, function (index, value) {
                        total+=Number(value);
                    });
                    return label + " = " + numeral(jumlah).format('0,0.00') + "%";
                }
            }
        },
        title: {
            display: true,
            text: "Top 10 Kasus Sembuh per Provinsi "
        },
        chartArea: {
            backgroundColor: 'rgba(255, 255, 255, 1)'
        }
    };

    var config = {
        type: 'doughnut',
        data: {
            datasets: [{
                type: 'doughnut',
                data: PData,
                backgroundColor: window.chartNumberColors,
                fill: false,
                lineTension: 0,
                pointRadius: 2,
                label: "Jumlah Sembuh "
            }],
            labels: PLabel
        },
        options: chartOpt
    };
    var my_chart = $('#chart-top-recover').get(0).getContext('2d');
    if (typeof chart_top_recover != 'undefined') {
        chart_top_recover.destroy();
    }
    chart_top_recover = new Chart(my_chart, config);
}

function generateTopDeath(arr) {
    var PLabel = [];
    var PData = [];

    $.each(arr, function (i, val) {
        PLabel.push(val[0]);
        PData.push(val[1]);
    });
    
    var chartOpt = {
        segmentShowStroke: true,
        segmentStrokeColor: '#fff',
        segmentStrokeWidth: 1,
        percentageInnerCutout: 0,
        animationSteps: 100,
        animationEasing: 'easeOutBounce',
        animateRotate: true,
        animateScale: false,
        responsive: true,
        maintainAspectRatio: false,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
        legend: {
            display: false,
            position: 'bottom',
            fontSize: 9,
            boxWidth: 20
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    var label = data.labels[tooltipItem.index];
                    var jumlah = data.datasets[0].data[tooltipItem.index];
                    var total = 0;
                    $.each(data.datasets[0].data, function (index, value) {
                        total+=Number(value);
                    });
                    return label + " = " + numeral(jumlah).format('0,0.00') + "%";
                }
            }
        },
        title: {
            display: true,
            text: "Top 10 Kasus Meninggal per Provinsi "
        },
        chartArea: {
            backgroundColor: 'rgba(255, 255, 255, 1)'
        }
    };

    var config = {
        type: 'doughnut',
        data: {
            datasets: [{
                type: 'doughnut',
                data: PData,
                backgroundColor: window.chartNumberColors,
                fill: false,
                lineTension: 0,
                pointRadius: 2,
                label: "Jumlah Meninggal "
            }],
            labels: PLabel
        },
        options: chartOpt
    };
    var my_chart = $('#chart-top-death').get(0).getContext('2d');
    if (typeof chart_top_death != 'undefined') {
        chart_top_death.destroy();
    }
    chart_top_death = new Chart(my_chart, config);
}

function generateAvgRegion(arr) {
    var PLabel = [];
    var PData = [];

    arr.forEach(function (item) {
        PLabel.push(item[0])
        PData.push(item[1])
    });

    var chartOpt = {
        segmentShowStroke: true,
        segmentStrokeColor: '#fff',
        segmentStrokeWidth: 1,
        percentageInnerCutout: 0,
        animationSteps: 100,
        animationEasing: 'easeOutBounce',
        animateRotate: true,
        animateScale: false,
        responsive: true,
        maintainAspectRatio: false,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
        legend: {
            display: false,
            position: 'bottom',
            fontSize: 9,
            boxWidth: 20
        },
        scales: {
            xAxes: [{
                stacked: false,
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format('0,0');
                    }
                }
            }],
            yAxes: [{
                stacked: false,
            }]
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].label + " : " + numeral(tooltipItem.xLabel).format('0,0') + '%';
                },
            },
            titleFontSize: 16,
            titleFontColor: '#fff',
            bodyFontColor: '#fff',
            bodyFontSize: 14,
            displayColors: true
        },
        title: {
            display: true,
            text: 'Top 10 Persentase Jumlah Sembuh Kasus Covid-19 Per Negara '
        },
        chartArea: {
            backgroundColor: 'rgba(255, 255, 255, 1)'
        }
    };

    var config = {
        type: 'horizontalBar',
        data: {
            datasets: [{
                type: 'horizontalBar',
                data: PData,
                backgroundColor: window.chartNumberColors,
                fill: false,
                lineTension: 0.5,
                label: "Persentase Pasien Sembuh "
            }],
            labels: PLabel
        },
        options: chartOpt
    };
    var chart = $('#chart-per-wilayah').get(0).getContext('2d');
    if (typeof chart_per_wilayah != 'undefined') {
        chart_per_wilayah.destroy();
    }
    chart_per_wilayah = new Chart(chart, config);
}

function generateHistoryNewCases(arr) {
    var PLabel = [];
    var PData = [];
    var PDataAvg = [];
    var total_days = arr.length;
    var total_newcases = 0;
    $.each(arr, function (i, val) {
        total_newcases += val.kasus_baru;
    });
    var avg = (total_newcases/total_days).toFixed(0);
    $.each(arr, function (i, val) {
        PLabel.push(val.tanggal);
        PData.push(val.kasus_baru);
        PDataAvg.push(avg);
    });
    
    var chartOpt = {
        segmentShowStroke: true,
        segmentStrokeColor: '#fff',
        segmentStrokeWidth: 1,
        percentageInnerCutout: 0,
        animationSteps: 100,
        animationEasing: 'easeOutBounce',
        animateRotate: true,
        animateScale: false,
        responsive: true,
        maintainAspectRatio: false,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
        legend: {
            display: false,
            position: 'bottom',
            fontSize: 9,
            boxWidth: 20
        },
        scales: {
            xAxes: [{
                stacked: false
            }],
            yAxes: [{
                stacked: false,
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format('0,0');
                    }
                },
            }]
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].label + " : " + numeral(tooltipItem.yLabel).format('0,0');
                },
            },
            titleFontSize: 16,
            titleFontColor: '#fff',
            bodyFontColor: '#fff',
            bodyFontSize: 14,
            displayColors: true
        },
        title: {
            display: true,
            text: 'Penambahan kasus baru selama '  + total_days + ' hari',
        },
        chartArea: {
            backgroundColor: 'rgba(255, 255, 255, 1)'
        }
    };

    var config = {
        type: 'line',
        data: {
            datasets: [{
                type: 'line',
                data: PData,
                backgroundColor: '#464dee',
                borderColor: '#464dee',
                fill: false,
                lineTension: 0,
                pointRadius: 2,
                label: "Jumlah Kasus Baru "
            },{
                type: 'line',
                data: PDataAvg,
                backgroundColor: '#001737',
                borderColor: '#001737',
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                label: "Rata Rata Kasus Selama " + total_days + " Hari",
            }],
            labels: PLabel
        },
        options: chartOpt
    };
    var my_chart = $('#chart-history-cases').get(0).getContext('2d');
    if (typeof chart_history_cases != 'undefined') {
        chart_history_cases.destroy();
    }
    chart_history_cases = new Chart(my_chart, config);
}

function generateHistoryActive(arr) {
    var PLabel = [];
    var PData = [];
    var PDataAvg = [];
    var total_days = arr.length;
    var total_active = 0;
    $.each(arr, function (i, val) {
        total_active += val.kasus_dirawat;
    });
    var avg = (total_active/total_days).toFixed(0);
    $.each(arr, function (i, val) {
        PLabel.push(val.tanggal);
        PData.push(val.kasus_dirawat);
        PDataAvg.push(avg);
    });
    
    var chartOpt = {
        segmentShowStroke: true,
        segmentStrokeColor: '#fff',
        segmentStrokeWidth: 1,
        percentageInnerCutout: 0,
        animationSteps: 100,
        animationEasing: 'easeOutBounce',
        animateRotate: true,
        animateScale: false,
        responsive: true,
        maintainAspectRatio: false,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
        legend: {
            display: false,
            position: 'bottom',
            fontSize: 9,
            boxWidth: 20
        },
        scales: {
            xAxes: [{
                stacked: false
            }],
            yAxes: [{
                stacked: false,
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format('0,0');
                    }
                },
            }]
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].label + " : " + numeral(tooltipItem.yLabel).format('0,0');
                },
            },
            titleFontSize: 16,
            titleFontColor: '#fff',
            bodyFontColor: '#fff',
            bodyFontSize: 14,
            displayColors: true
        },
        title: {
            display: true,
            text: 'Penambahan pasien dirawat selama '  + total_days + ' hari',
        },
        chartArea: {
            backgroundColor: 'rgba(255, 255, 255, 1)'
        }
    };

    var config = {
        type: 'line',
        data: {
            datasets: [{
                type: 'line',
                data: PData,
                backgroundColor: '#f1ca31',
                borderColor: '#f1ca31',
                fill: false,
                lineTension: 0,
                pointRadius: 2,
                label: "Jumlah Perawatan "
            },{
                type: 'line',
                data: PDataAvg,
                backgroundColor: '#001737',
                borderColor: '#001737',
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                label: "Rata Rata Kasus Selama " + total_days + " Hari",
            }],
            labels: PLabel
        },
        options: chartOpt
    };
    var my_chart = $('#chart-history-active').get(0).getContext('2d');
    if (typeof chart_history_active != 'undefined') {
        chart_history_active.destroy();
    }
    chart_history_active = new Chart(my_chart, config);
}

function generateHistoryRecover(arr) {
    var PLabel = [];
    var PData = [];
    var PDataAvg = [];
    var total_days = arr.length;
    var total_recover = 0;
    $.each(arr, function (i, val) {
        total_recover += val.kasus_sembuh;
    });
    var avg = (total_recover/total_days).toFixed(0);
    $(".avg-value-recover").html(numeral(avg).format('0,0') + ' Orang/Hari');
    $(".avg-label-recover").html('Rata-Rata Pasien Sembuh<br>Selama ' + total_days + ' Hari');
    $.each(arr, function (i, val) {
        PLabel.push(val.tanggal);
        PData.push(val.kasus_sembuh);
        PDataAvg.push(avg);
    });
    
    var chartOpt = {
        segmentShowStroke: true,
        segmentStrokeColor: '#fff',
        segmentStrokeWidth: 1,
        percentageInnerCutout: 0,
        animationSteps: 100,
        animationEasing: 'easeOutBounce',
        animateRotate: true,
        animateScale: false,
        responsive: true,
        maintainAspectRatio: false,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
        legend: {
            display: false,
            position: 'bottom',
            fontSize: 9,
            boxWidth: 20
        },
        scales: {
            xAxes: [{
                stacked: false
            }],
            yAxes: [{
                stacked: false,
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format('0,0');
                    }
                },
            }]
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].label + " : " + numeral(tooltipItem.yLabel).format('0,0');
                },
            },
            titleFontSize: 16,
            titleFontColor: '#fff',
            bodyFontColor: '#fff',
            bodyFontSize: 14,
            displayColors: true
        },
        title: {
            display: true,
            text: 'Penambahan pasien sembuh selama '  + total_days + ' hari',
        },
        chartArea: {
            backgroundColor: 'rgba(255, 255, 255, 1)'
        }
    };

    var config = {
        type: 'line',
        data: {
            datasets: [{
                type: 'line',
                data: PData,
                backgroundColor: '#4caf50',
                borderColor: '#4caf50',
                fill: false,
                lineTension: 0,
                pointRadius: 2,
                label: "Jumlah Sembuh "
            },{
                type: 'line',
                data: PDataAvg,
                backgroundColor: '#001737',
                borderColor: '#001737',
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                label: "Rata Rata Kasus Selama " + total_days + " Hari",
            }],
            labels: PLabel
        },
        options: chartOpt
    };
    var my_chart = $('#chart-history-recover').get(0).getContext('2d');
    if (typeof chart_history_recover != 'undefined') {
        chart_history_recover.destroy();
    }
    chart_history_recover = new Chart(my_chart, config);
}

function generateHistoryDeath(arr) {
    var PLabel = [];
    var PData = [];
    var PDataAvg = [];
    var total_days = arr.length;
    var total_death = 0;
    $.each(arr, function (i, val) {
        total_death += val.kasus_meninggal;
    });
    var avg = (total_death/total_days).toFixed(0);
    $(".avg-value-death").html(numeral(avg).format('0,0') + ' Orang/Hari');
    $(".avg-label-death").html('Rata-Rata Pasien Meninggal<br>Selama ' + total_days + ' Hari');
    $.each(arr, function (i, val) {
        PLabel.push(val.tanggal);
        PData.push(val.kasus_meninggal);
        PDataAvg.push(avg);
    });
    
    var chartOpt = {
        segmentShowStroke: true,
        segmentStrokeColor: '#fff',
        segmentStrokeWidth: 1,
        percentageInnerCutout: 0,
        animationSteps: 100,
        animationEasing: 'easeOutBounce',
        animateRotate: true,
        animateScale: false,
        responsive: true,
        maintainAspectRatio: false,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
        legend: {
            display: false,
            position: 'bottom',
            fontSize: 9,
            boxWidth: 20
        },
        scales: {
            xAxes: [{
                stacked: false
            }],
            yAxes: [{
                stacked: false,
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format('0,0');
                    }
                },
            }]
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].label + " : " + numeral(tooltipItem.yLabel).format('0,0');
                },
            },
            titleFontSize: 16,
            titleFontColor: '#fff',
            bodyFontColor: '#fff',
            bodyFontSize: 14,
            displayColors: true
        },
        title: {
            display: true,
            text: 'Penambahan pasien meninggal selama '  + total_days + ' hari',
        },
        chartArea: {
            backgroundColor: 'rgba(255, 255, 255, 1)'
        }
    };

    var config = {
        type: 'line',
        data: {
            datasets: [{
                type: 'line',
                data: PData,
                backgroundColor: '#ee5b5b',
                borderColor: '#ee5b5b',
                fill: false,
                lineTension: 0,
                pointRadius: 2,
                label: "Jumlah Sembuh "
            },{
                type: 'line',
                data: PDataAvg,
                backgroundColor: '#001737',
                borderColor: '#001737',
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                label: "Rata Rata Kasus Selama " + total_days + " Hari",
            }],
            labels: PLabel
        },
        options: chartOpt
    };
    var my_chart = $('#chart-history-death').get(0).getContext('2d');
    if (typeof chart_history_death != 'undefined') {
        chart_history_death.destroy();
    }
    chart_history_death = new Chart(my_chart, config);
}

function generateHistoryDeathRecover(arr) {
    var PLabel = [];
    var PDataRecover = [];
    var PDataDeath = [];
    var total_days = arr.length;
    
    $.each(arr, function (i, val) {
        PLabel.push(val.tanggal);
        PDataRecover.push(val.kasus_sembuh);
        PDataDeath.push(val.kasus_meninggal);
    });
    
    var chartOpt = {
        segmentShowStroke: true,
        segmentStrokeColor: '#fff',
        segmentStrokeWidth: 1,
        percentageInnerCutout: 0,
        animationSteps: 100,
        animationEasing: 'easeOutBounce',
        animateRotate: true,
        animateScale: false,
        responsive: true,
        maintainAspectRatio: false,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
        legend: {
            display: true,
            position: 'bottom',
            fontSize: 9,
            boxWidth: 20
        },
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format('0,0');
                    }
                },
            }]
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].label + " : " + numeral(tooltipItem.yLabel).format('0,0');
                },
            },
            titleFontSize: 16,
            titleFontColor: '#fff',
            bodyFontColor: '#fff',
            bodyFontSize: 14,
            displayColors: true
        },
        title: {
            display: true,
            text: 'Perbandingan pasien sembuh dan meninggal selama '  + total_days + ' hari',
        },
        chartArea: {
            backgroundColor: 'rgba(255, 255, 255, 1)'
        }
    };

    var config = {
        type: 'bar',
        data: {
            datasets: [{
                type: 'bar',
                data: PDataRecover,
                backgroundColor: '#4caf50',
                borderColor: '#4caf50',
                fill: false,
                lineTension: 0,
                pointRadius: 2,
                label: "Jumlah Sembuh "
            },{
                type: 'bar',
                data: PDataDeath,
                backgroundColor: '#ee5b5b',
                borderColor: '#ee5b5b',
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                label: "Jumlah Meninggal "
            }],
            labels: PLabel
        },
        options: chartOpt
    };
    var my_chart = $('#chart-death-recover').get(0).getContext('2d');
    if (typeof chart_death_recover != 'undefined') {
        chart_death_recover.destroy();
    }
    chart_death_recover = new Chart(my_chart, config);
}

function dataSuspect(attr) {
    return '<b>' + attr.Provinsi + '</b>' +
        '<br>' +
        '<table class="table table-sm">' +
        '<tr>' +
        '<td>' +
        'Positif' +
        '</td>' +
        '<td>' +
        attr.Kasus_Posi +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' +
        'Sembuh' +
        '</td>' +
        '<td>' +
        attr.Kasus_Semb +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' +
        'Meninggal' +
        '</td>' +
        '<td>' +
        attr.Kasus_Meni +
        '</td>' +
        '</tr>' +
        '</table>';
}