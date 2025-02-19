const AlimentoDoacao = require("./alimento_doacao");
const Alimento = require("./alimento");
const CampanhaDonatario = require("./campanha_donatario");
const Campanha = require("./campanha");
const Doacao = require("./doacao");
const Doador = require("./doador");
const Donatario = require("./donatario");
const Endereco = require("./endereco")
const Logradouro = require("./logradouro")
const Meta = require("./meta")
const Organizacao = require("./organizacao")
const PermissaoUsuario = require("./permissao_pessoa")
const Permissao = require("./permissao")
const Pessoa = require("./pessoa")
const UnidadeMedida = require("./unidade_medida")



// Breed.hasMany(UserBreed, { foreignKey: 'breedId', as: 'userBreeds' });
// UserBreed.belongsTo(Breed, { foreignKey: 'breedId', as: 'breed' });
// UserBreed.belongsTo(User, { foreignKey: 'userId', as: 'user' }); 
// User.hasMany(UserBreed, { foreignKey: 'userId', as: 'userBreeds' });

Endereco.hasMany(Logradouro, {foreignKey: 'idEndereco', as: 'logradouros'});
Logradouro.belongsTo(Endereco, {foreignKey: 'idEndereco', as: 'endereco'});

Alimento.hasMany(AlimentoDoacao, {foreignKey: 'idAlimento', as: 'alimento_doacao'});
AlimentoDoacao.belongsTo(Alimento, {foreignKey: 'idAlimento', as: 'alimento'});
AlimentoDoacao.belongsTo(Doacao, {foreignKey: 'idDoacao', as: 'doacao'});
Doacao.hasMany(AlimentoDoacao, {foreignKey: 'idDoacao', as: 'alimento_doacao'});
UnidadeMedida.hasMany(AlimentoDoacao, {foreignKey: 'idUnidadeMedida', as: 'alimento_doacao'});
AlimentoDoacao.belongsTo(UnidadeMedida, {foreignKey: 'idUnidadeMedida', as: 'unidade_medida'});

Campanha.hasMany(CampanhaDonatario, {foreignKey: 'idCampanha', as: 'campanha_donatario'});
CampanhaDonatario.belongsTo(Campanha, {foreignKey: 'idCampanha', as: 'campanha'});
CampanhaDonatario.belongsTo(Donatario, {foreignKey: 'idDonatario', as: 'donatario'});
Donatario.hasMany(CampanhaDonatario, {foreignKey: 'idDonatario', as: 'campanha_donatario'});

Campanha.hasMany(Doacao, {foreignKey: 'idCampanha', as: 'doacao'});
Doacao.belongsTo(Campanha, {foreignKey: 'idCampanha', as: 'campanha'});
Doacao.belongsTo(Doador, {foreignKey: 'idDoador', as: 'doador'});
Doador.hasMany(Doacao, {foreignKey: 'idDoador', as: 'doacao'});

Campanha.hasMany(Meta, {foreignKey: 'idCampanha', as: 'meta'});
Meta.belongsTo(Campanha, {foreignKey: 'idCampanha', as: 'campanha'});
Meta.belongsTo(Alimento, {foreignKey: 'idAlimento', as: 'alimento'});
Alimento.hasMany(Meta, {foreignKey: 'idAlimento', as: 'meta'});

Pessoa.hasMany(Doador, {foreignKey: 'idPessoa', as: 'doador'});
Doador.belongsTo(Pessoa, {foreignKey: 'idPessoa', as: 'pessoa'});
Pessoa.hasMany(Donatario, {foreignKey: 'idPessoa', as: 'donatario'});
Donatario.belongsTo(Pessoa, {foreignKey: 'idPessoa', as: 'pessoa'});

Pessoa.hasMany(PermissaoUsuario, {foreignKey: 'idPessoa', as: 'permissao_pessoa'});
PermissaoUsuario.belongsTo(Pessoa, {foreignKey: 'idPessoa', as: 'pessoa'});
PermissaoUsuario.belongsTo(Permissao, {foreignKey: 'idPermissao', as: 'permissao'});
Permissao.hasMany(PermissaoUsuario, {foreignKey: 'idPermissao', as: 'permissao_pessoa'});


