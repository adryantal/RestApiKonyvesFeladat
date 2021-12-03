$(function () {

  const konyvek = [];
  let apiVegpont = /*"db.json"*/ "http://localhost:3000/konyveim";
  const sajatAjax = new SajatAjax();

/*Tábla adatainak megjelenítése*/
  let szuro = "?tipus=regény";
  //apiVegpont+=szuro; //csak a regények megjelenítése
  sajatAjax.getAjax(apiVegpont, konyvek, tablazatbaKiir); //adatok betöltése a konyvek tömbbe, kiír függv. meghívása
  sajatAjax.getAjax(apiVegpont, konyvek, tipusokBetolt);

  let novekvo = true;
  /*Rendezés ár szerint*/
  $("#rendez").on("click", () => {
    let rendez;
    if(novekvo){
    rendez = "?_sort=ar&_order=asc";    
    }else{
    rendez = "?_sort=ar&_order=desc"; 
    }
    apiVegpont += rendez;
    sajatAjax.getAjax(apiVegpont, konyvek, tablazatbaKiir);   
    novekvo=(!(novekvo));
    apiVegpont="http://localhost:3000/konyveim";    
  });


  /*Új adat beszúrása - kattintásesemény*/
  $("#ujadat").on("click", () => {
    //formba beírt adatok beolvasása rekordobjektumba
    let ujadat = {
      szerzo: $("#inputSzerzo").val(),
      cim: $("#inputCim").val(),
      tipus: $("#inputTipus").val(),
      ar: $("#inputAr").val(),
    };
    //adatok elküldése POST metódussal
    sajatAjax.postAjax(apiVegpont, ujadat);
  });


  /*Adat törlése - kattintásesemény*/
  $("#torles").on("click", () => {
    let id = $("#torlesid").val(); //formba beírt index
    sajatAjax.deleteAjax(apiVegpont, id);
  });


/*Adat módosítása - kattintásesemény*/
  $("#modosit").on("click", () => {
    let ujadat = {
      id: $("#modID").val(),
      szerzo: $("#modSzerzo").val(),
      cim: $("#modCim").val(),
      tipus: $("#modTipus").val(),
      ar: $("#modAr").val(),
    };
    sajatAjax.putAjax(apiVegpont, ujAdat, ujAdat.id); //a kulcsadat az ID
  });


/*Típusok betöltése a legördülő listába*/
function tipusokBetolt(){    
const tipusok = []; //bevezetek egy tömböt a különbözőségi vizsgálathoz
konyvek.forEach(element => {
  if (jQuery.inArray(element.tipus, tipusok)==-1){ //ha már szerepel a tömbben, ne töltse bele a legörd. listába és a tömbbe sem
  tipusok.push(element.tipus);
  $("#tipus").append("<option value="+element.tipus+">"+element.tipus+"</option>");
  }
});
console.log(tipusok);
}

/*A legördülő listából kiválasztott típusra történő szűrés*/
  $("#tipus").on("change", () => {
const t = $("#tipus").val();
let filtered=apiVegpont+"?tipus_like="+t;
sajatAjax.getAjax(filtered, konyvek, tablazatbaKiir);
  });

  
  function tablazatbaKiir(tomb) {
    let szuloelem = $(".megjelenit");
    szuloelem.empty();
    let txt = "<div class='rekord'><table>";
    txt+= "<tr><th>ID</th><th>SZERZŐ</th><th>CÍM</th><th>TÍPUS</th><th>ÁR</th></tr>"; 
    tomb.forEach((elem) => { 
         
      txt += "<tr><td>" + elem.id + "</td>";
      txt += "<td>" + elem.szerzo + "</td>";
      txt += "<td>" + elem.cim + "</td>";
      txt += "<td>" + elem.tipus + "</td>";
      txt += "<td>" + elem.ar + "</td></tr>";
    });
    txt += "</table></div>";
    szuloelem.html(txt);
  }
  //getAjax(apiVegpont, konyvek, tablazatbaKiir);
});
