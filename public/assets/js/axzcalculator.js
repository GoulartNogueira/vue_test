function normalizer(n, e=1.68) {
	//{0:0,1:1,2:2,3:5,4:7,5:12};
	return n**e ;
}

var example1 = new Vue({
	el: '#rec',
	data: {
		produto:produtos,
		criteria:criteria,
		items: items,
		number_of_results:0,
		toggle_description: false,

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
					if(this.criteria[crit].multiplier>0){
						/*console.log(this.criteria[crit].slide_value,"^", this.criteria[crit].norm,"=",normalizer(this.criteria[crit].slide_value,this.criteria[crit].norm))*/
						this.criteria[crit]["true_value"]=normalizer(this.criteria[crit].slide_value,this.criteria[crit].norm_slide)*this.criteria[crit].multiplier
					}
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
			for (var crit in this.criteria){
				if(this.criteria[crit].hasOwnProperty('filter_options')){
					if(this.criteria[crit].filter_options.length === 0){continue;}
					else{
						//this.employees = emp.filter(item => !this.data.some(d => d.QID === item.QID))
						//https://stackoverflow.com/questions/46819974/javascript-using-filter-includes-on-an-array-of-objects
						filtered_items = filtered_items.filter(
							item => this.criteria[crit].filter_options.some(option =>  item[this.criteria[crit].column_name].includes(option)));
					}
					//console.log(filtered_items);
				}
			}
			for (var x in filtered_items) {
				this.items[x]["total"] = 0;
				for (var crit in this.criteria){
					if(this.criteria[crit].hasOwnProperty('true_value')){
						/*console.log(this.criteria[crit].slide_value,"^", this.criteria[crit].norm_crit,"=",normalizer(this.criteria[crit].slide_value,this.criteria[crit].norm_crit))*/
						this.items[x]["total"] += parseFloat(this.criteria[crit].true_value) * normalizer(parseFloat(this.items[x][this.criteria[crit].column_name]),this.criteria[crit].norm_crit)
					}
				}
		        //this.items[x]["total"]=parseFloat(this.items[x]["total"]).toFixed(2);
	    	}

	    	//{{this.criteria.Name.filter_string}}
	    	//filtered_items = filtered_items.filter(this.filter_function);

		    filtered_items.sort(function (a, b) {return b["total"]-a["total"];});

		    return filtered_items.slice(0,this.number_of_results);
		},
		top_ids_list: function(){
			var x = [];
			for(var top_item in this.top_itens){
				if(this.top_itens[top_item].hasOwnProperty('id')){
					x.push(this.top_itens[top_item]['id']);
				}
			}
			return x.join('-');
		},
	}
});
