var criteria = {
            Imagem:{    'id':'idImage', "crit_type":"image",    "column_name":"imagem"},
            Descricao:{ 'id':'idDesc', "crit_type":"description",    "column_name":"descricao"},
            Sexy:{
                "id": "idSexy",
                "crit_type": "range",
                "slide_value": 1,
                "multiplier": 1,
                "norm_crit":0.5,
                "norm_slide":2,
                "true_value": 1,
                "column_name": "sexy",
                "short_term": "Sexy",
                "descricao" : "Porque beleza e sensualidade geram confiança. I'm sexy and I know it!"
              },
              Basico:{
                "id": "idBasico",
                "crit_type": "range",
                "slide_value": 1,
                "multiplier": 1,
                "norm_crit":0.5,
                "norm_slide":2,
                "true_value": 1,
                "column_name": "basico",
                "short_term": "Confortável",
                "descricao":"Um estilo mais prático e rápido. A aparência não é tão importante quanto o quão bem você se sente na sua roupa."
              },
              Tematico:{
                "id": "idTematico",
                "crit_type": "range",
                "slide_value": 1,
                "multiplier": 1,
                "norm_crit":0.5,
                "norm_slide":2,
                "true_value": 1,
                "column_name": "tematico",
                "short_term": "Criativo",
                "descricao":"Pra quem gosta de causar um impacto. Ser o foco onde quer que você passe. São os criadores de novas tendências que gostam de 'inventar moda'!"
              },
        };

var items = 
[
  {
    "name": "Esportivo",
    "sexy": 1,
    "basico": 14,
    "tematico": 1,
    "image_src": "https://myps.com.br/lib/_textEditor/uploads/images/2017Ago/estilos-universais/estilo-natural-esportivo.jpg",
    "link_href":"https://myps.com.br/tag/estilo/natural--esportivo",
    "descricao": "O estilo Natural ou Esportivo é também conhecido como estilo básico. O visual é despojado e prático."
  },
  {
    "name": "Tradicional",
    "sexy": 1,
    "basico": 10,
    "tematico": 5,
    "image_src": "https://myps.com.br/lib/_textEditor/uploads/images/2017Ago/estilos-universais/estilo-tradicional.jpg",
    "link_href":"https://myps.com.br/tag/estilo/tradicional",
    "descricao": "O estilo Tradicional, é o estilo das mulheres que gostam de roupas formais, com linhas retas e poucos detalhes."
  },
  {
    "name": "Elegante / Refinado",
    "sexy": 5,
    "basico": 9,
    "tematico": 0,
    "image_src": "https://myps.com.br/lib/_textEditor/uploads/images/2017Ago/estilos-universais/estilo-refinado.jpg",
    "link_href":"https://myps.com.br/tag/estilo/refinado",
    "descricao": "O estilo Refinado é o mais elegante dos 7 estilos universais. As peças são clássicas e de caimento perfeito, porém modernas com detalhes sofisticados e luxuosos."
  },
  {
    "name": "Romântico",
    "sexy": 8,
    "basico": 5,
    "tematico": 3,
    "image_src": "https://myps.com.br/lib/_textEditor/uploads/images/2017Ago/estilos-universais/estilo-romantico.jpg",
    "link_href":"https://myps.com.br/tag/estilo/romantico",
    "descricao": "O estilo Romântico mostra uma mulher feminina, leve e doce."
  },
  {
    "name": "Sexy",
    "sexy": 9,
    "basico": 2,
    "tematico": 5,
    "image_src": "https://myps.com.br/lib/_textEditor/uploads/images/2017Ago/estilos-universais/estilo-sexy.jpg",
    "link_href":"https://myps.com.br/tag/estilo/sexy",
    "descricao": "O estilo Sexy revela uma mulher forte, poderosa e que gosta de valorizar o corpo."
  },
  {
    "name": "Criativo",
    "sexy": 3,
    "basico": 4,
    "tematico": 9,
    "image_src": "https://myps.com.br/lib/_textEditor/uploads/images/2017Ago/estilos-universais/estilo-criativo.jpg",
    "link_href":"https://myps.com.br/tag/estilo/criativo",
    "descricao": "O estilo criativo que costuma ser caracterizado pela mistura de todos os outros 6 estilos universais."
  },
  {
    "name": "Moderno",
    "sexy": 5,
    "basico": 2,
    "tematico": 9,
    "image_src": "https://myps.com.br/lib/_textEditor/uploads/images/2017Ago/estilos-universais/estilo-dramatico-urbano.jpg",
    "link_href":"https://myps.com.br/tag/estilo/dramatico--urbano",
    "descricao": "A última tendência da moda. Tem essa originalidade diferente de todas as suas tendências atuais. Tem algo novo para oferecer. Adoram a cor preta e abusam também do contraste de claro com escuro."
  }
];