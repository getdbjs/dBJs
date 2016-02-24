/*
  dBJs Library Version 1.2.6
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
 * Class: dBJs
 * Permette la selezione e la manipolazione degli elementi del DOM
 */
/****************************************************/

function dBJs(es){
  /* 
    this.el contiene l'oggetto o la collezione di oggetti del DOM selezionati 
    this.sel contiene il selettore '#' o '.' 
  */
  this.el;
  if(es != undefined){
    this.sel = es.charAt(0);
    if(this.sel === '#'){
      this.el = document.getElementById(es.replace('#',''));
    }else if(this.sel === '.'){
      this.el = document.getElementsByClassName(es.replace('.',''));
    }
  }
  
  /*
    Metodo: addCl
    Aggiunge una classe all'elmento o alla collezione di elementi selezionati
    Argomenti:
      - [string] val : nome classe
  */
  this.addCl = function(val){
    if(this.sel === '#'){
      this.el.classList.add(val);
    }else if(this.sel === '.'){
      for(var i=0; i<this.el.length; i++){
        this.el[i].classList.add(val);
      }
    }
  };
  
  /*
    Metodo: addEv
    Aggiunge uno o piÃ¹ eventi all'elemento o alla collezione di elementi selezionati
    Argomenti:
      - [object] obj : oggetto contenete la lista degli eventi con relative funzioni da applicare alla selezione
  */
  this.addEv = function(obj){
    this.blur = obj.blur;
    this.change = obj.change;
    this.click = obj.click;
    this.focus = obj.focus;
    this.keydown = obj.keydown;
    this.keypress = obj.keypress;
    this.keyup = obj.keyup;
    this.mouseout = obj.mouseout;
    this.mouseover = obj.mouseover;
    
    if(this.sel === '#'){
      if(this.blur){
        this.el.addEventListener('blur', this.blur, false);
      }
      if(this.change){
        this.el.addEventListener('change', this.change, false);
      }
      if(this.click){
        this.el.addEventListener('click', this.click.fn, false);
      }
      if(this.focus){
        this.el.addEventListener('focus', this.focus, false);
      }
      if(this.keydown){
        this.el.addEventListener('keydown', this.keydown, false);
      }
      if(this.keypress){
        this.el.addEventListener('keypress', this.keypress, false);
      }
      if(this.keyup){
        this.el.addEventListener('keyup', this.keyup, false);
      }
      if(this.mouseout){
        this.el.addEventListener('mouseout', this.mouseout, false);
      }
      if(this.mouseover){
        this.el.addEventListener('mouseover', this.mouseover, false);
      }
    }else if(this.sel === '.'){
      for(var i=0; i<this.el.length; i++){
        if(this.blur){
          this.el[i].addEventListener('blur', this.blur, false);
        }
        if(this.change){
          this.el[i].addEventListener('change', this.change, false);
        }
        if(this.click){
          this.el[i].addEventListener('click', this.click, false);
        }
        if(this.focus){
          this.el[i].addEventListener('focus', this.focus, false);
        }
        if(this.keydown){
          this.el[i].addEventListener('keydown', this.keydown, false);
        }
        if(this.keypress){
          this.el[i].addEventListener('keypress', this.keypress, false);
        }
        if(this.keyup){
          this.el[i].addEventListener('keyup', this.keyup, false);
        }
        if(this.mouseout){
          this.el[i].addEventListener('mouseout', this.mouseout, false);
        }
        if(this.mouseover){
          this.el[i].addEventListener('mouseover', this.mouseover, false);
        }
      }
    }
  };

  /*
    Metodo: addEvOverride
    Aggiunge uno o piÃ¹ eventi all'elemento o alla collezione di elementi selezionati sovrascrivendo gli eventi scritti in linea
    Argomenti:
      - [object] obj : oggetto contenete la lista degli eventi con relative funzioni da applicare alla selezione
  */
  this.addEvOverride = function(obj){
    this.blur = obj.blur;
    this.change = obj.change;
    this.click = obj.click;
    this.focus = obj.focus;
    this.keydown = obj.keydown;
    this.keypress = obj.keypress;
    this.keyup = obj.keyup;
    this.mouseout = obj.mouseout;
    this.mouseover = obj.mouseover;
    
    if(this.sel === '#'){
      if(this.blur){
        this.el.onblur = null;
        this.el.addEventListener('blur', this.blur, false);
      }
      if(this.change){
        this.el.onchange = null;
        this.el.addEventListener('change', this.change, false);
      }
      if(this.click){
        this.el.onclick = null;
        this.el.addEventListener('click', this.click, false);
      }
      if(this.focus){
        this.el.onfocus = null;
        this.el.addEventListener('focus', this.focus, false);
      }
      if(this.keydown){
        this.el.onkeydown = null;
        this.el.addEventListener('keydown', this.keydown, false);
      }
      if(this.keypress){
        this.el.onkeypress = null;
        this.el.addEventListener('keypress', this.keypress, false);
      }
      if(this.keyup){
        this.el.onkeyup = null;
        this.el.addEventListener('keyup', this.keyup, false);
      }
      if(this.mouseout){
        this.el.onmouseout = null;
        this.el.addEventListener('mouseout', this.mouseout, false);
      }
      if(this.mouseover){
        this.el.onmouseover = null;
        this.el.addEventListener('mouseover', this.mouseover, false);
      }
    }else if(this.sel === '.'){
      for(var i=0; i<this.el.length; i++){
        if(this.blur){
          this.el[i].onblur = null;
          this.el[i].addEventListener('blur', this.blur, false);
        }
        if(this.change){
          this.el[i].onchange = null;
          this.el[i].addEventListener('change', this.change, false);
        }
        if(this.click){
          this.el[i].onclick = null;
          this.el[i].addEventListener('click', this.click, false);
        }
        if(this.focus){
          this.el[i].onfocus = null;
          this.el[i].addEventListener('focus', this.focus, false);
        }
        if(this.keydown){
          this.el[i].onkeydown = null;
          this.el[i].addEventListener('keydown', this.keydown, false);
        }
        if(this.keypress){
          this.el[i].onkeypress = null;
          this.el[i].addEventListener('keypress', this.keypress, false);
        }
        if(this.keyup){
          this.el[i].onkeyup = null;
          this.el[i].addEventListener('keyup', this.keyup, false);
        }
        if(this.mouseout){
          this.el[i].onmouseout = null;
          this.el[i].addEventListener('mouseout', this.mouseout, false);
        }
        if(this.mouseover){
          this.el[i].onmouseover = null;
          this.el[i].addEventListener('mouseover', this.mouseover, false);
        }
      }
    }
  };

  /*
    Metodo: append
    Appende l'elemento passato come paramentro all'elemento selezionato o al primo elemento della collezione di elementi selezionati
    Argomenti:
      - [object] obj : elemento da appendere
  */
  this.append = function(obj){
    if(this.sel === '#'){
      this.el.appendChild(obj);
    }else if(this.sel === '.'){
      this.el[0].appendChild(obj);
    }
  };

  /*
    Metodo: chg
    Esegue una funzione all'evento onchange sull'elmento o sulla collezione di elementi selezionati
    Argomenti:
      - [function] fn : funzione
  */
  this.chg = function(fn){
    if(this.sel === '#'){
      this.el.onchange = fn;
    }else if(this.sel === '.'){
      for(var i=0; i<this.el.length; i++){
        this.el[i].onchange = fn;
      }
    }
  };
  
  /*
    Metodo: clk
    Esegue una funzione all'evento onclick sull'elmento o sulla collezione di elementi selezionati
    Argomenti:
      - [function] fn : funzione
  */
  this.clk = function(fn){
    if(this.sel === '#'){
      this.el.onclick = fn;
    }else if(this.sel === '.'){
      for(var i=0; i<this.el.length; i++){
        this.el[i].onclick = fn;
      }
    }
  };

  /*
    Metodo: clone
    Restituisce la copia di un elemento selezionato o la copia del primo elemento della collezione selezionata
  */
  this.clone = function(){
    if(this.sel === '#'){
      return this.el.cloneNode(true);
    }else if(this.sel === '.'){
      return this.el[0].cloneNode(true);
    }
  };

  /*
    Metodo: css
    Setta l'attibuto style all'elmento o alla collezione di elementi selezionati
    Argomenti:
      - [string] val : valore attributo style
  */ 
  this.css = function(val){
    if(this.sel === '#'){
      this.el.setAttribute('style',val);
    }else if(this.sel === '.'){
      for(var i=0; i<this.el.length; i++){
        this.el[i].setAttribute('style',val);
      }
    }
  };

  /*
    Metodo: fcs
    Esegue una funzione all'evento onfocus sull'elmento o sulla collezione di elementi selezionati
    Argomenti:
      - [function] fn : funzione
  */
  this.fcs = function(fn){
    if(this.sel === '#'){
      this.el.onfocus = fn;
    }else if(this.sel === '.'){
      for(var i=0; i<this.el.length; i++){
        this.el[i].onfocus = fn;
      }
    }
  };
  
  /*
    Metodo: fdIn
    Esegue un effetto fede in su un elemento portandolo ad opacity 1 con una transition css
    Argomenti:
      - [int] val : tempo transizione in millisecondi
  */
  this.fdIn = function(val){
    if($D.selExists('.fdIn') === false){
      var style = document.createElement('style');
      document.head.appendChild(style);
      style.sheet.insertRule('.fdIn{transition:'+parseInt(val)/1000+'s; opacity:1 !important;}',0);
    }else{
      var ss = $D.sylSheets('.fdIn');
      ss.deleteRule(0);
      ss.insertRule('.fdIn{transition:'+parseInt(val)/1000+'s; opacity:1 !important;}',0);
    }
    if(this.sel === '#'){
      this.el.classList.add('fdIn');
      if(this.el.classList.contains('fdOut')){
        this.el.classList.remove('fdOut');
      }
    }else if(this.sel === '.'){
      for(var i=0; i<this.el.length; i++){
        this.el[i].classList.add('fdIn');
        if(this.el[i].classList.contains('fdOut')){
          this.el[i].classList.remove('fdOut');
        }
      }
    }
  };
  
  /*
    Metodo: fdOut
    Esegue un effetto fede out su un elemento portandolo ad opacity 0 con una transition css
    Argomenti:
      - [int] val : tempo transizione in millisecondi
  */
  this.fdOut = function(val){
    if($D.selExists('.fdOut') === false){
      var style = document.createElement('style');
      document.head.appendChild(style);
      style.sheet.insertRule('.fdOut{transition:'+parseInt(val)/1000+'s; opacity:0 !important;}',0);
    }else{
      var ss = $D.sylSheets('.fdOut');
      ss.deleteRule(0);
      ss.insertRule('.fdOut{transition:'+parseInt(val)/1000+'s; opacity:0 !important;}',0);
    }
    if(this.sel === '#'){
      this.el.classList.add('fdOut');
      if(this.el.classList.contains('fdIn')){
        this.el.classList.remove('fdIn');
      }
    }else if(this.sel === '.'){
      for(var i=0; i<this.el.length; i++){
        this.el[i].classList.add('fdOut');
        if(this.el[i].classList.contains('fdIn')){
          this.el[i].classList.remove('fdIn');
        }
      }
    }
  };
  
  /*
    Metodo: fdTog
    Esegue un effetto fede in e fade out alternato all'evento su un elemento con una transition css
    Argomenti:
      - [int] val : tempo transizione in millisecondi
  */
  this.fdTog = function(val){
    if($D.selExists('.fdOut') === false){
      var style = document.createElement('style');
      document.head.appendChild(style);
      style.sheet.insertRule('.fdOut{transition:'+parseInt(val)/1000+'s; opacity:0 !important;}',0);
    }else{
      var ss = $D.sylSheets('.fdOut');
      ss.deleteRule(0);
      ss.insertRule('.fdOut{transition:'+parseInt(val)/1000+'s; opacity:0 !important;}',0);
    }
    if($D.selExists('.fdIn') === false){
      var style = document.createElement('style');
      document.head.appendChild(style);
      style.sheet.insertRule('.fdIn{transition:'+parseInt(val)/1000+'s; opacity:1 !important;}',0);
    }else{
      var ss = $D.sylSheets('.fdIn');
      ss.deleteRule(0);
      ss.insertRule('.fdIn{transition:'+parseInt(val)/1000+'s; opacity:1 !important;}',0);
    }
    if(this.sel === '#'){
      if(this.el.classList.contains('fdOut')){
        this.el.classList.add('fdIn');
        this.el.classList.remove('fdOut');
      }else if(this.el.classList.contains('fdIn')){
        this.el.classList.add('fdOut');
        this.el.classList.remove('fdIn');
      }else if(window.getComputedStyle(this.el,null).getPropertyValue('opacity') == 1){
        this.el.classList.add('fdOut');
      }else{
        this.el.classList.add('fdIn');
      }
    }else if(this.sel === '.'){
      for(var i=0; i<this.el.length; i++){
        if(this.el[i].classList.contains('fdOut')){
          this.el[i].classList.add('fdIn');
          this.el[i].classList.remove('fdOut');
        }else if(this.el[i].classList.contains('fdIn')){
          this.el[i].classList.add('fdOut');
          this.el[i].classList.remove('fdIn');
        }else if(window.getComputedStyle(this.el[i],null).getPropertyValue('opacity') == 1){
          this.el[i].classList.add('fdOut');
        }else{
          this.el[i].classList.add('fdIn');
        }
      }
    }
  };
  
  /*
    Metodo: getAt
    Restituisce il valore di un attibuto dell'elmento o un array di valori della collezione di elementi selezionati
    Argomenti:
      - [string] attr : nome attibuto
  */
  this.getAt = function(attr){
    if(this.sel === '#'){
      return this.el.getAttribute(attr);
    }else if(this.sel === '.'){
      var res = new Array();
      for(var i=0; i<this.el.length; i++){
        res.push(this.el[i].getAttribute(attr));
      }
      return res;
    }
  };
  
  /*
    Metodo: htm
    Inserisce codice html all'interno dell'elmento o della collezione di elementi selezionati
    Argomenti:
      - [string] val : codice html da inserire
  */
  this.htm = function(val){
    if(this.sel === '#'){
      this.el.innerHTML = val;
    }else if(this.sel === '.'){
      for(var i=0; i<this.el.length; i++){
        this.el[i].innerHTML = val;
      }
    }
  };

  /*
    Metodo: isInViewport
    Restituisce true se l'elemento selezionato o il primo della collezione di elementi selezionati è presente nella viewport
    Argomenti:
      - [boolean] part : valore booleano che permette la verifica sull'intero elemento (false) o su una sola parte dell'elemento (true)
  */
  this.isInViewport = function(part){
    var el;
    if(this.sel === '#'){
      el = this.el
    }else if(this.sel === '.'){
      el = this.el[0]
    }
    
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while(el.offsetParent){
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    if(part){
      return (top < (window.pageYOffset + window.innerHeight) 
              && left < (window.pageXOffset + window.innerWidth) 
              && (top + height) > window.pageYOffset 
              && (left + width) > window.pageXOffset
      );
    }else{
      return (top >= window.pageYOffset 
              && left >= window.pageXOffset 
              && (top + height) <= (window.pageYOffset + window.innerHeight) 
              && (left + width) <= (window.pageXOffset + window.innerWidth)
      );
    } 
  };
  
  /*
    Metodo: load
    Esegue una funzione all'evento onload sull'elmento img o sulla collezione di elementi img selezionati
    Argomenti:
      - [function] fn : funzione
  */
  this.imgLoad = function(fn){
    if(this.sel === '#'){
      this.el.onload = fn;
    }else if(this.sel === '.'){
      for(var i=0; i<this.el.length; i++){
        this.el[i].onload = fn;
      }
    }
  };

  /*
    Metodo: insAft
    Inserisce nel DOM un elemento passato come paramentro dopo l'elemento o la collezione di elementi selezionati
    Argomenti:
      - [object] obj : elemento da inserire nel DOM
  */
  this.insAft = function(obj){
    if(this.sel === '#'){
      this.el.parentNode.insertBefore(obj,this.el.nextSibling);
    }else if(this.sel === '.'){
      for(var i=0; i<this.el.length; i++){
        this.el[i].parentNode.insertBefore(obj.cloneNode(true),this.el[i].nextSibling);
      }
    }
  };
  
  /*
    Metodo: insBif
    Inserisce nel DOM un elemento passato come paramentro prima dell'elemento o della collezione di elementi selezionati
    Argomenti:
      - [object] obj : elemento da inserire nel DOM
  */
  this.insBif = function(obj){
    if(this.sel === '#'){
      this.el.parentNode.insertBefore(obj,this.el);
    }else if(this.sel === '.'){
      for(var i=0; i<this.el.length; i++){
        this.el[i].parentNode.insertBefore(obj.cloneNode(true),this.el[i]);
      }
    }
  };
  
  /*
    Metodo: kDn
    Esegue una funzione all'evento onkeydown sull'elmento o sulla collezione di elementi selezionati
    Argomenti:
      - [function] fn : funzione
  */
  this.kDn = function(fn){
    if(this.sel === '#'){
      this.el.onkeydown = fn;
    }else if(this.sel === '.'){
      for(var i=0; i<this.el.length; i++){
        this.el[i].onkeydown = fn;
      }
    }
  };
  
  /*
    Metodo: kUp 
    Esegue una funzione all'evento onkeyup sull'elmento o sulla collezione di elementi selezionati
    Argomenti:
      - [function] fn : funzione
  */
  this.kUp = function(fn){
    if(this.sel === '#'){
      this.el.onkeyup = fn;
    }else if(this.sel === '.'){
      for(var i=0; i<this.el.length; i++){
        this.el[i].onkeyup = fn;
      }
    }
  };
  
  /*
    Metodo: mHov
    Esegue una funzione all'evento onmouseover sull'elmento o sulla collezione di elementi selezionati
    Argomenti:
      - [function] fn : funzione
  */
  this.mHov = function(fn){
    if(this.sel === '#'){
      this.el.onmouseover = fn;
    }else if(this.sel === '.'){
      for(var i=0; i<this.el.length; i++){
        this.el[i].onmouseover = fn;
      }
    }
  };
  
  /*
    Metodo: mOut
    Esegue una funzione all'evento onmouseout sull'elmento o sulla collezione di elementi selezionati
    Argomenti:
      - [function] fn : funzione
  */
  this.mOut = function(fn){
    if(this.sel === '#'){
      this.el.onmouseout = fn;
    }else if(this.sel === '.'){
      for(var i=0; i<this.el.length; i++){
        this.el[i].onmouseout = fn;
      }
    }
  };
  
  /*
    Metodo: rem
    Rimuove dal DOM un elmento o una collezione di elementi selezionati
    Argomenti:
      - [string] val : nome classe
  */
  this.rem = function(){
    if(this.sel === '#'){
      this.el.parentNode.removeChild(this.el);
    }else if(this.sel === '.'){
      var i = this.el.length;
      while(i--){
        this.el[i].parentNode.removeChild(this.el[i]);
      }
    }
  };
  
  /*
    Metodo: remAt
    Rimuove un attibuto all'elmento o alla collezione di elementi selezionati
    Argomenti:
      - [string] attr : nome attibuto
  */
  this.remAt = function(attr){
    if(this.sel === '#'){
      this.el.removeAttribute(attr);
    }else if(this.sel === '.'){
      for(var i=0; i<this.el.length; i++){
        this.el[i].removeAttribute(attr);
      }
    }
  };
  
  /*
    Metodo: remCl
    Rimuove una classe all'elmento o alla collezione di elementi selezionati
    Argomenti:
      - [string] val : nome classe
  */
  this.remCl = function(val){
    if(this.sel === '#'){
      this.el.classList.remove(val);
    }else if(this.sel === '.'){
      for(var i=0; i<this.el.length; i++){
        this.el[i].classList.remove(val);
      }
    }
  };

  /*
    Metodo: setAt
    Setta un attibuto all'elmento o alla collezione di elementi selezionati
    Argomenti:
      - [string] attr : nome attibuto
      - [string] val : valore attributo
  */
  this.setAt = function(attr,val){
    if(this.sel === '#'){
      this.el.setAttribute(attr,val);
    }else if(this.sel === '.'){
      for(var i=0; i<this.el.length; i++){
        this.el[i].setAttribute(attr,val);
      }
    }
  };

  /*
    Metodo: swipe
    Intercetta un evento touch swipe eseguendo le funzioni passate come paramentro in base alla direzione del tocco
    Argomenti:
      - [object] obj : oggetto contenente le funzioni da eseguire per le diverse direzioni dello swipe
  */
  this.swipe = function(obj){
    var clientX = 0;
    var clientY = 0;      
    var force = 0;
    var identifier = 0;     
    var SpageX = 0;
    var SpageY = 0;
    var CpageX = 0;
    var CpageY = 0;    
    var radiusX = 0;
    var radiusY = 0;
    var rotationAngle = 0;
    var screenX = 0;
    var screenY = 0;
    var deltaX = 0;
    var deltaY = 0;
    var minDelta = obj.minDelta || 45;

    var calcAngle = function(){
      var swipeAngle = null;
      var r = Math.atan2(CpageX - SpageX, SpageY - CpageY);
      swipeAngle = Math.round(r*180/Math.PI);
      if(swipeAngle < 0){ 
        swipeAngle =  360 - Math.abs(swipeAngle); 
      }
      return swipeAngle;
    }; 

    var calcDirection = function(angle){
      var swipeDirection = null;
      if((angle >= 45 && angle <= 135) && deltaX >= minDelta){
        swipeDirection = 'right';
      }else if((angle > 135 && angle < 225) && deltaY >= minDelta){
        swipeDirection = 'down';
      }else if((angle >= 225 && angle) <= 315 && deltaX >= minDelta){
        swipeDirection = 'left';
      }else if((angle > 315 || angle < 45) && deltaY >= minDelta){
        swipeDirection = 'up';
      }
      return swipeDirection;
    };

    if(this.sel === '#'){
      this.el.addEventListener("touchstart", function(event){
        SpageX = event.touches[0].pageX;
        SpageY = event.touches[0].pageY;
        //console.log('START = x:'+SpageX+' y:'+SpageY);
      });

      this.el.addEventListener("touchmove", function(event){
        CpageX = event.touches[0].pageX;
        CpageY = event.touches[0].pageY;
        deltaX = Math.abs(SpageX - CpageX);
        deltaY = Math.abs(SpageY - CpageY);
      });

      this.el.addEventListener("touchend", function(event){
        var angle = calcAngle();
        var direction = calcDirection(angle);
        if(direction === 'up' && obj.up){
          obj.up();
        }
        if(direction === 'right' && obj.right){
          obj.right();
        }
        if(direction === 'down' && obj.down){
          obj.down();
        }
        if(direction === 'left' && obj.left){
          obj.left();
        }
        if(direction && obj.res){
          obj.res(direction);
        }
        //console.log('END = x:'+CpageX+' y:'+CpageY);
        //console.log(angle);
        //console.log(direction); 
      });
      this.el.addEventListener("touchcancel", function(event){

      });
    }else if(this.sel === '.'){
      for(var i=0; i<this.el.length; i++){
        this.el[i].addEventListener("touchstart", function(event){
          SpageX = event.touches[0].pageX;
          SpageY = event.touches[0].pageY;
        });

        this.el[i].addEventListener("touchmove", function(event){
          CpageX = event.touches[0].pageX;
          CpageY = event.touches[0].pageY;
          deltaX = Math.abs(SpageX - CpageX);
          deltaY = Math.abs(SpageY - CpageY);
        });

        this.el[i].addEventListener("touchend", function(event){
          var angle = calcAngle();
          var direction = calcDirection(angle);
          if(direction === 'up' && obj.up){
            obj.up();
          }
          if(direction === 'right' && obj.right){
            obj.right();
          }
          if(direction === 'down' && obj.down){
            obj.down();
          }
          if(direction === 'left' && obj.left){
            obj.left();
          }
          if(direction && obj.res){
            obj.res(direction);
          }
        });

        this.el[i].addEventListener("touchcancel", function(event){

        });
      }
    }
  };

  /*
    Metodo: text
    Restituisce il valore di testo dell'elmento select o un array di valori di testo della collezione di elementi select selezionati
  */
  this.text = function(){
    if(this.sel === '#'){
      return this.el.options[this.el.selectedIndex].text;
    }else if(this.sel === '.'){
      var res = new Array();
      for(var i=0; i<this.el.length; i++){
        res.push(this.el[i].options[this.el[i].selectedIndex].text);
      }
      return res;
    }
  };
  
  /*
    Metodo: togCl
    Aggiunge e rimuove una classe all'elmento o alla collezione di elementi selezionati
    Argomenti:
      - [string] val : nome classe
  */
  this.togCl = function(val){
    if(this.sel === '#'){
      this.el.classList.toggle(val);
    }else if(this.sel === '.'){
      for(var i=0; i<this.el.length; i++){
        this.el[i].classList.toggle(val);
      }
    }
  };

  /*
    Metodo: val
    Restituisce il valore dell'elemento o un'array di valori della collezione di elementi selezionati.
    Qualora gli venga passato un paramentro setta il valore passato all'elemento o alla collezione
    di elementi selezionati.
  */
  this.val = function(val){
    if(val !== undefined){
      if(this.sel === '#'){
        this.el.value = val;
      }else if(this.sel === '.'){
        for(var i=0; i<this.el.length; i++){
          this.el[i].value = val;
        }
      }
    }else{
      if(this.sel === '#'){
        return this.el.value;
      }else if(this.sel === '.'){
        var res = new Array();
        for(var i=0; i<this.el.length; i++){
          res.push(this.el[i].value);
        }
        return res;
      }
    }
  };

}

/*
  Function: $D
  Crea un oggetto dBJs
  Argomenti:
    - [string] es : stringa contenente l'elemento e il selettore css '#' o '.'
*/
function $D(es){
  return new dBJs(es);
}



/****************************************************/
/*
 * Metodi aggiuntivi dell'oggetto $D
 */
/****************************************************/

/*
  Metodo: ajax
  Effettua una chiamata ajax
*/
$D.ajax = function(obj){
  this.method = obj.method || "POST";
  this.url = obj.url || "";
  this.send = obj.send || "";
  this.cache = obj.cache || false;

  if(this.url.indexOf('?') === -1 && this.cache === false){
    this.url += "?t="+Math.random();
  }else if(this.url.indexOf('?') !== -1 && this.cache === false){
    this.url += "&t="+Math.random();
  }

  if(this.method === "GET"){
    if(this.url.indexOf('?') === -1){
      this.url += "?"+this.send;
    }else{
      this.url += "&"+this.send;
    }
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
    if(xmlhttp.readyState === 4 && xmlhttp.status === 404){
      if(obj.s404){
        obj.s404();
      }
    }else if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
      var response;
      if(obj.response === "XML"){
        response = xmlhttp.responseXML;
      }else{
        response = xmlhttp.responseText;
      }
      if(obj.res){
        obj.res(response);
      }
    }
  };
  xmlhttp.open(this.method,this.url,true);
  if(this.send != "[object FormData]"){
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  }
  xmlhttp.send(this.send);
};

/*
  Metodo: checkParentWithId
  Restituisce true se un parent dell'elemento passato come primo parametro ha per valore della proprietà id la stringa passata come secondo paramentro
  Argomenti:
    - [object] el : elemento di cui controllare i parent
    - [string] id : valore dell'id da controllare
*/
$D.checkParentWithId = function(el,id){
  if(el !== document){
    if(el.id === id){
      return true;            
    }else{
      return $D.checkParentWithId(el.parentNode,id);
    }
  }else{
    return false;
  }
};

/*
  Metodo: checkParentWithClass
  Restituisce true se un parent dell'elemento passato come primo parametro ha per valore della proprietà class la stringa passata come secondo paramentro
  Argomenti:
    - [object] parent : elemento di cui controllare i parent
    - [string] cl : valore della classe da controllare
*/
$D.checkParentWithClass = function(el,cl){
  if(el !== document){
    if(el.classList.contains(cl)){
      return true;            
    }else{
      return $D.checkParentWithClass(el.parentNode,cl);
    }
  }else{
    return false;
  }
};

/*
  Metodo: decodeEntities
  Restituisce una stringa decodificando le entità html presenti nella stringa passata come parametro
  Argomenti:
    - [string] html : stinga contente le entità html
*/
$D.decodeEntities = function(html){
  var textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  return textarea.value;
};

/*
  Metodo: detectMobile
  Restituisce true se il dipsositivo utilizzato è un dispositivo mobile
*/
$D.detectMobile = function(){
  if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/Opera Mini/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/IEMobile/i)
      || navigator.userAgent.match(/Windows Phone/i)
  ){
    return true;
  }else{
    return false;
  }
};

/*
  Metodo: inArray
  Restituisce true se il valore passato come primo paramentro è presente nell'array passato come secondo parametro
  Argomenti:
    - [object] val : valore da cercare
    - [array] array : array di elementi
*/
$D.inArray = function(val,array){
  for(var i=0; i<array.length; i++){
    if(array[i] === val){
      return true;
    }
  }
  return false;
};

/*
  Metodo: nodeToHtml
  Restituisce una stringa contenente codice html sulla base di un oggetto [object NodeList] o [object HTMLCollection] passato come parametro
  Argomenti:
    - [object] node : oggetto [object NodeList] o [object HTMLCollection]
*/
$D.nodeToHtml = function(node){
  var html = Array.prototype.reduce.call(node, function(html, node){
    return html + (node.outerHTML || node.nodeValue);
  }, "");
  return html;
};

/*
  Metodo: randomCode
  Restituisce una stringa random della lunghezza specifica che può contenere tutti i caratteri dell'alfabeto maiuscoli o minuscoli e i numeri da 0 a 9
  Argomenti:
    - [int] n : numero di caratteri random da restituire
*/
$D.randomCode = function(n){
  var array = Array("z","A","y","B","0","x","C","w","D","1","v","E","u","F","2","t","G","s","H","3","r",
  "I","q","J","4","p","K","o","L","n","M","m","N","l","O","k","P","5","j","Q","i","R","6",
  "h","S","g","T","7","f","U","e","V","8","d","W","c","X","9","b","Y","a","Z");
  var res = '';
  for(var i=1; i<=n; i++){
    res += array[Math.floor(Math.random()*array.length)];
  }
  return res;
};

/*
  Metodo: selExists
  Restituisce true se il selettote css passato come argomento esiste in un foglio di stile incluso del documento
  Argomenti:
    - [string] val : selettore css
*/
$D.selExists = function(val){
  var selector = false;
  var ss = document.styleSheets;
  var ssr;
  for(var x=0; x<ss.length; x++){
    ssr = ss[x].cssRules? ss[x].cssRules: ss[x].rules;
    if(ssr !== null){
      for(var y=0; y<ssr.length; y++){
        if(ssr[y].selectorText === val){
          selector = true;
          break;
        }
      }
    }
  }
  return selector;
};

/*
  Metodo: sylSheets
  Restituisce l'oggetto styleSheets che contiene il selettore passato come argomento
  Argomenti:
    - [string] val : selettore css
*/
$D.sylSheets = function(val){
  var ss = document.styleSheets;
  var ssr;
  for(var x=0; x<ss.length; x++){
    ssr = ss[x].cssRules? ss[x].cssRules: ss[x].rules;
    if(ssr !== null){
      for(var y=0; y<ssr.length; y++){
        if(ssr[y].selectorText === val){
          return ss[x];
          break;
        }
      }
    }
  }
};

/*
  Metodo: dataURItoBlob
  Restituisce la conversione in dati binari da una stringa base64
  Argomenti:
    - [string] dataURI : stringa base64 ottenibile anche dal metodo toDataURL() su un oggetto canvas
*/
$D.dataURItoBlob = function(dataURI){
  var binary = atob(dataURI.split(',')[1]);
  var array = [];
  for(var i=0; i<binary.length; i++){
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  /* esempio
  var blob = $D.dataURItoBlob(dataURL);             //chiama la funzione
  var formData = new FormData(document.forms[0]);   //crea un form data
  formData.append("canvasImage", blob);             //appende ad un form da inviare con ajax
  */
};



/****************************************************/
/*
 * Class: $B
 * Oggetto contenente metodi che agiscono sull'oggetto window o document
 */
/****************************************************/

var $B = {
  
  /*
    Metodo: load
    Imposta l'evento load
  */
  load: function(fn){
    window.addEventListener('load', fn, false); 
  },
  
  /*
    Metodo: load
    Imposta l'evento load
  */
  scroll: function(fn){
    window.addEventListener('scroll', fn, false); 
  },
  
  /*
    Metodo: resize
    Imposta l'evento resize
  */
  resize: function(fn){
    window.addEventListener('resize', fn, false); 
  }
  
};