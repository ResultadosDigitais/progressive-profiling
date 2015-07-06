function setProgressiveProfile(spreadsheetID){
  var form = document.getElementById("conversion-form");
  form.setAttribute("onsubmit", "setLeadProfile()");
  var numberOfLevels = -1;
  var isAgency = false;
  var formHasEmail = false;
  var userLevel;

  function getForms(){

    if(typeof(Storage) !== "undefined") {
      var progProfile;
      if (localStorage.progProfile){
        progProfile = JSON.parse(localStorage.getItem('progProfile'));
      }else {
        progProfile = {};
      }
      if(progProfile.userLevel == undefined) progProfile.userLevel = "0";

      userLevel = Number(progProfile.userLevel);
      var jsUrl = "https://spreadsheets.google.com/feeds/list/"+ spreadsheetID + "/od6/public/basic?hl=en_US&alt=json";

      // get fields from spread sheet in google drive
      $.getJSON( jsUrl, function(result){

        try { _gaq.push(['_trackEvent', "ProgressiveProfile", ("form_seen_" + progProfile.userLevel)]); } catch(err) { };

        var fields = [];
        var entries = result.feed.entry;
        var columnLevel;
        for(var i = 1; i < entries.length; i++){
          var cells = entries[i].content.$t.split(/[:;]+/);
          columnLevel = Number(cells[1].slice(0, (cells[1].length-8)).replace(" ", ""));
          if( columnLevel == userLevel && cells.length > 5){
            var field = {};
            field.label = cells[2].slice(0, (cells[2].length-8));
            field.id = cells[3].slice(0, (cells[3].length-8)).replace(" ", "");
            if (field.id == "email") formHasEmail = true;
            field.type = cells[4].slice(0, (cells[4].length-8)).replace(" ", "");
            field.options = cells.slice(5, cells.length);
            fields.push(field);
          }
          if (columnLevel > numberOfLevels) numberOfLevels = columnLevel;
        }
        setForm(progProfile, fields);
      })
      .error(function() {
        try { _gaq.push(['_trackEvent', "ProgressiveProfile", "form_seen_err"]); } catch(err) { };
      });
    }
  }

  function setLeadProfile(){
    if(typeof(Storage) !== "undefined") {
      // save user form email, time and level
      var userEmail = document.getElementById("email");
      var progProfile;
      var date = new Date();

      if (numberOfLevels == -1){
        try { _gaq.push(['_trackEvent', "ProgressiveProfile", "form_conv_err"]); } catch(err) { };
      }else {
        try { _gaq.push(['_trackEvent', "ProgressiveProfile", ("form_conv_" + userLevel)]); } catch(err) { };
      }

      if(localStorage.progProfile){
        progProfile = JSON.parse(localStorage.getItem('progProfile'));
        progProfile.userLastVisit = date.getTime();
        if (progProfile.userLevel == undefined) progProfile.userLevel = "1";
        else if (progProfile.userLevel < numberOfLevels ) progProfile.userLevel++;

      }else {
        progProfile = {};
        progProfile.userFirstVisit = date.getTime();
        progProfile.userLastVisit = progProfile.userFirstVisit;
        progProfile.userEmail = userEmail.value;
        progProfile.userLevel = "1";
        progProfile.userLevelAgency = "0";
      }
      localStorage.setItem("progProfile", JSON.stringify(progProfile));
    }
  }


  function setForm( progProfile, fields ){
    // remove all children
    var actualFields = form.getElementsByClassName("field");
    for (var i = actualFields.length-2; i >= 0; i--){
      form.removeChild(actualFields[i]);
    }

    // create email hidden input if level does not have
    if(!formHasEmail){

      var emailInput = document.createElement('input');
      emailInput.setAttribute("type", "hidden");
      emailInput.setAttribute("id", "email");
      emailInput.setAttribute("name", "email");
      emailInput.setAttribute("value", progProfile.userEmail);
      emailInput.setAttribute("class", "form-control  required");
      form.appendChild(emailInput);
    }

    // create new elements
    for(var i = 0; i < fields.length; i++){

      var inputId = fields[i].id.replace("[", "_").replace("]", "")

      var newField = document.createElement('div');
      newField.setAttribute("class", "field");
      form.insertBefore(newField, actualFields[actualFields.length-1]);

      // create label
      var newLabel = document.createElement('label');
      newLabel.innerHTML = fields[i].label + "*";
      newLabel.setAttribute("for", inputId);
      newField.appendChild(newLabel);

      // create input
      if (fields[i].type == "select"){
        var newInput = document.createElement('select');

        // create options
        var nullOpt = document.createElement('option');
        nullOpt.value = "";
        nullOpt.innerHTML = "Selecione";
        newInput.appendChild(nullOpt);
        for (var j = 0; j < fields[i].options.length; j++){
          var newOpt = document.createElement('option');
          newOpt.value = fields[i].options[j].trim();
          newOpt.innerHTML = newOpt.value;
          newInput.appendChild(newOpt);
        }
        newInput.setAttribute("class", "form-control  required");
        newInput.setAttribute("id", inputId);
        newInput.setAttribute("name", fields[i].id);
        newField.appendChild(newInput);

      } else if (fields[i].type == "radio"){
        for (var j = 0; j < fields[i].options.length; j++) {

          // create radio div
          var radioDiv = document.createElement('div');
          radioDiv.setAttribute("class", "radio");
          newField.appendChild(radioDiv);

          // create label
          var radioLabel = document.createElement('label');
          radioDiv.appendChild(radioLabel);

          // radio option
          var radioInput = document.createElement('input');
          radioInput.setAttribute("type", "radio");
          radioInput.value = fields[i].options[j].trim();
          radioInput.setAttribute("class", " required");
          radioInput.setAttribute("id", inputId + "_" + newInput.value);
          radioInput.setAttribute("name", fields[i].id);
          radioLabel.appendChild(radioInput);
          radioLabel.insertAdjacentHTML("beforeend", radioInput.value);
        }

      } else {
        var newInput = document.createElement('input');
        newInput.setAttribute("type", fields[i].type);
        newInput.setAttribute("class", "form-control  required");
        newInput.setAttribute("id", inputId);
        newInput.setAttribute("name", fields[i].id);
        newField.appendChild(newInput);
      }
      if (newInput.getAttribute("id") == "email" && progProfile.userEmail != undefined) newInput.value = progProfile.userEmail;

    }
  }
}
