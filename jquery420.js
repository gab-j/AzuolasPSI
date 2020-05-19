$(document).ready(function () {
  console.log("ready!");
  $(".nav-tabs")
    .on("click", "a", function (e) {
      e.preventDefault();
      if (!$(this).hasClass("add-contact")) {
        $(this).tab("show");
      }
    })
    .on("click", "span", function () {
      var anchor = $(this).siblings("a");
      $(anchor.attr("href")).remove();
      $(this).parent().remove();
      $(".nav-tabs li").children("a").first().click();
    });

  $(".add-contact").click(function (e) {
    e.preventDefault();
    var id = $(".nav-tabs").children().length; //think about it ;)
    var tabId = "contact_" + id;
    $(this)
      .closest("li")
      .before(
        '<li><a href="#contact_' +
          id +
          '">Programų sistemos 2k. 5gr.</a> <span> x </span></li>'
      );
    $(".tab-content").append(
      '<div class="tab-pane" id="' +
        tabId +
        '">Contact Form: New Contact ' +
        id +
        "</div>"
    );
    $(".nav-tabs li:nth-child(" + id + ") a").click();
  });
});
