import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente, PacienteDocument } from './schemas/paciente.schema';

@Injectable()
export class PacienteService {
  constructor(
    @InjectModel(Paciente.name)
    private pacienteModel: Model<PacienteDocument>,
  ) { }

  async create(createPacienteDto: CreatePacienteDto): Promise<Paciente> {
    const pacienteExistente = await this.pacienteModel.findOne({ cpf: createPacienteDto.cpf });

    if (pacienteExistente) {
      throw new ConflictException('CPF já cadastrado para outro paciente.');
    }

    const paciente = new this.pacienteModel({
      ...createPacienteDto,
      dataNascimento: new Date(createPacienteDto.dataNascimento),
    });
    return paciente.save();
  }

  async findAll(): Promise<Paciente[]> {
    return this.pacienteModel.find().exec();
  }

  async findOne(id: string): Promise<Paciente> {
    const paciente = await this.pacienteModel.findById(id).exec();
    if (!paciente) throw new NotFoundException('Paciente não encontrado');
    return paciente;
  }

  async update(id: string, updatePacienteDto: UpdatePacienteDto): Promise<Paciente> {
    if (updatePacienteDto.cpf) {
      const pacienteComMesmoCpf = await this.pacienteModel.findOne({
        cpf: updatePacienteDto.cpf,
        _id: { $ne: id },
      });

      if (pacienteComMesmoCpf) {
        throw new ConflictException('Já existe outro paciente com este CPF.');
      }
    }

    const updateData: any = { ...updatePacienteDto };
    if (updatePacienteDto.dataNascimento) {
      updateData.dataNascimento = new Date(updatePacienteDto.dataNascimento);
    }

    const updated = await this.pacienteModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updated) throw new NotFoundException('Paciente não encontrado');

    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.pacienteModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Paciente não encontrado');
  }
}
