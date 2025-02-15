const Breed = require("./breed");
const UserBreed = require("./userBreed");
const User = require("./user");
const Pessoa = require("./pessoa")
const Logradouro = require("./logradouro")
const Endereco = require("./endereco")
const PermissaoUsuario = require("./permissao_usuario")
const Permissao = require("./permissao")

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






