var wkt = new Wkt.Wkt(); // Wicket library for WKT geometries

var map = L.map('map').setView([51.9609808, 7.62416839], 13);

var defaults = {
    icon: new L.Icon({
        iconUrl: 'red_dot.png',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        shadowUrl: 'dot_shadow.png',
        shadowSize: [16, 16],
        shadowAnchor: [8, 8]
    }),
    editable: true,
    color: '#AA0000',
    weight: 3,
    opacity: 1.0,
    fillColor: '#AA0000',
    fillOpacity: 1
};

L.tileLayer('http://tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
}).addTo(map);


var featureGroup = L.featureGroup().addTo(map);

// queries/administrative-levels-0.txt
// "Stadtbezirk"
// var qry = "PREFIX afn: <http://jena.hpl.hp.com/ARQ/function#> PREFIX fn: <http://www.w3.org/2005/xpath-functions#> PREFIX geo: <http://www.opengis.net/ont/geosparql#> PREFIX geof: <http://www.opengis.net/def/function/geosparql/> PREFIX gml: <http://www.opengis.net/ont/gml#> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX par: <http://parliament.semwebcentral.org/parliament#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX sf: <http://www.opengis.net/ont/sf#> PREFIX time: <http://www.w3.org/2006/time#> PREFIX units: <http://www.opengis.net/def/uom/OGC/1.0/> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> PREFIX lodcom: <http://vocab.lodcom.de/> SELECT ?name ?wkt WHERE { GRAPH <http://course.introlinkeddata.org/G4> {?bezirk rdf:type lodcom:Stadtbezirk . ?bezirk <http://www.w3.org/2000/01/rdf-schema#label> ?name . ?bezirk geo:hasGeometry ?geometry . ?geometry geo:asWKT ?wkt }}";

// queries/administrative-levels-1.txt
// "Teilbereich"
//var qry = "PREFIX afn: <http://jena.hpl.hp.com/ARQ/function#> PREFIX fn: <http://www.w3.org/2005/xpath-functions#> PREFIX geo: <http://www.opengis.net/ont/geosparql#> PREFIX geof: <http://www.opengis.net/def/function/geosparql/> PREFIX gml: <http://www.opengis.net/ont/gml#> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX par: <http://parliament.semwebcentral.org/parliament#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX sf: <http://www.opengis.net/ont/sf#> PREFIX time: <http://www.w3.org/2006/time#> PREFIX units: <http://www.opengis.net/def/uom/OGC/1.0/> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> PREFIX lodcom: <http://vocab.lodcom.de/> SELECT ?name ?wkt WHERE { GRAPH <http://course.introlinkeddata.org/G4> {?bezirk rdf:type lodcom:Teilbereich . ?bezirk <http://www.w3.org/2000/01/rdf-schema#label> ?name . ?bezirk geo:hasGeometry ?geometry . ?geometry geo:asWKT ?wkt }}";

// queries/administrative-levels-2.txt
// "Stadtteil"
//var qry = "PREFIX afn: <http://jena.hpl.hp.com/ARQ/function#> PREFIX fn: <http://www.w3.org/2005/xpath-functions#> PREFIX geo: <http://www.opengis.net/ont/geosparql#> PREFIX geof: <http://www.opengis.net/def/function/geosparql/> PREFIX gml: <http://www.opengis.net/ont/gml#> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX par: <http://parliament.semwebcentral.org/parliament#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX sf: <http://www.opengis.net/ont/sf#> PREFIX time: <http://www.w3.org/2006/time#> PREFIX units: <http://www.opengis.net/def/uom/OGC/1.0/> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> PREFIX lodcom: <http://vocab.lodcom.de/> SELECT ?name ?wkt WHERE { GRAPH <http://course.introlinkeddata.org/G4> {?bezirk rdf:type lodcom:Stadtteil . ?bezirk <http://www.w3.org/2000/01/rdf-schema#label> ?name . ?bezirk geo:hasGeometry ?geometry . ?geometry geo:asWKT ?wkt }}";

// queries/min-max-one-person-adm2.txt
// query minimum and maximum for the above qry
//var qry2 = "PREFIX afn: <http://jena.hpl.hp.com/ARQ/function#> PREFIX fn: <http://www.w3.org/2005/xpath-functions#> PREFIX geo: <http://www.opengis.net/ont/geosparql#> PREFIX geof: <http://www.opengis.net/def/function/geosparql/> PREFIX gml: <http://www.opengis.net/ont/gml#> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX par: <http://parliament.semwebcentral.org/parliament#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX sf: <http://www.opengis.net/ont/sf#> PREFIX time: <http://www.w3.org/2006/time#> PREFIX units: <http://www.opengis.net/def/uom/OGC/1.0/> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> PREFIX lodcom: <http://vocab.lodcom.de/> SELECT MIN(?n) MAX(?n) WHERE { GRAPH <http://course.introlinkeddata.org/G4> {?bezirk rdf:type lodcom:Stadtteil . ?bezirk <http://www.w3.org/2000/01/rdf-schema#label> ?name . ?obs <http://purl.org/linked-data/cube#dataSet> lodcom:SingleHouseholdTotalCount . ?obs <http://vocab.lodcom.de/numberOfHouseholds> ?num . ?obs lodcom:refArea ?bezirk . ?obs lodcom:refPeriod <http://reference.data.gov.uk/id/gregorian-interval/2013-01-01T00:00:00/P1Y> . ?obs <http://purl.org/linked-data/sdmx/2009/measure#obsValue> ?n }}";

$('#y2011').on('click', function(){
    year(2011);
});
$('#y2012').on('click', function(){
    year(2012);
});
$('#y2013').on('click', function(){
    year(2013);
});
$('#y2014').on('click', function(){
    year(2014);
});

var showThis = "Stadtteil";
map.on('zoomend', function () {
    console.log(map.getZoom());
    if (map.getZoom() >= 13){
        showThis = "Stadtteil";
    } else {
        showThis = "Teilbereich";
    }
});

function year(y) {
    var qry = "PREFIX afn: <http://jena.hpl.hp.com/ARQ/function#> PREFIX fn: <http://www.w3.org/2005/xpath-functions#> PREFIX geo: <http://www.opengis.net/ont/geosparql#> PREFIX geof: <http://www.opengis.net/def/function/geosparql/> PREFIX gml: <http://www.opengis.net/ont/gml#> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX par: <http://parliament.semwebcentral.org/parliament#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX sf: <http://www.opengis.net/ont/sf#> PREFIX time: <http://www.w3.org/2006/time#> PREFIX units: <http://www.opengis.net/def/uom/OGC/1.0/> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> PREFIX lodcom: <http://vocab.lodcom.de/> SELECT ?name ?n ?wkt WHERE { GRAPH <http://course.introlinkeddata.org/G4> {?bezirk rdf:type lodcom:"+showThis+" . ?bezirk <http://www.w3.org/2000/01/rdf-schema#label> ?name . ?obs <http://purl.org/linked-data/cube#dataSet> lodcom:SingleHouseholdTotalCount . ?obs <http://vocab.lodcom.de/numberOfHouseholds> ?num . ?obs lodcom:refArea ?bezirk . ?obs lodcom:refPeriod <http://reference.data.gov.uk/id/gregorian-interval/"+y+"-01-01T00:00:00/P1Y> . ?obs <http://purl.org/linked-data/sdmx/2009/measure#obsValue> ?n . ?bezirk geo:hasGeometry ?geometry . ?geometry geo:asWKT ?wkt }}";
    $.post("http://giv-lodumdata.uni-muenster.de:8282/parliament/sparql", {
        query: qry,
        output: 'json'
    },
    function(data){
        console.log(data);
        processBindings(data);
    });
}

function minmax(data) {
    var min = parseInt(data.results.bindings[0].n.value);
    var max = parseInt(data.results.bindings[0].n.value);
    for(var i in data.results.bindings) {
        if(parseInt(data.results.bindings[i].n.value) < min) {
            min = parseInt(data.results.bindings[i].n.value);
        }
        if(parseInt(data.results.bindings[i].n.value) > max) {
            max = parseInt(data.results.bindings[i].n.value);
        }
    }
    return [min, max];
}

function processBindings(data) {
    map.removeLayer(featureGroup);
    featureGroup = L.featureGroup();
    var mm = minmax(data);    
    var colorScale = chroma.scale(chroma.brewer.OrRd).domain(mm, 'log');
    for(var i in data.results.bindings) {
        var colorcode = colorScale( parseInt(data.results.bindings[i].n.value) ).hex();
        var poly = addWktToMap(data.results.bindings[i].wkt.value, data.results.bindings[i].name.value, data.results.bindings[i].n.value, colorcode);
        featureGroup.addLayer(poly);
    }
    featureGroup.addTo(map);
}

function addWktToMap(wktstring, name, pupulation, col) {
    //console.log(wktstring, name, pupulation, col);
    //console.log(name);
    wkt.read(wktstring);
    //var rgb = "rgb("+Math.floor((Math.random()*255))+","+Math.floor((Math.random()*255))+","+Math.floor((Math.random()*255))+")"; // random colour
    //colourScale(Math.floor(Math.random()*255))
    var districtObj = wkt.toObject({
        color: col,
        weight: 0,
        opacity: 1,
        fillOpacity: 0.9
    });

    var other = "";

    districtObj.bindPopup(""+name+"<br>"+pupulation+" households"+other);
    return districtObj;
}

