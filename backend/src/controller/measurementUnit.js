const measurementUnitModel = require('../model/measurement_unit');

class MeasurementUnitController {
    async create(measurementUnit) {
        try {
            const measurementUnitValue = await measurementUnitModel.create({
                measurementUnit
            });
            return measurementUnitValue;
        } catch (e) {
            return { mensagem: e.message };
        }
    }

    async update(idMeasurementUnit, measurementUnit, ieSituation) {
        const oldMeasurementUnit = await measurementUnitModel.findOne({
            where: { idMeasurementUnit }
        });

        oldMeasurementUnit.measurementUnit = measurementUnit || oldMeasurementUnit.measurementUnit;
        oldMeasurementUnit.ieSituation = ieSituation || oldMeasurementUnit.ieSituation;
        oldMeasurementUnit.save();
    }

    async delete(idMeasurementUnit) {
        if (!idMeasurementUnit) {
            throw new Error("Id é obrigatório.");
        }

        const measurementUnitValue = await measurementUnitModel.findOne({ where: { idMeasurementUnit } });

        await measurementUnitValue.destroy();
    }

    async findAll() {
        const measurementUnitValue = await measurementUnitModel.findAll();
        return measurementUnitValue;
    }
}

module.exports = new MeasurementUnitController();