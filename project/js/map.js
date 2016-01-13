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

var currentYear = 2011;

var showThis = "Stadtteil";
map.on('zoomend', function () {
    console.log(map.getZoom());
    if (map.getZoom() >= 13){
        if(showThis == "Stadtbezirk") {
            showThis = "Stadtteil";
            year(currentYear);
        }
    } else {
        if(showThis == "Stadtteil") {
            showThis = "Stadtbezirk";
            year(currentYear);
        }
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
    currentYear = y;
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

    var other = '<br><img src="data:image/png;base64,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">';

    districtObj.bindPopup(""+name+"<br>"+pupulation+" households"+other);
    return districtObj;
}

year(2011);