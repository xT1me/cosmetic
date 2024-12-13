import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class DefaultDataService {
  private readonly logger = new Logger(DefaultDataService.name);

  constructor(private readonly usersService: UsersService) {}
  

  async createDefaultData(): Promise<void> {
    const existingAdmin = await this.usersService.findByUsername('admin');
    if (existingAdmin) {
      this.logger.log('Администратор уже существует');
      return;
    }

    const password = 'A7x!Kq2*WvP@8nL$Zr5XjF3oYpT&Qm9D';
    await this.usersService.createUser('admin', 'admin@example.com', password);
    const adminUser = await this.usersService.findByUsername('admin');
    
    if (adminUser && adminUser._id) {
      await this.usersService.addRole(adminUser._id.toString(), 'ROLE_ADMIN');
      this.logger.log('Администратор с ролью "ROLE_ADMIN" успешно создан');
    } else {
      this.logger.error('Ошибка при создании администратора');
    }
  }
}
