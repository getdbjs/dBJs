<?php
session_start();

$ev = $_GET['ev'];

class dBJs{
  
  public function addFile(){

    $arrayfile = $this->fileList("../uploads/");
    $time = time()-3600;
    foreach($arrayfile as $f){
      $fn = explode('.',$f);
      $ft = explode('_',$fn[0]);
      if($ft[3] < $time){
        if(file_exists("../uploads/".$f)){
          unlink("../uploads/".$f);
        }
      }
    }
    
    $session_id = session_id();
    $files = array();
    for($i=0; $i<count($_FILES["myFiles"]["name"]); $i++){
      $basename = preg_replace("/[^a-zA-Z0-9_-]/","",str_replace(" ","-",pathinfo($_FILES["myFiles"]["name"][$i],PATHINFO_FILENAME)));
      $ext = pathinfo($_FILES["myFiles"]["name"][$i], PATHINFO_EXTENSION);
      $r = rand(1, 1000);
      $t = time();
      $file_name = $session_id."_".$i."_".$r."_".$t."__".$basename.".".$ext;
      move_uploaded_file($_FILES["myFiles"]["tmp_name"][$i],"../uploads/".$file_name);
      $files[] = array("filename"=>$file_name);
    }
    echo json_encode($files);
  }
  
  public function fileList($dirname){
    $arrayfiles = Array();
    if(file_exists($dirname)){
      $handle = opendir($dirname);
      while(false !== ($file = readdir($handle))){ 
        if(is_file($dirname.$file)){
          array_push($arrayfiles,$file);
        }
      }
      $handle = closedir($handle);
    }
    sort($arrayfiles);
    return $arrayfiles;
  }
  
  public function removeFile(){
    $rem = $_POST['rem'];
    if(file_exists("../uploads/".$rem)){
      unlink("../uploads/".$rem);
      echo "yes";
    }else{
      echo "no";
    }
  }
  
  public function sendMail(){
    $to = $_POST['to'];
    //$to = array('','','');
    $subject = $_POST['subject'];
    $field = $_POST['field'];
    //$custom = $_POST['custom'];

    $from = $_POST['from'];

    $content = "";
    foreach($field as $k => $f){
      $content .= "<p><b>$k:</b> $f</p>";
    }

    $message = ' 
      <html> 
      <head> 
      <title>Richiesta utente</title> 
      <style type="text/css"> 
      body {font-family:Verdana, Arial, Helvetica, sans-serif; font-size:12px; font-weight:normal; color:#000000;} 
      </style> 
      </head> 
      <body> 
      <p><b>FROM:</b> '.$from.'</p>
      '.$content.' 
      </body> 
      </html> 
    ';

    //Valorizzo le variabili relative all'allegato
    $attachment = $_FILES['attachment'];

    $msg = "";

    //Verifico se il file è stato caricato correttamente via HTTP
    //In caso affermativo proseguo nel lavoro...
    if($attachment['tmp_name'][0] != ""){
      //Genero il "separatore"
      //Serve per dividere le varie parti del messaggio.
      //Nel nostro caso separere la parte testuale dagli allegati
      $semi_rand = md5(time());
      $mime_boundary = "==Multipart_Boundary_x{$semi_rand}x";

      //Aggiungo le intestazioni necessarie per gli allegati
      $headers = "From: " . $from;
      $headers .= "\nMIME-Version: 1.0\n";
      $headers .= "Content-Type: multipart/mixed;\n";
      $headers .= " boundary=\"{$mime_boundary}\"";

      //Definisco il tipo di messaggio (MIME/multi-part)
      $msg .= "This is a multi-part message in MIME format.\n\n";

      //Metto il separatore
      $msg .= "--{$mime_boundary}\n";

      //Questa è la parte "testuale" del messaggio
      $msg .= "Content-Type: text/html; charset=\"iso-8859-1\"\n";
      $msg .= "Content-Transfer-Encoding: 7bit\n\n";
      $msg .= $message . "\n\n";

      //Metto il separatore
      $msg .= "--{$mime_boundary}\n";

      //Aggiungo gli allegati al messaggio
      for($x=0;$x<count($attachment['tmp_name']);$x++){
        if($attachment['tmp_name'][$x] != ""){
          $file = fopen($attachment['tmp_name'][$x],'rb');
          $data = fread($file, filesize($attachment['tmp_name'][$x]));
          fclose($file);
          $data = chunk_split(base64_encode($data));
          $msg .= "Content-Disposition: attachment;\n";
          $msg .= " filename=\"{$attachment['name'][$x]}\"\n";
          $msg .= "Content-Transfer-Encoding: base64\n\n";
          $msg .= $data . "\n\n";
          $msg .= "--{$mime_boundary}\n";
        }
      }
    }else{
      $headers .= "From: " . $from;
      $headers .= "\nMIME-Version: 1.0\n"; 
      $headers .= "Content-type: text/html; charset=iso-8859-1\n"; 
      $msg = $message; 
    }
    
    //Invio la mail
    foreach($to as $t){
      if(mail($t, $subject, $msg, $headers)){
        $sent = "ok";
      }else{
        $sent = "error";
        break;
      }
    }

    echo $sent;
  }
  
}

$dBJs = new dBJs();
if($ev == "addFile"){
  $dBJs->addFile();
}
if($ev == "removeFile"){
  $dBJs->removeFile();
}
if($ev == "sendMail"){
  $dBJs->sendMail();
}
?>