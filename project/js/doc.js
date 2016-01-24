hideDocumentation();

$('#doc_tab').on('click', function(){
    
    hideMap();
    showDocumentation();
    queryVocabulary();
});

var Prefixes = {
    /**
     * The used prefixes as a key-value pair JSON object 
     */
    vocabularies : {
       "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "sf": "http://www.opengis.net/ont/sf#",
        "time": "http://www.w3.org/2006/time#",
        "units": "http://www.opengis.net/def/uom/OGC/1.0/",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "schema": "http://schema.org/",
        "sdmx":  "http://purl.org/linked-data/sdmx#",
        "vcard": "http://www.w3.org/2006/vcard/ns#",
        "dbo":   "http://dbpedia.org/ontology/",
        "qb":    "http://purl.org/linked-data/cube#",
        "sdmx-measure": "http://purl.org/linked-data/sdmx/2009/measure#",
        "sdmx-code": "http://purl.org/linked-data/sdmx/2009/code#",
        "lodcom": "http://vocab.lodcom.de/",
        "sdmx-concept": "http://purl.org/linked-data/sdmx/2009/concept#",
        "interval": "http://reference.data.gov.uk/def/intervals/",
        "sdmx-attribute": "http://purl.org/linked-data/sdmx/2009/attribute#",
        "sdmx-dimension": "http://purl.org/linked-data/sdmx/2009/dimension#",
        "dc":    "http://purl.org/dc/terms/" 
    },
    /**
     * Prints the prefixes in the SparQL query style 
     */
    toString: function() {
        var out = "";
        
        for (var key in this.vocabularies) {
            value = this.vocabularies[key];
            out += "PREFIX "+key+": <"+value+">\r\n\n";
        }
        
        return out;
    },
    /**
     * Replaces the occurrences of the selected keys in the given string
     * 
     * @param s The string that needs replacement
     * @param sel An array of string with the keys
     * @return The string with the replaced values
     */
    replaceURIs: function(s, sel) {
        var out = s;
        console.log(typeof s);
        for (var i = 0; i < sel.length; i++) {
            var key = sel[i];
            var uri = this.vocabularies[key];
            if (uri) {
                out = out.replace(new RegExp(uri,'g'),key+":");
                //out = out.replace(uri,key+":");
            }
        }
        return out;
    }
};
        
/**
 * A query to fetch the relevant description for selfmade vocabularies using subPropertyOf or subClassOf or that are
 * inherited from Class or Property. 
 */    
var QUERY_DOC = "SELECT DISTINCT ?x ?prop ?val\r\n" + 
            "WHERE {\r\n" + 
            "   GRAPH <http://course.introlinkeddata.org/G4> {\r\n" + 
            "       {\r\n" + 
            "           { \r\n" + 
            "               ?x a rdf:Property.\r\n" + 
            "           } UNION {\r\n" + 
            "               ?x rdfs:subPropertyOf ?y.\r\n" + 
            "           }\r\n" + 
            "       } UNION {\r\n" + 
            "           { \r\n" + 
            "               ?x a rdf:Class.\r\n" + 
            "           } UNION {\r\n" + 
            "               ?x rdfs:subClassOf ?y.\r\n" + 
            "           }\r\n" + 
            "       }\r\n" + 
            "       \r\n" + 
            "       ?x ?prop ?val.\r\n" + 
            "   }\r\n" + 
            "} ORDER BY ?x";

function queryVocabulary() {
    $.post("http://giv-lodumdata.uni-muenster.de:8282/parliament/sparql", {
        query: Prefixes.toString()+QUERY_DOC,
        output: 'json'
    },
    function(data){
        console.log(data);
        visualizeData(data);
    });
}

function visualizeData(data) {
    var topic = data.results.bindings[0].x.value;
    
    var topic_div = $("<div>");
    var title_div = $("<div>");
    title_div.append("<h2><a>"+topic+"</a><h2>");
    topic_div.append(title_div);
    var comment_div = $("<div>");
    topic_div.append(comment_div);
    var table_div = $("<div>").addClass("table-responsive");
    var table = $("<table>").addClass("table").addClass("table-striped");
    var header = $("<tr><th>Property</th><th>Value</th></tr>");
    table.append(header);
    table_div.append(table);
    topic_div.append(table);
    
    for (var i = 0; i < data.results.bindings.length; i++) {
        var cursor = data.results.bindings[i];
        if (topic == cursor.x.value) {
            //add entry into table
            var property = evalType(cursor.prop);
            var value = evalType(cursor.val);
            if (property == Prefixes.vocabularies["rdfs"]+"comment") {
                comment_div.text(value);
            } else {
                var new_row = $("<tr>");
                var prop_td = $("<td>").append(property);
                var val_td = $("<td>").append(value);
                new_row.append(prop_td).append(val_td);
                
                table.append(new_row);
            }
        } else {
            //table.html(Prefixes.replaceURIs(table.html(),["rdf","rdfs","lodcom"]));
            $("#doc").append(topic_div);
            $("#doc").append("<br/>");
            topic = cursor.x.value;
            
            //next block
            topic_div = $("<div>");
            title_div = $("<div>");
            title_div.append("<h2><a>"+topic+"</a><h2>");
            topic_div.append(title_div);
            comment_div = $("<div>");
            topic_div.append(comment_div);
            table_div = $("<div>").addClass("table-responsive");
            table = $("<table>").addClass("table").addClass("table-striped");
            header = $("<tr><th>Property</th><th>Value</th></tr>");
            table.append(header);
            table_div.append(table);
            topic_div.append(table);
            
            var property = evalType(cursor.prop);
            var value = evalType(cursor.val);
            if (property == Prefixes.vocabularies["rdfs"]+"comment") {
                comment_div.text(value);
            } else {
                var new_row = $("<tr>");
                var prop_td = $("<td>").append(property);
                var val_td = $("<td>").append(value);
                new_row.append(prop_td).append(val_td);
                
                table.append(new_row);
            }
        }
    }
    //table.html(Prefixes.replaceURIs(table.html(),["rdf","rdfs","lodcom"]));
    $("#doc").append(topic_div);
}

function evalType(obj) {
    console.log(obj.type);
    if (obj.type == "uri") {
        var uri = $("<a>", {href: obj.value, text:obj.value, target:"_blank"});
        return uri;
    } else {
        return obj.value;
    }
}

function visualizeData_old(data) {
    var new_table = $("<table>",{id: "doc_results"});
    var header = $("<tr><th>Vocabulary</th><th>Property</th><th>Value</th></tr>");
    new_table.append(header);
    
    for (var i = 0; i < data.results.bindings.length; i++) {
        var cursor = data.results.bindings[i];
        var new_row = $("<tr><td>"+cursor.x.value+"</td><td>"+cursor.prop.value+"</td><td>"+cursor.val.value+"</td></tr>");
        new_table.append(new_row);
    }
    //console.log();
    //new_table.html()
    $("#doc").append(Prefixes.replaceURIs(new_table.html(),["rdf","rdfs","lodcom"]));
}

