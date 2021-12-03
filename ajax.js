class SajatAjax{
 constructor(){

 }

 /*GET - adatok betöltése tömbbe + művelet*/
 getAjax(apiVegpont, tomb, myCallback) {
    tomb.splice(0,tomb.length); //mindig az aktuális tartalmat töltjük a tömbbe; ezért kell üríteni, törölni az eddigi tartalmat
    $.ajax({
      url: apiVegpont,  //ez a végpont mutat a táblára, ahonnan a tömbbe betöltendő adatokat kiszedjük
      type: "GET",
      success: function (result) {
        result.forEach((element) => { //nem kell már ez a formátum: result.konyveim.forEach; csak addig kellett, amíg közvetlen a JSON file-ra hivatkoztunk
                                      //itt már erre hivatkozunk: http://localhost:3000/konyveim 
          tomb.push(element);
        });
        myCallback(tomb);
      },
    });
  }


   /*POST*/
  postAjax(apiVegpont,ujAdat) {
    $.ajax({
      url: apiVegpont,
      type: "POST",
      data: ujAdat,
      success: function (result) {
        console.log('sikerult');
      },
    });
  }

  /*DELETE*/
  deleteAjax(apiVegpont,id) { //a tábla id indexű elemét szeretnénk törölni
    $.ajax({
      url: apiVegpont+"/"+id, 
      type: "DELETE",    
      success: function (result) {
        console.log('sikerult');
      },
    });
  }

  /*PUT*/
  putAjax(apiVegpont,ujAdat,id) { //a tábla id indexű elemét szeretnénk szerkeszteni/módosítani
    $.ajax({
      url: apiVegpont+"/"+id,
      type: "PUT",  
      data: ujAdat,  
      success: function (result) {
        console.log('sikerult');
      },
    });
  }

  //input type buttont kell használni a formokon
  //

}