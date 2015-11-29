(function() {
  var buttonsFor, group1, group2, group3, group4, group5, testbed;

  $("#logo-footer1").css("width", 120).css("margin", "20px auto").datapressLogo().hover((function() {
    return ($(this)).datapressLogo("hoverOn");
  }), (function() {
    return ($(this)).datapressLogo("hoverOff");
  }));

  $("#logo-footer2").css("width", 120).css("margin", "20px auto").datapressLogo({
    fg: "#8cc83c"
  }).hover((function() {
    return ($(this)).datapressLogo("hoverOn");
  }), (function() {
    return ($(this)).datapressLogo("hoverOff");
  }));

  $("#logo-footer3").css("width", 120).css("margin", "20px auto").datapressLogo({
    fg: "#005ea5"
  }).hover((function() {
    return ($(this)).datapressLogo("hoverOn");
  }), (function() {
    return ($(this)).datapressLogo("hoverOff");
  }));

  $("#logo-footer4").css("width", 120).css("margin", "20px auto").datapressLogo({
    fg: "#644a8d"
  }).hover((function() {
    return ($(this)).datapressLogo("hoverOn");
  }), (function() {
    return ($(this)).datapressLogo("hoverOff");
  }));

  $("#logo-loading1").css("width", 100).css("margin", "20px auto").datapressLogo({
    initial: "center"
  }).datapressLogo("spinModeOn");

  $("#logo-loading2").css("width", 100).css("margin", "20px auto").datapressLogo({
    initial: "center",
    fg: "#ccc"
  }).datapressLogo("spinModeOn");

  $("#logo-loading3").css("width", 200).css("margin", "20px auto").datapressLogo({
    initial: "center"
  }).datapressLogo("spinModeOn");

  $("#logo-loading4").css("width", 50).css("margin", "20px auto").datapressLogo({
    initial: "center",
    fg: "#ccc"
  }).datapressLogo("spinModeOn");

  buttonsFor = function(x) {
    var out, tmp;
    tmp = x.closest(".panel").find(".panel-heading h4");
    out = tmp.find(".buttons");
    if (!out.length) {
      out = $('<div class="buttons pull-right"/>').prependTo(tmp);
    }
    return out;
  };

  $("#logo-eyecatching1").css("width", 150).css("margin", "20px auto").datapressLogo({
    initial: "center"
  }).datapressLogo("intro1");

  $('<button class="btn btn-sm btn-primary"><i class="icon-refresh"></i> Again!</button>').on("click", function() {
    return $("#logo-eyecatching1").datapressLogo("intro1");
  }).appendTo(buttonsFor($("#logo-eyecatching1")));

  $("#logo-eyecatching2").css("width", 150).css("margin", "20px auto").datapressLogo({
    initial: "center"
  }).datapressLogo("intro2");

  $('<button class="btn btn-sm btn-primary"><i class="icon-refresh"></i> Again!</button>').on("click", function() {
    return $("#logo-eyecatching2").datapressLogo("intro2");
  }).appendTo(buttonsFor($("#logo-eyecatching2")));

  testbed = $("#testbed").css("width", 500).css("margin", "20px auto").datapressLogo();

  group1 = $('<div class="btn-group">').css("margin", 10).appendTo(buttonsFor($("#testbed")));

  group2 = $('<div class="btn-group">').css("margin", 10).appendTo(buttonsFor($("#testbed")));

  group3 = $('<div class="btn-group">').css("margin", 10).appendTo(buttonsFor($("#testbed")));

  group4 = $('<div class="btn-group">').css("margin", 10).appendTo(buttonsFor($("#testbed")));

  group5 = $('<div class="btn-group">').css("margin", 10).appendTo(buttonsFor($("#testbed")));

  $('<button class="btn btn-sm btn-primary">jumpToCenter</button>').appendTo(group1).on('click', function() {
    return testbed.datapressLogo("jumpToCenter");
  });

  $('<button class="btn btn-sm btn-primary">jumpToLogo</button>').appendTo(group1).on('click', function() {
    return testbed.datapressLogo("jumpToLogo");
  });

  $('<button class="btn btn-sm btn-info">doSpinner</button>').appendTo(group2).on('click', function() {
    return testbed.datapressLogo("doSpinner");
  });

  $('<button class="btn btn-sm btn-info">redRipple</button>').appendTo(group2).on('click', function() {
    return testbed.datapressLogo("redRipple");
  });

  $('<button class="btn btn-sm btn-info">flatWhite</button>').appendTo(group2).on('click', function() {
    return testbed.datapressLogo("flatWhite");
  });

  $('<button class="btn btn-sm btn-warning">intro1</button>').appendTo(group3).on('click', function() {
    return testbed.datapressLogo("intro1");
  });

  $('<button class="btn btn-sm btn-warning">intro2</button>').appendTo(group3).on('click', function() {
    return testbed.datapressLogo("intro2");
  });

  $('<button class="btn btn-sm btn-success">hoverOn</button>').appendTo(group4).on('click', function() {
    return testbed.datapressLogo("hoverOn");
  });

  $('<button class="btn btn-sm btn-danger">hoverOff</button>').appendTo(group4).on('click', function() {
    return testbed.datapressLogo("hoverOff");
  });

  $('<button class="btn btn-sm btn-success">spinModeOn</button>').appendTo(group5).on('click', function() {
    return testbed.datapressLogo("spinModeOn");
  });

  $('<button class="btn btn-sm btn-danger">spinModeOff</button>').appendTo(group5).on('click', function() {
    return testbed.datapressLogo("spinModeOff");
  });

}).call(this);
