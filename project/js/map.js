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
    fillOpacity: 0.5
};

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var featureGroup = L.featureGroup().addTo(map);

// queries/administrative-levels-0.txt
// var qry = "PREFIX afn: <http://jena.hpl.hp.com/ARQ/function#> PREFIX fn: <http://www.w3.org/2005/xpath-functions#> PREFIX geo: <http://www.opengis.net/ont/geosparql#> PREFIX geof: <http://www.opengis.net/def/function/geosparql/> PREFIX gml: <http://www.opengis.net/ont/gml#> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX par: <http://parliament.semwebcentral.org/parliament#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX sf: <http://www.opengis.net/ont/sf#> PREFIX time: <http://www.w3.org/2006/time#> PREFIX units: <http://www.opengis.net/def/uom/OGC/1.0/> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> SELECT ?name ?wkt WHERE { GRAPH <http://course.introlinkeddata.org/G4> {?bezirk rdf:type <http://vocab.lodcom.de/Stadtbezirk> . ?bezirk <http://www.w3.org/2000/01/rdf-schema#label> ?name . ?bezirk geo:hasGeometry ?geometry . ?geometry geo:asWKT ?wkt }}";

// queries/administrative-levels-1.txt
var qry = "PREFIX afn: <http://jena.hpl.hp.com/ARQ/function#> PREFIX fn: <http://www.w3.org/2005/xpath-functions#> PREFIX geo: <http://www.opengis.net/ont/geosparql#> PREFIX geof: <http://www.opengis.net/def/function/geosparql/> PREFIX gml: <http://www.opengis.net/ont/gml#> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX par: <http://parliament.semwebcentral.org/parliament#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX sf: <http://www.opengis.net/ont/sf#> PREFIX time: <http://www.w3.org/2006/time#> PREFIX units: <http://www.opengis.net/def/uom/OGC/1.0/> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> SELECT ?name ?wkt WHERE { GRAPH <http://course.introlinkeddata.org/G4> {?bezirk rdf:type <http://vocab.lodcom.de/Stadtteil> . ?bezirk <http://www.w3.org/2000/01/rdf-schema#label> ?name . ?bezirk geo:hasGeometry ?geometry . ?geometry geo:asWKT ?wkt FILTER NOT EXISTS { ?bezirk rdf:type <http://vocab.lodcom.de/Stadtbezirk> } }}";

$.post("http://giv-lodumdata.uni-muenster.de:8282/parliament/sparql", {
	query: qry,
	output: 'json'
},
function(data){
    console.log(data);
    for(var i in data.results.bindings) {
        addWktToMap(data.results.bindings[i].wkt.value, data.results.bindings[i].name.value);
    }
});

function addWktToMap(wktstring, name) {
    wkt.read(wktstring);
    var rgb = "rgb("+Math.floor((Math.random()*255))+","+Math.floor((Math.random()*255))+","+Math.floor((Math.random()*255))+")"; // random colour
    var districtObj = wkt.toObject({color:rgb,weight:2});
    districtObj.bindPopup(name);
    featureGroup.addLayer(districtObj);
}

