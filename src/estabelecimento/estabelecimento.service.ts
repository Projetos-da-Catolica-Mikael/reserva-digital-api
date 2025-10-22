import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEstabelecimentoDto } from './dto/create-estabelecimento.dto';
import { UpdateEstabelecimentoDto } from './dto/update-estabelecimento.dto';
import { Estabelecimento, EstabelecimentoDocument } from './schemas/estabelecimento.schema';

@Injectable()
export class EstabelecimentoService {
  constructor(
    @InjectModel(Estabelecimento.name)
    private estabelecimentoModel: Model<EstabelecimentoDocument>,
  ) { }

  async create(createEstabelecimentoDto: CreateEstabelecimentoDto): Promise<Estabelecimento> {
    const estabelecimentoExistente = await this.estabelecimentoModel.findOne({ cnpj: createEstabelecimentoDto.cnpj });

    if (estabelecimentoExistente) {
      throw new ConflictException('CNPJ já cadastrado para outro estabelecimento.');
    }

    const estabelecimento = new this.estabelecimentoModel(createEstabelecimentoDto);
    return estabelecimento.save();
  }

  async findAll(): Promise<Estabelecimento[]> {
    return this.estabelecimentoModel.find().exec();
  }

  async findOne(id: string): Promise<Estabelecimento> {
    const estabelecimento = await this.estabelecimentoModel.findById(id).exec();
    if (!estabelecimento) throw new NotFoundException('Estabelecimento não encontrada');
    return estabelecimento;
  }

  async update(id: string, updateEstabelecimentoDto: UpdateEstabelecimentoDto): Promise<Estabelecimento> {
    if (updateEstabelecimentoDto.cnpj) {
      const estabelecimentoComMesmoCnpj = await this.estabelecimentoModel.findOne({
        cnpj: updateEstabelecimentoDto.cnpj,
        _id: { $ne: id },
      });

      if (estabelecimentoComMesmoCnpj) {
        throw new ConflictException('Já existe outro estabelecimento com este CNPJ.');
      }
    }

    const updated = await this.estabelecimentoModel
      .findByIdAndUpdate(id, updateEstabelecimentoDto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException('Estabelecimento não encontrada');

    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.estabelecimentoModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Estabelecimento não encontrada');
  }
}
