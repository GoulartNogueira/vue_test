var loc = window.location.pathname;
var dir = loc.substring(0, loc.lastIndexOf('/'));

var example1 = new Vue({
	el: '#subjects',
	data: {
		dir:dir,
		files:["smartphone",'estado_brasileiro','pokemon',"estilo",'viagem'],
		description:{"smartphone":"Explore mais de 300 aparelhos mais populares de 2019 e descubra aquele ideal pra você!",
			"estilo":"Você sabia que existem 7 estilos universais? Descubra aqueles que combinam mais com você!",
			"estado_brasileiro":"Qual o melhor Estado para se morar no Brasil? Qual estado Brasileiro tem mais qualidade de vida? Descubra aqui!",
			"viagem":"Tá afim de viajar pela Europa? Aqui você explore as melhores cidades de acordo com seu perfil!",
			"pokemon":"Busque entre mais de 800 Pokémons e encontre o mais poderoso e adequado para sua estratégia!"
		}
	},
	methods : {

	},

});
