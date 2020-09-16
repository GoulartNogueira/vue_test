var produtos = {
    "autor": "Victor Mattos Ribeiro",
    "name":"Estilo",
    "palavras chave":"estilo, moda",
};

var criteria = {
            Imagem:{    'id':'idImage', "crit_type":"image",    "column_name":"imagem"},
            Descricao:{ 'id':'idDesc', "crit_type":"description",    "column_name":"descricao"},
            Link:{ 'id':'idlink', "crit_type":"button",    "column_name":"link"},
            Sexy:{
                "id": "idSexy",
                "crit_type": "range",
                "slide_value": 1,
                "multiplier": 1,
                "true_value": 1,
                "column_name": "sexy",
                "short_term": "Sexy"
              },
              Basico:{
                "id": "idBasico",
                "crit_type": "range",
                "slide_value": 1,
                "multiplier": 1,
                "true_value": 1,
                "column_name": "basico",
                "short_term": "Conforto"
              },
              Tematico:{
                "id": "idTematico",
                "crit_type": "range",
                "slide_value": 1,
                "multiplier": 1,
                "true_value": 1,
                "column_name": "tematico",
                "short_term": "Criatividade"
              },
        };

var items = 
[
  {
    "name": "Esportivo",
    "sexy": 3,
    "basico": 10,
    "tematico": 3,
    "image_src": "https://myps.com.br/lib/_textEditor/uploads/images/2017Ago/estilos-universais/estilo-natural-esportivo.jpg",
    "descricao": "O estilo Natural ou Esportivo é também conhecido como estilo básico. O visual é despojado e prático.",
    "link": "https://myps.com.br/tag/estilo/natural--esportivo",
  },
  {
    "name": "Tradicional",
    "sexy": 0,
    "basico": 7,
    "tematico": 5,
    "image_src": "https://myps.com.br/lib/_textEditor/uploads/images/2017Ago/estilos-universais/estilo-tradicional.jpg",
    "descricao": "O estilo Tradicional, é o estilo das mulheres que gostam de roupas formais, com linhas retas e poucos detalhes.",
    "link": "https://myps.com.br/tag/estilo/tradicional",
  },
  {
    "name": "Elegante / Refinado",
    "sexy": 5,
    "basico": 7,
    "tematico": 0,
    "image_src": "https://myps.com.br/lib/_textEditor/uploads/images/2017Ago/estilos-universais/estilo-refinado.jpg",
    "descricao": "O estilo Refinado é o mais elegante dos 7 estilos universais. As peças são clássicas e de caimento perfeito, porém modernas com detalhes sofisticados e luxuosos.",
    "link": "https://myps.com.br/tag/estilo/refinado",
  },
  {
    "name": "Romântico",
    "sexy": 8,
    "basico": 4,
    "tematico": 3,
    "image_src": "https://myps.com.br/lib/_textEditor/uploads/images/2017Ago/estilos-universais/estilo-romantico.jpg",
    "descricao": "O estilo Romântico mostra uma mulher feminina, leve e doce.",
    "link": "https://myps.com.br/tag/estilo/romantico",
  },
  {
    "name": "Sexy",
    "sexy": 9,
    "basico": 2,
    "tematico": 5,
    "image_src": "https://myps.com.br/lib/_textEditor/uploads/images/2017Ago/estilos-universais/estilo-sexy.jpg",
    "descricao": "O estilo Sexy revela uma mulher forte, poderosa e que gosta de valorizar o corpo.",
    "link": "https://myps.com.br/tag/estilo/sexy",
  },
  {
    "name": "Criativo",
    "sexy": 3,
    "basico": 4,
    "tematico": 8,
    "image_src": "https://myps.com.br/lib/_textEditor/uploads/images/2017Ago/estilos-universais/estilo-criativo.jpg",
    "descricao": "O estilo criativo que costuma ser caracterizado pela mistura de todos os outros 6 estilos universais.",
    "link": "https://myps.com.br/tag/estilo/criativo",
  },
  {
    "name": "Moderno",
    "sexy": 5,
    "basico": 2,
    "tematico": 9,
    "image_src": "https://myps.com.br/lib/_textEditor/uploads/images/2017Ago/estilos-universais/estilo-dramatico-urbano.jpg",
    "descricao": "Mulheres do estilo Dramático/Urbano adoram a cor preta e abusam também do contraste de claro com escuro.",
    "link": "https://myps.com.br/tag/estilo/dramatico--urbano",
  }
];
