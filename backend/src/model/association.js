const Breed = require("./breed");
const UserBreed = require("./userBreed");
const User = require("./user");
const AlimentoDoacao = require("./alimento_doacao");
const Alimento = require("./alimento");
const CampanhaDonatario = require("./campanha_donatario");
const Campanha = require("./campanha");

const Pessoa = require("./pessoa")
const Logradouro = require("./logradouro")
const Endereco = require("./endereco")
const PermissaoUsuario = require("./permissao_usuario")
const Permissao = require("./permissao")
const Organizacao = require("./organizacao")

Breed.hasMany(UserBreed, { foreignKey: 'breedId', as: 'userBreeds' });
UserBreed.belongsTo(Breed, { foreignKey: 'breedId', as: 'breed' });
User.hasMany(UserBreed, { foreignKey: 'userId', as: 'userBreeds' });
UserBreed.belongsTo(User, { foreignKey: 'userId', as: 'user' }); 

Endereco.belongsTo(Logradouro, { foreignKey: 'idLogradouro', as: 'logradouro' });
Logradouro.hasMany(Endereco, { foreignKey: 'idLogradouro', as: 'endereco' });
Pessoa.hasMany(Endereco,{foreignKey: 'idPessoa', as: 'endereco'});
Endereco.belongsTo(Pessoa,{foreignKey: 'idPessoa', as: 'pessoa'});
Pessoa.hasMany(PermissaoUsuario,{foreignKey: 'idPessoa', as: 'permissaoUsuario'});
PermissaoUsuario.belongsTo(Pessoa,{foreignKey: 'idPessoa', as: 'pessoa'});
Permissao.hasMany(PermissaoUsuario,{foreignKey: 'idPermissao', as: 'permissaoUsuario'});
PermissaoUsuario.belongsTo(Permissao,{foreignKey: 'idPermissao', as: 'permissao'});
Pessoa.hasMany(Organizacao,{foreignKey: 'idPessoa', as: 'organizacao'});
Organizacao.belongsTo(Pessoa,{foreignKey: 'idPessoa', as: 'pessoa'});
Endereco.hasMany(Organizacao,{foreignKey: 'idEndereco', as: 'endereco'});
Organizacao.belongsTo(Endereco,{foreignKey: 'idEndereco', as: 'endereco'});








