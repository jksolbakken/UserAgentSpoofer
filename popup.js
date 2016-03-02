(function() {
  'use strict'

  var uaToUse;

  chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
      for (var i = 0; i < details.requestHeaders.length; ++i) {
        if (details.requestHeaders[i].name === 'User-Agent') {
          details.requestHeaders.splice(i, 1);
          details.requestHeaders.push({"name": "User-Agent", "value": uaToUse});
          break;
        }
      }
      
      return {requestHeaders: details.requestHeaders};
    },
    {urls: ["<all_urls>"]},
    ["blocking", "requestHeaders"]
  );

  document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById("reloadButton");
    btn.addEventListener("click", function() {
	reloadActiveTab();
    });

    var select = document.getElementById("uas");
    fillWithOptions(select);
    select.addEventListener("change", function() {
      uaToUse = select.value;
    });
  });

  var reloadActiveTab = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
      var code = 'window.location.reload();';
      chrome.tabs.executeScript(arrayOfTabs[0].id, {code: code});
    });
  };

  var fillWithOptions = function(selectBox) {
    userAgents.forEach(function(userAgent) {
      var opt = document.createElement('option');
      opt.value = userAgent.id;
      opt.innerHTML = userAgent.name;
      selectBox.appendChild(opt);
    });
  };

  var userAgents = [
    {name: 'IE 11 on Win 7', id: 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko'},
    {name: 'IE 11 on Win 8.1', id: 'Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko'},
    {name: 'Edge 12.246', id: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246'},  
    {name: 'Safari 7.0.3', id: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A'},
    {name: 'Googlebot 2.1', id: 'Googlebot/2.1 (+http://www.google.com/bot.html)'},
    {name: 'Chrome Galaxy Nexus', id: 'Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19'},
    {name: 'Safari iOS 9 iPad', id: 'Mozilla/5.0 (iPad; CPU OS 9_0 like Mac OS X) AppleWebKit/601.1.17 (KHTML, like Gecko) Version/8.0 Mobile/13A175 Safari/600.1.4'},
    {name: 'Safari iOS 8 iPhone', id: 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4'},
    {name: 'Opera 12.16 Ununtu 14.10', id: 'Opera/9.80 (X11; Linux i686; Ubuntu/14.10) Presto/2.12.388 Version/12.16'}
  ];

})();

