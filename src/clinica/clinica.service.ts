import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClinicaDto } from './dto/create-clinica.dto';
import { UpdateClinicaDto } from './dto/update-clinica.dto';
import { Clinica, ClinicaDocument } from './schemas/clinica.schema';

@Injectable()
export class ClinicaService {
  constructor(
    @InjectModel(Clinica.name)
    private clinicaModel: Model<ClinicaDocument>,
  ) { }

  async create(createClinicaDto: CreateClinicaDto): Promise<Clinica> {
    const clinicaExistente = await this.clinicaModel.findOne({ cnpj: createClinicaDto.cnpj });

    if (clinicaExistente) {
      throw new ConflictException('CNPJ já cadastrado para outra clínica.');
    }

    const clinica = new this.clinicaModel(createClinicaDto);
    return clinica.save();
  }

  async findAll(): Promise<Clinica[]> {
    return this.clinicaModel.find().exec();
  }

  async findOne(id: string): Promise<Clinica> {
    const clinica = await this.clinicaModel.findById(id).exec();
    if (!clinica) throw new NotFoundException('Clínica não encontrada');
    return clinica;
  }

  async update(id: string, updateClinicaDto: UpdateClinicaDto): Promise<Clinica> {
    if (updateClinicaDto.cnpj) {
      const clinicaComMesmoCnpj = await this.clinicaModel.findOne({
        cnpj: updateClinicaDto.cnpj,
        _id: { $ne: id },
      });

      if (clinicaComMesmoCnpj) {
        throw new ConflictException('Já existe outra clínica com este CNPJ.');
      }
    }

    const updated = await this.clinicaModel
      .findByIdAndUpdate(id, updateClinicaDto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException('Clínica não encontrada');

    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.clinicaModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Clínica não encontrada');
  }
}
