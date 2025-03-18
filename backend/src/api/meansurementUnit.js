const measurementUnitController = require('../controller/measurementUnit');

class MeansurementUnitApi{
    async create(req,res){
        const {measurementUnit} = req.body;
        console.log(measurementUnit)

        try{
            const response = await measurementUnitController.create(measurementUnit);
            return res.status(200).send(response);
        } catch(e){
            return res.status(400).send({error: e.message});
        }
    }

    async update(req,res){
        const {measurementUnit} = req.body;
        const {id} = req.params;

        try{
            const response = await measurementUnitController.update(id, measurementUnit);
            return res.status(200).send(response);
        } catch(e){
            return res.status(400).send({error: e.message});
        }
    }

    async findAll(req,res){
        try{
            const response = await measurementUnitController.findAll();
            return res.status(200).send(response);
        } catch(e){
            return res.status(400).send({error: e.message});
        }
    }

    async delete(req,res){
        const {id} = req.params;

        try{
            const response = await measurementUnitController.delete(id);
            return res.status(200).send(response);
        } catch(e){
            return res.status(400).send({error: e.message});
        }
    }

}

module.exports = new MeansurementUnitApi();