/*
  dBJs-ui Library Version 1.3.6
  http://www.getdbjs.com
  Author: Davide Bausach
  Copyright (c) <2015> <Davide Bausach>
  The MIT License (MIT)

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation
  files (the "Software"), to deal in the Software without
  restriction, including without limitation the rights to use,
  copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following
  conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
*/

/****************************************************/



/****************************************************/
/*
 * User interface
 * Elementi di interfaccia grafica accompagnati dal file css
 */
/****************************************************/

var DBJSPATH = document.getElementsByTagName("html")[0].getAttribute('data-dBJs');

/*
  Class: Accordion
  Crea un effetto fisarmonica dei div al suo interno
*/
function Accordion(accordion){
  var accordionTitle = accordion.getElementsByClassName('accordionTitle');
  var accordionContent = accordion.getElementsByClassName('accordionContent');
  var aOpened = parseInt(accordion.getAttribute('data-aOpened')) || "off";
  var oneOpened = accordion.getAttribute('data-oneOpened') || "off";

  if(aOpened !== "off" && accordionContent[aOpened-1]){
    accordionContent[aOpened-1].classList.add('sectionSelected');
    accordionTitle[aOpened-1].classList.add('accordionTitleSelected');
  }

  /*
  if(oneOpened === "on" && aOpened === "off" && accordionContent[0]){
    accordionContent[0].classList.add('sectionSelected');
    accordionTitle[0].classList.add('accordionTitleSelected');
  }
  */

  for(var i=0; i<accordionTitle.length; i++){
    (function(){
      var iIN = i;
      accordionTitle[i].onclick = function(){
        if(accordionContent[iIN].classList.contains('sectionSelected')){
          accordionContent[iIN].classList.remove('sectionSelected');
          accordionTitle[iIN].classList.remove('accordionTitleSelected');
        }else{
          if(oneOpened === "on"){
            for(var x=0; x<accordionTitle.length; x++){
              accordionContent[x].classList.remove('sectionSelected');
              accordionTitle[x].classList.remove('accordionTitleSelected');
            }
          }
          accordionContent[iIN].classList.add('sectionSelected');
          accordionTitle[iIN].classList.add('accordionTitleSelected');
        }
      };
    })();
  }
}

/*
  Class: AddFile
  Permette il caricamento di file in un form
*/
function AddFile(addFile){
  var fileInput = addFile.getElementsByClassName('fileInput')[0];
  var files;
  var fileType;
  var fileSize = 0;
  var accept = fileInput.getAttribute('accept') || 'all';
  var afMax = addFile.getAttribute('data-afMax') || 'off';
  var afMaxSize = addFile.getAttribute('data-afMaxSize') || 'off';
  var afName = addFile.getAttribute('data-afName') || 'filename';
  var nFile = 0;

  if(fileInput){
    if(addFile.getElementsByClassName('addFileButton')[0]){
      var addFileButton = addFile.getElementsByClassName('addFileButton')[0];
      (function(){
        var fileInputIN = fileInput;
        var addFileButtonIN = addFileButton;

        addFileButtonIN.onclick = function(){
          fileInputIN.click();
        };

        fileInputIN.onchange = function(){
          files = fileInputIN.files;
          ondropperdFiles(files);
        };
      })();
    }

    function ondropperdFiles(files){
      nFile = addFile.getElementsByClassName('divPreview').length;
      if(addFile.getElementsByClassName('preview')[0]){
        var preview = addFile.getElementsByClassName('preview')[0];
        var file;
        for(var i = 0; i < files.length; i++){

          if(afMax !== "off"){
            if(nFile >= afMax){
              alert("File number limit is "+afMax+"!");
              fileInput.value = '';
              return;
            }
          }

          file = files[i];

          fileType = file.type;
          //1 MB = 1048576 bytes
          fileSize = parseInt(file.size);

          if(accept !== 'all'){
            if(fileType.match(/image.*/)){
              if(!accept.match(/image.*/) && accept !== 'all'){
                alert("File types is not accepted!");
                break;
              }
            }else if(fileType.match(/audio.*/)){
              if(!accept.match(/audio.*/) && accept !== 'all'){
                alert("File types is not accepted!");
                break;
              }
            }else if(fileType.match(/video.*/)){
              if(!accept.match(/video.*/) && accept !== 'all'){
                alert("File types is not accepted!");
                break;
              }
            }else if(!fileType.match(/image.*/) && !fileType.match(/audio.*/) && !fileType.match(/video.*/)){
              if(fileType !== accept && accept !== 'all'){
                alert("File types is not accepted!");
                break;
              }
            }
          }

          var div = document.createElement("div");
          preview.appendChild(div);

          var inputSizeP = document.createElement("input");
          inputSizeP.type = 'hidden';
          inputSizeP.value = fileSize;
          inputSizeP.setAttribute('class','fileSizeP');
          div.appendChild(inputSizeP);

          if(afMaxSize !== 'off'){
            if(totalSize(afMaxSize) >= afMaxSize || fileSize > afMaxSize || totalSize(afMaxSize)+totalSizeP() >= afMaxSize){
              alert("File size limit is "+sizeConverter(afMaxSize)+"!");
              fileInput.value = '';
              preview.removeChild(div);
              return;
            }
          }

          div.setAttribute("class","divPreview");

          var img = document.createElement("img");
          img.setAttribute("class","imagePreview preUpload");
          img.file = file;
          div.appendChild(img);

          var progress = document.createElement("progress");
          progress.value = '0';
          progress.max = '100';
          progress.setAttribute('class','fileProgress');
          div.appendChild(progress);

          var a = document.createElement("a");
          a.href = 'javascript:void(0);';
          a.setAttribute('class','removeFile');
          div.appendChild(a);

          if(fileType.match(/image.*/)){
            var reader = new FileReader();
            reader.onload = (function(aImg){
              return function(e){
                aImg.src = e.target.result;
              };
            })(img);
            reader.readAsDataURL(file);
          }else if(fileType.match(/audio.*/)){
              img.src = DBJSPATH+'dBJs/css/dBJs-ui/audio.jpg';
          }else if(fileType.match(/video.*/)){
              img.src = DBJSPATH+'dBJs/css/dBJs-ui/video.jpg';
          }else{
             img.src = DBJSPATH+'dBJs/css/dBJs-ui/file.jpg';
          }

          var formData = new FormData();
          formData.append("myFiles[]", file);

          sendFile(formData,div,progress,a,img,fileSize);

        }
        fileInput.value = '';
      }

      function sendFile(formData,div,progress,ax,img,fileSize){
        nFile++;

        if(afMax !== "off"){
          if(nFile > afMax){
            alert("File number limit is "+afMax+"!");
            fileInput.value = '';
            return;
          }
        }

        if(afMaxSize !== 'off'){
          if(totalSize(afMaxSize) >= afMaxSize || fileSize > afMaxSize || totalSize(afMaxSize)+totalSizeP() >= afMaxSize){
            alert("File size limit is "+sizeConverter(afMaxSize)+"!");
            fileInputIN.value = '';
            preview.removeChild(div);
            return;
          }
        }

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
          if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var response = xmlhttp.responseText;
            var Jobj = JSON.parse(response);
            for(var i = 0; i < Jobj.length; i++){
              div.setAttribute("class","divPreview");
              div.innerHTML = '';

              img.setAttribute("class","imagePreview");
              div.appendChild(img);

              var input = document.createElement("input");
              input.type = 'hidden';
              input.value = Jobj[i].filename;
              input.name = afName+'[]';
              div.appendChild(input);

              var inputSize = document.createElement("input");
              inputSize.type = 'hidden';
              inputSize.value = fileSize;
              inputSize.setAttribute('class','fileSize');
              div.appendChild(inputSize);

              (function(){
                var JobjIN = Jobj[i].filename;
                var previewIN = preview;
                var divIN = div;
                var a = document.createElement("a");
                a.href = 'javascript:void(0);';
                a.setAttribute('class','removeFile');
                a.onclick = function(){
                  var div = document.createElement("div");
                  div.setAttribute("class","divDeleteFile");
                  divIN.appendChild(div);

                  var xmlhttp = new XMLHttpRequest();
                  xmlhttp.onreadystatechange = function(){
                    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                      var response = xmlhttp.responseText;
                      if(response === 'yes' || response === 'no'){
                        nFile--;
                        previewIN.removeChild(divIN);
                        totalSize(afMaxSize);
                      }
                    }
                  };
                  xmlhttp.open("POST", DBJSPATH+"dBJs/php/dBJsClass.php?ev=removeFile&random="+Math.random(), true);
                  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                  xmlhttp.send("rem="+JobjIN);
                };
                div.appendChild(a);
              })();
              totalSize(afMaxSize);
            }
          }
        };

        (function(){
          var previewIN = preview;
          var divIN = div;
          ax.onclick = function(){
            xmlhttp.abort();
            previewIN.removeChild(divIN);
          };
        })();

        xmlhttp.upload.addEventListener("progress", function(event){
          uploadProgress(event,progress);
        });
        xmlhttp.addEventListener("load", uploadComplete, false);
        xmlhttp.addEventListener("error", function(){
          preview.removeChild(div);
          uploadFailed(event);
        }, false);
        xmlhttp.addEventListener("abort", uploadCanceled, false);

        xmlhttp.open("POST", DBJSPATH+"dBJs/php/dBJsClass.php?ev=addFile&random="+Math.random(), true);
        xmlhttp.send(formData);
      }
    }

  }

  function totalSizeP(){
    if(addFile.getElementsByClassName('fileSizeP')){
      var totalSizeP = 0;
      for(var i=0; i<addFile.getElementsByClassName('fileSizeP').length; i++){
        totalSizeP += parseInt(addFile.getElementsByClassName('fileSizeP')[i].value);
      }
    }
    return totalSizeP;
  }

  function totalSize(afMaxSize){
    if(addFile.getElementsByClassName('fileInfo')[0]){
      if(addFile.getElementsByClassName('fileSize')){
        var totalSize = 0;
        for(var i=0; i<addFile.getElementsByClassName('fileSize').length; i++){
          totalSize += parseInt(addFile.getElementsByClassName('fileSize')[i].value);
        }
      }
      if(totalSize <= 0){
        addFile.getElementsByClassName('fileInfo')[0].innerHTML = "";
      }else{
        addFile.getElementsByClassName('fileInfo')[0].innerHTML = "Total size: "+sizeConverter(totalSize)+" / "+sizeConverter(afMaxSize);
      }
    }
    return totalSize;
  }

  function sizeConverter(bytes){
    var res = bytes+" bytes";
    for(var aMultiples = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], nMultiple = 0, nApprox = bytes / 1024; nApprox > 0.99; nApprox /= 1024, nMultiple++){
      res = nApprox.toFixed(2)+" "+aMultiples[nMultiple];
    }
    return res;
  }

  if(addFile.getElementsByClassName('dropzone')[0]){
    var dropzone = addFile.getElementsByClassName('dropzone')[0];

    document.ondragover = function(event){
      event.stopPropagation();
      event.preventDefault();
    };
    document.ondrop = function(event){
      event.stopPropagation();
      event.preventDefault();
    };
    addFile.ondragover = function(event){
      event.stopPropagation();
      event.preventDefault();
      dropzone.classList.add('dropzoneDragOver');
      dropzone.style.display = 'block';
    };
    dropzone.ondragleave = function(event){
      event.stopPropagation();
      event.preventDefault();
      dropzone.classList.remove('dropzoneDragOver');
      dropzone.style.display = 'none';
    };
    dropzone.ondrop = function(event){
      event.stopPropagation();
      event.preventDefault();
      dropzone.classList.remove('dropzoneDragOver');
      dropzone.style.display = 'none';
      files = event.dataTransfer.files;
      //fileInput.files = files;

      ondropperdFiles(files);
    };
  }

  function uploadProgress(event,progress){
    if(event.lengthComputable){
      var percentComplete = Math.round(event.loaded * 100 / event.total);
      /*
      if(document.getElementById('progressNumber')){
        document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
      }
      */
      progress.value = percentComplete;
    }
  }

  function uploadComplete(event){
  }

  function uploadFailed(event){
    alert("It was an error in trying to load the file!");
  }

  function uploadCanceled(event){
    alert("The load has been canceled or the connection is lost!");
  }

}

/*
  Class: Autocomplete
  Utilizzato per un input di testo visualizza i suggerimenti di un determinato campo da un oggetto JSON
*/
function Autocomplete(obj){
  var input = obj.el.getElementsByClassName('autocomplete')[0];
  input.addEventListener("keyup",function(event){
    var keyCode = parseInt(event.keyCode);

    if(keyCode !== 40 && keyCode !== 38 && keyCode !== 13){
      if(input.value.length >= obj.strL){
        var c;
        if(obj.url.search("[?]") === -1){
          c = '?';
        }else{
          c = '&';
        }
        var xmlhttp;
        if(window.XMLHttpRequest){
          xmlhttp = new XMLHttpRequest();
        }else{
          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function(){
          if(xmlhttp.readyState < 4){
            if(obj.before){
              obj.before();
            }
          }
          if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
            var response = xmlhttp.responseText;
            if(!response){
              closeA();
            }
            if(!document.getElementById(obj.el.id+'-Result') && keyCode !== 13){
              try{
                var Jobj = JSON.parse(response);

                var div = document.createElement('div');
                div.setAttribute('id',obj.el.id+'-Result');
                div.setAttribute('class','autocompleteResult');
                obj.el.appendChild(div);

                var ul = document.createElement('ul');
                div.appendChild(ul);

                for(var i = 0; i < Jobj.length; i++){
                  var li = document.createElement('li');
                  li.setAttribute('id','resultItem-'+i);
                  li.setAttribute('class','resultItem');
                  li.innerHTML = Jobj[i][obj.field];
                  (function(){
                    var val = Jobj[i][obj.field];
                    var iIN = i;
                    li.onmousedown = function(){
                      selectItem(val,response,iIN);
                    };
                    li.onmouseover = function(){
                      var itemFocus = ul.getElementsByClassName('itemFocus')[0];
                      if(!ul.getElementsByClassName('itemFocus')[0]){
                        this.classList.add('itemFocus');
                      }else{
                        itemFocus.classList.remove('itemFocus');
                        this.classList.add('itemFocus');
                      }
                    };
                  })();
                  ul.insertBefore(li, ul.childNodes[ul.childNodes.length]);
                }

                input.onblur = function(){
                  if(obj.el.getElementsByClassName('autocompleteResult')[0]){
                    closeA();
                  }
                };

                input.onkeydown = function(event){
                  var keyCode = event.keyCode;
                  if(keyCode === 40){
                    event.preventDefault();
                    if(!ul.getElementsByClassName('itemFocus')[0]){
                      ul.childNodes[0].classList.add('itemFocus');
                    }else{
                      var itemFocus = ul.getElementsByClassName('itemFocus')[0];
                      for(var i=0; i<ul.childNodes.length; i++){
                        if (itemFocus === ul.childNodes[i]){
                          itemFocus.classList.remove('itemFocus');
                          if(parseInt(i+1) < ul.childNodes.length){
                            document.getElementById('resultItem-'+parseInt(i+1)).classList.add('itemFocus');
                          }
                          break;
                        };
                      }
                    }
                  }else if(keyCode === 38){
                    event.preventDefault();
                    if(!ul.getElementsByClassName('itemFocus')[0]){
                      ul.childNodes[ul.childNodes.length-1].classList.add('itemFocus');
                    }else{
                      var itemFocus = ul.getElementsByClassName('itemFocus')[0];
                      for(var i=0; i<ul.childNodes.length; i++){
                        if (itemFocus === ul.childNodes[i]){
                          itemFocus.classList.remove('itemFocus');
                          if(parseInt(i-1) >= 0){
                            document.getElementById('resultItem-'+parseInt(i-1)).classList.add('itemFocus');
                          }
                          break;
                        };
                      }
                    }
                  }else if(keyCode === 13){
                    event.preventDefault();
                    var itemFocus = ul.getElementsByClassName('itemFocus')[0];
                    for(var i=0; i<ul.childNodes.length; i++){
                      if (itemFocus === ul.childNodes[i]){
                        selectItem(Jobj[i][obj.field],response,i);
                        break;
                      };
                    }
                    closeA();
                  }
                };
              }catch(e){
                closeA();
              }
              //res(response);
            }
            res(response);
          }
        };
        xmlhttp.open("POST",obj.url+c+"random="+Math.random(),true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send(obj.paramName+"="+input.value);
      }else{
        closeA();
        res(false);
      }
    }
  });

  function res(response){
    if(obj.res){
      obj.res(response);
    }
  }

  function selectItem(val,response,i){
    input.value = val;
    if(obj.fn){
      obj.fn(response,i);
    }
  }

  function closeA(){
    if(obj.el.getElementsByClassName('autocompleteResult')[0]){
      document.getElementById(obj.el.id+'-Result').parentNode.removeChild(document.getElementById(obj.el.id+'-Result'));
    }
  }
}

/*
  Class: Calendar
  Genera un calendario sfogliabile con date selezionabili ed utilizabile anche come datepicker
*/
function Calendar(calendar){
  var el = calendar.el;
  var now = new Date();
  var cFormat = calendar.format || el.getAttribute('data-cFormat') || 'Y-m-d';
  var current_year = now.getFullYear();
  var current_month = now.getMonth();
  var current_day = now.getDate();
  var months = calendar.month || new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
  var days_in_month = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
  var days_of_the_week = calendar.days || new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');

  var calendarYear;
  var calendarMonth;
  var datepicker = false;

  createCalendar();

  for(var i=0; i<months.length; i++){
    var calendar_month = el.getElementsByClassName('calendarMonth')[0];
    var option = document.createElement('option');
    option.value = i;
    option.text = months[i];
    calendar_month.add(option);
    if(i === now.getMonth()){
      option.selected = true;
    }
  }
  //year, month and day selected
  var year = el.getElementsByClassName('calendarYear')[0].value = now.getFullYear();
  var month = parseInt(el.getElementsByClassName('calendarMonth')[0].value);
  var day = '';

  function createCalendar(){
    //container
    var calendarContainer = document.createElement('div');
    calendarContainer.setAttribute('class','calendarContainer');
    el.appendChild(calendarContainer);

    //calendarHead
    var calendarHead = document.createElement('div');
    calendarHead.setAttribute('class','calendarHead');
    calendarContainer.appendChild(calendarHead);

    //calendarBody
    var calendarBody = document.createElement('div');
    calendarBody.setAttribute('class','calendarBody');
    calendarContainer.appendChild(calendarBody);

    //tableHead
    var tableHead = document.createElement('table');
    tableHead.setAttribute('class','tableHead');
    calendarHead.appendChild(tableHead);

    var trH = document.createElement('tr');
    tableHead.appendChild(trH);

    var tdPrev = document.createElement('td');
    tdPrev.innerHTML = '&laquo;';
    tdPrev.setAttribute('class','tdPrev');
    tdPrev.addEventListener('click', prevMonth, false);
    trH.appendChild(tdPrev);

    var tdMonth = document.createElement('td');
    trH.appendChild(tdMonth);
    calendarMonth = document.createElement('select');
    calendarMonth.setAttribute('class','calendarMonth');
    calendarMonth.addEventListener('change', createDays, false);
    tdMonth.appendChild(calendarMonth);

    var tdYear = document.createElement('td');
    trH.appendChild(tdYear);
    calendarYear = document.createElement('input');
    calendarYear.type = 'text';
    calendarYear.setAttribute('class','calendarYear');
    calendarYear.addEventListener('keyup', createDays, false);
    tdYear.appendChild(calendarYear);

    var tdX = document.createElement('td');
    tdX.innerHTML = 'x';
    tdX.setAttribute('class','tdX');
    tdX.addEventListener('click', discard, false);
    trH.appendChild(tdX);

    var tdNext = document.createElement('td');
    tdNext.innerHTML = '&raquo;';
    tdNext.setAttribute('class','tdNext');
    tdNext.addEventListener('click', nextMonth, false);
    trH.appendChild(tdNext);

    //tableBody
    var tableBody = document.createElement('table');
    tableBody.setAttribute('class','tableBody');
    calendarBody.appendChild(tableBody);

    var trB = document.createElement('tr');
    tableBody.appendChild(trB);

    for(var i=0; i<days_of_the_week.length; i++){
      var th = document.createElement('th');
      th.innerHTML = days_of_the_week[i];
      trB.appendChild(th);
    }
  }

  function createDays(){
    if(!el.getElementsByClassName('tBodyDays')[0]){
      var tBody = document.createElement('tbody');
      tBody.setAttribute('class','tBodyDays');
      el.getElementsByClassName('tableBody')[0].appendChild(tBody);
    }else{
      tBody = el.getElementsByClassName('tBodyDays')[0];
      tBody.innerHTML = '';
    }

    var year = parseInt(el.getElementsByClassName('calendarYear')[0].value);
    var month = parseInt(el.getElementsByClassName('calendarMonth')[0].value);
    //leap year
    if(month === 1){
      days_in_month[1] = ((year % 400 === 0) || ((year % 4 === 0) && (year % 100 !== 0))) ? 29 : 28;
    }

    var first_day = (new Date(year,month,1)).getDay();

    var days = new Array();
    for(var x=1; x<=days_in_month[month]; x++){
      days.push(x);
    }

    var days_counter = 0;
    for(var i=0; i<42; i++){
      var trB;
      if(i % 7 === 0){
        trB = document.createElement('tr');
        tBody.appendChild(trB);
      }

      var td = document.createElement('td');

      if(i >= first_day){
        if(days_counter < days.length){
          td.setAttribute('class','day');

          var contDay = document.createElement('div');
          contDay.setAttribute('class','contDay');
          td.appendChild(contDay);

          var dc = days[days_counter];
          contDay.innerHTML = dc;
          (function(){
            var yearIN = year;
            var monthIN = month;
            var dcIN = dc;
            var tdIN = td;
            td.onclick = function(event){
              if(el.getElementsByClassName('daySelected')[0]){
                el.getElementsByClassName('daySelected')[0].classList.remove('daySelected');
              }
              event.target.classList.add('daySelected');
              selectDate(yearIN,monthIN,dcIN);
            };
          })();
          if((current_year === year) && (current_month === month) && (current_day === days[days_counter])){
            contDay.classList.add('today');
          }
          days_counter++;
        }
      }

      trB.appendChild(td);
    }
  }

  createDays();

  if(el.getElementsByClassName('datepicker')[0]){
    datepicker = true;
    el.getElementsByClassName('calendarContainer')[0].classList.add('calendar-dp');
    el.getElementsByClassName('datepicker')[0].setAttribute('readonly','readonly');
    if(el.getElementsByClassName('datepicker')[0].value !== ''){
      var date = new Date(el.getElementsByClassName('datepicker')[0].value);
      el.getElementsByClassName('calendarYear')[0].value = date.getFullYear();
      el.getElementsByClassName('calendarMonth')[0].value = date.getMonth();
      createDays();
    }
    el.getElementsByClassName('datepicker')[0].addEventListener('focus', function(){
      if(document.getElementsByClassName('calendarVisible').length > 0){
        var calendarVisible = document.getElementsByClassName('calendarVisible');
        for(var i=0; i<calendarVisible.length; i++){
          if(document.getElementsByClassName('calendarVisible')[i].classList.contains('calendar-dp')){
            document.getElementsByClassName('calendarVisible')[i].classList.remove('calendarVisible');
          }
        }
      }
      el.getElementsByClassName('calendarContainer')[0].classList.add('calendarVisible');
    }, false);
  }else{
    el.getElementsByClassName('calendarContainer')[0].classList.add('calendarVisible');
  }

  function selectDate(year,month,day){
    var date;
    if(parseInt(month+1) < 10){
      month = '0'+parseInt(month+1);
    }else{
      month = parseInt(month+1);
    }
    if(parseInt(day) < 10){
      day = '0'+parseInt(day);
    }
    if(cFormat === 'd-m-Y'){
      date = day + '-' + month + '-' + year;
    }else if(cFormat === 'Y-m-d'){
      date = year + '-' + month + '-' + day;
    }
    if(datepicker){
      el.getElementsByClassName('datepicker')[0].value = date;
      el.getElementsByClassName('calendarContainer')[0].classList.remove('calendarVisible');
    }
  }

  function discard(){
    if(datepicker){
      el.getElementsByClassName('datepicker')[0].value = '';
      el.getElementsByClassName('calendarContainer')[0].classList.remove('calendarVisible');
    }
    if(el.getElementsByClassName('daySelected')[0]){
      el.getElementsByClassName('daySelected')[0].classList.remove('daySelected');
    }
    el.getElementsByClassName('calendarYear')[0].value = now.getFullYear();
    el.getElementsByClassName('calendarMonth')[0].value = now.getMonth();
    createDays();
  }

  function prevMonth(){
    calendarMonth.selectedIndex -= 1;
    if(calendarMonth.selectedIndex === -1){
      calendarMonth.selectedIndex = 11;
      calendarYear.value -= 1;
    }
    createDays();
  }

  function nextMonth(){
    calendarMonth.selectedIndex += 1;
    if(calendarMonth.selectedIndex === -1){
      calendarMonth.selectedIndex = 0;
      calendarYear.value = parseInt(calendarYear.value) + 1;
    }
    createDays();
  }

  document.addEventListener("click",function(event){
    if(document.getElementsByClassName('calendarVisible').length > 0){
      if((!checkParentWithClass(event.target,'calendar-dp') && !checkParentWithClass(event.target,'datepicker'))){
        if(el.getElementsByClassName('calendar-dp')[0]){
          el.getElementsByClassName('calendar-dp')[0].classList.remove('calendarVisible');
        }
      }
    }
  });
}

/*
  Class: DropDownMenu
  Applicato ad una voce di menu o ad un pulsante generico crea un submenu in DropDown
*/
function DropDownMenu(dropDownMenu){
  var ddmPosition = dropDownMenu.getAttribute('data-ddmPosition') || 'start';

  switch(ddmPosition){
    case 'end':
      dropDownMenu.getElementsByClassName('dropDown')[0].classList.add('dropDownEnd');
      break;
    case 'center':
      var ddmOW = dropDownMenu.offsetWidth;
      var ddOW = dropDownMenu.getElementsByClassName('dropDown')[0].offsetWidth;
      var left = (ddmOW / 2) - (ddOW / 2);
      dropDownMenu.getElementsByClassName('dropDown')[0].setAttribute('style','left:'+left+'px;');
      break;
    default:
      dropDownMenu.getElementsByClassName('dropDown')[0].classList.add('dropDownStart');
      break;
  }

  dropDownMenu.onclick = function(event){
    var dropDown = document.getElementsByClassName('dropDown');
    for(var i=0; i<dropDown.length; i++){
      if(dropDown[i] !== dropDownMenu.getElementsByClassName('dropDown')[0] && dropDown[i].classList.contains('dropDownOpened')){
        dropDown[i].classList.remove('dropDownOpened');
      }
    }
    if(dropDownMenu.getElementsByClassName('dropDown')[0].classList.contains('dropDownOpened') && (!event.target.classList.contains('dropDown') && !checkParentWithClass(event.target.parentNode,'dropDown'))){
      dropDownMenu.getElementsByClassName('dropDown')[0].classList.remove('dropDownOpened');
    }else{
      dropDownMenu.getElementsByClassName('dropDown')[0].classList.add('dropDownOpened');
    }
  };

  document.addEventListener("click",function(event){
    if(document.getElementsByClassName('dropDownOpened').length > 0){
      if((!checkParentWithClass(event.target,'dropDown') && !checkParentWithClass(event.target,'dropDownMenu'))){
        dropDownMenu.getElementsByClassName('dropDown')[0].classList.remove('dropDownOpened');
      }
    }
  });
}

/*
  Function: InsertView
  Inserisce un'intera view in una determinata posizione del DOM stampando all'interno di essa il valore di variabili contenute nell'oggetto passato come parametro
*/
function InsertView(obj){
  var html;
  if(typeof obj.data === 'string'){
    html = obj.data;
  }else{
    var node = obj.data;
    html = nodeToHtml(node);
  }
  var params = html.match(/\{\{+[a-zA-Z0-9_]+\}\}/gm);
  if(params){
    for(var i=0; i<params.length; i++){
      var param = params[i].replace('{{','').replace('}}','');
      var regexp = new RegExp(params[i],'gm');
      if(obj.obj[param]){
        html = html.replace(regexp,obj.obj[param]);
      }
    }
  }
  if(obj.before){
    obj.before();
  }
  if(obj.action === 'append'){
    document.getElementById(obj.targetId).innerHTML += html;
  }else{
    document.getElementById(obj.targetId).innerHTML = html;
  }
  if(obj.after){
    obj.after();
  }
}

/*
  Class: LayerConfigurator
  Genera un configuratore di livelli di immagini in un oggetto canvas attravero degli elementi selettori contenenti la url dell'immagine
*/
function LayerConfigurator(layerConfigurator){
  var lcSelect = layerConfigurator.getAttribute('data-lcSelect') || "off";

  if(layerConfigurator.getElementsByTagName('canvas')[0]){
    var canvas = layerConfigurator.getElementsByTagName('canvas')[0];
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);

    var lcImgInit = canvas.getAttribute('data-lcImgInit');
    var initImg = new Image();
    initImg.src = lcImgInit;
    initImg.onload = function(){
      ctx.drawImage(initImg,0,0,canvas.width,canvas.height);
      draw();
    };
  }

  var layerArray = new Array();
  var resArray = new Array;

  if(layerConfigurator.getElementsByClassName('lcLayer')){
    var lcLayers = layerConfigurator.getElementsByClassName('lcLayer');
    for(var i=0; i<lcLayers.length; i++){
      new Layer(lcLayers[i]);
    }
  }

  function Layer(lcLayers){
    if(lcLayers.getElementsByTagName('select').length > 0){
      var select = lcLayers.getElementsByTagName('select')[0];
      var event = new Event('change');

      if(lcSelect === 'on'){
        select.classList.remove('layerSelect');
      }

      layerArray[lcLayers.getAttribute('data-lcN')] = select;

      select.addEventListener('change', function(){
        draw();
        if(lcLayers.getElementsByClassName('layerItem')){
          var layerItem = lcLayers.getElementsByClassName('layerItem');
          for(var z=0; z<layerItem.length; z++){
            layerItem[z].classList.remove('layerItem_selected');
            if(layerItem[z].getAttribute('data-lcItemVal') === select.value){
              layerItem[z].classList.add('layerItem_selected');
            }
          }
        }
      });

      var options = select.options;
      for(var y=0; y<options.length; y++){
        loadImage(options[y].value);
        if(select.value !== '0' && select.value !== ''){
          select.dispatchEvent(event);
        }
      }

      if(lcLayers.getElementsByClassName('layerItem')){
        var layerItem = lcLayers.getElementsByClassName('layerItem');
        for(var z=0; z<layerItem.length; z++){
          layerItem[z].addEventListener('click', function(){
            select.value = this.getAttribute('data-lcItemVal');
            select.dispatchEvent(event);
          });
        }
      }
    }
  }

  Object.keys(layerArray).sort();

  function loadImage(url){
    if(url !== '0' && url !== ''){
      var img = new Image();
      img.src = url;
      img.onload = function(){
        resArray[url] = img;
        draw();
      };
    }
  }

  if(layerConfigurator.getElementsByClassName('lcText')){
    var lcText = layerConfigurator.getElementsByClassName('lcText');
    for(var i=0; i<lcText.length; i++){
      lcText[i].addEventListener('keyup',function(){
        draw();
      });
    }
  }

  function draw(){
    ctx.drawImage(initImg,0,0,canvas.width,canvas.height);
    for(var key in layerArray){
      if(layerArray[key].value in resArray){
        if(layerArray[key].value !== '0' && layerArray[key].value !== ''){
          ctx.drawImage(resArray[layerArray[key].value],0,0,canvas.width,canvas.height);
        }
      }
    }

    if(layerConfigurator.getElementsByClassName('lcText')){
      var lcText = layerConfigurator.getElementsByClassName('lcText');
      for(var i=0; i<lcText.length; i++){
        ctx.font = lcText[i].getAttribute('data-lcTextFont');
        ctx.fillStyle = lcText[i].getAttribute('data-lcFillStyle');
        ctx.fillText(lcText[i].value,lcText[i].getAttribute('data-lcTextX'),lcText[i].getAttribute('data-lcTextY'));
      }
    }

    var dataURL = canvas.toDataURL('image/jpeg', 1);
    if(layerConfigurator.getElementsByClassName('lcDataUrl')[0]){
      layerConfigurator.getElementsByClassName('lcDataUrl')[0].value = dataURL;
    }
  }
}

/*
  Class: LoadingArea
  Genera un layer con un loader centrale coprendo l'intero elemento il cui id �
  stato passato come parametro
*/
function LoadingArea(id){
  var el = document.getElementById(id);
  var div = document.createElement('div');
  div.setAttribute('class','loadingAreaV');
  el.appendChild(div);
  var loader = document.createElement('div');
  loader.setAttribute('class','Loader');
  loader.setAttribute('style','width:25px;height:25px;align-self:center;-webkit-align-self:center;');
  div.appendChild(loader);

  this.remove = function(){
    div.parentNode.removeChild(div);
  };
}

/*
  Function: MailForm
  Invia una mail con i dati contenuti nel form agli indirizzi specificati
*/
function MailForm(obj){
  var mailForm = obj.el;

  if(mailForm.getElementsByClassName('antiSpam')[0]){
    var antiSpam = mailForm.getElementsByClassName('antiSpam')[0];
    var n1 = Math.floor((Math.random() * 10) + 1);
    var n2 = Math.floor((Math.random() * 10) + 1);
    var res = parseInt(n1) + parseInt(n2);
    antiSpam.innerHTML = n1+' + '+n2+' = ';
  }

  mailForm.onsubmit = function(event){
    event.preventDefault();
    var formData = new FormData(mailForm);
    //formData.append("custom", "custom data");

    if(mailForm.getElementsByClassName('antiSpam')[0]){
      if(parseInt(res) !== parseInt(mailForm.getElementsByClassName('sum')[0].value)){
        alert("Spam control error!");
        mailForm.getElementsByClassName('sum')[0].value = '';
        mailForm.getElementsByClassName('sum')[0].focus();
        return;
      }
    }

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState < 4){
        if(mailForm.getElementsByClassName('status')[0]){
          mailForm.getElementsByClassName('status')[0].innerHTML = 'Loading...';
        }
      }
      if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
        var response = xmlhttp.responseText;
        if(response === "ok"){
          //alert("E-mail sent");
          if(obj.fn){
            obj.fn();
          }
        }else{
          alert("E-mail sending error!");
        }
        if(mailForm.getElementsByClassName('status')[0]){
          mailForm.getElementsByClassName('status')[0].innerHTML = '';
        }
      }
    };

    xmlhttp.open("POST", DBJSPATH+"dBJs/php/dBJsClass.php?ev=sendMail&random="+Math.random(), true);
    xmlhttp.send(formData);
  };
}

/*
  Class: Modal
  Crea un box di dialogo modale
*/
function Modal(modalHtml,obj){
  if(!document.body.classList.contains('modalOpen')){
    this.mClass = document.getElementById(modalHtml).getAttribute('data-mClass') || "modalDialog";
    this.modalHtml = document.getElementById(modalHtml);
    this.modalBack = document.createElement("div");
    this.modalDialog = document.createElement("div");
    this.modalContainer = document.createElement("div");

    this.modalContent = document.createElement("div");
    this.modalBack.setAttribute('class','modalBack');
    this.modalBack.setAttribute('onclick','closeModal(event);');
    this.modalDialog.setAttribute('id','Modal-'+modalHtml);
    this.modalDialog.setAttribute('class',this.mClass);
    if(window.innerWidth > 1024){
      this.mSize = document.getElementById(modalHtml).getAttribute('data-mSize') || 400;
      this.modalDialog.setAttribute('style','width:'+this.mSize+'px');
    }
    this.modalContainer.setAttribute('class','modalContainer');
    this.modalContent.setAttribute('class','modalContent');

    var a = document.createElement("a");
    a.setAttribute('id','closeModal');
    a.setAttribute('href','javascript:void(0);');

    if(obj && obj.before){
      var objBefore = obj.objBefore || null;
      obj.before(objBefore);
    }

    document.body.classList.add('modalOpen');
    document.body.appendChild(this.modalBack);
    this.modalBack.appendChild(this.modalDialog);
    this.modalContainer.appendChild(a);
    this.modalDialog.appendChild(this.modalContainer);
    this.modalContainer.appendChild(this.modalContent);

    if(this.modalHtml){
      this.modalHtml.classList.remove('modal');
      this.modalContent.appendChild(this.modalHtml);
    }

    if(obj && obj.after){
      var objAfter = obj.objAfter || null;
      obj.after(objAfter);
    }
  }

  this.closeModal = function(event){
    if(event.target.id === 'closeModal' || event.target.className === 'modalBack'){
      this.modalHtml.classList.add('modal');
      document.body.appendChild(this.modalHtml);
      this.modalBack.parentNode.removeChild(this.modalBack);
      document.body.classList.remove('modalOpen');
      if(obj && obj.close){
        var objClose = obj.objClose || null;
        obj.close(objClose);
      }
    }
  };

  this.modalInflater = function(modalInflate){
    this.modalInflate = document.getElementById(modalInflate);
    if(this.modalInflate){
      this.modalHtml.classList.add('modal');
      document.body.appendChild(this.modalHtml);
      this.modalHtml = this.modalInflate;
      this.modalHtml.classList.remove('modal');
      this.modalContent.appendChild(this.modalHtml);
    }
  };
}

/*
  Class: InputRating
  Genera un input utilizzabile in un form il cui valore � dato dalla scelta in un range che va da 1 a N voti
*/
function InputRating(el){
  var irName = el.getAttribute('data-irName');
  var irN = el.getAttribute('data-irN') || 5;
  var irChar = el.getAttribute('data-irChar') || 'star';
  var irVal = el.getAttribute('data-irVal') || 0;
  var char = '';

  switch(irChar){
    case 'star':
      char = '&starf;';
      break;
    case 'bullet':
      char = '&bullet;';
      break;
    case 'square':
      char = '&squarf;';
      break;
    case 'heart':
      char = '&hearts;';
      break;
    case 'spade':
      char = '&spades;';
      break;
    case 'club':
      char = '&clubs;';
      break;
    case 'diam':
      char = '&diams;';
      break;
    default:
      char = irChar;
  }

  var input = document.createElement('input');
  input.setAttribute('type','hidden');
  input.setAttribute('name',irName);
  if(irVal !== 0){
    input.setAttribute('value',irVal);
  }
  el.appendChild(input);

  for(var i=0; i<irN; i++){
    var star = document.createElement('span');
    star.setAttribute('class','star');
    star.innerHTML = char;
    el.appendChild(star);

    if(i < irVal){
      el.getElementsByClassName('star')[i].classList.add('star_active');
    }

    (function(){
      var iIN = i;

      star.onmouseover = function(){
        for(var i=0; i<=iIN; i++){
          el.getElementsByClassName('star')[i].classList.add('star_active');
        }
      };

      star.onmouseout = function(){
        for(var i=0; i<=iIN; i++){
          el.getElementsByClassName('star')[i].classList.remove('star_active');
        }
        if(input.value !== ''){
          for(var i=0; i<irN; i++){
            el.getElementsByClassName('star')[i].classList.remove('star_active');
          }
          for(var i=0; i<input.value; i++){
            el.getElementsByClassName('star')[i].classList.add('star_active');
          }
        }
      };

      star.onclick = function(){
        input.value = iIN+1;
        if(input.value !== ''){
          for(var i=0; i<irN; i++){
            el.getElementsByClassName('star')[i].classList.remove('star_active');
          }
          for(var i=0; i<input.value; i++){
            el.getElementsByClassName('star')[i].classList.add('star_active');
          }
        }
      };
    })();
  }
}

/*
  Class: ScrollPageTop
  Riporta lo scroll della finestra al top del body
*/
function ScrollPageTop(scrollDuration){
  var scrollStep = window.pageYOffset / (scrollDuration / 15);
  var scrollInterval = setInterval(function(){
    if(window.pageYOffset !== 0){
      window.scrollBy(0, -scrollStep);
    }else{
      clearInterval(scrollInterval);
    }
  },15);
}

/*
  Class: ScrollTo
  Effettua uno scroll animato verso un elemento del DOM
*/
function ScrollTo(id){

  function getOffset(el,offset){
    if(!el){
      return;
    }
    offset.x += el.offsetLeft;
    offset.y += el.offsetTop;
    getOffset(el.offsetParent,offset);
  }

  /*
  function getScrolled(el,scrolled){
    if(!el){
      return;
    }
    scrolled.x += el.scrollLeft;
    scrolled.y += el.scrollTop;
    if(el.tagName.toLowerCase() !== "html"){
      getScrolled(el.parentNode,scrolled);
    }
  }
  */

  var el = document.getElementById(id);
  var stMenuHeight = document.getElementById('containerScrollTo').getAttribute('data-stMenuHeight') || 0;
  var stSpeed = document.getElementById('containerScrollTo').getAttribute('data-stSpeed') || 200;
  var offset = {x:0,y:0};
  getOffset(el,offset);
  /*
  var scrolled = {x:0,y:0};
  getScrolled(el.parentNode,scrolled);
  var posX = offset.x - scrolled.x;
  var posY = offset.y - scrolled.y;
  var posX = offset.x;
  */
  var posY = offset.y - stMenuHeight;
  var scrollStep = (posY - window.pageYOffset) / (stSpeed / 15);

  if(scrollIntervalUp !== null){
    clearInterval(scrollIntervalUp);
  }
  if(scrollIntervalDown !== null){
    clearInterval(scrollIntervalDown);
  }

  if(window.pageYOffset < posY){
    scrollIntervalDown = setInterval(function(){
      if((posY - window.pageYOffset) < scrollStep){
        window.scrollBy(0, posY - window.pageYOffset);
      }else{
        window.scrollBy(0, scrollStep);
      }
      if(window.pageYOffset >= posY){
        clearInterval(scrollIntervalDown);
      }

      if((window.pageYOffset + window.innerHeight) >= document.body.scrollHeight){
        clearInterval(scrollIntervalDown);
      }
      //console.log(+posY+'px / down / '+window.pageYOffset+' - '+scrollStep);
    },15);
  }

  if(window.pageYOffset > posY){
    scrollIntervalUp = setInterval(function(){
      if((posY - window.pageYOffset) > scrollStep){
        window.scrollBy(0, posY - window.pageYOffset);
      }else{
        window.scrollBy(0, scrollStep);
      }
      if(window.pageYOffset <= posY){
        clearInterval(scrollIntervalUp);
      }
      //console.log(+posY+'px / up / '+window.pageYOffset+' - '+scrollStep);
    },10);
  }
}

/*
  Class: SlideShow
  Crea una slideshow di div
*/
function SlideShow(slideshow){
  var ssTime = slideshow.getAttribute('data-ssTime') || 3000;
  var ssPos = slideshow.getAttribute('data-ssPos') || 1;
  var ssHeight = slideshow.getAttribute('data-ssHeight') || '0';
  var ssNav = slideshow.getAttribute('data-ssNav') || "off";
  var ssDot = slideshow.getAttribute('data-ssDot') || "off";
  var ssAnim = slideshow.getAttribute('data-ssAnim') || "animOff";
  var ssPlay = slideshow.getAttribute('data-ssPlay') || "off";
  var ssCont = slideshow.getAttribute('data-ssCont') || "off";
  var ssThumb = slideshow.getAttribute('data-ssThumb') || "off";
  var ssHide = slideshow.getAttribute('data-ssHide') || "off";
  var ssModalGallery = slideshow.getAttribute('data-ssModalGallery') || "off";
  var timer;

  if(ssHide === 'on'){
    slideshow.setAttribute('style','display:none;');
  }

  var slides = new Array();
  this.child = slideshow.childNodes;
  ssPos = parseInt(ssPos) - 1;

  for(var i=0; i<this.child.length; i++){
    if(this.child[i].className === "slide"){
      slides.push(this.child[i]);
    }
  }

  if(slides.length < ssPos+1){
    ssPos = 0;
  }

  slides[ssPos].classList.add('currentSlide');

  var h;
  if(ssHeight === '0' || window.innerWidth < 1024){
    h = slides[ssPos].offsetHeight;
  }else{
    h = ssHeight;
  }

  slideshow.setAttribute('style','height:'+h+'px;');

  /*
  (function(){
    var ssHeightIN = ssHeight;
    window.addEventListener("resize",function(){
      var h;
      if(ssHeightIN === '0' || window.innerWidth < 1024){
        h = slides[ssPos].offsetHeight;
      }else{
        h = ssHeightIN;
      }
      slideshow.setAttribute('style','height:'+h+'px;');
    });
  })();
  */

  var autoSlide = function(){
    for(var i=0; i<slides.length; i++){
      if(slides[i].classList.contains('currentSlide')){
        slides[i].classList.remove('currentSlide');
        slides[i].classList.remove(ssAnim);
        if(i+1 === slides.length){
          slides[0].classList.add('currentSlide');
          slides[0].classList.add(ssAnim);
          ssPos = 0;
        }else{
          slides[i+1].classList.add('currentSlide');
          slides[i+1].classList.add(ssAnim);
          ssPos += 1;
        }

        dotSelected(ssPos);
        thumbSelected(ssPos);
        slideshow.setAttribute('style','height:'+h+'px;');
        break;
      }
    }
  };

  if(ssPlay === "on"){
    timer = setInterval(autoSlide,ssTime);
  }

  function dotSelected(pos){
    if(ssDot === "on"){
      this.child = containerDot.childNodes;
      for(var i=0; i<this.child.length; i++){
        if(this.child[i].classList.contains('dot')){
          this.child[i].classList.remove('dotSelected');
        }
      }
      this.child[pos].classList.add('dotSelected');
    }
  }

  if(ssDot === "on"){
    var containerDot = document.createElement("div");
    containerDot.setAttribute('class','containerDot');
    slideshow.appendChild(containerDot);

    for(var i=0; i<slides.length; i++){
      this.dot = document.createElement("div");
      this.dot.setAttribute('class','dot');
      this.dot.setAttribute('data-dotN',i);
      containerDot.appendChild(this.dot);

      this.dot.onclick = function(event){
        var dotN = parseInt(event.target.getAttribute('data-dotN'));
        for(var i=0; i<slides.length; i++){
          if(slides[i].classList.contains('currentSlide')){
            slides[i].classList.remove('currentSlide');
            slides[i].classList.remove(ssAnim);
          }
        }
        slides[dotN].classList.add('currentSlide');
        slides[dotN].classList.add(ssAnim);

        ssPos = dotN;
        dotSelected(ssPos);
        thumbSelected(ssPos);
        slideshow.setAttribute('style','height:'+h+'px;');

        if(ssPlay === "on"){
          clearInterval(timer);
          timer = setInterval(autoSlide,ssTime);
        }
      };
    }
    dotSelected(ssPos);
  }

  if(ssCont === "on"){
    this.cont = document.createElement("div");
    this.cont.setAttribute('class','control');

    if(ssPlay === "on"){
      this.cont.setAttribute('class','control pause');
    }else{
      this.cont.setAttribute('class','control play');
    }

    slideshow.appendChild(this.cont);

    this.cont.onclick = function(event){
      if(ssPlay === "on"){
        ssPlay = "off";
        event.target.setAttribute('class','control play');
        clearInterval(timer);
      }else if(ssPlay === "off"){
        ssPlay = "on";
        event.target.setAttribute('class','control pause');
        timer = setInterval(autoSlide,ssTime);
      }
    };
  }

  if(ssNav === "on"){
    this.next = document.createElement("div");
    this.prev = document.createElement("div");
    this.next.setAttribute('class','next');
    this.prev.setAttribute('class','prev');
    slideshow.appendChild(this.next);
    slideshow.appendChild(this.prev);

    this.next.onclick = function(){
      slideLeft();
    };

    this.prev.onclick = function(){
       slideRight();
    };
  }

  function slideLeft(){
    for(var i=0; i<slides.length; i++){
      if(i === ssPos){
        slides[i].classList.remove('currentSlide');
        slides[i].classList.remove(ssAnim);
        if(i+1 === slides.length){
          slides[0].classList.add('currentSlide');
          slides[0].classList.add(ssAnim);
          ssPos = 0;
        }else{
          slides[i+1].classList.add('currentSlide');
          slides[i+1].classList.add(ssAnim);
          ssPos += 1;
        }

        dotSelected(ssPos);
        thumbSelected(ssPos);
        slideshow.setAttribute('style','height:'+h+'px;');
        break;
      }
    }
    if(ssPlay === "on"){
      clearInterval(timer);
      timer = setInterval(autoSlide,ssTime);
    }
  }

  function slideRight(){
    for(var i=0; i<slides.length; i++){
      if(i === ssPos){
        slides[i].classList.remove('currentSlide');
        slides[i].classList.remove(ssAnim);
        if(i-1 < 0){
          slides[slides.length-1].classList.add('currentSlide');
          slides[slides.length-1].classList.add(ssAnim);
          ssPos = slides.length-1;
        }else{
          slides[i-1].classList.add('currentSlide');
          slides[i-1].classList.add(ssAnim);
          ssPos -= 1;
        }

        dotSelected(ssPos);
        thumbSelected(ssPos);
        slideshow.setAttribute('style','height:'+h+'px;');
        break;
      }
    }
    if(ssPlay === "on"){
      clearInterval(timer);
      timer = setInterval(autoSlide,ssTime);
    }
  }


  var SpageX = 0;
  var SpageY = 0;
  var CpageX = 0;
  var CpageY = 0;
  var deltaX = 0;
  var deltaY = 0;



  slideshow.addEventListener("touchstart", function(event){
    SpageX = event.touches[0].pageX;
    SpageY = event.touches[0].pageY;
  });

  slideshow.addEventListener("touchmove", function(event){
    CpageX = event.touches[0].pageX;
    CpageY = event.touches[0].pageY;
    deltaX = Math.abs(SpageX - CpageX);
    deltaY = Math.abs(SpageY - CpageY);
  });

  slideshow.addEventListener("touchend", function(event){
    var swipeAngle = null;
    var r = Math.atan2(CpageX - SpageX, SpageY - CpageY);
    swipeAngle = Math.round(r*180/Math.PI);
    if(swipeAngle < 0){
      swipeAngle =  360 - Math.abs(swipeAngle);
    }
    var swipeDirection = null;
    if((swipeAngle >= 45 && swipeAngle <= 135) && deltaX >= 45){
      slideRight();
    }else if((swipeAngle > 135 && swipeAngle < 225) && deltaY >= 45){
      swipeDirection = 'down';
    }else if((swipeAngle >= 225 && swipeAngle) <= 315 && deltaX >= 45){
      slideLeft();
    }else if((swipeAngle > 315 || swipeAngle < 45) && deltaY >= 45){
      swipeDirection = 'up';
    }
  });





  function thumbSelected(pos){
    if(ssThumb === "on" && ssHide === "off"){
      this.child = containerThumb.childNodes;
      for(var i=0; i<this.child.length; i++){
        if(this.child[i].classList.contains('thumb')){
          this.child[i].classList.remove('thumbSelected');
        }
      }
      this.child[pos].classList.add('thumbSelected');
    }
  }

  if(ssThumb === "on"){
    var containerThumb = document.createElement("div");
    containerThumb.setAttribute('class','containerThumb');
    slideshow.parentNode.appendChild(containerThumb);

    for(var i=0; i<slides.length; i++){
      var child = slides[i].childNodes;
      for(var x=0; x<child.length; x++){
        if(child[x] == '[object HTMLImageElement]'){
          this.thumb = document.createElement("div");
          this.thumb.setAttribute('class','thumb');
          this.thumb.setAttribute('data-thumbN',i);
          this.thumb.setAttribute('style','background-image:url("'+child[x].src+'");');
          containerThumb.appendChild(this.thumb);
        }
      }

      this.thumb.onclick = function(event){
        var thumbN = parseInt(event.target.getAttribute('data-thumbN'));
        for(var i=0; i<slides.length; i++){
          if(slides[i].classList.contains('currentSlide')){
            slides[i].classList.remove('currentSlide');
            slides[i].classList.remove(ssAnim);
          }
        }
        slides[thumbN].classList.add('currentSlide');
        slides[thumbN].classList.add(ssAnim);

        ssPos = thumbN;
        dotSelected(ssPos);
        thumbSelected(ssPos);
        slideshow.setAttribute('style','height:'+h+'px;');

        if(ssPlay === "on"){
          clearInterval(timer);
          timer = setInterval(autoSlide,ssTime);
        }

        if(ssModalGallery !== "off"){
          document.getElementById(ssModalGallery).getElementsByClassName("slideshow")[0].innerHTML = '';
          Modal(ssModalGallery);
          var divSs = document.getElementById(ssModalGallery).getElementsByClassName('slideshow')[0];
          divSs.setAttribute('data-ssPos',thumbN+1);
          var divS;
          var imgSs;
          for(i=0; i<slides.length; i++){
            divS = document.createElement("div");
            divS.setAttribute('class','slide');
            imgSs = slides[0].childNodes;
            imgSs = document.createElement("img");
            var cns = slides[i].childNodes;
            for(var x=0; x<cns.length; x++){
              if(cns[x] instanceof HTMLImageElement){
                var src = cns[x].src;
                var alt = cns[x].alt;
              }
            }
            imgSs.src = src;
            imgSs.alt = alt;
            divS.appendChild(imgSs);
            divSs.appendChild(divS);
          }
          document.getElementById(ssModalGallery).appendChild(divSs);
          new SlideShow(divSs);
        }

      };
    }
    thumbSelected(ssPos);
  }

}

/*
  Class: Tab
  Permette la navigazione tra div attaverso dei tab
*/
function Tab(el){
  this.el = el;
  this.tabButtons;
  if(this.el.getElementsByClassName('tabButton')){
    this.tabButtons = this.el.getElementsByClassName('tabButton');
    if(this.el.getElementsByClassName('tab')){
      this.el.getElementsByClassName('tab')[this.el.getElementsByClassName('tabButtonActive')[0].getAttribute('data-tContent')-1].classList.add('tabActive');
    }
    for(var i=0; i<this.tabButtons.length; i++){
      this.tabButtons[i].addEventListener("click",function(){
        el.getElementsByClassName('tabButtonActive')[0].classList.remove('tabButtonActive');
        el.getElementsByClassName('tabActive')[0].classList.remove('tabActive');
        this.classList.add('tabButtonActive');
        el.getElementsByClassName('tab')[this.getAttribute('data-tContent')-1].classList.add('tabActive');
      });
    }
  }
}

/*
  Class: TabMenu
  Permette la navigazione tra div attaverso dei tab
*/
function TabMenu(el){
  var tabMenuButtons;
  if(el.getElementsByClassName('tabMenuButton')){
    tabMenuButtons = el.getElementsByClassName('tabMenuButton');
    if(el.getElementsByClassName('tabItem')){
      document.getElementById(el.getElementsByClassName('tabMenuButtonActive')[0].getAttribute('data-tContent')).classList.add('tabItemActive');
    }
    for(var i=0; i<tabMenuButtons.length; i++){
      tabMenuButtons[i].addEventListener("click",function(){
        el.getElementsByClassName('tabMenuButtonActive')[0].classList.remove('tabMenuButtonActive');
        el.getElementsByClassName('tabItemActive')[0].classList.remove('tabItemActive');
        this.classList.add('tabMenuButtonActive');
        document.getElementById(this.getAttribute('data-tContent')).classList.add('tabItemActive');
      });
    }
  }
}

/*
  Class: TabRadio
  Permette la navigazione tra div attaverso dei radio button
*/
function TabRadio(el){
  var tabRadio;
  if(el.getElementsByClassName('tabRadio')){
    tabRadio = el.getElementsByClassName('tabRadio');
    for(var i=0; i<tabRadio.length; i++){
      if(tabRadio[i].checked){
        el.getElementsByClassName('tabR')[tabRadio[i].getAttribute('data-tContent')-1].classList.add('tabRActive');
      }
      tabRadio[i].addEventListener("click",function(){
        el.getElementsByClassName('tabRActive')[0].classList.remove('tabRActive');
        el.getElementsByClassName('tabR')[this.getAttribute('data-tContent')-1].classList.add('tabRActive');
      });
    }
  }
}

/*
  Class: TabSelect
  Permette la navigazione tra div attaverso una select
*/
function TabSelect(el){
  var tabSelect;
  if(el.getElementsByClassName('tabSelect')[0]){
    tabSelect = el.getElementsByClassName('tabSelect')[0];
    if(el.getElementsByClassName('tabS')[tabSelect.options[tabSelect.selectedIndex].getAttribute('data-tContent')-1]){
      el.getElementsByClassName('tabS')[tabSelect.options[tabSelect.selectedIndex].getAttribute('data-tContent')-1].classList.add('tabSActive');
    }
    tabSelect.addEventListener("change",function(){
      if(el.getElementsByClassName('tabSActive')[0]){
        el.getElementsByClassName('tabSActive')[0].classList.remove('tabSActive');
      }
      el.getElementsByClassName('tabS')[tabSelect.options[tabSelect.selectedIndex].getAttribute('data-tContent')-1].classList.add('tabSActive');
    });
  }
}

/*
  Function: ToastNotification
  Crea una notifica toast che spunta da un lato dello schermo per dare un avviso della durata impostata
*/
function ToastNotification(id,fn){
  var toast = document.getElementById(id);
  if(!toast.classList.contains('toastOpened')){
    var tnDuration = toast.getAttribute('data-tnDuration') || 3;
    toast.classList.add('toastOpened');
    toast.setAttribute('style','animation-duration: '+tnDuration+'s;-webkit-animation-duration: '+tnDuration+'s;');
    if(fn){
      fn();
    }
    setTimeout(function(){
      toast.classList.remove('toastOpened');
    },tnDuration * 1000);
  }
}

/*
  Class: Tooltip
  Crea un tooltip per l'elemento selezionato
*/
function Tooltip(el){
  this.el = el;
  this.ttHtml = this.el.getAttribute('data-ttHtml') || '';
  this.ttPos = this.el.getAttribute('data-ttPos') || 'right';
  this.ttWidth = this.el.getAttribute('data-ttWidth') || '300';
  var ttAutoClose = this.el.getAttribute('data-ttAutoClose') || 'on';

  if(!this.el.getElementsByClassName('tooltipEl')[0]){
    var tt = document.createElement("div");
    tt.setAttribute('class','tooltipEl');
    tt.innerHTML = this.ttHtml;
    tt.setAttribute('style','width:'+this.ttWidth+'px;');
    this.el.appendChild(tt);

    var elWidth = this.el.offsetWidth;
    var elHeight = this.el.offsetHeight;
    var ttWidth = this.ttWidth;
    var ttHeight = tt.offsetHeight;

    var top = - ((ttHeight/2) - (elHeight/2));
    var left = - ((ttWidth/2) - (elWidth/2));

    if(window.innerWidth < 1024){
      tt.setAttribute('style','width:'+ttWidth+'px;top:'+(elHeight+10)+'px;left:'+left+'px;');
    }else{
      if(this.ttPos === 'top'){
        tt.setAttribute('style','width:'+ttWidth+'px;top:-'+(ttHeight+10)+'px;left:'+left+'px;');
      }else if(this.ttPos === 'bottom'){
        tt.setAttribute('style','width:'+ttWidth+'px;top:'+(elHeight+10)+'px;left:'+left+'px;');
      }else if(this.ttPos === 'left'){
        tt.setAttribute('style','width:'+ttWidth+'px;right:'+(elWidth+10)+'px;top:'+top+'px;');
      }else{
        tt.setAttribute('style','width:'+ttWidth+'px;left:'+(elWidth+10)+'px;top:'+top+'px;');
      }
    }
    tt.classList.add('tooltipElV');
  }

  if(ttAutoClose === 'on'){
    el.addEventListener('mouseout',function(event){
      if(typeof tt !== 'undefined' && tt.parentNode === el){
        el.removeChild(tt);
      }
    },false);
  }else{
    document.addEventListener('click',function(event){
      if(event.target !== el){
        if(typeof tt !== 'undefined' && tt.parentNode === el){
          el.removeChild(tt);
        }
      }
    },false);
  }

}

/*
  Object: Wysiwyg
  Mini editor html
*/
function Wysiwyg(wysiwyg){
  var editor = wysiwyg.getElementsByClassName('editor')[0];
  editor.setAttribute('contenteditable','true');
  editor.onkeyup = function(){
    commandState();
    htmlCode();
  };

  var range;
  editor.onblur = function(){
    range = window.getSelection().getRangeAt(0);
  };

  var wyParSep = wysiwyg.getAttribute('data-wyParSep') || 'p';
  editor.onfocus = function(){
    document.execCommand('defaultParagraphSeparator', false, wyParSep);
  };

  var contText = wysiwyg.getElementsByClassName('contText')[0];
  var text = wysiwyg.getElementsByClassName('text')[0];

  if(wysiwyg.getElementsByClassName('pw_bold')[0]){
    var pw_bold = wysiwyg.getElementsByClassName('pw_bold')[0];
    pw_bold.onclick = function(event){
      pwCommand(event,'bold',null);
      htmlCode();
    };
  }

  if(wysiwyg.getElementsByClassName('pw_italic')[0]){
    var pw_italic = wysiwyg.getElementsByClassName('pw_italic')[0];
    pw_italic.onclick = function(event){
      pwCommand(event,'italic',null);
      htmlCode();
    };
  }

  if(wysiwyg.getElementsByClassName('pw_underline')[0]){
    var pw_underline = wysiwyg.getElementsByClassName('pw_underline')[0];
    pw_underline.onclick = function(event){
      pwCommand(event,'underline',null);
      htmlCode();
    };
  }

  if(wysiwyg.getElementsByClassName('pw_insertunorderedlist')[0]){
    var pw_insertunorderedlist = wysiwyg.getElementsByClassName('pw_insertunorderedlist')[0];
    pw_insertunorderedlist.onclick = function(event){
      pwCommand(event,'insertunorderedlist',null);
      htmlCode();
    };
  }

  if(wysiwyg.getElementsByClassName('pw_link')[0]){
    var pw_link = wysiwyg.getElementsByClassName('pw_link')[0];
    pw_link.onclick = function(event){
      pwLink(event);
      htmlCode();
    };
  }

  if(wysiwyg.getElementsByClassName('pw_unlink')[0]){
    var pw_unlink = wysiwyg.getElementsByClassName('pw_unlink')[0];
    pw_unlink.onclick = function(event){
      pwCommand(event,'unlink',null);
      htmlCode();
    };
  }

  if(wysiwyg.getElementsByClassName('pw_html')[0]){
    var pw_html = wysiwyg.getElementsByClassName('pw_html')[0];
    pw_html.onclick = function(event){
      showHtml(event);
    };
  }

  if(wysiwyg.getElementsByClassName('wInsertNode')[0]){
    var wInsertNode = wysiwyg.getElementsByClassName('wInsertNode')[0];
    wInsertNode.onchange = function(event){
      insertNode(event,wInsertNode.value);
    };
  }

  function pwLink(event){
    event.preventDefault();
    editor.focus();
    var link = prompt("Insert the link:", "http://");
    pwCommand(event,'createlink',link);
  };

  function pwCommand(event,cmd,val){
    event.preventDefault();
    editor.focus();
    document.execCommand(cmd,false,val);
    commandState();
  };

  function commandState(){
    var command = new Array('bold','italic','underline','insertunorderedlist');
    command.forEach(function(cmd){
      if(document.queryCommandState(cmd) === true){
        wysiwyg.getElementsByClassName('pw_'+cmd)[0].classList.add('pw_sel');
      }else if(document.queryCommandState(cmd) === false){
        wysiwyg.getElementsByClassName('pw_'+cmd)[0].classList.remove('pw_sel');
      }
    });
  };

  function htmlCode(){
    var content = editor.innerHTML;
    text.value = content;
    clearCode();
  };

  function clearCode(){
    var code = text.value;
    var res_1 = code.replace(/<img>/gi,"");
    var res_2 = res_1.replace(/<p><\/p>/gi,"");
    var res_3 = res_2.replace(/<div><\/div>/gi,"");
    var res_4 = res_3.replace(/<br>/gi,"<br />");
    text.value = res_4;
  };

  function reverseInner(){
    if(text.value !== ''){
      editor.focus();
      editor.innerHTML = '';
      document.execCommand('inserthtml',false,text.value);
    }
    clearCode();
  };
  //reverseInner();

  function showHtml(event){
    event.preventDefault();
    contText.setAttribute('style','display:block');
    var button = document.createElement("button");
    button.setAttribute('class','pw pw_save');
    button.onclick = function(event){
      doneHtml(event);
    };
    button.innerHTML = "Done";
    contText.appendChild(button);
  };

  function doneHtml(event){
    event.preventDefault();
    editor.focus();
    editor.innerHTML = '';
    document.execCommand('inserthtml',false,text.value);
    contText.removeAttribute('style');
  }

  function insertNode(event,html){
    event.preventDefault();
    var span = document.createElement('span');
    span.innerHTML = html;
    editor.focus();
    if(!range){
      var ev = new Event('blur');
      editor.dispatchEvent(ev);
    }
    range.insertNode(span);
    htmlCode();
  }
}



/****************************************************/
/*
 * Eventi e funzioni di sistema per l'utilizzo delle ui
 */
/****************************************************/

/*START onload functions*/

window.addEventListener("load",function(){

  //Accordion
  if(document.getElementsByClassName('accordion')){
    var accordion = document.getElementsByClassName('accordion');
    for(var i=0; i<accordion.length; i++){
      new Accordion(accordion[i]);
    }
  }

  //AddFile
  if(document.getElementsByClassName('addFile')){
    var addFile = document.getElementsByClassName('addFile');
    for(var i=0; i<addFile.length; i++){
      new AddFile(addFile[i]);
    }
  }

  //Calendar
  if(document.getElementsByClassName('calendar')){
    var calendar = document.getElementsByClassName('calendar');
    for(i=0; i<calendar.length; i++){
      if(calendar[i].getAttribute('data-cAutoLoad') !== 'off'){
        new Calendar({el: calendar[i]});
      }
    }
  }

  //FadeImage
  if(document.getElementsByClassName('fadeImage')){
    var img = document.getElementsByClassName('fadeImage');
    for(var i=0; i<img.length; i++){
      img[i].classList.add('fadeImageV');
    }
  }

  //Flexbox Layout
  if(document.getElementById('toggle-left')){
    document.getElementById('toggle-left').onclick = function(){
      if(document.getElementById('aside-left').classList.contains('toggle-l-visible')){
        document.getElementById('aside-left').classList.remove('toggle-l-visible');
        document.getElementById('toggle-left').classList.remove('icon_rotate');
        document.body.classList.remove('body-block');
      }else{
        document.getElementById('aside-left').classList.add('toggle-l-visible');
        document.getElementById('toggle-left').classList.add('icon_rotate');
        document.body.classList.add('body-block');
      }
    };
  }

  if(document.getElementById('toggle-right')){
    document.getElementById('toggle-right').onclick = function(){
      if(document.getElementById('aside-right').classList.contains('toggle-r-visible')){
        document.getElementById('aside-right').classList.remove('toggle-r-visible');
        document.getElementById('toggle-right').classList.remove('icon_rotate');
        document.body.classList.remove('body-block');
      }else{
        document.getElementById('aside-right').classList.add('toggle-r-visible');
        document.getElementById('toggle-right').classList.add('icon_rotate');
        document.body.classList.add('body-block');
      }
    };
  }

  //DropDownMenu
  if(document.getElementsByClassName('dropDownMenu')){
    var dropDownMenu = document.getElementsByClassName('dropDownMenu');
    for(var i=0; i<dropDownMenu.length; i++){
      new DropDownMenu(dropDownMenu[i]);
    }
  }

  //LayerConfigurator
  if(document.getElementsByClassName('layerConfigurator')){
    var layerConfigurator = document.getElementsByClassName('layerConfigurator');
    for(var i=0; i<layerConfigurator.length; i++){
      new LayerConfigurator(layerConfigurator[i]);
    }
  }

  //MailForm
  if(document.getElementsByClassName('mailForm')){
    var mailForm = document.getElementsByClassName('mailForm');
    for(var i=0; i<mailForm .length; i++){
      if(mailForm[i].getAttribute('data-mfAutoLoad') !== 'off'){
        new MailForm({el: mailForm[i]});
      }
    }
  }

  //MainMenu
  if(document.getElementById('mainMenu')){
    var mainMenu = document.getElementById('mainMenu');
    var mmFixed = mainMenu.getAttribute('data-mmFixed') || "off";
    var mmHeightToFixed = mainMenu.getAttribute('data-mmHeightToFixed') || "off";

    var mobileMenu = document.createElement("div");
    mobileMenu.id = 'mobileMenu';
    var span = document.createElement("span");
    mainMenu.appendChild(mobileMenu);
    mobileMenu.appendChild(span);
    mobileMenu.onclick = function(){
      if(document.getElementById('mainMenuNav').classList.contains('mainMenuV')){
        document.getElementById('mainMenuNav').classList.remove('mainMenuV');
        document.getElementById('mobileMenu').classList.remove('icon_rotate');
        document.body.classList.remove('body-block');
      }else{
        if(document.getElementsByClassName('toggle-l-visible')[0]){
          document.getElementsByClassName('toggle-l-visible')[0].classList.remove('toggle-l-visible');
          document.getElementById('toggle-left').classList.remove('icon_rotate');
        }
        if(document.getElementsByClassName('toggle-r-visible')[0]){
          document.getElementsByClassName('toggle-r-visible')[0].classList.remove('toggle-r-visible');
          document.getElementById('toggle-right').classList.remove('icon_rotate');
        }
        document.getElementById('mainMenuNav').classList.add('mainMenuV');
        document.getElementById('mobileMenu').classList.add('icon_rotate');
        document.body.classList.add('body-block');
      }
    };

    if(window.innerWidth < 1024){
      mmFixed = "on";
    }

    if(mmFixed === "on"){
      if(!document.getElementById('fixedPosition')){
        mainMenu.classList.add('mmFixed');
        var div = document.createElement("div");
        div.id = 'fixedPosition';
        div.setAttribute('style','height:'+mainMenu.offsetHeight+'px;');
        var s = document.body.firstChild;
        s.parentNode.insertBefore(div, s);
      }
    }else{
      if(mmHeightToFixed !== "off"){
        initMainMenu();
      }
    }
  }

  //InputRating
  if(document.getElementsByClassName('inputRating')){
    var inputRating = document.getElementsByClassName('inputRating');
    for(i=0; i<inputRating.length; i++){
      new InputRating(inputRating[i]);
    }
  }

  //ScrollTo
  if(document.getElementById('menuScrollTo')){
    scrollIntervalDown = null;
    scrollIntervalUp = null;
    initMenuScrollTo();
  }

  //SlideShow
  if(document.getElementsByClassName('slideshow')){
    var slideshow = document.getElementsByClassName('slideshow');
    for(var i=0; i<slideshow.length; i++){
      if(slideshow[i].getAttribute('data-ssInSlideshow') !== 'on'){
        new SlideShow(slideshow[i]);
      }
    }
  }

  //Tab
  if(document.getElementsByClassName('tabContainer')){
    var tabContainer = document.getElementsByClassName('tabContainer');
    for(i=0; i<tabContainer.length; i++){
      new Tab(tabContainer[i]);
    }
  }

  //TabMenu
  if(document.getElementsByClassName('tabMenu')){
    var tabMenu = document.getElementsByClassName('tabMenu');
    for(i=0; i<tabMenu.length; i++){
      new TabMenu(tabMenu[i]);
    }
  }

  //TabRadio
  if(document.getElementsByClassName('tabRadioContainer')){
    var tabRadioContainer = document.getElementsByClassName('tabRadioContainer');
    for(i=0; i<tabRadioContainer.length; i++){
      new TabRadio(tabRadioContainer[i]);
    }
  }

  //TabSelect
  if(document.getElementsByClassName('tabSelectContainer')){
    var tabSelectContainer = document.getElementsByClassName('tabSelectContainer');
    for(i=0; i<tabSelectContainer.length; i++){
      new TabSelect(tabSelectContainer[i]);
    }
  }

  //Tooltip
  if(document.getElementsByClassName('tooltip')){
    var tooltip = document.getElementsByClassName('tooltip');
    var ttEvent;
    for(var i=0; i<tooltip.length; i++){
      if(window.innerWidth < 1024){
        ttEvent = 'click';
      }else{
        ttEvent = tooltip[i].getAttribute('data-ttEvent') || 'mouseover';
      }
      tooltip[i].addEventListener(ttEvent, function(){
        new Tooltip(this);
      });
    }
  }

  //Wysiwyg
  if(document.getElementsByClassName('wysiwyg')){
    var wysiwyg = document.getElementsByClassName('wysiwyg');
    for(var i=0; i<wysiwyg.length; i++){
      new Wysiwyg(wysiwyg[i]);
    }
    try{
      document.execCommand('styleWithCSS',false,true);
    }catch(e){

    }
  }

});

/*START onload functions*/



/*START onscroll functions*/

window.addEventListener("scroll",function(){

  //MainMenu
  if(document.getElementById('mainMenu')){
    var mainMenu = document.getElementById('mainMenu');
    var mmFixed = mainMenu.getAttribute('data-mmFixed');
    if(window.innerWidth < 1024){
      mmFixed = "on";
    }
    if(mmFixed !== "on"){
      initMainMenu();
    }
  }

  //ScrollTo
  if(document.getElementById('menuScrollTo')){
    initMenuScrollTo();
  }

  //ScrollPageTop
  if(document.getElementsByClassName('scrollTop')){
    var scrollTop = document.getElementsByClassName('scrollTop');
    for(var i=0; i<scrollTop.length; i++){
      var stpVisible = scrollTop[i].getAttribute('data-stpVisible') || 800;
      var stpSpeed = scrollTop[i].getAttribute('data-stpSpeed') || 300;
      if(window.pageYOffset >= stpVisible){
        scrollTop[i].classList.add('scrollTopVisible');
      }else if(window.pageYOffset < stpVisible){
        scrollTop[i].classList.remove('scrollTopVisible');
      }
      scrollTop[i].setAttribute("onclick","ScrollPageTop("+stpSpeed+")");
    }
  }

});

/*END onscroll functions*/


/*START onresize functions*/

window.addEventListener("resize",function(){

  //MainMenu
  if(document.getElementById('mainMenu')){
    var mainMenu = document.getElementById('mainMenu');
    var mmFixed = mainMenu.getAttribute('data-mmFixed');
    if(window.innerWidth < 1024){
      mmFixed = "on";
      if(!document.getElementById('fixedPosition')){
        mainMenu.classList.add('mmFixed');
        var div = document.createElement("div");
        div.id = 'fixedPosition';
        div.setAttribute('style','height:'+mainMenu.offsetHeight+'px;');
        var s = document.body.firstChild;
        s.parentNode.insertBefore(div, s);
      }
    }else{
      if(mmFixed !== "on"){
        if(document.getElementById('fixedPosition')){
          document.getElementById('fixedPosition').parentNode.removeChild(document.getElementById('fixedPosition'));
        }
      }
    }
    if(mmFixed !== "on"){
      initMainMenu();
    }
  }

});

/*END onresize functions*/



/*START Init functions*/

//ScrollTo
function initMenuScrollTo(){
  var stHeightToFix = document.getElementById('containerScrollTo').getAttribute('data-stHeightToFix') || 50;
  var menu = document.getElementById('menuScrollTo');
  if(window.pageYOffset > stHeightToFix){
    menu.classList.add('fixed');
  }else{
    menu.classList.remove('fixed');
  }
}

//MainMenu
function initMainMenu(){
  var mainMenu = document.getElementById('mainMenu');
  var mmHeightToFixed = mainMenu.getAttribute('data-mmHeightToFixed') || "off";
  if(mmHeightToFixed !== "off"){
    if(mmHeightToFixed === "default"){
      mmHeightToFixed = mainMenu.offsetHeight;
    }
    if(window.pageYOffset > mmHeightToFixed){
      mainMenu.classList.add('mmFixed');
    }else{
      mainMenu.classList.remove('mmFixed');
    }
  }
}

/*END Init functions*/



/*START Utils function*/

function checkParentWithId(parent,id){
  if(parent !== document){
    if(parent.id === id){
      return true;
    }else{
      return checkParentWithId(parent.parentNode,id);
    }
  }else{
    return false;
  }
}

function checkParentWithClass(parent,cl){
  if(parent !== document && parent !== null){
    if(parent.classList.contains(cl)){
      return true;
    }else{
      return checkParentWithClass(parent.parentNode,cl);
    }
  }else{
    return false;
  }
}

function nodeToHtml(node){
  var html = Array.prototype.reduce.call(node, function(html, node){
    return html + (node.outerHTML || node.nodeValue);
  }, "");
  return html;
}

/*END Utils function*/
