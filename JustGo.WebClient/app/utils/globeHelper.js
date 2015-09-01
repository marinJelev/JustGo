function popUpInnerHtml (countryData){
    var countryDataLastIndex = countryData.length - 1;

  return  "<b>Country: " + countryData[countryDataLastIndex]['formatted_address'] +
    "</b><br>State: " + countryData[countryDataLastIndex - 1]['formatted_address'] +
    " <br /><span style='font-size:10px;color:#999'>City: " + countryData[countryDataLastIndex - 2]['formatted_address'] +
    "</span><br /> <input class='btn btn-success btn-xs pool-right' id='add-place' type='submit' value='add Place'/>";
}

export default {
    popUpInnerHtml
}
