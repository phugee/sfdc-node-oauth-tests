function getUnSignedInHtml() {
    var unSignedInHtmlString = "<div class=\"well well-large\">";
    unSignedInHtmlString += "       <h2>Please sign in<\/h2>";
    unSignedInHtmlString += "       <button id=\"theButton\" class=\"btn btn-lg btn-primary btn-block\">Sign in<\/button>";
    unSignedInHtmlString += "   <\/div>";
    return unSignedInHtmlString;
}

function getSignedInHtml(user_name) {
    var signedInHtmlString = "<div class=\"well well-large\">";
    signedInHtmlString = "<p class=\"lead\">Welcome " + user_name + "</p>";
    signedInHtmlString += "       <button id=\"theButton\" class=\"btn btn-lg btn-primary btn-block\">test rest<\/button>";
    signedInHtmlString += "   <\/div>";
    return signedInHtmlString;
}

var parseQueryString = function( queryString ) {
    var params = {}, queries, temp, i, l;

    queries = queryString.split("&");
    console.log(queries);
    for ( i = 0, l = queries.length; i < l; i++ ) {
        console.log(i);
        temp = queries[i].split('=');
        params[temp[0]] = decodeURIComponent(temp[1]);
    }

    return params;
};

$( document ).ready(function() {

    if(window.location.search.length) {
        console.log(window.location.search);
        var queryStringParsed = parseQueryString(window.location.search.substr(1));
        console.log(queryStringParsed);
        $('#app-area').append(getSignedInHtml(queryStringParsed.name));
        $('#theButton').on('click', function(event) {
            console.log('firing');
            var rest_url = queryStringParsed.instanceUrl + "/services/data/v36.0/query/?q=SELECT Id, Name, AboutMe FROM User WHERE Id='" + queryStringParsed.id + "'";
            $.ajax({
                method: "GET",
                url: rest_url,
                dataType: 'json',
                headers: {
                    'Authorization': 'Bearer ' + queryStringParsed.token
                },
                success: function(response) {
                    console.log('success : ' + response);
                    console.log(response);
                },
                error: function(xhr, textStatus, errorThrown) {
                    console.log('errror : ' + textStatus);
                }
            });
        })
    } else {
        $('#app-area').append(getUnSignedInHtml());
        $('#theButton').on('click', function(event) {
            console.log('firing');
            window.location.href = 'http://localhost:3000/authorize';
        });
    }






});
