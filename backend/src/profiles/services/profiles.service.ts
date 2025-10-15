import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../../entities/profile.entity';
import { User } from '../../entities/user.entity';
import { UpdateProfileDto } from '../dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getProfileByUserId(userId: number): Promise<Profile> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const profile = await this.profilesRepository.findOne({
      where: { userId },
      relations: ['user'],
    });

    if (!profile) {
      throw new NotFoundException(`Profile for user ID ${userId} not found`);
    }

    return profile;
  }

  async updateProfile(userId: number, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    const profile = await this.getProfileByUserId(userId);
    
    Object.assign(profile, updateProfileDto);
    return this.profilesRepository.save(profile);
  }

  async createProfile(userId: number, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const existingProfile = await this.profilesRepository.findOne({
      where: { userId },
    });

    if (existingProfile) {
      throw new ConflictException(`Profile for user ID ${userId} already exists`);
    }

    const profile = this.profilesRepository.create({
      ...updateProfileDto,
      userId,
    });

    return this.profilesRepository.save(profile);
  }
}
