$(document).ready(function() {

  // animates the search wrapper including the toggle, bar, and button into DOM via a fade-in-from bottom type animation.
  $('#greetingWrapper').animate({'opacity': 1}, 500);
  $('#searchWrapper').delay(250).animate({'opacity': 1}, 500);
  $('#infoWrapper').delay(1000).animate({'opacity': 1}, 500);
  $('#footer').delay(1000).animate({'opacity': 1}, 500);

$(window).on('scroll', function() {
  $('#logo').css('opacity', 'hide');
  var scrollTop = $(window).scrollTop();
  if (scrollTop <= 0) {
    $('#jumbotron').stop().animate({height:'18rem'},500);
    $('#logo').animate({opacity:'hide'},250, function(){
    $('#logo').attr('src',"./Assets/updated-logo.jpg").attr('class','iz-l');
    $('#logo').animate({opacity:'show'},500);
  })} else {
    $('#jumbotron').stop().animate({ height: '4rem'},500);
    $('#logo').animate({opacity:'hide'},250, function(){
      $('#logo').attr('src',"./Assets/small-logo.jpg").attr('class','iz-s');
      $('#logo').animate({opacity:'show'},500);
    })}
});
  
  /* // API Call Don't make functional until within an onclick function, otherwise will make an API call every page refresh */
  let userLookup = '';
  let toggleLookup = true; // true is US, off is UK?
  let DEBUG = false;
   //DEBUG = confirm('Debug mode?');
  let settings = {
    async: true,
    crossDomain: true,
    url: `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${userLookup}&country=us`,
    method: 'GET',
    headers: {
      'x-rapidapi-host':
        'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
      'x-rapidapi-key': '71c3453161msh2745d751f269a45p112d9ajsnd73fb1b467b2'
    }
  };

  /* Renders 1 card wrapper.  All fields are empty */
  function renderWrapper(i, singleShowResult) {
      
    $('#pageWrapper').animate({'opacity': 0}, 1000);
    $('#greetingWrapper').animate({'opacity': 0}, 500);

    // var j = 0;

    // FOR YOUR VISUALIZATION ENJOYMENT:
    // singleShowResult = {
    // picture: "urlSrcString",
    // showName: "string",
    // locationArray: []
    // }
    // locationArray = [{}]
    // locationArray[0] = {
    // siteName: "string",
    // url: "url string to take you to the show on the streaming site",
    // siteIcon: "urlSrcString"
    // }

    let pictureUrl = singleShowResult.picture;
    let showName = singleShowResult.showName;
    // LOCATION ARRAY NOT HANDLED YET.
    // ^Append divs to iconWrapper for each streaming service (location)
    let locationArray = singleShowResult.locationArray;

    // Writes a div with children full of data to the DOM as a child of $('#pageWrapper') for each result
    let cardWrapper = 
    `<div id="cardWrapper${i}" class="df df-fdc ai-c jc-c mb-s">
      <img id="cardImage${i}" class="br-t i-c" src="${pictureUrl}">
      <div id="contentWrapper${i}" class="bgc-g p-s w-75 br-b ">
       <div class="ff-m fz-h" id="title${i}">${showName}</div>
        <div class="ff-m fs-i c-cg fz-h">Watch On:</div>
      <div id="iconsWrapper${i}" class="bgc-g df df-fdr df-fr ai-c ji-c ac-fs">`;
    $('#pageWrapper').append(cardWrapper);
    $('#searchWrapper').stop().animate({'margin-top':'19rem'}, 500)

    
    

    // create and append <a><img></a> for each available streaming site
    for (var k = 0; k < locationArray.length; k++) {
      var junkID = '';

      // welcome to the dumbest way
      if (i === 0) {
        junkID = 'iconsWrapper0';
      }
      if (i === 1) {
        junkID = 'iconsWrapper1';
      }
      if (i === 2) {
        junkID = 'iconsWrapper2';
      }
      if (i === 3) {
        junkID = 'iconsWrapper3';
      }
      if (i === 4) {
        junkID = 'iconsWrapper4';
      }
      if (i === 5) {
        junkID = 'iconsWrapper5';
      }
      if (i === 6) {
        junkID = 'iconsWrapper6';
      }
      if (i === 7) {
        junkID = 'iconsWrapper7';
      }
      if (i === 8) {
        junkID = 'iconsWrapper8';
      }
      if (i === 9) {
        junkID = 'iconsWrapper9';
      }
      if (i === 10) {
        junkID = 'iconsWrapper10';
      }
      if (i === 11) {
        junkID = 'iconsWrapper11';
      }
      if (i === 12) {
        junkID = 'iconsWrapper12';
      }
      if (i === 13) {
        junkID = 'iconsWrapper13';
      }
      if (i === 14) {
        junkID = 'iconsWrapper14';
      }
      if (i === 15) {
        junkID = 'iconsWrapper15';
      }
      var wrap = $('#' + junkID);
      wrap.append(createIconWrapper(k, locationArray[k]));
      $('#greetingWrapper').animate({'opacity': 0,}, 1000);
      $("#greetingWrapper").attr("style", "display:none");

      $('#infoWrapper').animate({'opacity': 0,}, 1000);
      $("#infoWrapper").attr("style", "display:none");
      $('#pageWrapper').stop().animate({'opacity': 1}, 1000);

    }
  }

  // loops through each show result and displays appropriately
  function renderResults(showResultArray) {
    // for loop
    for (var i = 0; i < showResultArray.length; i++) {
      renderWrapper(i, showResultArray[i]);
    }
  }

  // makes the API call to Utelly! woo!
  function makeCall(userInput, toggleValue) {
    if (userInput === '') {
      return; // Don't search on empty
    }
    // assign user's search input to a variable
    userLookup = userInput;
    if (toggleValue === true) {
      // alert("true");
      toggleLookup = "uk";
    }
    if (toggleValue === false) {
      // alert("false");
      toggleLookup = "us";
    }

    // clear the search box
    $('#searchBox').val('');
    clearResults();
    // update the API call's url with the user's search info
    settings.url = `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${userLookup}&country=${toggleLookup}`;
    // DEBUG = true;
    // make the API call using the settings which now include the user's search
    if (DEBUG === true) {
      // use fake API call object
      renderResults(createArrayFromCF(createDummyAjaxObject()));
    } else {
      $.ajax(settings).done(function(response) {
        console.log('response:');
        console.log(response);
        renderResults(createArrayFromCF(response));
      });
    }
  }

  // returns an Object containing an array of results
  function createDummyAjaxObject() {
    var dummyAjax = {
      results: [
        {
          locations: [
            {
              display_name: 'Netflix',
              name: 'NetflixUS',
              url: 'https://www.netflix.com/title/80113701',
              id: '58c141a37588d57a9522dd54',
              icon:
                'https://assets.pcmag.com/media/images/434952-netflix-logo.png?width=333&height=245'
            },
            {
              display_name: 'Amazon Prime',
              name: 'AmazonUS',
              url:
                'http://www.amazon.com/gp/product/B0773R8MCP?tag=utellycom00-21',
              id: '58c141a37588d57a9722dd54',
              icon:
                'https://images-na.ssl-images-amazon.com/images/G/01/rainier/available_at_amazon_1200x600_Nvz5h2M.png'
            }
          ],
          picture:
            'https://utellyassets2-9.imgix.net/2/Open/NBC_6/Program/27734620/_16by9/The_Good_Place_S4_KA2.jpg?fit=crop&auto=compress&crop=faces,top',
          id: '592a6051ebb7f91ca2569dd7',
          weight: 768,
          name: 'The Good Place'
        },
        {
          locations: [
            {
              display_name: 'Notflix',
              name: 'NotflixUS',
              url: 'https://www.netflix.com/title/80113701',
              id: '58c141a37588d57a9522dd54',
              icon:
                'https://assets.pcmag.com/media/images/434952-netflix-logo.png?width=333&height=245'
            },
            {
              display_name: 'Amazon Pop',
              name: 'AmazonUS',
              url:
                'http://www.amazon.com/gp/product/B0773R8MCP?tag=utellycom00-21',
              id: '58c141a37588d57a9722dd54',
              icon:
                'https://images-na.ssl-images-amazon.com/images/G/01/rainier/available_at_amazon_1200x600_Nvz5h2M.png'
            }
          ],
          picture:
            'https://images-na.ssl-images-amazon.com/images/I/81FIbmh-EXL._RI_.jpg',
          id: '592a6051ebb7f91ca2569dd7',
          weight: 768,
          name: 'The Good Doctor'
        }
      ],
      updated: '2019-10-24T03:03:20+0100',
      term: 'the good place',
      status_code: 200,
      variant: 'utelly'
    };
    return dummyAjax;
  }
  // returns an array containing objects representing show results
  function createArrayFromCF(ajaxResponse) {
    // print full object
    console.log('ajaxResponse:');
    console.log(ajaxResponse);
    var showResults = []; // each show, ie: The Office, The Office UK, The Office Adventures
    var temp1 = ajaxResponse.results;
    // For Each show result[]
    for (var i = 0; i < temp1.length; i++) {
      var showObject = {}; // individual show
      // save the show's picture
      if (temp1[i].picture === "" ||temp1[i].picture === null) {
        showObject['picture'] = "./Assets/imageUnavailable.jpg";
      }
      else {
        showObject['picture'] = temp1[i].picture;
      }
      // save the show's name
      showObject['showName'] = temp1[i].name;
      // for each location[] in this result
      var temp2 = temp1[i].locations;
      showObject['locationArray'] = [];
      for (var j = 0; j < temp2.length; j++) {
        var locationObject = {};
        // save the streaming site's name
        var siteName = temp2[j].display_name;
        locationObject['siteName'] = siteName;
        // save the url to watch the show on the streaming site
        var url = temp2[j].url;
        locationObject['url'] = url;
        // save the streaming site's icon
        var siteIcon = temp2[j].icon;
        locationObject['siteIcon'] = siteIcon;
        // tack the new location onto the show's location array
        showObject.locationArray[j] = locationObject;
      }
      // save the newly created full show object to our array of results
      showResults[i] = showObject;
    }

    // print individual items:
    console.log('full results array:');
    console.log(showResults);
    return showResults;
  }
  // remove old results
  function clearResults() {
    $('#pageWrapper').empty();
  }

  /* Creates one site Icon w/ link wrapper */
  function createIconWrapper(i, locationObject) {
    let tempIcon = locationObject.siteIcon;
    let tempName = locationObject.siteName;
    let tempURL = locationObject.url;
    let wrapper = "";
    if (tempURL === null) {
      // DISPLAY NONE
      wrapper = `<a href="${tempURL}" class="iz-i m-s d-n">
        <img src="${tempIcon}" alt="${tempName}" title="${tempName}" class="br bd-g e-g-hv h-f w-f s-hv d-n">
      </a>`;
    }
    else {
      wrapper = `<a href="${tempURL}" class="iz-i m-s">
        <img src="${tempIcon}" alt="${tempName}" title="${tempName}" class="br bd-g e-g-hv h-f w-f p-s s-hv">
      </a>`;
    }
    return wrapper;
  }

  // Lines 297-325: on-clicks and events.

  //Triggers search if enter key is pressed while focused on search bar. no button click needed.
  $('#searchBox').keypress(function(e) {
    if (e.which == 13) {
      $('#searchSubmit').click(); 
    }
  });

  // make a call when the user searches
  $('#searchSubmit').on('click', function() {
    // save user's search value
    let userSearch = $('#searchBox').val();
    let toggleSetting = $('#toggle').val();
    // DEBUGGGGG toggle setting
    if ($('#countryToggle').attr('data-country')==='us'){
      toggleSetting = false;
    }
    else{
      toggleSetting = true;
    }
    makeCall(userSearch, toggleSetting);
  });

  //change country toggle data attribule
  $('#countryToggle').on('click',function(event){
    let test = $('#countryToggle').attr('data-country');
    event.stopImmediatePropagation();
    if ($('#countryToggle').attr('data-country')==='us'){
      $('#countryToggle').attr('data-country', 'uk');
    }else{
      $('#countryToggle').attr('data-country', 'us');
    }
  })
});