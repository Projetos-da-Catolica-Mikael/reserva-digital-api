import { Injectable, NotFoundException } from '@nestjs/common';
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
    const created = new this.clinicaModel(createClinicaDto);
    return created.save();
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
