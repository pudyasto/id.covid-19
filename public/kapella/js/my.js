function base_url(param) {
    var base_url = public_html + "/" + param;
    return base_url;
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
var bulan_short = ["Nama Bulan", "Jan", "Feb", "Mar", "Apr", "Mei", "Juni", "Juli", "Agt", "Sept", "Okt", "Nov", "Des"];

function tgl_id_short(param) {
    if (param === null || param === "") {
        return "";
    }
    var yyyy = param.substring(0, 4);
    var mm = param.substring(5, 7);
    var dd = param.substring(8, 10);
    var hh = param.substring(10, 20);
    return dd + " " + bulan_short[Number(mm)] + " " + yyyy + " " + hh;
}

function time_to_month(milliseconds){
    var d = new Date(milliseconds);
    return d.getDate() + ' ' + bulan_short[Number(d.getMonth()) + 1];
}

var last = function (array, n) {
    if (array == null)
        return void 0;
    if (n == null)
        return array[array.length - 1];
    return array.slice(Math.max(array.length - n, 0));
};

var first =  function(array, n) {
    if (array == null) 
    return void 0;
  if (n == null) 
    return array[0];
  if (n < 0)
    return [];
  return array.slice(0, n);
};