/* =========================================================
   CARDÁPIO — edite itens, descrições e preços aqui.

   ATENÇÃO: os itens e PREÇOS abaixo são EXEMPLOS para montar o
   layout. Substitua pelo cardápio oficial antes de publicar.

   - preco: número (ex.: 49.9). Use null para mostrar "Consulte".
   - tags: "veg" (vegetariana), "novo", "top" (mais pedido)
   ========================================================= */
window.POPEYE_CARDAPIO = [
  {
    id: "pizzas",
    nome: "Pizzas",
    icone: "🍕",
    descricao: "Pizzas grandes (8 fatias). Meio a meio? É só avisar nas observações.",
    itens: [
      { nome: "Calabresa", desc: "Molho de tomate, muçarela, calabresa fatiada e cebola.", preco: 59.9, tags: ["top"] },
      { nome: "Frango com Catupiry", desc: "Frango desfiado temperado, Catupiry e muçarela.", preco: 64.9, tags: ["top"] },
      { nome: "Portuguesa", desc: "Presunto, ovos, cebola, ervilha, azeitona e muçarela.", preco: 64.9 },
      { nome: "Quatro Queijos", desc: "Muçarela, provolone, parmesão e gorgonzola.", preco: 69.9, tags: ["veg"] },
      { nome: "Marguerita", desc: "Muçarela, tomate fatiado, manjericão fresco e azeite.", preco: 59.9, tags: ["veg"] },
      { nome: "Vegetariana", desc: "Brócolis, palmito, milho, champignon, tomate e muçarela.", preco: 64.9, tags: ["veg", "top"] },
      { nome: "Bacon com Cheddar", desc: "Muçarela, bacon crocante e cheddar cremoso.", preco: 66.9 }
    ]
  },
  {
    id: "doces",
    nome: "Pizzas doces",
    icone: "🍫",
    descricao: "Para fechar a noite com aquele docinho.",
    itens: [
      { nome: "Chocolate com Morango", desc: "Chocolate ao leite e morangos frescos.", preco: 59.9, tags: ["top"] },
      { nome: "Prestígio", desc: "Chocolate e coco ralado.", preco: 54.9 },
      { nome: "Banana com Canela", desc: "Banana, açúcar, canela e leite condensado.", preco: 52.9 },
      { nome: "Romeu e Julieta", desc: "Goiabada cremosa com queijo.", preco: 54.9 }
    ]
  },
  {
    id: "lanches",
    nome: "Lanches",
    icone: "🍔",
    descricao: "Hambúrgueres gourmet e sanduíches caprichados, com pão macio.",
    itens: [
      { nome: "X-Popeye", desc: "Hambúrguer artesanal, queijo, bacon, ovo, alface, tomate e molho da casa.", preco: 36.9, tags: ["top"] },
      { nome: "X-Salada", desc: "Hambúrguer, queijo, alface, tomate e maionese.", preco: 26.9 },
      { nome: "X-Bacon", desc: "Hambúrguer, queijo, bacon crocante e maionese.", preco: 30.9 },
      { nome: "X-Frango", desc: "Filé de frango grelhado, queijo, alface e tomate.", preco: 29.9 },
      { nome: "Smash Cheddar", desc: "Dois smash burgers, cheddar, cebola caramelizada.", preco: 34.9, tags: ["novo"] },
      { nome: "Sanduíche Vegetariano", desc: "Queijo, ovo, milho, alface, tomate e cenoura.", preco: 24.9, tags: ["veg"] }
    ]
  },
  {
    id: "pasteis",
    nome: "Pastéis",
    icone: "🥟",
    descricao: "Massa crocante, recheio generoso.",
    itens: [
      { nome: "Carne", desc: "Carne moída temperada com azeitona.", preco: 14.9 },
      { nome: "Queijo", desc: "Muçarela derretida.", preco: 13.9, tags: ["veg"] },
      { nome: "Frango com Catupiry", desc: "Frango desfiado e Catupiry.", preco: 15.9 },
      { nome: "Camarão", desc: "Camarão refogado com requeijão.", preco: 21.9, tags: ["top"] },
      { nome: "Pizza", desc: "Presunto, queijo, tomate e orégano.", preco: 14.9 }
    ]
  },
  {
    id: "porcoes",
    nome: "Porções",
    icone: "🍟",
    descricao: "Para dividir (ou não).",
    itens: [
      { nome: "Batata Frita", desc: "Porção generosa, sequinha e crocante.", preco: 32.9, tags: ["top", "veg"] },
      { nome: "Batata com Cheddar e Bacon", desc: "Fritas cobertas com cheddar cremoso e bacon.", preco: 42.9 },
      { nome: "Frango a Passarinho", desc: "Com alho frito e limão.", preco: 46.9 },
      { nome: "Calabresa Acebolada", desc: "Calabresa fatiada com cebola, acompanha pão.", preco: 39.9 },
      { nome: "Anéis de Cebola", desc: "Empanados e crocantes.", preco: 29.9, tags: ["veg"] }
    ]
  },
  {
    id: "bebidas",
    nome: "Bebidas",
    icone: "🥤",
    descricao: "Gelada do jeito que tem que ser.",
    itens: [
      { nome: "Refrigerante 2L", desc: "Consulte as marcas disponíveis.", preco: 14.9 },
      { nome: "Refrigerante lata", desc: "350 ml.", preco: 6.5 },
      { nome: "Suco natural", desc: "Laranja, limão ou maracujá (500 ml).", preco: 10.9 },
      { nome: "Água mineral", desc: "Com ou sem gás.", preco: 4.5 },
      { nome: "Cerveja long neck", desc: "Consulte as marcas disponíveis.", preco: 9.9 }
    ]
  }
];
