// tabs.js

var settings;

$.fn.myTabs = function( options ) {

  var defaults = {
    tabs: "ul.tabs li",
    heading: ".tab_heading",
    tab_pager: "nav.tab-pager ul li",
    tab_content : ".tab_content"
  };

  settings = $.extend(defaults, options);
  tabHandler( { 'activeTab': '#tab0' });
  $(settings.tabs).on( "click", tabHandler );
  $(settings.heading).on( "click", tabHandler );
  $(settings.tab_pager).on( "click", tabHandler );

  function scrollToAnchor(activeTab){
    var activeTabId = activeTab.replace(/#/, '');
    var anchor = $("a[name='"+ activeTabId +"']");
    $('html,body').animate({scrollTop: anchor.offset().top},'slow');
  }

  function tabHandler( event ) {

    var activeTab;

    if (event.activeTab && event.activeTab.match(/^#tab/)) {
      activeTab = event.activeTab;
    } else {
      activeTab = $(this).find("a").attr("href");
    }

    var activeIndex = parseInt(activeTab.replace("#tab", ""));

    if (! $.isNumeric(activeIndex)) {
      return false;
    }

    var tabsSize = $(settings.tabs).size();
    var prevIndex = (activeIndex === 0) ? (tabsSize - 1) : (activeIndex - 1);
    var nextIndex = (activeIndex === (tabsSize - 1) )  ? 0 : (activeIndex + 1);
    $(settings.tab_content).hide();

    // tabs
    $(settings.tabs + ":nth-child("+ (activeIndex +1) + ")").addClass('active').siblings().removeClass('active');

    // heading
    $(settings.heading).eq(activeIndex).addClass('active').siblings().removeClass('active');

    // tab_pager
    $(settings.tab_pager).removeClass('active');
    $(settings.tab_pager + ":nth-child("+ (activeIndex +2) + ")").addClass('active');
    $(settings.tab_pager + ":first-child").find("a").attr("href", "#tab"+ prevIndex);
    $(settings.tab_pager + ":last-child").find("a").attr("href", "#tab"+ nextIndex);
    scrollToAnchor(activeTab);
    $(activeTab).toggle();

    return false;

  }

};

if ($('.tabs').length !== 0) {
  $().myTabs({});
}

//
// EOF
//
