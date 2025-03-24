const AlimentDonation = require("./aliment_donation");
const Aliment = require("./aliment");
const CampaignGrantee = require("./campaign_grantee");
const Campaign = require("./campaign");
const Donation = require("./donation");
const Giver = require("./giver");
const Grantee = require("./grantee");
const Adress = require("./adress")
const Logradouro = require("./logradouro")
const Goal = require("./goal")
const Organizacao = require("./organization")
const Person = require("./person")
const measurementUnit = require("./measurement_unit")
const Organization = require("./organization");
const AlimentType = require("./alimentType");

Adress.hasMany(Logradouro, {foreignKey: 'idEndereco', as: 'logradouros'});
Logradouro.belongsTo(Adress, {foreignKey: 'idEndereco', as: 'endereco'});

Aliment.hasMany(AlimentDonation, {foreignKey: 'idAliment', as: 'aliment_donation'});
AlimentDonation.belongsTo(Aliment, {foreignKey: 'idAliment', as: 'aliment'});
AlimentDonation.belongsTo(Donation, {foreignKey: 'idDonation', as: 'donation'});
Donation.hasMany(AlimentDonation, {foreignKey: 'idDonation', as: 'aliment_donation'});
measurementUnit.hasMany(AlimentDonation, {foreignKey: 'idMeasurementUnit', as: 'aliment_donation'});
AlimentDonation.belongsTo(measurementUnit, {foreignKey: 'idMeasurementUnit', as: 'measurement_unit'});

Campaign.hasMany(CampaignGrantee, {foreignKey: 'idCampaign', as: 'campaign_grantee'});
CampaignGrantee.belongsTo(Campaign, {foreignKey: 'idCampaign', as: 'campaign'});
CampaignGrantee.belongsTo(Grantee, {foreignKey: 'idGrantee', as: 'grantee'});
Grantee.hasMany(CampaignGrantee, {foreignKey: 'idGrantee', as: 'campaign_grantee'});

Campaign.hasMany(Donation, {foreignKey: 'idCampaign', as: 'donation'});
Donation.belongsTo(Campaign, {foreignKey: 'idCampaign', as: 'campaign'});
Donation.belongsTo(Giver, {foreignKey: 'idGiver', as: 'giver'});
Giver.hasMany(Donation, {foreignKey: 'idGiver', as: 'donation'});

Campaign.hasMany(Goal, {foreignKey: 'idCampaign', as: 'goal'});
Goal.belongsTo(Campaign, {foreignKey: 'idCampaign', as: 'campaign'});
Goal.belongsTo(Aliment, {foreignKey: 'idAliment', as: 'aliment'});
Aliment.hasMany(Goal, {foreignKey: 'idAliment', as: 'goal'});

Person.hasMany(Giver, {foreignKey: 'idPerson', as: 'giver'});
Giver.belongsTo(Person, {foreignKey: 'idPerson', as: 'person'});
Person.hasMany(Grantee, {foreignKey: 'idPerson', as: 'grantee'});
Grantee.belongsTo(Person, {foreignKey: 'idPerson', as: 'person'});

Person.hasMany(Organization, {foreignKey: 'idPerson', as: 'organization'});
Organization.belongsTo(Person, {foreignKey: 'idPerson', as: 'person'});

AlimentType.hasMany(Aliment, {foreignKey: 'idAlimentType', as: 'aliment'});
Aliment.belongsTo(AlimentType, {foreignKey: 'idAlimentType', as: 'aliment_type'});