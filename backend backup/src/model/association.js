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
const UnitMeasure = require("./unit_measure")



// Breed.hasMany(UserBreed, { foreignKey: 'breedId', as: 'userBreeds' });
// UserBreed.belongsTo(Breed, { foreignKey: 'breedId', as: 'breed' });
// UserBreed.belongsTo(User, { foreignKey: 'userId', as: 'user' }); 
// User.hasMany(UserBreed, { foreignKey: 'userId', as: 'userBreeds' });

Adress.hasMany(Logradouro, {foreignKey: 'idEndereco', as: 'logradouros'});
Logradouro.belongsTo(Adress, {foreignKey: 'idEndereco', as: 'endereco'});

Aliment.hasMany(AlimentDonation, {foreignKey: 'idAliment', as: 'aliment_donation'});
AlimentDonation.belongsTo(Aliment, {foreignKey: 'idAliment', as: 'aliment'});
AlimentDonation.belongsTo(Donation, {foreignKey: 'idDonation', as: 'donation'});
Donation.hasMany(AlimentDonation, {foreignKey: 'idDonation', as: 'aliment_donation'});
UnitMeasure.hasMany(AlimentDonation, {foreignKey: 'idUnitMeasure', as: 'aliment_donation'});
AlimentDonation.belongsTo(UnitMeasure, {foreignKey: 'idUnitMeasure', as: 'unit_measure'});

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



