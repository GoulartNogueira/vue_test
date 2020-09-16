function normalizer(n) {
	//{0:0,1:1,2:2,3:5,4:7,5:12};
	return n**1.68 ;
}

var example1 = new Vue({
	el: '#rec',
	data: {
		criteria:{
			//Bateria:{'id':'idBAT',	"slide_value":1,	"multiplier":1,	"true_value":0, "column_name":"_____"},
			Marca:{		'id':'idMarca',	"crit_type":"options",	"filter_options":[], "options":[{"id":1,"name":"Android"},{"id":2,"name":"Apple"}],	"column_name":"sistema_operacional","short_term":"Sistema Operacional"},
			Imagem:{	'id':'idImage',	"crit_type":"image",	"column_name":"image_src"},
			Tela:{		'id':'idTela',	"crit_type":"range", 	"slide_value":1,	"multiplier":1,	"true_value":1,	"column_name":"display","short_term":"Tela Grande"},
			Hardware:{	'id':'idHard',	"crit_type":"range",	"slide_value":1,	"multiplier":1, 	"true_value":1, "column_name":"hardware","short_term":"Potência e Velocidade"},
			Camera:{	'id':'idCam', 	"crit_type":"range",	"slide_value":1,	"multiplier":1,	"true_value":1, "column_name":"camera","short_term":"Câmera de Qualidade"},
			Price:{		'id':'idPrice',	"crit_type":"range",	"slide_value":1,	"multiplier":-0.001,	"true_value":1, "column_name":"price","short_term":"Baixo Custo"},
			Name:{		'id':'idName',	"crit_type":"filter", 	"filter_string":"",	"column_name":"name", "short_term":"Nome", "example_hint":"Exemplo iPhone"},
		},
		items: smartphones,
		number_of_results:0,
    numtoword:
				{
					0:"nula",
					1:"muito baixa",
					2:"baixa",
					3:"razoável",
					4:"grande",
					5:"extrema"
				}
  },
	methods : {

	},
	computed: {
		update_true_value: function(){
			for(var crit in this.criteria){
				if(this.criteria[crit].hasOwnProperty('multiplier')){
					this.criteria[crit]["true_value"]=normalizer(this.criteria[crit].slide_value)*this.criteria[crit].multiplier
				}
			}
		},
		/*soma_total : function(){
			var total=0;
			this.update_true_value;
			for (var crit in this.criteria){
				total += parseFloat(this.criteria[crit]["true_value"]);
			};
			return(total)
		},*/
		top_itens: function () {
			this.update_true_value;
		    
		    var filtered_items = this.items;
		    //console.log(filtered_items);

		    //WE SHOULD APPLY A FILTER HERE:
		    /*filtered_items = filtered_items.filter(function(item) {
				return item["Nome"].toUpperCase().includes(filter_string.trim().toUpperCase());
			}*/
		    //TRIED FILTER. NO SUCCESS.
		    //Making it the wrong way:
			
			for (var crit in this.criteria){
				if(this.criteria[crit].hasOwnProperty('filter_string')){
					if(this.criteria[crit].filter_string === ""){continue;}
					//if(!this.items[x]["name"].toUpperCase().includes(this.criteria[crit].filter_string.trim().toUpperCase())){
					filtered_items = filtered_items.filter(item => item[this.criteria[crit].column_name].toUpperCase().includes(this.criteria[crit].filter_string.trim().toUpperCase()))
					//console.log(filtered_items);
				}
			}
			for (var x in filtered_items) {
				this.items[x]["total"] = 0;
				for (var crit in this.criteria){

					if(this.criteria[crit].hasOwnProperty('true_value')){
						this.items[x]["total"] += parseFloat(this.criteria[crit].true_value) * parseFloat(this.items[x][this.criteria[crit].column_name])
					}
				}
		        //this.items[x]["total"]=parseFloat(this.items[x]["total"]).toFixed(2);
	    	}

	    	//{{this.criteria.Name.filter_string}}
	    	//filtered_items = filtered_items.filter(this.filter_function);

		    filtered_items.sort(function (a, b) {return b["total"]-a["total"];});

		    return filtered_items.slice(0,this.number_of_results);
			},

	}
});
