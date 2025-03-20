(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });


    // Progress Bar
    $('.pg-bar').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Calender
    $('#calender').datetimepicker({
        inline: true,
        format: 'L'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav : false
    });


    // Chart Global Color
    Chart.defaults.color = "#6C7293";
    Chart.defaults.borderColor = "#000000";


    // Worldwide Sales Chart
    var ctx1 = $("#worldwide-sales").get(0).getContext("2d");

    // // Extracted data from Excel
    // var labels = ["Squats", "Push-ups", "Plank", "Lunges", "Shoulder Press"];
    // var correctAngles = [90, 45, 180, 90, 180];
    // var postureScores = [95, 88, 92, 85, 87];
    
    // var myChart1 = new Chart(ctx1, {
    //     type: "bar",
    //     data: {
    //         labels: labels,
    //         datasets: [
    //             {
    //                 label: "Correct Angle Range (Degrees)",
    //                 data: correctAngles,
    //                 backgroundColor: "rgba(235, 22, 22, .7)"
    //             },
    //             {
    //                 label: "Posture Accuracy Score (Out of 100)",
    //                 data: postureScores,
    //                 backgroundColor: "rgba(22, 160, 133, .7)"
    //             }
    //         ]
    //     },
    //     options: {
    //         responsive: true,
    //         scales: {
    //             y: {
    //                 beginAtZero: true,
    //                 max: 200
    //             }
    //         }
    //     }
    // });
    

    // var ctx2 = $("#salse-revenue").get(0).getContext("2d");

    // // JSON data
    // var postureData = {
    //     "posture_analysis": [
    //         {"exercise": "pull-up", "angle_data": {"elbow_angle": 85, "shoulder_angle": 120, "spine_angle": 165}},
    //         {"exercise": "chin-up", "angle_data": {"elbow_angle": 80, "shoulder_angle": 110, "spine_angle": 168}},
    //         {"exercise": "lat pulldown", "angle_data": {"elbow_angle": 90, "shoulder_angle": 105, "spine_angle": 170}},
    //         {"exercise": "bent-over row", "angle_data": {"elbow_angle": 95, "shoulder_angle": 115, "spine_angle": 160}},
    //         {"exercise": "seated row", "angle_data": {"elbow_angle": 100, "shoulder_angle": 110, "spine_angle": 175}},
    //         {"exercise": "deadlift", "angle_data": {"elbow_angle": 180, "shoulder_angle": 90, "spine_angle": 160}},
    //         {"exercise": "face pull", "angle_data": {"elbow_angle": 120, "shoulder_angle": 100, "spine_angle": 170}}
    //     ]
    // };
    
    // // Extract data for chart
    // var labels = postureData.posture_analysis.map(entry => entry.exercise);
    // var elbowAngles = postureData.posture_analysis.map(entry => entry.angle_data.elbow_angle);
    // var shoulderAngles = postureData.posture_analysis.map(entry => entry.angle_data.shoulder_angle);
    // var spineAngles = postureData.posture_analysis.map(entry => entry.angle_data.spine_angle);
    
    // // Chart.js configuration
    // var myChart2 = new Chart(ctx2, {
    //     type: "line",
    //     data: {
    //         labels: labels,
    //         datasets: [
    //             {
    //                 label: "Elbow Angle",
    //                 data: elbowAngles,
    //                 backgroundColor: "rgba(235, 22, 22, .7)",
    //                 borderColor: "rgba(235, 22, 22, 1)",
    //                 fill: false
    //             },
    //             {
    //                 label: "Shoulder Angle",
    //                 data: shoulderAngles,
    //                 backgroundColor: "rgba(22, 160, 133, .7)",
    //                 borderColor: "rgba(22, 160, 133, 1)",
    //                 fill: false
    //             },
    //             {
    //                 label: "Spine Angle",
    //                 data: spineAngles,
    //                 backgroundColor: "rgba(52, 152, 219, .7)",
    //                 borderColor: "rgba(52, 152, 219, 1)",
    //                 fill: false
    //             }
    //         ]
    //     },
    //     options: {
    //         responsive: true,
    //         scales: {
    //             y: {
    //                 beginAtZero: true,
    //                 max: 200
    //             }
    //         }
    //     }
    // });
    

    // Single Line Chart
    var ctx3 = $("#line-chart").get(0).getContext("2d");
    var myChart3 = new Chart(ctx3, {
        type: "line",
        data: {
            labels: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
            datasets: [{
                label: "Salse",
                fill: false,
                backgroundColor: "rgba(235, 22, 22, .7)",
                data: [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


    // Single Bar Chart
    var ctx4 = $("#bar-chart").get(0).getContext("2d");
    var myChart4 = new Chart(ctx4, {
        type: "bar",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


    // Pie Chart
    var ctx5 = $("#pie-chart").get(0).getContext("2d");
    var myChart5 = new Chart(ctx5, {
        type: "pie",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


    // Doughnut Chart
    var ctx6 = $("#doughnut-chart").get(0).getContext("2d");
    var myChart6 = new Chart(ctx6, {
        type: "doughnut",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });

})(jQuery);

