// Online Job Portal - jQuery code

// 1. List of jobs (like a small database)
var jobs = [
  { title: "Web Developer", company: "TechSoft", location: "Delhi", category: "IT",
    type: "Full-time", salary: "Rs. 4 LPA",
    description: "Build and maintain company websites using HTML, CSS and JavaScript.",
    skills: ["HTML", "CSS", "JavaScript"] },
  { title: "Graphic Design Intern", company: "PixelWorks", location: "Remote", category: "Design",
    type: "Internship", salary: "Rs. 10,000 per month",
    description: "Help the design team to make posters and social media graphics.",
    skills: ["Photoshop", "Canva"] },
  { title: "Content Writer", company: "WordHub", location: "Mumbai", category: "Marketing",
    type: "Part-time", salary: "Rs. 15,000 per month",
    description: "Write blogs and articles for our website. Good English is needed.",
    skills: ["English", "Creativity"] },
  { title: "Data Entry Operator", company: "DataCare", location: "Pune", category: "Admin",
    type: "Part-time", salary: "Rs. 12,000 per month",
    description: "Enter data into Excel sheets with speed and accuracy.",
    skills: ["Typing", "MS Excel"] },
  { title: "Software Tester", company: "QualityFirst", location: "Bengaluru", category: "IT",
    type: "Full-time", salary: "Rs. 3.5 LPA",
    description: "Test software and report the bugs to the developers.",
    skills: ["Testing", "Attention to detail"] },
  { title: "Digital Marketing Executive", company: "AdVision", location: "Delhi",
    category: "Marketing", type: "Full-time", salary: "Rs. 3 LPA",
    description: "Run social media campaigns and check the results.",
    skills: ["SEO", "Social Media"] }
];

// 2. Show the jobs on the page (DOM manipulation)
function showJobs(list) {
  $("#jobList").empty();                         // remove the old cards

  if (list.length === 0) {
    $("#jobList").html('<p class="text-center">No jobs found. Try a different search.</p>');
  }

  $.each(list, function (i, job) {
    var card = '<div class="col-12 col-md-6 col-lg-4 mb-4">' +
      '<div class="card h-100"><div class="card-body">' +
      '<h5 class="job-title">' + job.title + '</h5>' +
      '<p class="mb-1"><b>' + job.company + '</b> - ' + job.location + '</p>' +
      '<span class="badge bg-secondary">' + job.type + '</span> ' +
      '<span class="badge bg-info text-dark">' + job.category + '</span>' +
      '<p class="mt-2">Salary: ' + job.salary + '</p>' +
      '<div class="job-details">' +
      '<p>' + job.description + '</p>' +
      '<p class="mb-1">Skills needed:</p>' +
      '<ul><li>' + job.skills.join('</li><li>') + '</li></ul>' +
      '</div>' +
      '<button class="btn btn-outline-primary btn-sm details-btn">View Details</button> ' +
      '<button class="btn btn-primary btn-sm apply-btn" data-title="' + job.title + '">' +
      'Apply</button>' +
      '</div></div></div>';

    $("#jobList").append(card);                  // add the new card
  });

  $("#jobCount").text("Showing " + list.length + " job(s)");
}

// 3. Search and filter the jobs
function filterJobs() {
  var text = $("#searchBox").val().toLowerCase();
  var category = $("#categoryFilter").val();
  var type = $("#typeFilter").val();
  var result = [];

  $.each(jobs, function (i, job) {
    var matchText = job.title.toLowerCase().indexOf(text) !== -1 ||
                    job.company.toLowerCase().indexOf(text) !== -1;
    var matchCategory = (category === "All") || (job.category === category);
    var matchType = (type === "All") || (job.type === type);

    if (matchText && matchCategory && matchType) {
      result.push(job);
    }
  });

  showJobs(result);
}

// 4. Run when the page is ready
$(document).ready(function () {

  // Fill the job dropdown (form) and search suggestions
  $.each(jobs, function (i, job) {
    $("#jobSelect").append($("<option></option>").text(job.title));
    $("#titles").append($("<option></option>").val(job.title));
  });

  showJobs(jobs);

  // EVENT: keyup - search while typing
  $("#searchBox").on("keyup", filterJobs);

  // EVENT: change - when a dropdown value changes
  $("#categoryFilter, #typeFilter").on("change", filterJobs);

  // EVENT: submit - Search button
  $("#filterForm").on("submit", function (event) {
    event.preventDefault();                      // stop page reload
    filterJobs();
  });

  // EVENT: click - Reset button
  $("#resetBtn").on("click", function () {
    $("#searchBox").val("");
    $("#categoryFilter").val("All");
    $("#typeFilter").val("All");
    filterJobs();
  });

  // The cards are added by jQuery, so I use the parent (#jobList) for these events.

  // EVENT: click - View Details / Hide Details
  $("#jobList").on("click", ".details-btn", function () {
    $(this).closest(".card").find(".job-details").slideToggle();
    if ($(this).text() === "View Details") {
      $(this).text("Hide Details");
    } else {
      $(this).text("View Details");
    }
  });

  // EVENT: click - Apply button (fills the job name in the form and scrolls down)
  $("#jobList").on("click", ".apply-btn", function () {
    $("#jobSelect").val($(this).data("title"));
    $("html, body").animate({ scrollTop: $("#apply").offset().top - 70 }, 600);
    $("#fullName").focus();
  });

  // EVENT: mouseenter and mouseleave - blue border on the card
  $("#jobList").on("mouseenter", ".card", function () {
    $(this).addClass("border-primary");
  }).on("mouseleave", ".card", function () {
    $(this).removeClass("border-primary");
  });

  // EVENT: keyup - count the letters in the text box
  $("#coverLetter").on("keyup", function () {
    $("#charCount").text($(this).val().length + " / 200 characters");
  });

  // EVENT: submit - application form
  $("#applyForm").on("submit", function (event) {
    event.preventDefault();
    var name = $("#fullName").val();
    var job = $("#jobSelect").val();

    var msg = $('<div class="alert alert-success"></div>');
    msg.text("Thank you, " + name + "! Your application for " + job + " is submitted.");
    $("#message").empty().append(msg).hide().fadeIn();

    this.reset();                                // clear the form
    $("#charCount").text("0 / 200 characters");
  });

});
