const Alimento = require("./alimento");
const Donatario = require("./donatario");
const SituacaoHabitacional = require("./situacaoHabitacional");
const TipoAlimento = require("./tipoAlimento");
const SituacaoProfissional = require("./situacaoProfissional");
const Pessoa = require("./pessoa");
const Dependente = require("./dependente");
const Organizacao = require("./organizacao");

// 🥦 Relacionamento entre TipoAlimento e Alimento
TipoAlimento.hasMany(Alimento, { foreignKey: "idTipoAlimento" });
Alimento.belongsTo(TipoAlimento, { foreignKey: "idTipoAlimento" });

// 🏠 Relacionamento entre Donatario e SituacaoHabitacional
SituacaoHabitacional.hasMany(Donatario, { foreignKey: "idSituacaoHabitacional" });
Donatario.belongsTo(SituacaoHabitacional, { foreignKey: "idSituacaoHabitacional" });

// 👷‍♂️ Relacionamento entre Donatario e SituacaoProfissional
SituacaoProfissional.hasMany(Donatario, { foreignKey: "idSituacaoProfissional" });
Donatario.belongsTo(SituacaoProfissional, { foreignKey: "idSituacaoProfissional" });

// 🏢 Relacionamento entre Donatario e Organizacao
Donatario.belongsTo(Organizacao, { foreignKey: "idOrganizacao" });
Organizacao.hasMany(Donatario, { foreignKey: "idOrganizacao" });

// 🏢 Relacionamento entre Pessoa e Organizacao
Pessoa.belongsTo(Organizacao, { foreignKey: "idOrganizacao" });
Organizacao.hasMany(Pessoa, { foreignKey: "idOrganizacao" });

// 👥 Relacionamento entre Donatario e Pessoa (Responsável pela Visita)
Donatario.belongsTo(Pessoa, { as: "responsavelVisita", foreignKey: "responsavelVisita" });
Pessoa.hasMany(Donatario, { as: "visitasRealizadas", foreignKey: "responsavelVisita" });

// 🚨 Removido relacionamento duplicado entre Donatario e Pessoa
Donatario.belongsTo(Pessoa, { foreignKey: "idPessoa" });

// 👶 Relacionamento entre Dependente e Pessoa (Dependente e Provedor)
Dependente.belongsTo(Pessoa, { as: "dependente", foreignKey: "idPessoa" });
Dependente.belongsTo(Pessoa, { as: "provedor", foreignKey: "idProvedor" });
Pessoa.hasMany(Dependente, { as: "dependentes", foreignKey: "idProvedor" });