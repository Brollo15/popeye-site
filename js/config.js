/* =========================================================
   CONFIGURAÇÕES DO SITE — edite aqui
   ========================================================= */
window.POPEYE_CONFIG = {
  // Número do WhatsApp com DDI + DDD, só dígitos.
  // ATENÇÃO: confirmar qual número recebe pedidos no WhatsApp.
  whatsapp: "554733498941",

  // Mensagem padrão dos botões "Pedir pelo WhatsApp"
  mensagemPadrao: "Olá, Popeye! Gostaria de fazer um pedido.",

  // Links de apps de delivery (deixe "" para esconder)
  ifood: "",

  // Horários: 0 = domingo ... 6 = sábado. "fecha" pode passar da meia-noite.
  horarios: {
    0: { abre: "18:00", fecha: "00:30" },
    1: { abre: "18:00", fecha: "01:00" },
    2: { abre: "18:00", fecha: "01:00" },
    3: { abre: "18:00", fecha: "01:00" },
    4: { abre: "18:00", fecha: "01:00" },
    5: { abre: "18:00", fecha: "01:00" },
    6: { abre: "18:00", fecha: "01:00" }
  },

  // Fotos da galeria (coloque os arquivos em img/galeria/).
  // Enquanto a foto não existir, aparece um fundo colorido com a legenda.
  galeria: [
    { src: "img/galeria/pizza-1.jpg", legenda: "Pizza da casa", grande: true },
    { src: "img/galeria/burger-1.jpg", legenda: "Hambúrguer gourmet" },
    { src: "img/galeria/fritas.jpg", legenda: "Porção de fritas" },
    { src: "img/galeria/pastel.jpg", legenda: "Pastéis crocantes" },
    { src: "img/galeria/salao.jpg", legenda: "Nosso salão", grande: true },
    { src: "img/galeria/pizza-doce.jpg", legenda: "Pizza doce" },
    { src: "img/galeria/vegetariana.jpg", legenda: "Pizza vegetariana" }
  ]
};
