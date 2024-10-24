import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/entities/role.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
