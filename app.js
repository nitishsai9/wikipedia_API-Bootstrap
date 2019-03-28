function handleSubmit() {
    var text = document.getElementById("searchText").value;
    var url = 'https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=';
    document.getElementById("loader").style.display = "block";
    document.getElementById("results").innerHTML = "";
    if (text) {
        getResults(text, url);
    } else {
        document.getElementById("loader").style.display = "none";  
    }
}

function getResults(text, url) {
    fetch(url + text).then((resp) => resp.json()).then(function(data) {   
        if(data[1].length === 0){
          document.getElementById("loader").innerHTML = "no results";
        }else{
        data[1].forEach(function(e,i) {  
            document.getElementById("results").innerHTML +=
                "<a target='_blank' href='" + data[3][i] + "'><li>" +
                "<span>" + data[1][i] + "</span><br>" +
                data[2][i] + '</a></li>';
        });
        document.getElementById("loader").style.display = "none";
        }
    }).catch(function(){
       document.getElementById("loader").innerHTML = "error fetching data";
    });
}
