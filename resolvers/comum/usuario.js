const { perfis: obterPerfis } = require("../Type/Usuario");
const jwt = require("jwt-simple");

module.exports = {
  async getUsuarioLogado(usuario) {
    const perfis = await obterPerfis(usuario);
    const agora = Math.floor(Date.now() / 1000);
    const usuarioInfo = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      perfis: perfis.map(p => p.nome),
      iat: agora,
      exp: agora + 3 * 24 * 60 * 60
    };

    const authSecret = `eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ`;

    return {
      ...usuario,
      token: jwt.encode(usuarioInfo, authSecret)
    };
  }
};
